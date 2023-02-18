import { Blob } from 'buffer'
import { CIDString, File, NFTStorage } from 'nft.storage'

const NFT_STORAGE_API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string

const uploadFile = async ({ file }: { file: Blob }): Promise<CIDString> => {
  const nftStorage = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })

  const fileCID = await nftStorage.storeBlob(file as unknown as globalThis.Blob)
  console.log('File uploaded to: ', `ipfs://${fileCID}`)
  return fileCID
}

const uploadContractMetadata = async ({
  file,
  imageUri,
  feeRecipient,
  name,
  description,
  external_link,
  sellerFeeBasisPoints,
}: {
  file?: Blob
  imageUri?: string
  feeRecipient: string
  name: string
  description?: string
  external_link?: string
  sellerFeeBasisPoints: number
}): Promise<CIDString> => {
  const nftStorage = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })

  // Upload image if `imageUri` not provided
  if (!imageUri) {
    console.log('Note: imageUri was not provided. Hence uploading default image to IPFS')

    const fileCID = uploadFile({ file })

    imageUri = `ipfs://${fileCID}`

    console.log('Image uploaded to: ', imageUri)
  }

  if (!feeRecipient) {
    throw new Error('feeRecipient not provided')
  }

  // Refer: https://docs.opensea.io/docs/contract-level-metadata
  const metadata = {
    name,
    description,
    image: imageUri, // Collection image on OpenSea collection page
    external_link, // This has to be a valid URL to show up on OpenSea
    seller_fee_basis_points: sellerFeeBasisPoints, // Shows up on the "Creator Fees" section of each token on OpenSea
    fee_recipient: feeRecipient, // Default configured as the OpenSea royalty fee collector address
  }

  const metadataFile = new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' })
  const fileCID = await nftStorage.storeBlob(metadataFile)

  console.log('Contract metadata uploaded to: ', `ipfs://${fileCID}`)

  return fileCID
}

const uploadNFTTokenMetadata = async ({
  file,
  imageUri,
  name,
  description,
  count,
  animationUrl,
  benefits,
}: {
  file?: Blob
  imageUri?: string
  name: string
  description?: string
  count: number
  animationUrl?: string
  benefits?: string[]
}): Promise<CIDString> => {
  const nftStorage = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })

  // Upload image if `imageUri` not provided
  if (!imageUri) {
    console.log('Note: imageUri was not provided. Hence uploading default image to IPFS')

    const fileCID = uploadFile({ file })

    imageUri = `ipfs://${fileCID}`

    console.log('Image uploaded to: ', imageUri)
  }

  // This means probably for ERC721 token
  if (count === 1) {
    const metadata = {
      name,
      description: description,
      animation_url: animationUrl ?? '',
      image: imageUri,
    }
    const file = new File([JSON.stringify(metadata)], name, { type: 'application/json' })

    return nftStorage.storeBlob(file)
  }

  const files = [...Array(Number(count)).keys()].map((index) => {
    const tokenId = index + 1
    // Refer: https://docs.opensea.io/docs/metadata-standards
    const metadata = {
      name: `${name} #${tokenId}`,
      description: description,
      animation_url: animationUrl ?? '',
      image: imageUri,
      attributes: benefits
        ? [
            { trait_type: 'Token', value: tokenId },
            ...benefits.map((benefit) => ({
              trait_type: 'Benefit',
              value: benefit,
            })),
          ]
        : undefined,
    }
    return new File([JSON.stringify(metadata)], tokenId.toString(), { type: 'application/json' })
  })

  console.log(files)

  const CID = count === 1 ? await nftStorage.storeBlob(files[0]) : await nftStorage.storeDirectory(files)

  console.log(`Uploaded ${count} tokens' metadata to: ipfs://${CID}/`)

  return CID
}

interface StoreNft {
  name: string
  description?: string
  file?: Blob
  imageUrl?: string
  benefits: string[]
  feeRecipient: string
  membershipsCount: number
  externalLink: string
}

export interface StoreNftResult {
  nftTokenUri: string
  contractUri: string
  imageUri: string
}

export const storeNft = async ({
  name,
  description,
  file,
  benefits,
  feeRecipient,
  membershipsCount,
  externalLink,
}: StoreNft): Promise<StoreNftResult> => {
  const imageCID = await uploadFile({ file })
  const tokenCID = await uploadNFTTokenMetadata({
    file,
    name,
    description,
    benefits,
    count: membershipsCount,
    imageUri: `ipfs://${imageCID}`,
  })
  const contractCID = await uploadContractMetadata({
    file,
    imageUri: `ipfs://${imageCID}`,
    feeRecipient,
    name,
    sellerFeeBasisPoints: 1000,
    description,
    external_link: externalLink,
  })

  return {
    nftTokenUri: tokenCID,
    contractUri: contractCID,
    imageUri: imageCID,
  }
}

export const storeClaimLinkNft = async ({
  file,
  name,
  description,
  externalLink,
  feeRecipient,
  imageUrl,
}: Omit<StoreNft, 'membershipsCount' | 'benefits'>): Promise<StoreNftResult> => {
  const imageCID = await uploadFile({ file })
  imageUrl = imageUrl || `ipfs://${imageCID}`
  const tokenCID = await uploadNFTTokenMetadata({
    imageUri: imageUrl,
    name,
    description,
    count: 1,
    file,
  })
  const contractCID = await uploadContractMetadata({
    file,
    imageUri: imageUrl,
    feeRecipient,
    name,
    sellerFeeBasisPoints: 0,
    description,
    external_link: externalLink,
  })

  return {
    nftTokenUri: `ipfs://${tokenCID}`,
    contractUri: `ipfs://${contractCID}`,
    imageUri: imageUrl,
  }
}

export default storeNft

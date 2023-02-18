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

    const fileCID = uploadFile({ file } as { file: Blob })

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
}: {
  file?: Blob
  imageUri?: string
  name: string
  description?: string
  count: number
  animationUrl?: string
}): Promise<CIDString> => {
  const nftStorage = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })

  // Upload image if `imageUri` not provided
  if (!imageUri) {
    console.log('Note: imageUri was not provided. Hence uploading default image to IPFS')

    const fileCID = uploadFile({ file } as { file: Blob })

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

  const files = Array.from(Array(Number(count)).keys()).map((index) => {
    const tokenId = index + 1
    // Refer: https://docs.opensea.io/docs/metadata-standards
    const metadata = {
      name: `${name} #${tokenId}`,
      description: description,
      animation_url: animationUrl ?? '',
      image: imageUri,
      attributes: [
        {
          trait_type: 'Watch',
          value: name,
        },
      ],
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

const storeNft = async ({
  name,
  description,
  file,
  feeRecipient,
  membershipsCount,
  externalLink,
}: StoreNft): Promise<StoreNftResult> => {
  const imageCID = await uploadFile({ file } as { file: Blob })
  const tokenCID = await uploadNFTTokenMetadata({
    file,
    name,
    description,
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

export default storeNft

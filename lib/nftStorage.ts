import { CIDString, File, NFTStorage } from 'nft.storage'

const NFT_STORAGE_API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string

const uploadFile = async ({ file }: { file: Blob }): Promise<CIDString> => {
  const nftStorage = new NFTStorage({
    token: NFT_STORAGE_API_KEY,
  })

  const fileCID = await nftStorage.storeBlob(file as globalThis.Blob)
  console.log('File uploaded to: ', `ipfs://${fileCID}`)
  return fileCID
}

const uploadContractMetadata = async ({
  file,
  imageUri,
  name,
  description,
  external_link,
}: {
  file?: Blob
  imageUri?: string
  name: string
  description?: string
  external_link?: string
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

  // Refer: https://docs.metaplex.com/programs/token-metadata/token-standard#the-non-fungible-standard
  const metadata = {
    name,
    description,
    image: imageUri, // Collection image
    external_url: external_link, // This has to be a valid URL
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

  // Refer: https://docs.metaplex.com/programs/token-metadata/token-standard#the-non-fungible-standard
  const metadata = {
    name,
    description,
    animation_url: animationUrl ?? '',
    image: imageUri,
    attributes: [
      {
        trait_type: 'Watch',
        value: name,
      },
    ],
  }

  const files = new File([JSON.stringify(metadata)], name, { type: 'application/json' })

  console.log(files)

  const CID = await nftStorage.storeBlob(files)

  console.log(`Uploaded ${count} tokens' metadata to: ipfs://${CID}/`)

  return CID
}

interface StoreNft {
  name: string
  description?: string
  file?: Blob
  imageUrl?: string
  count: number
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

  count,
  externalLink,
}: StoreNft): Promise<StoreNftResult> => {
  const imageCID = await uploadFile({ file } as { file: Blob })
  const tokenCID = await uploadNFTTokenMetadata({
    file,
    name,
    description,
    count,
    imageUri: `https://ipfs.io/ipfs/${imageCID}`,
  })
  const contractCID = await uploadContractMetadata({
    file,
    imageUri: `https://ipfs.io/ipfs/${imageCID}`,
    name,
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

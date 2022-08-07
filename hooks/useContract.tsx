//https://nomicon.io/Standards/Tokens/NonFungibleToken/Core

import { Token } from "@mui/icons-material";
import { Contract, WalletConnection } from "near-api-js";
import CONTENT, { OwnerItem, OWNERS } from "../utils/contentMapping";

export interface Content {
  type: "video" | "image"
  normal: string;
  hiRes?: string;
  /**for videos*/
  thumbnail?: string; 
}
export interface Token {
  tokenId: number;
  ownerId: string;
  description: string | null;
  title: string | null;
  contractId: string;
  contractName: string;
  content: Content; 
  isParasToken?: boolean;
}

interface TokenResponse {
  token_id: number;
  owner_id: string;
  /**Paras tokens only*/
  contract_id?: string;
  /**Paras tokens only*/
  token_series_id?: number;
  metadata: {
    title: string | null; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    description: string | null; // free-form description
    media: string | null; // URL to associated media, preferably to decentralized, content-addressed storage
    media_hash: string | null; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    copies: number | null; // number of copies of this set of metadata in existence when token was minted.
    issued_at: string | null; // When token was issued or minted, Unix epoch in milliseconds
    expires_at: string | null; // When token expires, Unix epoch in milliseconds
    starts_at: string | null; // When token starts being valid, Unix epoch in milliseconds
    updated_at: string | null; // When token was last updated, Unix epoch in milliseconds
    extra: string | null; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    reference: string | null; // URL to an off-chain JSON file with more info.
    reference_hash: string | null;
    /**Paras tokens only*/
    collection?: string
    /**Paras tokens only*/
    collection_id?: string
    /**Paras tokens only*/
    mime_type?: "video/mp4" | "image/png" | "image/gif" | "image/jpeg"
  }
}

interface NftsContract extends Contract {
  nft_tokens_for_owner: (props: {
    account_id: string,
    from_index: string | null, // default: 0
    limit: number | null, // default: unlimited (could fail due to gas limit)
  }) => Promise<TokenResponse[]>,
  nft_metadata: () => Promise<{
    name: string, 
    symbol: string, 
    icon: string | null, // Data URL
    base_uri: string | null, // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
  }>,
  nft_tokens: (props: {
    from_index: string | null, // default: "0"
    limit: number | null, // default: unlimited (could fail due to gas limit)
  }) => Promise<TokenResponse[]>
}

const baseLimit = 33

const ev3rethContracts = ["ev3.neartopia.near", "mint.snxev3.near"]

interface MungeTokenProps {
  tokenResponse: TokenResponse;
  contractId: string;
  contractName: string;
  content: Content;
  isParasToken?: boolean;
}
const mungeToken = ({ tokenResponse, contractId, contractName, content, isParasToken }: MungeTokenProps): Token => {
  const tokenId = (isParasToken && tokenResponse?.token_series_id) || tokenResponse.token_id; //use token_series_id for paras tokens

  const titleWithoutParasEditionLabel = () => {
    if (!tokenResponse.metadata.title) return null
    const index = tokenResponse.metadata.title?.lastIndexOf("#")
    return tokenResponse.metadata.title?.slice(0, index)
  }
  const title = !isParasToken ? tokenResponse.metadata.title : titleWithoutParasEditionLabel()
  return {
    ownerId: tokenResponse.owner_id,
    description: tokenResponse.metadata.description,
    title,
    tokenId,
    contractId,
    contractName,
    content,
    isParasToken
  }
}

const getBaseContent = (metadata: TokenResponse["metadata"], baseUri: string | null): Content => {
  const isVideo = metadata.mime_type?.includes("video") || metadata.media?.endsWith(".mp4")
  const type = isVideo ? "video" : "image"
  const baseContent = `${baseUri}${metadata.media}`
  return {
    normal: baseContent,
    type
  }
}

export const getContractNfts = async (
  wallet: WalletConnection,
  contractId: string,
  limit: number = baseLimit,
  getAll?: boolean
): Promise<Token[]> => {
  try {
    const contract: NftsContract = new Contract(
      wallet.account(),
      contractId,
      {
        viewMethods: ['nft_tokens_for_owner', 'nft_metadata', 'nft_tokens'],
        changeMethods: []
      }
    ) as any

    if (!contract) throw new Error("Could not initialize Contract")

    let nfts;

    if (getAll) {
      nfts = await contract.nft_tokens({
        from_index: "0",
        limit: null
      })
    } else {
      nfts = await contract.nft_tokens_for_owner({
        account_id: wallet.getAccountId(),
        from_index: "0",
        limit
      })
    }
    

    const contractMetadata = await contract.nft_metadata()
        
    return nfts.map(nft => {
      const mediaIsFullURL = nft.metadata.media?.includes("http")
      const base = mediaIsFullURL ? "" : contractMetadata.base_uri
      const proxyBase = "https://res.cloudinary.com/demo/image/fetch/" + base
      const content = CONTENT[contract.contractId]?.[nft.token_id] || getBaseContent(nft.metadata, proxyBase)

      return mungeToken({
        tokenResponse: nft,
        contractId: contract.contractId,
        contractName: contractMetadata.name,
        content
      })
    })

  } catch (e) {
    console.log("Failed to get NFTs from", contractId, e)
    return []
  }
}


export const getAllEv3rethNftsByOwner = async (wallet: WalletConnection) => {
  let nfts: Token[] = []
  if (!wallet.getAccountId()) return nfts
  
  await Promise.allSettled(ev3rethContracts.map(async (contractId) => {
    const contractNfts = await getContractNfts(wallet, contractId)
    if (contractNfts.length) {
      nfts = [...nfts, ...contractNfts]
    }
  }))

  const parasCollections = await getAllEv3rethParasNfts(wallet.getAccountId())

  if (parasCollections.length) {
    nfts = [...nfts, ...parasCollections]
  }

  return nfts
}

export const getAllEv3rethNfts = async (wallet: WalletConnection) => {
  let nfts: Token[] = []
  if (!wallet.getAccountId()) return nfts

  await Promise.allSettled(ev3rethContracts.map(async (contractId) => {
    const contractNfts = await getContractNfts(wallet, contractId)
    if (contractNfts.length) {
      nfts = [...nfts, ...contractNfts]
    }
  }))

  const parasCollections = await getAllEv3rethParasNfts(wallet.getAccountId())

  if (parasCollections.length) {
    nfts = [...nfts, ...parasCollections]
  }

  return nfts
}


export const getAllNfts = async (wallet: WalletConnection) => {
  let nfts: Token[] = []
  try {
    const collections = await fetch(`https://api.kitwallet.app/account/${wallet.getAccountId()}/likelyNFTs`)
      .then(res => res.json() as Promise<string[]>)
    
    await Promise.allSettled(collections.map(async (contractId) => {
      if (contractId === "x.paras.near" || contractId === "nearnautsnft.near") return;
      if (ev3rethContracts.includes(contractId)) return;
  
      const contractNfts = await getContractNfts(wallet, contractId)
      if (contractNfts.length) {
        nfts = [...nfts, ...contractNfts]
      }
    }))
    
    const parasCollections = await getParasNfts({ accountId: wallet.getAccountId() })
    if (parasCollections.length) {
      nfts = [...nfts, ...parasCollections]
    }

  } catch (e) {
    console.log("Error getting all nfts: ", e)
  }

  return nfts
}

//PARAS methods

const ev3rethParasCollectionIds = ["tune-out-by-ev3rethnear", "explorations-by-ev3rethnear", "cafe-abstracto-by-ev3rethnear", "danil-x-ev3reth-by-ev3rethnear"]

export const getParasNfts = async (props: { accountId: string, collectionId?: string, limit?: number, page?: number }) => {
  const { accountId, collectionId, limit = baseLimit, page = 1 } = props
  try {
    const skip = (page - 1) * limit;
    const collectionParam = collectionId ? `&collection_id=${collectionId}` : "";
    const url = `https://api-v2-mainnet.paras.id/token?owner_id=${accountId}&__limit=${limit}&__skip=${skip}${collectionParam}`

    const nfts: TokenResponse[] = await fetch(url)
      .then(res => res.json())
      .then(res => res.data.results)
      
    return nfts.map(nft => {
      //"https://ipfs.fleek.co/ipfs/"
      //"https://gateway.ipfs.io/ipfs/"
      const baseUri = "https://ipfs.fleek.co/ipfs/"
      const hasKeys = Boolean(nft.token_series_id && nft.metadata.collection_id)
      const content = (hasKeys && CONTENT[nft.metadata.collection_id!]?.[nft.token_series_id!]) || getBaseContent(nft.metadata, baseUri)

      //use Content sorting function
      return mungeToken({
        tokenResponse: nft,
        contractId: nft.metadata.collection_id || "x.paras.near",
        contractName: nft.metadata.collection || "Paras",
        isParasToken: true,
        content
      })
    })
  } catch (e) {
    console.log("Failed to get Paras NFTs from", collectionId || "Paras", e)
    return []
  }
}

export const getAllEv3rethParasNfts = async (accountId: string) => {
  let nfts: Token[] = []

  await Promise.allSettled(ev3rethParasCollectionIds.map(async (collectionId) => {
    const collectionNfts = await getParasNfts({ accountId, collectionId })
    if (collectionNfts.length) {
      nfts = [...nfts, ...collectionNfts];
    }
  }))

  return nfts
}

export const truncateOwnerId = (ownerID: string) => {
  const owner = ownerID.replace(".near", "")
  if (ownerID.length < 20) return owner;

  const begin = owner.slice(0, 4)
  const end = owner.slice(owner.length - 4)
  return `${begin}...${end}`
}

const getContractOwners = async (wallet: WalletConnection, contractId: string) => {
  try {
    const contract: NftsContract = new Contract(
      wallet.account(),
      contractId,
      {
        viewMethods: ['nft_tokens'],
        changeMethods: []
      }
    ) as any

    if (!contract) throw new Error("Could not initialize Contract")

    const nfts = await contract.nft_tokens({
      from_index: "0",
      limit: null
    })

    return nfts.reduce((acc: OwnerItem, nft) => {
      acc[nft.token_id] = nft.owner_id
      return acc
    }, {})
  } catch (e) {
    console.log("Error getting contract owners", e)
    return null
  }
}

const getParasOwners = async (collectionId: string) => {
  try {
    const url = `https://api-v2-mainnet.paras.id/token?collection_id=${collectionId}&__limit=33`

    const nfts: TokenResponse[] = await fetch(url)
      .then(res => res.json())
      .then(res => res.data.results)
    
    if(!nfts) return null

    return nfts.reduce((acc: OwnerItem, nft) => {
      if (!nft.token_series_id) return acc;
      acc[nft.token_series_id] = nft.owner_id
      return acc
    }, {})
  } catch (e) {
    console.log("Error getting paras contract owners", e)
    return null
  }
}

export const getAllDisplayOwners = async (wallet: WalletConnection) => {
  const owners = OWNERS
  
  await Promise.allSettled(ev3rethContracts.map(async (id) => {
    const contractOwners = await getContractOwners(wallet, id)
    if (contractOwners) {
      OWNERS[id] = contractOwners
    }
  }))

  const tuneOutId = "tune-out-by-ev3rethnear"
  const parasOwners = await getParasOwners(tuneOutId)

  if (parasOwners) {
    OWNERS[tuneOutId] = parasOwners
  }

  return owners
}
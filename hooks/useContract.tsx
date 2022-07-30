//set up contract, return nfts

import { Contract, WalletConnection } from "near-api-js";

export interface Content {
  type: "video" | "image"
  normal: string;
  hires?: string;
  thumbnail?: string; //for videos
}
export interface Token {
  tokenId: number;
  ownerId: string;
  description: string | null;
  title: string | null;
  contractId: string;
  contractName: string;
  content: Content; //contract.nft_metadata().base_uri + nft.metadata.media OR from hosted content mapping
}

interface TokenResponse {
  token_id: number;
  owner_id: string;
  contract_id?: string; //paras only
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
    collection?: string //Paras only
    collection_id?: string //Paras only
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
  }>
}

const baseLimit = 50

const ev3rethContracts = ["ev3.neartopia.near", "mint.snxev3.near"]

interface MungeTokenProps {
  tokenResponse: TokenResponse;
  contractId: string;
  contractName: string;
  content: Content;
}
const mungeToken = ({ tokenResponse, contractId, contractName, content }: MungeTokenProps): Token => {
  return {
    tokenId: tokenResponse.token_id,
    ownerId: tokenResponse.owner_id,
    description: tokenResponse.metadata.description,
    title: tokenResponse.metadata.title,
    contractId,
    contractName,
    content
  }
}

export const getContractNfts = async (
  wallet: WalletConnection,
  contractId: string,
  limit: number = baseLimit
): Promise<Token[]> => {
  try {
    const contract: NftsContract = new Contract(
      wallet.account(),
      contractId,
      {
        viewMethods: ['nft_tokens_for_owner', 'nft_metadata'],
        changeMethods: []
      }
    ) as any

    if (!contract) throw new Error("Could not initialize Contract")
    
    const nfts = await contract.nft_tokens_for_owner({
      account_id: wallet.getAccountId(),
      from_index: "0",
      limit
    })

    const contractMetadata = await contract.nft_metadata()

    //TODO make function to get Sort content and put in the paras function
    //make hosted content mapping
    
    return nfts.map(nft => {
      const isVideo = nft.metadata.mime_type?.includes("video") || nft.metadata.media?.endsWith(".mp4")
      const type = isVideo ? "video" : "image"
      const baseContent = `${contractMetadata.base_uri}${nft.metadata.media}`
      const content: Content = {
        normal: baseContent,
        type
      }

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

export const getAllEv3rethNfts = async (wallet: WalletConnection) => {
  let nfts: Token[] = []
 
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
    
    console.time("get NFTs")
    await Promise.allSettled(collections.map(async (contractId) => {
      if (contractId === "x.paras.near") return;
      if (ev3rethContracts.includes(contractId)) return;
  
      const contractNfts = await getContractNfts(wallet, contractId)
      if (contractNfts.length) {
        nfts = [...nfts, ...contractNfts]
      }
    }))
    console.timeEnd("get NFTs")
    
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
      const fullMedia = `https://ipfs.fleek.co/ipfs/${nft.metadata.media}`
      const type = nft.metadata.mime_type?.includes("video") ? "video" : "image"
      const content: Content = {
        normal: fullMedia,
        type
      }

      //use Content sorting function
      return mungeToken({
        tokenResponse: nft,
        contractId: nft.contract_id || "x.paras.near",
        contractName: nft.metadata.collection || "Paras",
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
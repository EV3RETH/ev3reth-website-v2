import { Content } from "../hooks/useContract"

type ContentMap = { [key: number]: Content }
export const genesisIds = [33, 32, 31, 30, 29, 28, 27]
export const snxev3Ids = Array.from(Array(30).keys())
const CONTENT: {[key: string]: ContentMap} = {
  "mint.snxev3.near": snxev3Ids.reduce((acc: ContentMap, id) => {
    acc[id] = {
      type: "image",
      normal: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-${id}.png`,
      hiRes: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-upres-images/SNxEV3-${id}-4k.png`,
    }
    return acc
  }, {}),
  "ev3.neartopia.near": genesisIds.reduce((acc: ContentMap, id) => {
    acc[id] = {
      type: id > 7 ? "image" : "video",
      normal: `https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/EV3_+Genesis-${id}.png`,
      hiRes: `https://ev3reth.s3.us-west-2.amazonaws.com/EV3-Genesis-upres/EV3_+Genesis-${id}-4k.png`,
    }
    return acc
  }, {}),
  "tune-out-by-ev3rethnear": {
    253374: {
      type: "video",
      normal: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH1+-+The+Endless.mp4"
    },
    253392: {
      type: "video",
      normal: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH2+-+The+Expanse.mp4"
    },
    253401: {
      type: "video",
      normal: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH3+-+The+Serene.mp4"
    },
    253415: {
      type: "video",
      normal: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH4+-+The+Disturbed.mp4"
    },
    253421: {
      type: "video",
      normal: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH5+-+The+Traveler.mp4"
    },
    253461: {
      type: "video",
      normal: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH6+-+The+Mystic.mp4"
    }
  }
}

export default CONTENT

export type OwnerItem = { [key: number]: string }
export type OwnerMap = { [key: string]: OwnerItem }
export const OWNERS: OwnerMap = {
  "mint.snxev3.near": snxev3Ids.reduce((acc: OwnerItem, id) => {
    acc[id] = "";
    return acc
  }, {}),
  "ev3.neartopia.near": genesisIds.reduce((acc: OwnerItem, id) => {
    acc[id] = ""
    return acc
  }, {}),
  "tune-out-by-ev3rethnear": {
    253374: "",
    253392: "",
    253401: "",
    253415: "",
    253421: "",
    253461: ""
  }
}

export const getOwnerText = (owners: OwnerMap, contractMappingId?: string, tokenId?: number ) => {
  const owner = (contractMappingId && tokenId !== undefined) ? owners[contractMappingId][tokenId] : null
  return  owner ? ` ❖ ${owner}` : ""
}
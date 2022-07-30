import { Content } from "../hooks/useContract"

type ContentMap = { [key: number]: Content }
const CONTENT = {
  "mint.snxev3.near": Array.from(Array(30).keys()).reduce((acc: ContentMap, cur, i) => {
    acc[i] = {
      type: "image",
      normal: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-${i}.png`,
      hires: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-upres-images/SNxEV3-${i}-4k.png`,
    }
    return acc
  }, {}),
  "ev3.neartopia.near": [33, 32, 31, 30, 29, 28].reduce((acc: ContentMap, id) => {
    return {
      type: id > 7 ? "image" : "video",
      normal: `https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/EV3_+Genesis-${id}.png`,
      hires: `https://ev3reth.s3.us-west-2.amazonaws.com/EV3-Genesis-upres/EV3_+Genesis-${id}-4k.png`,
    }
  }, {})
}

export default CONTENT
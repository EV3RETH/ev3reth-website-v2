import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { NextPage } from 'next';
import BannerWrapper from "../components/banner-wrapper";
import BigDisplay from "../components/big-display";
import Navigation, { DiscordLink, Ev3rethTwitterLink } from "../components/navigation";
import { SwiperDisplayItem } from "../components/swiper-display";
import { DISCORD_LINK, TUNE_OUT_ARTICLE_LINK, TUNE_OUT_SECONDARY_LINK } from "../utils/links";
import { Button } from "@mui/material";
import CONTENT, { getOwnerText } from "../utils/contentMapping";
import { useGlobalContext } from "../context/globalProvider";


interface DisplayListItem extends SwiperDisplayItem {
  label: string;
  marketUrl: string;
  tagText?: string;
}

export const tuneOutMappingId = "tune-out-by-ev3rethnear"

export const tuneOutDisplayItems: Array<DisplayListItem> = [
  {
    url: CONTENT[tuneOutMappingId][253374].normal,
    // thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/The-Endless-thumbnail.png",
    label: 'CH1 - The Endless',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253374",
    tokenId: 253374
  },
  {
    url: CONTENT[tuneOutMappingId][253392].normal,
    // thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-expanse-thumbnail.jpg",
    label: 'CH2 - The Expanse',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253392",
    tokenId: 253392
  },
  {
    url: CONTENT[tuneOutMappingId][253401].normal,
    // thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-serene-thumbnail.jpg",
    label: 'CH3 - The Serene',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253401",
    tokenId: 253401
  },
  {
    url: CONTENT[tuneOutMappingId][253415].normal,
    // thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-disturbed-thumbnail.png",
    label: 'CH4 - The Disturbed',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253415",
    tokenId: 253415
  },
  {
    url: CONTENT[tuneOutMappingId][253421].normal,
    // thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-traveler-thumbnail.jpg",
    label: 'CH5 - The Traveler',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253421",
    tokenId: 253421
  },
  {
    url: CONTENT[tuneOutMappingId][253461].normal,
    // thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-mystic-thumbnail.jpg",
    label: 'CH6 - The Mystic',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253461",
    tokenId: 253461
  }
]

const TuneOut: NextPage = () => {

  const { state } = useGlobalContext()
  const owners = state.owners
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          Tune Out
        </Typography>
        <Typography variant="h4" mb={4}>
          Part one has sold out. Join my discord for future listings.
        </Typography>
        <Typography variant="h6">
          An exploration into new artistic mediums. Combining original music with machine learning art to produce something completely unique.
        </Typography>
        <Typography variant="h6">
          Click <a href={TUNE_OUT_ARTICLE_LINK} target="_blank" rel="noreferrer">here</a> to read the full article on Tune Out.
        </Typography>

        <Box mt={3}>
          <Button color="secondary" variant="contained" sx={{ mr: 3, mt: 3 }} href={DISCORD_LINK} target="_blank" rel="noreferrer">
            Join Discord
          </Button>
          <Button color="secondary" variant="outlined" sx={{ mt: 3 }} href={TUNE_OUT_SECONDARY_LINK} target="_blank" rel="noreferrer">
            Visit Secondary Market
          </Button>
        </Box>

      </BannerWrapper>
      {tuneOutDisplayItems.map(({
        url, label, marketUrl, tagText = "Available by auction soon", thumbnail, tokenId
      }, index) => {
        const isOdd = !!(index % 2)
        const tag = getOwnerText(owners, tuneOutMappingId, tokenId) || tagText
        return <BigDisplay
          key={label}
          title={label}
          tag={tag}
          marketText="View on Secondary"
          marketLink={marketUrl}
          reverseDisplay={isOdd}
          blackBg={isOdd}
          videoSrc={url}
          videoHeightRatio={"56.25%"}
          videoThumbnail={thumbnail}
        />
      })}
    </Box>
  )
}

export default TuneOut
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { NextPage } from 'next';
import BannerWrapper from "../components/banner-wrapper";
import BigDisplay from "../components/big-display";
import Navigation, { DiscordLink, Ev3rethTwitterLink } from "../components/navigation";
import { SwiperDisplayItem } from "../components/swiper-display";
import { DISCORD_LINK, TUNE_OUT_ARTICLE_LINK, TUNE_OUT_SECONDARY_LINK } from "../utils/links";
import { Button } from "@mui/material";


interface DisplayListItem extends SwiperDisplayItem {
  label: string;
  marketUrl: string;
  tagText?: string;
}

export const tuneOutDisplayItems: Array<DisplayListItem> = [
  {
    url: 'https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH1+-+The+Endless.mp4',
    thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-endless-thumbnail.jpg",
    label: 'CH1 - The Endless',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253374/253374:1",
    tagText: "Owner - supah.near"
  },
  {
    url: 'https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH2+-+The+Expanse.mp4',
    thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-expanse-thumbnail.jpg",
    label: 'CH2 - The Expanse',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253392",
    tagText: "Owner - echobase.near"
  },
  {
    url: 'https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH3+-+The+Serene.mp4',
    thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-serene-thumbnail.jpg",
    label: 'CH3 - The Serene',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253401",
    tagText: "Owner - bennybrown.near"
  },
  {
    url: 'https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH4+-+The+Disturbed.mp4',
    thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-disturbed-thumbnail.jpg",
    label: 'CH4 - The Disturbed',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253415/253415:1",
    tagText: "Owner - steveospirals.near"
  },
  {
    url: 'https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH5+-+The+Traveler.mp4',
    thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-traveler-thumbnail.jpg",
    label: 'CH5 - The Traveler',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253421",
    tagText: "Owner - yupig.near"
  },
  {
    url: 'https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH6+-+The+Mystic.mp4',
    thumbnail: "https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/the-mystic-thumbnail.jpg",
    label: 'CH6 - The Mystic',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253461",
    tagText: "Owner - jared.near"
  }
]

const TuneOut: NextPage = () => {
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          Tune Out
        </Typography>
        <Typography variant="h4" mb={4}>
          Part one has sold out. Join my discord for details on future listings.
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
        url, label, marketUrl, tagText = "Available by auction soon", thumbnail
      }, index) => {
        const isOdd = !!(index % 2)
        return <BigDisplay
          key={label}
          title={label}
          tag={tagText}
          marketText="View on Secondary"
          marketLink={marketUrl}
          reverseDisplay={isOdd}
          blackBg={isOdd}
          videoSrc={url}
          placeholderHeight={394}
          videoThumbnail={thumbnail}
        />
      })}
    </Box>
  )
}

export default TuneOut
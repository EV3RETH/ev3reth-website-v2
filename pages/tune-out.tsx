import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { NextPage } from 'next';
import { MainBG } from ".";
import BannerWrapper from "../components/banner-wrapper";
import BigDisplay from "../components/big-display";
import Navigation from "../components/navigation";
import { SwiperDisplayItem } from "../components/swiper-display";


interface DisplayListItem extends SwiperDisplayItem {
  label: string;
  marketUrl: string;
  tagText?: string;
}

export const tuneOutDisplayItems: Array<DisplayListItem> = [
  {
    url: '/CH1 - The Endless.mp4',
    label: 'CH1 - The Endless',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253374/253374:1",
    tagText: "Sold"
  },
  {
    url: '/CH2 - The Expanse.mp4',
    label: 'CH2 - The Expanse',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253392"
  },
  {
    url: '/CH3 - The Serene.mp4',
    label: 'CH3 - The Serene',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253401"
  },
  {
    url: '/CH4 - The Disturbed.mp4',
    label: 'CH4 - The Disturbed',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253415/253415:1",
    tagText: "Sold"
  },
  {
    url: '/CH5 - The Traveler.mp4',
    label: 'CH5 - The Traveler',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253421"
  },
  {
    url: '/CH6 - The Mystic.mp4',
    label: 'CH6 - The Mystic',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253461"
  }
]

const TuneOut: NextPage = () => {
  return (
    <Box component="main">
      <MainBG />
      <BannerWrapper>
        <Typography variant="h1" mb={2} >
          Tune Out
        </Typography>
        <Typography variant="h5" mb={6} >
          An exploration into new mediums of art. Combining original music with machine learning art to produce something completely unique.
        </Typography>
        <Button color="secondary" variant="contained">
          <a href="https://paras.id/publication/tune-out-621670f9b1808d092e26027f" target="_blank" rel="noreferrer">
            Learn more
          </a>
        </Button>
      </BannerWrapper>
      {tuneOutDisplayItems.map(({url, label, marketUrl, tagText = "Available"}, index) => {
        const isOdd = !!(index % 2)
        return <BigDisplay
          key={label}
          title={label}
          tag={tagText}
          marketText="View on Paras"
          marketLink={marketUrl}
          reverseDisplay={isOdd}
          blackBg={isOdd}
          videoSrc={url}
        />
      })}
    </Box>
  )
}

export default TuneOut
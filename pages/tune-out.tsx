import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { NextPage } from 'next';
import BannerWrapper from "../components/banner-wrapper";
import BigDisplay from "../components/big-display";
import Navigation, { DiscordLink, Ev3rethTwitterLink } from "../components/navigation";
import { SwiperDisplayItem } from "../components/swiper-display";


interface DisplayListItem extends SwiperDisplayItem {
  label: string;
  marketUrl: string;
  tagText?: string;
}

export const tuneOutDisplayItems: Array<DisplayListItem> = [
  {
    url: 'https://vimeo.com/684482975',
    label: 'CH1 - The Endless',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253374/253374:1",
    tagText: "Owner - supah.near"
  },
  {
    url: 'https://vimeo.com/684482985',
    label: 'CH2 - The Expanse',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253392",
    tagText: "Owner - echobase.near"
  },
  {
    url: 'https://vimeo.com/684482993',
    label: 'CH3 - The Serene',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253401",
    tagText: "Owner - bennybrown.near"
  },
  {
    url: 'https://vimeo.com/684483006',
    label: 'CH4 - The Disturbed',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253415/253415:1",
    tagText: "Owner - steveospirals.near"
  },
  {
    url: 'https://vimeo.com/684483019',
    label: 'CH5 - The Traveler',
    isVideo: true,
    marketUrl: "https://paras.id/token/x.paras.near::253421",
    tagText: "Owner - yupig.near"
  },
  {
    url: 'https://vimeo.com/684483034',
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
        <Typography variant="h1" mb={2} >
          Tune Out
        </Typography>
        <Typography variant="h5"  >
          An exploration into new artistic mediums. Combining original music with machine learning art to produce something completely unique.
        </Typography>
        <Typography variant="subtitle1" my={2}>
          <a href="https://paras.id/publication/tune-out-621670f9b1808d092e26027f" target="_blank" rel="noreferrer">
            Click here to read the full article on Tune Out.
          </a>
        </Typography>
        <Typography variant="subtitle1">
          Part one is sold out! Join my discord for details on future listings
          <Box display="inline" position="relative" top={4} left={8} sx={{ filter: "invert(1)" }}>
            <DiscordLink />
          </Box>
        </Typography >
      </BannerWrapper>
      {tuneOutDisplayItems.map(({
        url, label, marketUrl, tagText = "Available by auction soon"}, index) => {
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
          placeholderHeight={394}
        />
      })}
    </Box>
  )
}

export default TuneOut
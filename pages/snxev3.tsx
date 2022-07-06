import type { NextPage } from 'next';
import Box from "@mui/material/Box";
import BannerWrapper from "../components/banner-wrapper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import SvgCurve from '../components/svgCurve';
import { maxDisplayWidth } from '../styles/theme';
import { SNXEV3_SECONDARY_LINK } from '../utils/links';

const snxItems: Array<SwiperDisplayItem> = Array.from(Array(30).keys()).map(i => ({
  url: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-${i}.png`,
  hiResUrl: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-upres-images/SNxEV3-${i}-4k.png`,
  label: `SNxEV3-${i}`
}))

const TuneOut: NextPage = () => {
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          SNxEV3
        </Typography>
        <Typography variant="h4" mb={4}>
          Sold out. May be available on secondary markets.
        </Typography>
        <Typography variant="h6">
          Thirty unique pieces generated from a machine learning algorithm trained by EV3RETH.
        </Typography>
        <Typography variant="h6">
          The SNxEV3 GAN model is two models blended together, one trained on Marko&apos;s Starry Night collection and the other trained on textures.
        </Typography>
        <Button color="secondary" variant="contained" sx={{ mt: 6 }} target="_blank" rel="noreferrer" href={SNXEV3_SECONDARY_LINK}>
          Visit Secondary Market
        </Button>
      </BannerWrapper>
      <SvgCurve />
      <SwiperDisplay items={snxItems} />
    </Box>
  )
}

export default TuneOut;


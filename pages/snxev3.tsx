import type { NextPage } from 'next';
import Box from "@mui/material/Box";
import BannerWrapper from "../components/banner-wrapper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import SvgCurve from '../components/svgCurve';
import { maxDisplayWidth } from '../styles/theme';

const snxItems: Array<SwiperDisplayItem> = Array.from(Array(30).keys()).map(i => ({
  url: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-${i}.png`,
  hiResUrl: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-upres-images/SNxEV3-${i}-4k.png`,
  label: `SNxEV3-${i}`
}))

const TuneOut: NextPage = () => {
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={2} >
          SNxEV3
        </Typography>
        <Typography variant="h5">
          30 unique pieces generated from a machine learning algorithm trained by EV3RETH.
        </Typography>
        <Typography variant="h5">
          The SNxEV3 GAN (Generative Adversarial Network) model is two models blended together.
        </Typography>
        <Typography variant="h5">
          One trained on Marko&apos;s Starry Night collection and the other trained on a compiled texture dataset.
        </Typography>
        <Button color="secondary" variant="contained" sx={{ mt: 3 }} >
          <a target="_blank" rel="noreferrer" href="https://paras.id/collection/mint.snxev3.near">
            Visit Secondary Market
          </a>
        </Button>
      </BannerWrapper>
      <SvgCurve />
      <SwiperDisplay items={snxItems} />
    </Box>
  )
}

export default TuneOut;


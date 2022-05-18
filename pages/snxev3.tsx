import type { NextPage } from 'next';
import Box from "@mui/material/Box";
import { MainBG } from ".";
import BannerWrapper from "../components/banner-wrapper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';

const snxItems: Array<SwiperDisplayItem> = Array.from(Array(30).keys()).map(i => ({
  url: `https://verbos.mypinata.cloud/ipfs/QmZFLdP4eurUSuYcfZ2F3VoPXomRVV1oGWSznCBxAbYftT/${i}.png`,
  label: `SNxEV3-${i}`
}))

const TuneOut: NextPage = () => {
  return (
    <Box component="main">
      <MainBG />
      <BannerWrapper>
        <Typography variant="h1" mb={2} >
          SNxEV3
        </Typography>
        <Typography variant="h5" >
          30 unique pieces generated from a machine learning algorithm trained by EV3RETH.
        </Typography>
        <Typography variant="h5" >
          The SNxEV3 GAN (Generative Adversarial Network) model is two models blended together.
        </Typography>
        <Typography variant="h5" >
          One trained on Marko&apos;s Starry Night collection and the other trained on a compiled texture dataset.
        </Typography>
        <Button color="secondary" variant="contained" sx={{ mt: 3 }} >
          <a target="_blank" rel="noreferrer" href="https://paras.id/collection/mint.snxev3.near">
            View Collection on Paras
          </a>
        </Button>
      </BannerWrapper>
      <SwiperDisplay items={snxItems} />
    </Box>
  )
}

export default TuneOut;
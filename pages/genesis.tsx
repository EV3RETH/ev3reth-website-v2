import { Box, Button, Typography } from '@mui/material';
import type { NextPage } from 'next';
import BannerWrapper from '../components/banner-wrapper';
import SvgCurve from '../components/svgCurve';
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import { DISCORD_LINK, EVE_GENESIS_SECONDARY_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK } from '../utils/links';

const genesisItems: Array<SwiperDisplayItem> = [33, 32, 31, 30].map(i => ({
  url: `https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/EV3_+Genesis-${i}.png`,
  // hiResUrl: `https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-upres-images/SNxEV3-${i}-4k.png`,
  label: `EV3: Genesis-${i}`
}))

const TuneOut: NextPage = () => { 
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          EV3: Genesis
        </Typography>
        <Typography variant="h4" mb={4}>
          Ongoing weekly auctions. Join the discord for details.
        </Typography>
        <Typography variant="h6">
          Thirty-three curated pieces of generative art from machine learning models trained and blended together by EV3RETH. 
        </Typography>
        <Typography variant="h6">
          Click <a href={MEDIUM_MODEL_IS_ART_PART2_LINK} target="_blank" rel="noreferrer">here</a> to read a detailed article on how EV3RETH made the model and this collection.
        </Typography>

        <Box mt={4} gap={2}>
          <Button color="secondary" variant="contained" sx={{ mr: 2, mt: 2}} href={DISCORD_LINK} target="_blank" rel="noreferrer">
            Join Discord
          </Button>
          <Button color="secondary" variant="outlined" sx={{mt:2}} href={EVE_GENESIS_SECONDARY_LINK} target="_blank" rel="noreferrer">
            Visit Secondary Market
          </Button>
        </Box>
      </BannerWrapper>
      <SvgCurve />
      <SwiperDisplay items={genesisItems} />
    </Box>
  )
}

export default TuneOut;
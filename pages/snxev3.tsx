import type { NextPage } from 'next';
import Box from "@mui/material/Box";
import BannerWrapper from "../components/banner-wrapper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import SvgCurve from '../components/svgCurve';
import { SNXEV3_SECONDARY_LINK } from '../utils/links';
import CONTENT, { snxev3Ids } from '../utils/contentMapping';
import { useEffect, useMemo } from 'react';
import { alpha, useTheme } from '@mui/material';

const snxMappingId = "mint.snxev3.near"

export const snxItems: Array<SwiperDisplayItem> = snxev3Ids.map(id => ({
  url: CONTENT[snxMappingId][id].normal,
  hiResUrl: CONTENT[snxMappingId][id].hiRes,
  label: `SNxEV3-${id}`,
  tokenId: id
}))

const TuneOut: NextPage = () => {
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          SNxEV3
        </Typography>
        <Typography variant="h4" mb={4}>
          Available on secondary market.
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
      <SwiperDisplay items={snxItems} contractMappingId={snxMappingId} />
    </Box>
  )
}

export default TuneOut;


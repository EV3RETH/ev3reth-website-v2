import { Box, Button, Typography } from '@mui/material';
import type { NextPage } from 'next';
import BannerWrapper from '../components/banner-wrapper';
import SvgCurve from '../components/svgCurve';
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import CONTENT, { genesisIds } from '../utils/contentMapping';
import { DISCORD_LINK, EVE_GENESIS_SECONDARY_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK } from '../utils/links';

const genesisMappingId = "ev3.neartopia.near"
export const genesisItems: Array<SwiperDisplayItem> = genesisIds.map(id => ({
  url: CONTENT[genesisMappingId][id].normal,
  hiResUrl: CONTENT[genesisMappingId][id].hiRes,
  label: `EV3: Genesis-${id}`,
  tokenId: id
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
          Click <a href={MEDIUM_MODEL_IS_ART_PART2_LINK} target="_blank" rel="noreferrer">here</a> to read an article on how EV3RETH made the model and this collection.
        </Typography>

        <Box mt={3}>
          <Button color="secondary" variant="contained" sx={{ mr: 3, mt: 3}} href={DISCORD_LINK} target="_blank" rel="noreferrer">
            Join Discord
          </Button>
          <Button color="secondary" variant="outlined" sx={{mt:3}} href={EVE_GENESIS_SECONDARY_LINK} target="_blank" rel="noreferrer">
            Visit Secondary Market
          </Button>
        </Box>
      </BannerWrapper>
      <SvgCurve />
      <SwiperDisplay items={genesisItems} contractMappingId={genesisMappingId} />
    </Box>
  )
}

export default TuneOut;
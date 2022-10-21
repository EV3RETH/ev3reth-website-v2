import { Box, Button, Typography } from '@mui/material';
import type { NextPage } from 'next';
import BannerWrapper from '../components/banner-wrapper';
import SvgCurve from '../components/svgCurve';
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import CONTENT, { t3rraIds } from '../utils/contentMapping';
import { DISCORD_LINK, EVE_GENESIS_SECONDARY_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK, T3RRA_ABOUT_LINK } from '../utils/links';

const genesisMappingId = "ev3.neartopia.near"
export const genesisItems: Array<SwiperDisplayItem> = t3rraIds.map(id => ({
  url: CONTENT[genesisMappingId][id].normal,
  label: `T3RRA-${id}`,
  tokenId: id
}))

const TuneOut: NextPage = () => { 
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          T3RRA
        </Typography>
        <Typography variant="h4" mb={4}>
          Auctions Coming Soon
        </Typography>
        <Typography variant="h6">
          &quot;One day mother T3RRA had a series of dreams. In these dreams she gave form to the chaos around her.&quot;
        </Typography>
        <Typography variant="h6">
          Join my discord for auction details. Click <a href={T3RRA_ABOUT_LINK} target="_blank" rel="noreferrer">here</a> to learn more about how the series was made.
        </Typography>

        <Box mt={3}>
          <Button color="secondary" variant="contained" sx={{ mr: 3, mt: 3}} href={DISCORD_LINK} target="_blank" rel="noreferrer">
            Join Discord
          </Button>
          <Button color="secondary" variant="outlined" sx={{mt:3}} href={EVE_GENESIS_SECONDARY_LINK} target="_blank" rel="noreferrer">
            Visit Exchange Art Page
          </Button>
        </Box>
      </BannerWrapper>
      <SvgCurve />
      <SwiperDisplay items={genesisItems} contractMappingId={genesisMappingId} />
    </Box>
  )
}

export default TuneOut;
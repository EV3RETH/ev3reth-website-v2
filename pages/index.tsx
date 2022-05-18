import type { NextPage } from 'next'
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography"
import { useTheme, alpha } from '@mui/material/styles';
import ev3rethImage from "../public/EV3RETH-black.png"
import SNxEV3 from "../public/SNxEV3_promo-768.gif"
import BigDisplay from '../components/big-display';
import BannerWrapper from '../components/banner-wrapper'
import SwiperDisplay from '../components/swiper-display';
import bg from "../public/seed0092-bg.png"
import { tuneOutDisplayItems } from './tune-out';

export const MainBG = () => {
  const { palette } = useTheme()
  const sx = {
    '& :after': {
      content: "''",
      width: "100%",
      height: "100%",
      backgroundColor: alpha(palette.background.default, 0.85),
      position: "fixed",
      left: 0,
      top: 0
    }
  }
  return (
    <Box position="fixed" width="100%" height="100%" top="0" left="0" zIndex={-1} sx={sx}>
      <Image src={bg} layout="fill" alt="" />
    </Box>
  )
}

const Home: NextPage = () => {
  return (
    <Box component="main">
      <MainBG />
      <BannerWrapper>
        <Box maxWidth={1024} mx="auto" mb={10}>
          <Image src={ev3rethImage} layout="responsive" alt="EV3RETH" />
        </Box>
        <Typography variant="h4">
          Machine Learning Artist and Composer
        </Typography>
      </BannerWrapper>

      <BigDisplay
        title="EV3: Genesis"
        tag="Live Auctions Soon"
        videoSrc="https://vimeo.com/711008604"
        marketLink="https://discord.gg/CwvgaWdfwM"
        marketText="Join the discord"
      />

      <BigDisplay
        title="SNxEV3"
        tag="Sold Out"
        imgSrc={SNxEV3}
        marketText="View Collection on Paras"
        marketLink="https://paras.id/collection/mint.snxev3.near"
        reverseDisplay
        blackBg
      />

      <BigDisplay
        title="Tune Out"
        tag="Part One - Sold Out"
        marketText="View Collection on Paras"
        marketLink="https://paras.id/collection/tune-out-by-ev3rethnear"
        videoSrc="https://vimeo.com/684484577"
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
    
    </Box>
  )
}

export default Home

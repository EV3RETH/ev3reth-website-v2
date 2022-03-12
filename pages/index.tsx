import type { NextPage } from 'next'
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography"
import { useTheme, alpha } from '@mui/material/styles';
import ev3rethImage from "../public/EV3RETH-black.png"
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
        title="Tune Out"
        tag="Part One - Out Now"
        marketText="View Collection on Paras"
        marketLink="https://paras.id/collection/tune-out-by-ev3rethnear"
        videoSrc="https://vimeo.com/684484577"
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
      <BigDisplay
        title="S U M M E R S U N / /"
        tag="Owner - earthshine.near"
        marketText="View on Paras"
        marketLink="https://paras.id/token/x.paras.near::188803"
        videoSrc="https://vimeo.com/684484141"
        reverseDisplay
        blackBg
      />
    </Box>
  )
}

export default Home

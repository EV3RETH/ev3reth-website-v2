import { useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image';
import { Typography, Box } from "@mui/material"
import { SxProps, Theme, useTheme } from "@mui/material/styles"
import BigDisplay from '../components/big-display';
import BannerWrapper from '../components/banner-wrapper'
import SwiperDisplay from '../components/swiper-display';
import { tuneOutDisplayItems } from './tune-out';
import titleBackup from '../public/EV3RETH-black.png'
import { MAIN_TITLE_LINK } from '../utils/links';

const Home: NextPage = () => {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const {typography} = useTheme()
  const logoSx: SxProps<Theme>  = {
    transition: "filter 2s",
    filter: logoLoaded ? "blur(0px) brightness(1)" : "blur(8px) brightness(0.4)",
    ...typography.h1, //for alt text fallback
  }
  
  return (
    <Box component="main">
      <BannerWrapper>
        <Box maxWidth={1024} mx="auto" mb={10} sx={logoSx}>
          <Image
            height={324}
            width={1937}
            src={MAIN_TITLE_LINK}
            alt={"EV3RETH"}
            priority
            onLoadingComplete={() => setLogoLoaded(true)}
          />
        </Box>
        <Typography variant="h4" position="relative" zIndex={1} textAlign="center">
          Machine Learning Artist and Composer
        </Typography>
      </BannerWrapper>

      <BigDisplay
        title="EV3: Genesis"
        tag="Weekly Auctions"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/Genesis-promo.mp4"
        marketText="Learn More"
        marketLink="/genesis"
      />

      <BigDisplay
        title="SNxEV3"
        tag="Sold Out"
        imgSrc="https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-0.png"
        marketText="Learn More"
        marketLink="/snxev3"
        reverseDisplay
        blackBg
      />

      <BigDisplay
        title="Tune Out"
        tag="Part One - Sold Out"
        marketText="Learn More"
        marketLink="/tune-out"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/Tune+out+promo+v3.mp4"
        placeholderHeight={394}
        videoThumbnail="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/tune-out-thumbnail.jpg"
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
    
    </Box>
  )
}

export default Home

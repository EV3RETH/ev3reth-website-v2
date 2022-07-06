import type { NextPage } from 'next'
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography"
import BigDisplay from '../components/big-display';
import BannerWrapper from '../components/banner-wrapper'
import SwiperDisplay from '../components/swiper-display';
import { tuneOutDisplayItems } from './tune-out';
import { useState } from 'react';
import { SxProps, Theme, useTheme } from "@mui/material/styles"

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
            src="https://ev3reth.s3.us-west-2.amazonaws.com/misc/EV3RETH-black.png"
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
        tag="Regular Live Auctions"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/Genesis-promo.mp4"
        marketLink="https://discord.gg/CwvgaWdfwM"
        marketText="Join the discord"
      />

      <BigDisplay
        title="SNxEV3"
        tag="Sold Out"
        imgSrc="https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-0.png"
        marketText="Visit Secondary Market"
        marketLink="https://paras.id/collection/mint.snxev3.near"
        reverseDisplay
        blackBg
      />

      <BigDisplay
        title="Tune Out"
        tag="Part One - Sold Out"
        marketText="Visit Secondary Market"
        marketLink="https://paras.id/collection/tune-out-by-ev3rethnear"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/Tune+out+promo+v3.mp4"
        placeholderHeight={394}
        videoThumbnail="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/tune-out-thumbnail.jpg"
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
    
    </Box>
  )
}

export default Home

import { useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image';
import { Typography, Box, List, Hidden, Button } from "@mui/material"
import { SxProps, Theme, useTheme } from "@mui/material/styles"
import BigDisplay from '../components/big-display';
import BannerWrapper from '../components/banner-wrapper'
import SwiperDisplay from '../components/swiper-display';
import { tuneOutDisplayItems } from './tune-out';
import titleBackup from '../public/EV3RETH-black.png'
import { DISCORD_LINK, MAIN_TITLE_LINK, MEDIUM_MODEL_IS_ART_PART1_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK } from '../utils/links';
import SvgCurve from '../components/svgCurve';
import { getGradientTextStyle, maxDisplayWidth } from '../styles/theme';
import QuickLinks from '../components/quick-links';
import Modal from '../components/modal';

const Home: NextPage = () => {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const { typography, palette } = useTheme()
  const logoSx: SxProps<Theme>  = {
    transition: "filter 2s",
    filter: logoLoaded ? "blur(0px) brightness(1)" : "blur(8px) brightness(0.4)",
    ...typography.h1, //for alt text fallback
  }
  
  return (
    <Box component="main">
      <BannerWrapper>
        <Box maxWidth={1024} mx="auto" mt={6} mb={4} sx={logoSx}>
          <Image
            height={324}
            width={1937}
            src={MAIN_TITLE_LINK}
            alt={"EV3RETH"}
            priority
            onLoadingComplete={() => setLogoLoaded(true)}
          />
        </Box>
        <Typography variant="h3" position="relative" zIndex={1} textAlign="center"
          sx={getGradientTextStyle(`linear-gradient(90deg, ${palette.secondary.main} 10%, #FFF 90%)`)}>
          Machine Learning Artist and Composer
        </Typography>
        <Box mt={8} gap={3} display="flex" justifyContent="center" flexWrap="wrap">
          <Button color="secondary" variant="contained" href={DISCORD_LINK} target="_blank" rel="noreferrer">
            Join Discord
          </Button>
          <Button color="secondary" variant="outlined" onClick={()=>setQuickLinksOpen(true)}>
            Quick Links
          </Button>
          
          <QuickLinks open={quickLinksOpen} onClose={() => setQuickLinksOpen(false)} />
          
        </Box>
      </BannerWrapper>

      <BigDisplay
        title="EV3: Genesis"
        tag="Weekly Auctions"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/Genesis-promo.mp4"
        videoThumbnail='https://ev3reth.s3.us-west-2.amazonaws.com/Genesis-final/genesis-promo-thumbnail.jpg'
        marketText="Learn More"
        marketLink="/genesis"
      />

      <Box>
        <SvgCurve color={palette.background.default} flipped/>
        <BannerWrapper isBody>
          <Box pt={{ xs: 4, sm:10, xl: 12 }} px={{ xl: 10}} maxWidth={maxDisplayWidth} mx="auto">
            <Typography variant="h3" mb={3}
              sx={getGradientTextStyle(`linear-gradient(90deg, #FFF 20%, ${palette.secondary.light} 80%)`)}
            >
                I am driven by a deep passion for exploration
            </Typography>
            <Typography variant="h5">
              ❖ Training and manipulating my own machine learning models
              <br />
              ❖ Experimenting with sonic textures and musical composition
              <br />
              ❖ Investigating creative uses of blockchain technology
            </Typography>

            <Typography mt={6} mb={1}>
              You can learn about my journey into machine learning by reading my article &quot;The Model is the Art&quot;
              (<a href={MEDIUM_MODEL_IS_ART_PART1_LINK} target="_blank" rel="noreferrer">part one</a> | <a href={MEDIUM_MODEL_IS_ART_PART2_LINK} target="_blank" rel="noreferrer">part two</a>)
            </Typography>
          </Box>
        </BannerWrapper>
      </Box>

      <BigDisplay
        title="SNxEV3"
        tag="Sold Out"
        imgSrc="https://ev3reth.s3.us-west-2.amazonaws.com/SNxEV3-images/SNxEV3-0.png"
        marketText="Learn More"
        marketLink="/snxev3"
      />

      <BigDisplay
        title="Tune Out"
        tag="Part One - Sold Out"
        marketText="Learn More"
        marketLink="/tune-out"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/Tune+out+promo+v3.mp4"
        placeholderHeight={394}
        videoThumbnail="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/tune-out-thumbnail.jpg"
        reverseDisplay
        blackBg
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
    
    </Box>
  )
}

export default Home

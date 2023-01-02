import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image';
import { Typography, Box, List, Hidden, Button, CardMedia, useMediaQuery, IconButton } from "@mui/material"
import { SxProps, Theme, useTheme } from "@mui/material/styles"
import BigDisplay from '../components/big-display';
import BannerWrapper from '../components/banner-wrapper'
import SwiperDisplay from '../components/swiper-display';
import { tuneOutDisplayItems, tuneOutMappingId } from './tune-out';
import titleBackup from '../public/EV3RETH-black.png'
import { MAIN_TITLE_LINK, MEDIUM_MODEL_IS_ART_PART1_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK } from '../utils/links';
import SvgCurve from '../components/svgCurve';
import { blackBgSx, getGradientTextStyle, maxDisplayWidth } from '../styles/theme';
import QuickLinks from '../components/quick-links';
import Link from 'next/link';
import About from '../components/about';
import {start} from '../components/ev3-particles.js'
import Fullscreen from '@mui/icons-material/Fullscreen';

const Home: NextPage = () => {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const { typography, palette, breakpoints } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const isMobile = useMediaQuery(breakpoints.down("md"))

  const logoSx: SxProps<Theme> = {
    transition: "filter 2s, opacity 2s",
    filter: logoLoaded ? "blur(0px)" : "blur(8px)",
    opacity: logoLoaded ? 1 : 0,
  }
  useEffect(() => {
    if (canvasRef?.current) {
      setLogoLoaded(true)
      start(canvasRef.current)
    }
  },[canvasRef])
  return (
    <Box component="main" sx={{overflowX: "hidden"}}>
      <BannerWrapper >
        <Box
          pb={{ xs: "60%", sm: "52%", md: "36%" }}
          sx={{
            "&:hover": {
              "& + #playground-link": {
                opacity: 1,
              }
            }
          }}
        >
          <Box
            position="absolute"
            top={{ xs: "9%", sm: "5%", md: 0 }}
            left={0}
            width="100vw" height="50vw"
            display="flex" justifyContent="center"
            overflow="hidden"
            sx={{
              ...logoSx,
              cursor: "pointer",
              touchAction: "none",
              userSelect: "none",
            }}
          >
            <canvas ref={canvasRef}
            style={{transform: isMobile ? "scale(1.5)" : "scale(1.2)"}} 
            />
          </Box>
        </Box>
        {/* <Box maxWidth={1024} mx="auto" mt={6} mb={4} zIndex={20} sx={logoSx} position="relative">
          <Image
            height={324}
            width={1937}
            src={MAIN_TITLE_LINK}
            alt={"EV3RETH"}
            priority
            onLoadingComplete={() => setLogoLoaded(true)}
          /> 
        </Box> */}

        <Box
          id="playground-link"
          position="absolute" top={"5rem"} right={"1rem"} zIndex={3}
          sx={{
            transition: "opacity 1s",
            opacity: isMobile ? 1 : 0,
            "&:hover": {
              opacity:1
            }
          }}
        >
          <Link href="/ev3reth" passHref>
            <Button
              color="secondary" variant="contained"
              sx={{ p: 0, minWidth: 30 }}
            >
              <Fullscreen fontSize="large"/>
            </Button>
          </Link>
        </Box>
        <Typography variant="h3" position="relative" zIndex={1} textAlign="center"
        // sx={getGradientTextStyle(`linear-gradient(90deg, ${palette.secondary.main} 10%, #FFF 90%)`)}
        >
          Composer and Creative Coder
        </Typography>

        <Box mt={8} gap={3} display="flex" justifyContent="center" flexWrap="wrap">
          {/* <Link href="/holder-gallery" passHref>
            <Button color="secondary" variant="contained"
            >
              Your Gallery
            </Button> 
          </Link> */}
          <Button color="secondary" variant="contained" onClick={() => setQuickLinksOpen(true)}>
            Quick Links
          </Button>          
          <QuickLinks open={quickLinksOpen} onClose={() => setQuickLinksOpen(false)} />
        </Box>
      </BannerWrapper>

      <BigDisplay
        title="T3RRA"
        tag="Regular Auctions"
        imgSrc="https://ev3reth.s3.us-west-2.amazonaws.com/T3RRA/T3RRA-1.png"
        marketText="Learn More"
        marketLink="/t3rra"
      />

      <About />

      <BigDisplay
        title="Preludes"
        tag="A Flower Blooms in Autumn"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Preludes/A+Flower+Blooms+in+Autumn_improved-render.mp4"
        marketText="Visit Exchange Art Page"
        marketLink="https://exchange.art/single/3bzYvhvGMbenTHkS3KAej2RVV4HPQYh91hrPc91pS9F3"
        videoHeightRatio={"137.16%"}
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
        tag="Sold Out"
        marketText="Learn More"
        marketLink="/tune-out"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/Tune+out+promo+v3.mp4"
        videoHeightRatio={"56.25%"}
        videoThumbnail="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/tune-out-thumbnail.jpg"
      /> 
      <SwiperDisplay items={tuneOutDisplayItems} contractMappingId={tuneOutMappingId} />
     
    
    </Box>
  )
}

export default Home

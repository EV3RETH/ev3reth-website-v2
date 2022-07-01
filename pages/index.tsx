import type { NextPage } from 'next'
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography"
import ev3rethImage from "../public/EV3RETH-black.png"
import BigDisplay from '../components/big-display';
import BannerWrapper from '../components/banner-wrapper'
import SwiperDisplay from '../components/swiper-display';
import { tuneOutDisplayItems } from './tune-out';

const Home: NextPage = () => {
  return (
    <Box component="main">
      <BannerWrapper>
        <Box maxWidth={1024} mx="auto" mb={10}>
          <Image src={ev3rethImage} alt="EV3RETH" priority/>
        </Box>
        <Typography variant="h4" position="relative" zIndex={1}>
          Machine Learning Artist and Composer
        </Typography>
      </BannerWrapper>

      <BigDisplay
        title="EV3: Genesis"
        tag="Regular Live Auctions"
        videoSrc="https://vimeo.com/711008604"
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
        videoSrc="https://vimeo.com/684484577"
        placeholderHeight={394}
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
    
    </Box>
  )
}

export default Home

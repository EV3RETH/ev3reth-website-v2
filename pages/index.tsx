import type { NextPage } from 'next'
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import Navigation from '../components/navigation';
import BigDisplay from '../components/big-display';
import Banner from '../components/banner'
import SwiperDisplay, { SwiperDisplayItem } from '../components/swiper-display';
import bg from "../public/seed0092-bg.png"
import Image from 'next/image';

const tuneOutDisplayItems: Array<SwiperDisplayItem> = [
  {
    url: '/CH1 - The Endless.mp4',
    label: 'CH1 - The Endless',
    isVideo: true
  },
  {
    url: '/CH2 - The Expanse.mp4',
    label: 'CH2 - The Expanse',
    isVideo: true
  },
  {
    url: '/CH3 - The Serene.mp4',
    label: 'CH3 - The Serene',
    isVideo: true
  },
  {
    url: '/CH4 - The Disturbed.mp4',
    label: 'CH4 - The Disturbed',
    isVideo: true
  },
  {
    url: '/CH5 - The Traveler.mp4',
    label: 'CH5 - The Traveler',
    isVideo: true
  },
  {
    url: '/CH6 - The Mystic.mp4',
    label: 'CH6 - The Mystic',
    isVideo: true

  }
]

const Home: NextPage = () => {
  return (
    <Box component="main">
      <Box position="fixed" width="100%" height="100%" top="0" left="0" zIndex={-1}>
        <Image src={bg} layout="fill" alt="" />
      </Box>
      <Navigation />
      <Banner />
      <BigDisplay
        title="Tune Out"
        tag="Part One Available Now"
        marketText="View Collection on Paras"
        marketLink="https://paras.id/collection/tune-out-by-ev3rethnear"
        videoSrc="/Tune out promo v3.mp4"
        autoPlayVideo
      />
      <SwiperDisplay items={tuneOutDisplayItems} />
      <BigDisplay
        title="S U M M E R S U N / /"
        tag="Sold"
        marketText="View on Paras"
        marketLink="https://paras.id/token/x.paras.near::188803"
        videoSrc="/SUMMERSUN-long-trimmed.mp4"
        reverseDisplay
        blackBg
      />
    </Box>
  )
}

export default Home

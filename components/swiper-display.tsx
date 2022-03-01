import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import VideoPlayer from './video-player';
import { Typography } from '@mui/material';

export interface SwiperDisplayItem {
  url: string;
  label?: string;
  isVideo?: boolean;
}
interface SwiperDisplayProps {
  items: Array<SwiperDisplayItem>
}

const SwiperDisplay: React.FC<SwiperDisplayProps> = ({ items }) => {
  const { breakpoints, spacing, palette } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("md"))

  const sliderSx = {
    backgroundColor: 'rgba(0,0,0,0.1)',
    '& .swiper-coverflow': {
      padding: spacing(5)
    },
    '& .swiper-pagination': {
      bottom: `${spacing(1)} !important`
    },
    '& .swiper-button-prev, & .swiper-button-next': {
      px: {
        xs: spacing(2),
        sm: spacing(2.5),
      },
      py: {
        xs: spacing(1),
        sm: spacing(3.5),
      },
      borderRadius: 2,
      backgroundColor: "rgba(100, 100, 100, 0.4)",
      '&:after': {
        fontSize: {
          xs: spacing(4),
          sm: spacing(5)
        }
      }
      
    }
  }

  const displayElement = (isActive: boolean, item: SwiperDisplayItem) => {
    const { url, label, isVideo } = item;

    const element = isVideo
      ? <VideoPlayer url={url} isSmall isActive={isActive} />
      : "image goes here";
    
    return (
      <Box>
        {element}
        {label && (
          <Typography
            position="absolute"
            bottom={spacing(2)}
            left="25%"
            width="50%"
            borderRadius={1}
            variant='subtitle1'
            align="center"
            bgcolor="rgba(100, 100, 100, 0.5)"
            color={palette.background.default}
            sx={{
              opacity: isActive ? 1 : 0.5
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
    )
  }

  return (
    <Box sx={sliderSx}>
      <Swiper
        style={{
          // @ts-ignore
          "--swiper-theme-color": `${palette.secondary.main}`
        }}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={isMobile ? 1 : 3}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        grabCursor={true}
        pagination={isMobile}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={`${item}-${index}}`}>
              {({ isActive }) => displayElement(isActive, item)}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
)
}

export default SwiperDisplay
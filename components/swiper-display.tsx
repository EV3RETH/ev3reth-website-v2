import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import VideoPlayer from './video-player';
import { LinearProgress, Typography, Box, Skeleton } from '@mui/material';
import { maxDisplayWidth } from '../styles/theme';
import Image from 'next/image';
import base64Shimmer from '../utils/svgShimmer';
export interface SwiperDisplayItem {
  url: string;
  label?: string;
  isVideo?: boolean;
}
interface SwiperDisplayProps {
  items: Array<SwiperDisplayItem>;
  blackBg?: boolean;
  placeholderHeight?: number;
}

const SwiperDisplay: React.FC<SwiperDisplayProps> = ({ items, blackBg = false, placeholderHeight = 225 }) => {
  const { breakpoints, spacing, palette } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("sm"))
  const isTablet = useMediaQuery(breakpoints.down("md"))
  const isDesktop = useMediaQuery(breakpoints.down("lg"))

  const slidesPerView = () => {
    if (isTablet) return 1;
    if (isDesktop) return 2;
    return 3
  }

  const bgSx = blackBg
    ? { backgroundColor: palette.primary.main }
    : { backgroundColor: alpha(palette.primary.main, 0.2) }
  const phMultiplier = isMobile ? 0.75 : 1
  
  const sliderSx = {
    px: { xs: 0, md: 3 },
    '--swiper-theme-color': `${palette.secondary.main}`,
    '& .swiper-coverflow': {
      padding: spacing(5)
    },
    '& .swiper-pagination': {
      bottom: `${spacing(1)} !important`
    },
    '& .swiper-button-prev, & .swiper-button-next': {
      px: {
        xs: spacing(0),
        sm: spacing(2.5),
      },
      py: {
        xs: spacing(0),
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

  const imageSx = {
    '& span': {
      boxShadow: "2px 3px 4px rgba(0, 0, 0, 0.5)"
    }
  }

  const displayElement = (isActive: boolean, item: SwiperDisplayItem) => {
    const { url, label, isVideo } = item;

    const element = isVideo
      ? <VideoPlayer url={url} isSmall isActive={isActive} placeholderHeight={placeholderHeight * phMultiplier} />
      : <Box width="100%" display="flex" justifyContent="center" sx={imageSx} >
        <Image src={url} alt={label} height="500" width="500" placeholder="blur" blurDataURL={base64Shimmer(500, 500)} />
        </Box>
    
    return (
      <Box>
        {element}
        {label && (
          <Box position="absolute" bottom={spacing(1)} width="100%" display="flex" justifyContent="center">
            <Typography
              width={190}
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
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box sx={bgSx} >
      <Box sx={sliderSx} maxWidth={maxDisplayWidth} margin="auto">
        <Swiper
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={slidesPerView()}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          grabCursor={true}
          pagination={isTablet}
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
    </Box>
  )
}

export default SwiperDisplay
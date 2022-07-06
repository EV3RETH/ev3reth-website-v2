import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Box, Fab, Theme, SxProps, DialogActions, Button, CircularProgress } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Image from 'next/image';
import VideoPlayer from './video-player';
import Modal from './modal';
import base64Shimmer from '../utils/svgShimmer';
import { maxDisplayWidth } from '../styles/theme';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
export interface SwiperDisplayItem {
  url: string;
  hiResUrl?: string;
  label?: string;
  isVideo?: boolean;
}
interface SwiperDisplayProps {
  items: Array<SwiperDisplayItem>;
  blackBg?: boolean;
  placeholderHeight?: number;
}

const SwiperDisplay: React.FC<SwiperDisplayProps> = ({ items, blackBg = false, placeholderHeight = 225 }) => {
  const [modalImage, setModalImage] = useState<string>()
  const [downloading, setDownloading] = useState(false)
  const { breakpoints, spacing, palette } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("sm"))
  const isTablet = useMediaQuery(breakpoints.down("md"))
  const isDesktop = useMediaQuery(breakpoints.down("lg"))

  const modalOpen = Boolean(modalImage)

  const slidesPerView = () => {
    if (isTablet) return 1;
    if (isDesktop) return 2;
    return 3
  }

  const phMultiplier = isMobile ? 0.75 : 1

  const bgSx = blackBg
    ? { backgroundColor: palette.primary.main }
    : { backgroundColor: alpha(palette.primary.main, 0.2) }
  
  const sliderSx: SxProps<Theme> = {
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

  const imageSx: SxProps<Theme> = {
    '& span': {
      boxShadow: "2px 3px 4px rgba(0, 0, 0, 0.5)"
    }
  }
  const expandSx: SxProps<Theme> = {
    position: "absolute",
    zIndex: 2,
    right: 0,
    m: 1
  }

  const handleModalClose = () => setModalImage(undefined)

  const download = () => {
    if (!modalImage) return;
    const pathName = modalImage.split("/");
    const fileName = pathName[pathName.length - 1]
    setDownloading(true)
    fetch(modalImage, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(()=> setDownloading(false))
  } 

  const displayElement = (isActive: boolean, item: SwiperDisplayItem) => {
    const { url, hiResUrl, label, isVideo } = item;

    const handleExpand = () => {
      setModalImage(hiResUrl || url)
    }
    const element = isVideo
      ? <VideoPlayer url={url} isSmall isActive={isActive} placeholderHeight={placeholderHeight * phMultiplier} />
      : <Box width="100%" display="flex" justifyContent="center" sx={imageSx} >
          <Fab color="secondary" size="small" sx={expandSx} onClick={handleExpand} >
            <OpenInFullIcon fontSize="small" />
          </Fab>
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

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        footer={
          <DialogActions sx={{position: "absolute", bottom: -30, left: "calc(50% - 5rem)", padding: 0 }} >
            <Button color="secondary" variant="contained" onClick={download} sx={{ width: "10rem" }} disabled={downloading}>
              {downloading ? <CircularProgress color="inherit" size="1.5rem" /> : "Download"}
            </Button>
          </DialogActions>
        }
      >
        <Box position="relative" width="100%" height="100%">
          {modalImage && <Image src={modalImage} alt="" objectFit="contain" layout="fill" placeholder="blur" blurDataURL={base64Shimmer(1024, 1024)} />}
        </Box>
      </Modal>
    </Box>
  )
}

export default SwiperDisplay
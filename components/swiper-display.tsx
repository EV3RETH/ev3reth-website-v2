import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Box, Fab, Theme, SxProps, DialogActions, Button, CircularProgress, Stack, Tooltip } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Image from 'next/image';
import VideoPlayer from './video-player';
import Modal from './modal';
import { maxDisplayWidth } from '../styles/theme';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import LoadingSkrim from './loading-skrim';
import BetterImage from './better-image';
import { useGlobalContext } from '../context/globalProvider';
import { getOwnerText } from '../utils/contentMapping';
import QuickLinks from './quick-links';

export interface SwiperDisplayItem {
  url: string;
  hiResUrl?: string;
  label?: string;
  isVideo?: boolean;
  thumbnail?: string;
  tokenId?: number;
  contractId?: string;
}
interface SwiperDisplayProps {
  items: Array<SwiperDisplayItem>;
  blackBg?: boolean;
  videoHeightRation?: string;
  contractMappingId?: string;
}

const SwiperDisplay: React.FC<SwiperDisplayProps> = ({ items, blackBg = false, videoHeightRation="56.25%", contractMappingId }) => {
  const { breakpoints, spacing, palette } = useTheme()
  const { state } = useGlobalContext()
  
  const [modalImage, setModalImage] = useState<string>()
  const [modalNftOwner, setModalNftOwner] = useState<string>()
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false)
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)

  const isMobile = useMediaQuery(breakpoints.down("sm"))
  const isTablet = useMediaQuery(breakpoints.down("md"))
  const isDesktop = useMediaQuery(breakpoints.down("lg"))

  const modalOpen = Boolean(modalImage)
  const owners = state.owners
  const wallet = state.wallet

  const slidesPerView = () => {
    if (isTablet) return 1;
    if (isDesktop) return 2;
    return 3
  }

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
    },
    "& .swiper-wrapper": {
      alignItems: "center"
    },
    '@-moz-document url-prefix()': {
      "& .swiper-wrapper": {
        transformStyle: "flat !important", //fixes coverflow issue in firefox (was covering buttons and intercepting clicks)
      }
    }
  }

  const expandSx: SxProps<Theme> = {
    position: "absolute",
    zIndex: 2,
    right: 0,
    m: 1
  }

  useEffect(() => {
    const preventRightClick = (e: any) => {
      if (e && e.target.className === "prevent-right-click") {
        e.preventDefault();
      }
    }
    document.addEventListener("contextmenu", preventRightClick);

    return () => document.removeEventListener("contextmenu", preventRightClick);
  }, [])

  const handleModalClose = () => {
    setModalImageLoaded(false)
    setModalImage(undefined)
    setModalNftOwner(undefined)
  }

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
    const { url, hiResUrl, label, isVideo, thumbnail, tokenId, contractId } = item;

    const handleExpand = () => {
      setModalImage(hiResUrl || url)
      
      const id = contractMappingId || contractId
      if (id && tokenId) {
        setModalNftOwner(owners[id][tokenId])
      }
      
    }
    
    const element = isVideo
      ? <VideoPlayer url={url} isSmall isActive={isActive} heightRatio={videoHeightRation} thumbnail={thumbnail} />
      : <Box width="100%" display="flex" justifyContent="center" >
        {!!hiResUrl && (
          <Fab color="secondary" size="small" sx={expandSx} onClick={handleExpand}>
            {/* <OpenInFullIcon fontSize="small" /> */}
            <Typography variant="h6">
              4K
            </Typography>
          </Fab>
        )}
        <BetterImage src={url} alt={label} height={500} width={500} placeholderText="Images coming from decentralized metadata may take time to load." />
      </Box>

    const ownerText = getOwnerText(owners, contractMappingId, tokenId)
    
    return (
      <Stack>
        {element}
        {label && (
          <Box position="absolute"
            bottom={spacing(1)}
            width="100%"
            display="flex"
            justifyContent="center">
            <Typography
              px={2}
              borderRadius={1}
              variant='subtitle1'
              align="center"
              bgcolor="rgba(100, 100, 100, 0.7)"
              color={palette.background.default}
              sx={{
                opacity: isActive ? 1 : 0.5,
                boxShadow: "2px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              {label}{ownerText}
            </Typography>
          </Box>
        )}
      </Stack>
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
          // focusableElements={"button"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          initialSlide={1}
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
          <DialogActions
            sx={{
              position: "absolute",
              bottom: { xs: "-2.5rem", md: "-2rem" },
              left: "calc(50% - 5.5rem)",
              px: "1rem",
              pb: 1.5,
              background: palette.primary.main,
              borderRadius: 3
            }}
          >
            <Box
              sx={{
                "&::before": {
                  content: "''",
                  position: "absolute",
                  backgroundColor: "transparent",
                  top: { xs:"16px", md: "24.5px" },
                  left: "-40px",
                  height: "25px",
                  width: "40px",
                  borderTopRightRadius: spacing(2),
                  boxShadow: `8px -8px 0 0 ${palette.primary.main}`,
                },
                "&::after": {
                  content: "''",
                  position: "absolute",
                  backgroundColor: "transparent",
                  top: { xs: "16px", md: "24.5px" },
                  right: "-40px",
                  height: "25px",
                  width: "40px",
                  borderTopLeftRadius: spacing(2),
                  boxShadow: `-8px -8px 0 0 ${palette.primary.main}`,
                }
              }}
            >
              {/* {wallet?.getAccountId() !== modalNftOwner
                ? <Tooltip placement="top"
                    title="Only the owner of this nft can download the 4k version. Consider checking out the secondary market!"
                  >
                  <Button color="secondary" variant="outlined" onClick={() => setQuickLinksOpen(true)} sx={{ width: "10rem" }}>
                      Download
                    </Button>
                  </Tooltip>
                : <Button color="secondary" variant="contained" onClick={download} sx={{ width: "10rem" }} disabled={downloading}>
                    {downloading ? <CircularProgress color="inherit" size="1.5rem" /> : "Download"}
                  </Button>
              } */}
              <Button color="secondary" variant="contained" onClick={download} sx={{ width: "10rem" }} disabled={downloading}>
                {downloading ? <CircularProgress color="inherit" size="1.5rem" /> : "Download"}
              </Button>
            </Box>
            
          </DialogActions>
        }
      >
        <Box position="relative" width="100%" height="100%" >
          {!modalImageLoaded && <LoadingSkrim title="4k images may take time to load"/>}
          {modalImage && (
            <Image
              className="prevent-right-click"
              src={modalImage}
              alt=""
              objectFit="contain"
              layout="fill"
              onLoadingComplete={() => setModalImageLoaded(true)}
            />
          )}
        </Box>
      </Modal >
      <QuickLinks
        onlyMarketLinks
        open={quickLinksOpen}
        onClose={() => setQuickLinksOpen(false)}
      />
    </Box>
  )
}

export default SwiperDisplay
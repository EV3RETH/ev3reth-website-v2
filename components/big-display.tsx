import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Divider, LinearProgress, Box, Grid, Button, Typography, Slide } from "@mui/material";
import Image from 'next/image';
import VideoPlayer from "./video-player";
import { blackBgSx, maxDisplayWidth, whiteBgSx } from "../styles/theme";
import SvgCurve from "./svgCurve";
import useElementObserver from "../hooks/useElementObserver";
import { useRef } from "react";

export const blurImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUUHCpBwAB8QEFGb0nOgAAAABJRU5ErkJggg=="
interface BigDisplayProps {
  title: string;
  tag: string;
  marketLink: string;
  marketText: string;
  videoSrc?: string;
  autoPlayVideo?: boolean;
  imgSrc?: string;
  blackBg?: boolean;
  reverseDisplay?: boolean;
  placeholderHeight?: number;
};

const BigDisplay: React.FC<BigDisplayProps> = ({
  title,
  tag,
  marketLink,
  marketText,
  imgSrc,
  videoSrc,
  autoPlayVideo = false,
  blackBg = false,
  reverseDisplay = false,
  placeholderHeight = 700
}) => {
  const { breakpoints, palette } = useTheme()
  const isTablet = useMediaQuery(breakpoints.down("lg"))
  const isMobile = useMediaQuery(breakpoints.down("sm"))

  const bgSx = blackBg ? blackBgSx : whiteBgSx;
  const topPad = 6
  const phMultiplier = isMobile ? 0.49 : 1
 
  const videoPlaceHolder = () => <Box width={"100%"} height={placeholderHeight*phMultiplier}><LinearProgress color="secondary" sx={{ top: "50%" }} /></Box>

  const displayElement = () => {
    const justify = isTablet
      ? "center"
      : reverseDisplay
        ? "flex-start"
        : "flex-end";
    let element;
    if (videoSrc) element = <VideoPlayer url={videoSrc} autoPlay={autoPlayVideo} placeHolder={videoPlaceHolder()} />;
    if (imgSrc) element = <Image src={imgSrc} alt={title} width={700} height={700} placeholder="blur" blurDataURL={blurImage} />;
    return (
      <Grid item xs={12} lg={6} zIndex={2} pt={topPad}>
        <Box
          px={{ xs: 2, sm: 4, md: 6, lg: 0 }}
          py={{ xs: 2, sm: 4, lg: 8 }}
          display="flex"
          justifyContent={justify}
        >
          {element}
        </Box>
      </Grid>
    )
  }
  
  return (
    <Box sx={bgSx}>
      <Grid container maxWidth={maxDisplayWidth} margin="auto" px={{ xs: 0, md: 3 }} >

        <SvgCurve color={blackBg ? palette.background.default : palette.primary.main} flipped={blackBg} />

        {reverseDisplay && !isTablet && displayElement()}

        <Grid item xs={12} lg={6} position="relative" pt={topPad} >
          
          <Box
            pt={{ xs: 8, sm: 10 }}
            pb={{xs: 4, lg: 10}}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h5" fontStyle="italic">
              {tag}
            </Typography>
            <Typography variant="h3" noWrap>
              {title}
            </Typography>
            {marketText && (
              <Button color="secondary" variant="contained" sx={{ mt: 3 }} >
                <a target="_blank" rel="noreferrer" href={marketLink}>
                  {marketText}
                </a>
              </Button>
            )}
          </Box>
         
        </Grid>

        {(!reverseDisplay || isTablet) && displayElement()}

      </Grid>
    </Box>
  )
}

export default BigDisplay
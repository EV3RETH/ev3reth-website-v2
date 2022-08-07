import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Grid, Button, Typography } from "@mui/material";
import Image from 'next/image';
import VideoPlayer from "./video-player";
import { blackBgSx, maxDisplayWidth, whiteBgSx } from "../styles/theme";
import SvgCurve from "./svgCurve";
import base64Shimmer from "../utils/svgShimmer";
import Link from "next/link";
import BetterImage from "./better-image";
interface BigDisplayProps {
  title: string;
  tag: string;
  marketLink: string;
  marketText: string;
  videoSrc?: string;
  imgSrc?: string;
  blackBg?: boolean;
  reverseDisplay?: boolean;
  videoHeightRatio?: string;
  videoThumbnail?: string;
};

const BigDisplay: React.FC<BigDisplayProps> = ({
  title,
  tag,
  marketLink,
  marketText,
  imgSrc,
  videoSrc,
  blackBg = false,
  reverseDisplay = false,
  videoHeightRatio = "100%",
  videoThumbnail
}) => {
  const { breakpoints, palette } = useTheme()
  const isTablet = useMediaQuery(breakpoints.down("lg"))
  const isMobile = useMediaQuery(breakpoints.down("sm"))

  const bgSx = blackBg ? blackBgSx : whiteBgSx;
  const topPad = { xs: 0, lg: 6 }
  const isNavLink = marketLink[0] === "/"
 
  const displayElement = () => {
    const justify = isTablet
      ? "center"
      : reverseDisplay
        ? "flex-start"
        : "flex-end";
    let element;
    if (videoSrc) element = <VideoPlayer url={videoSrc} heightRatio={videoHeightRatio} thumbnail={videoThumbnail} />;
    if (imgSrc) element = <BetterImage src={imgSrc} alt={title} width={700} height={700} />;
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
            <Typography variant="h3" noWrap mb={1}>
              {title}
            </Typography>

            <Typography variant="h5">
              {tag}
            </Typography>
            
            <Link
              href={marketLink}
              passHref
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{ mt: 4 }}
                target={isNavLink ? "" : "_blank"}
                rel={isNavLink ? "" : "noreferrer"}
                href=""
              >
                {marketText}
              </Button>
            </Link>
          </Box>
         
        </Grid>

        {(!reverseDisplay || isTablet) && displayElement()}

      </Grid>
    </Box>
  )
}

export default BigDisplay
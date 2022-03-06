import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme, alpha } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import VideoPlayer from "./video-player";
import { blackBgSx, maxDisplayWidth, whiteBgSx } from "../styles/theme";
import { Divider } from "@mui/material";

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
  reverseDisplay = false
}) => {
  const { breakpoints, spacing } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("lg"))

  const bgSx = blackBg ? blackBgSx : whiteBgSx;

  const dividerShadow = blackBg ? "-2px" : "2px";
  const dividerSx = {
    border: "none",
    boxShadow: `0px ${dividerShadow} 8px 2px rgba(0,0,0,0.5)`,
  }
 

  const displayElement = () => {
    if (videoSrc) return (
      <Grid item xs={12} lg={6}>
        <Box
          p={{ xs: 0, sm: 4, md: 8 }}
          pt={{ md: 0, lg: 8 }}
          display="flex"
          justifyContent="center"
        >
          <VideoPlayer url={videoSrc} autoPlay={autoPlayVideo} />
        </Box>
      </Grid>
    )
  }
  
  return (
    <Box sx={bgSx}>
      <Divider sx={dividerSx}/>
      <Grid container maxWidth={1920} margin="auto" >

        {reverseDisplay && !isMobile && displayElement()}

        <Grid item xs={12} lg={6}>
          <Box
            p={10}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h5" fontStyle="italic">
              {tag}
            </Typography>
            <Typography variant="h2" noWrap>
              {title}
            </Typography>
            <Button color="secondary" variant="contained" sx={{ mt: 3 }} >
              <a target="_blank" rel="noreferrer" href={marketLink}>
                {marketText}
              </a>
            </Button>
          </Box>
        </Grid>

        {(!reverseDisplay || isMobile) && displayElement()}

      </Grid>
    </Box>
  )
}

export default BigDisplay
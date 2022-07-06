import type { NextPage } from 'next';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BannerWrapper from "../components/banner-wrapper";
import BigDisplay from "../components/big-display";
import TwitterIcon from '@mui/icons-material/Twitter';
import SvgCurve from "../components/svgCurve";
import { useTheme } from "@mui/material";



export const TwitterLink = ({url} : {url: string}) => (
  <Button color="secondary">
    <a href={url} target="_blank" rel="noreferrer">
      <TwitterIcon />
    </a>
  </Button>
)

const Collaborations: NextPage = () => {
  const {palette} = useTheme()
  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h2" textAlign="center">
          Danil
        </Typography>
        <Box textAlign="center">
          <TwitterLink url="https://twitter.com/pan_danil"/>
        </Box>
      </BannerWrapper>
      <BigDisplay
        title="S U M M E R S U N / /"
        tag="Owner - earthshine.near"
        marketText="View on Paras"
        marketLink="https://paras.id/token/x.paras.near::188803"
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/collaborations/SUMMERSUN.mp4"
        placeholderHeight={800}
      />
      <SvgCurve color={palette.background.default} flipped/>
      <BannerWrapper blackBg>
        <Typography variant="h2" mb={1} textAlign="center">
          GDM
        </Typography>
        <Typography variant="h5" mb={1}>
          GDM is an artist working at the intersection of surrealism and fantasy, creating Chiral worlds and the creatures which live within.
        </Typography>
        <Box textAlign="center">
          <TwitterLink url="https://twitter.com/griffindart" /> 
        </Box>
      </BannerWrapper>
      <BigDisplay
        videoSrc="https://ev3reth.s3.us-west-2.amazonaws.com/Tune-Out/CH6+-+The+Mystic.mp4"
        title="CH6 - The Mystic"
        tag="Owner - jared.near"
        marketText="View on Paras"
        marketLink="https://paras.id/token/x.paras.near::253461"
        placeholderHeight={394}
      />

    </Box>
  )
}

export default Collaborations
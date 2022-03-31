import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { NextPage } from 'next';
import { MainBG } from ".";
import BannerWrapper from "../components/banner-wrapper";
import BigDisplay from "../components/big-display";
import Navigation from "../components/navigation";
import TwitterIcon from '@mui/icons-material/Twitter';



export const TwitterLink = ({url} : {url: string}) => (
  <Button color="secondary">
    <a href={url} target="_blank" rel="noreferrer">
      <TwitterIcon />
    </a>
  </Button>
)

const Collaborations: NextPage = () => {
  return (
    <Box component="main">
      <MainBG />
      <BannerWrapper>
        <Typography variant="h2">
          Danil
        </Typography>
        <TwitterLink url="https://twitter.com/pan_danil"/>
      </BannerWrapper>
      <BigDisplay
        title="S U M M E R S U N / /"
        tag="Owner - earthshine.near"
        marketText="View on Paras"
        marketLink="https://paras.id/token/x.paras.near::188803"
        videoSrc="https://vimeo.com/684484141"
      />

      <BannerWrapper blackBg>
        <Typography variant="h2" mb={1}>
          GDM
        </Typography>
        <Typography variant="h5" mb={1}>
          GDM is an artist working at the intersection of surrealism and fantasy, creating Chiral worlds and the creatures which live within.
        </Typography>
        <TwitterLink url="https://twitter.com/griffindart" />
      </BannerWrapper>
      <BigDisplay
        videoSrc="https://vimeo.com/684483034"
        title="CH6 - The Mystic"
        tag="Owner - jared.near"
        marketText="View on Paras"
        marketLink="https://paras.id/token/x.paras.near::253461"
        reverseDisplay
      />

    </Box>
  )
}

export default Collaborations
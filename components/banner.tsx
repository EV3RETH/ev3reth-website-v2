import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import { blackBgSx } from "../styles/theme"
import ev3rethImage from "../public/EV3RETH-big.png"

const Banner = () => {
  return (
    <Box px={{ xs: 4, sm: 10, lg: 16 }} py={{ xs: 12, lg: 18 }} textAlign="center" sx={blackBgSx} >
      <Box maxWidth={1024} mx="auto" mb={10}>
        <Image src={ev3rethImage} layout="responsive" alt="EV3RETH Logo" />

      </Box>
      <Typography variant="h4">
        Machine Learning Artist and Composer
      </Typography>
    </Box>
  )
}

export default Banner
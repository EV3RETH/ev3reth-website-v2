import Box from "@mui/material/Box"
import { blackBgSx, whiteBgSx } from "../styles/theme"

const BannerWrapper: React.FC<{ blackBg?: boolean }> = ({ children, blackBg = true }) => {
  const bgSx = blackBg ? blackBgSx : whiteBgSx
  return (
    <Box px={{ xs: 4, sm: 10, lg: 16 }} py={{ xs: 12, lg: 18 }} textAlign="center" sx={bgSx} >
      {children}
    </Box>
  )
}

export default BannerWrapper
import Box from "@mui/material/Box"
import { ReactNode } from "react"
import { blackBgSx, whiteBgSx } from "../styles/theme"

const BannerWrapper: React.FC<{ blackBg?: boolean, isBody?: boolean, children: ReactNode }> = ({ children, blackBg = true, isBody = false }) => {
  const bgSx = blackBg ? blackBgSx : whiteBgSx
  const px = isBody 
    ? { xs: 4, xl: 16 }
    : { xs: 4, sm: 10, lg: 16 }
  
  const py = isBody
    ? { xs: 4, lg: 8 }
    : { xs: 6, lg: 10 }
  return (
    <Box px={px} py={py} textAlign={{ xs: "left", md: "center"}} sx={bgSx} >
      {children}
    </Box>
  )
}

export default BannerWrapper
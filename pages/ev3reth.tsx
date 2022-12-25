import { Box, useMediaQuery, useTheme } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { start } from "../components/ev3-particles.js";
import { blackBgSx } from "../styles/theme";

const Ev3rethPlayground: NextPage = () => {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const { breakpoints } = useTheme()
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null)
  const isMobile = useMediaQuery(breakpoints.down("md"))

  const logoSx = {
    transition: "filter 2s, opacity 2s",
    filter: logoLoaded ? "blur(0px)" : "blur(8px)",
    opacity: logoLoaded ? 1 : 0,
  }
  useEffect(() => {
    if (canvasRef2?.current) {
      setLogoLoaded(true)
      start(canvasRef2.current)
    }
  }, [canvasRef2])

  useEffect(() => {
    if (isMobile) {
      screen.orientation.lock("landscape")
    }
  }, [isMobile])

  return (
    <Box sx={blackBgSx} component="main" >
      <Box
    
        width="100vw"
        height="50vw"
        display="flex" justifyContent="center" alignItems="center"
        overflow="hidden"
        sx={{
          ...logoSx,
          cursor: "pointer",
          touchAction: "none",
          userSelect: "none",
        }}>
        <canvas ref={canvasRef2}
          style={{ transform: isMobile ? "scale(1.15)" : "scale(1.18)" }}
        />
      </Box>

    </Box>
  )
}

export default Ev3rethPlayground;
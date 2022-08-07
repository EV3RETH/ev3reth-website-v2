import { Box, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material"
import { useRef } from "react";
import useElementObserver from "../hooks/useElementObserver";
import Curve from "../public/curve.svg"

interface curveProps {
  color?: string;
  flipped?: boolean;
}
const SvgCurve: React.FC<curveProps> = ({ color, flipped }) => {
  const ref = useRef(null)
  const isVisible = useElementObserver(ref, "50px")
  const { breakpoints, palette } = useTheme()
  const isTablet = useMediaQuery(breakpoints.down("lg"))

  const rotate = flipped ? "rotate(0deg)" : "rotateY(180deg)";
  const scaleAmount = isTablet ? 0.9 : 0.7
  const scale = isVisible ? `scaleY(${scaleAmount})` : "scaleY(0)";
  const transform = `${rotate} ${scale}`

  const sx: SxProps<Theme> = {
    width: "100%",
    position: "absolute",
    left: 0,
    mt: "-1px",
    transformOrigin: "50% 0",
    transition: "transform 3s",
    transform,
    '& svg>*': {
      fill: color || palette.primary.main
    }
  }
  return (
    <Box sx={sx} ref={ref}>
      <Curve />
    </Box>
  )
}

export default SvgCurve
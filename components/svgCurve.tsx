import { Box, SxProps, Theme } from "@mui/material"
import { useRef } from "react";
import useElementObserver from "../hooks/useElementObserver";
import Curve from "../public/large-curve.svg"

interface curveProps {
  color: string;
  flipped?: boolean;
}
const SvgCurve: React.FC<curveProps> = ({ color, flipped }) => {
  const ref = useRef(null)
  const isVisible = useElementObserver(ref, "50px")

  const rotate = flipped ? "rotate(0deg)" : "rotateY(180deg)";
  const translate = isVisible? "scaleY(1)" : "scaleY(0)";
  const transform = `${rotate} ${translate}`

  const sx: SxProps<Theme> = {
    width: "100%",
    position: "absolute",
    left: 0,
    marginTop: {
      xs: "-1px",
      md: "-5px",
    },
    transformOrigin: "50% 0",
    transition: "transform 3s",
    transform,
    '& svg>*': {
      fill: color
    }
  }
  return (
    <Box sx={sx} ref={ref}>
      <Curve />
    </Box>
  )
}

export default SvgCurve
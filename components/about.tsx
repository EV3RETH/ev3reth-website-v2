import { Box, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import { getGradientTextStyle, maxDisplayWidth } from "../styles/theme"
import { MEDIUM_MODEL_IS_ART_PART1_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK } from "../utils/links"
import BannerWrapper from "./banner-wrapper"
import SvgCurve from "./svgCurve"

const About: FC = () => {
  const { palette } = useTheme()
  return (
    <Box>
      <SvgCurve color={palette.background.default} flipped />
      <BannerWrapper isBody>
        <Box pt={{ xs: 4, sm: 10, xl: 12 }} px={{ xl: 10 }} maxWidth={maxDisplayWidth} mx="auto">
          <Typography variant="h3" mb={3}
            sx={getGradientTextStyle(`linear-gradient(90deg, #FFF 20%, ${palette.secondary.light} 80%)`)}
          >
            Making Future Art
          </Typography>
          <Typography variant="h5">
            ❖ Multimedia and interactive mediums
            <br />
            ❖ Training and manipulating machine learning models
            <br />
            ❖ Combining classical composition with modern soundscapes
            <br />
            ❖ Investigating creative uses of blockchain technology
          </Typography>

          <Typography mt={4} mb={1}>
            Learn about my journey into machine learning by reading &quot;The Model is the Art&quot;
            (<a href={MEDIUM_MODEL_IS_ART_PART1_LINK} target="_blank" rel="noreferrer">part one</a> | <a href={MEDIUM_MODEL_IS_ART_PART2_LINK} target="_blank" rel="noreferrer">part two</a>)
          </Typography>
        </Box>
      </BannerWrapper>
    </Box>
)
}

export default About
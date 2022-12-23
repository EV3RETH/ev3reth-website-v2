import { Box, Button, Stack, Typography, useTheme } from "@mui/material"
import { FC, ReactNode } from "react"
import { DISCORD_LINK, MEDIUM_MODEL_IS_ART_PART1_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK, PRELUDES_MARKET_LINK, SNXEV3_SECONDARY_LINK, T3RRA_MARKET_LINK, TUNE_OUT_SECONDARY_LINK, TWITTER_LINK } from "../utils/links";
import Modal from "./modal";

interface QuickLinksProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  onlyMarketLinks?: boolean
}
const QuickLinks: FC<QuickLinksProps> = ({
  open, 
  onClose,
  title = "Wanna go straight to the marketplace action?",
  onlyMarketLinks = false
}) => {
  const {palette} = useTheme()
  return (
    <Modal
      small
      whiteBg
      open={open}
      onClose={onClose}
    >
      <Stack spacing={2} p={2} textAlign={{xs: "left", md: "center"}}>
        <Typography variant="h4">
          {title}
        </Typography>

        <StyledBox>
          <StyledLink title="T3RRA" href={T3RRA_MARKET_LINK} />
          <StyledLink title="Preludes" href={PRELUDES_MARKET_LINK} />
          <StyledLink title="SNxEV3" href={SNXEV3_SECONDARY_LINK} />
          <StyledLink title="Tune Out" href={TUNE_OUT_SECONDARY_LINK} />
        </StyledBox>

        {!onlyMarketLinks && (
          <>
            <br />
            <Typography variant="h5">
              Or join me on Discord and Twitter to stay informed?
            </Typography>
            <StyledBox>
              <StyledLink title="Discord" href={DISCORD_LINK} />
              <StyledLink title="Twitter" href={TWITTER_LINK} />
            </StyledBox>
            <br />
            <Typography variant="h5">
              Maybe an article for your reading pleasure?
            </Typography>
            <StyledLink title="Pondering the New Paradigm of Generative Art" href={MEDIUM_MODEL_IS_ART_PART1_LINK} />
            <StyledLink title="The Making of T3RRA" href={MEDIUM_MODEL_IS_ART_PART2_LINK} />
          </>
        )}
        <br />
        <Button variant="contained" color="secondary" onClick={onClose}>
          Not just yet
        </Button>
      </Stack>
    </Modal>
  )
}

export default QuickLinks;

interface StyledLinkProps {
  title: string;
  href: string;
}
const StyledLink: FC<StyledLinkProps> = ({title, href}) => (
  <Typography variant="h6">
    ❖ <a href={href} target="_blank" rel="noreferrer">
      {title}
    </a>
  </Typography>
)

const StyledBox: FC<{children: ReactNode}> = ({children}) => (
  <Box display="flex" gap={3} flexWrap="wrap" px={{ xs: 0, md: 4 }} justifyContent={{ xs: "flex-start", md: "center" }}>
    {children}
  </Box>
)
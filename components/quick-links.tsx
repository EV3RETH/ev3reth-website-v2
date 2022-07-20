import { Button, Stack, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import { EVE_GENESIS_SECONDARY_LINK, MEDIUM_MODEL_IS_ART_PART1_LINK, MEDIUM_MODEL_IS_ART_PART2_LINK, PARAS_COLLECTIONS, SNXEV3_SECONDARY_LINK, TUNE_OUT_SECONDARY_LINK } from "../utils/links";
import Modal from "./modal";

interface QuickLinksProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  noArticles?: boolean
}
const QuickLinks: FC<QuickLinksProps> = ({
  open, 
  onClose,
  title = "Wanna go straight to the marketplace action?",
  noArticles = false
}) => {
  const {palette} = useTheme()
  return (
    <Modal
      small
      whiteBg
      open={open}
      onClose={onClose}
    >
      <Stack textAlign="center" spacing={2}>
        <Typography variant="h4" py={2}>
          {title}
        </Typography>
        <StyledLink title="EV3: Genesis" href={EVE_GENESIS_SECONDARY_LINK} />
        <StyledLink title="SNxEV3" href={SNXEV3_SECONDARY_LINK} />
        <StyledLink title="Tune Out" href={TUNE_OUT_SECONDARY_LINK} />

        {!noArticles && (
          <>
            <br/>
            <Typography variant="h5">
              How about an article for your reading pleasure?
            </Typography>
            <StyledLink title="Pondering the New Paradigm of Generative Art" href={MEDIUM_MODEL_IS_ART_PART1_LINK} />
            <StyledLink title="The Making of “EV3: Genesis”" href={MEDIUM_MODEL_IS_ART_PART2_LINK} />
          </>
        )}
        <br />
        <Button variant="contained" color="secondary" onClick={onClose}>
          Not just yet
          <br />
          I would like to enjoy your beautiful website a little longer
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
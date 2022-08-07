import { Dialog, DialogContent, Box, useTheme, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import SvgCurve from "./svgCurve"

interface ModalProps {
  open: boolean;
  onClose: () => void;
  small?: boolean;
  whiteBg?: boolean;
  children: JSX.Element;
  footer?: JSX.Element;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: React.FC<ModalProps> = ({open, onClose, children, footer, small, whiteBg }) => {
  const { palette } = useTheme()
  const color = whiteBg ? palette.background.default : palette.primary.main;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        square: true,
        sx: {
          background: color,
          overflow: "visible",
          margin: 1,
          borderRadius: { xs: 4, lg: 6 },
          width: small ? "initial" : 1024,
          height: small ? "initial" : 1024,
          maxHeight: small ? "80vh" : "min(100vw, 80vh)",
        }
      }}
      maxWidth="lg"
    >
      <DialogContent sx={{
        p: { xs: 2, md: 4 }
      }} >
        <Box width="94%" position="absolute" top={{ xs: "2px", lg:"-1px"}} left="3%" zIndex={0} sx={{ transform: "rotate(180deg)" }}>
          <SvgCurve flipped color={color} />
        </Box>
        <Box width="94%" position="absolute" bottom={{ xs: "2px", lg: "-1px" }} left="3%" zIndex={0}>
          <SvgCurve flipped color={color} />
        </Box>
        {children}
      </DialogContent>
      {footer}
    </Dialog>
  )
}

export default Modal
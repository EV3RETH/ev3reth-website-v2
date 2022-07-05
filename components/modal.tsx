import { Dialog, DialogContent, Box, useTheme, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import SvgCurve from "./svgCurve"

interface ModalProps {
  open: boolean;
  onClose: () => void;
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

const Modal: React.FC<ModalProps> = ({open, onClose, children, footer }) => {
  const { palette } = useTheme()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        square: true,
        sx: {
          background: palette.primary.main,
          overflow: "visible",
          margin: 1,
          width: 1024,
          height: 1024,
          maxHeight: "min(100vw, 80vh)",
        }
      }}
      maxWidth="lg"
    >
      <DialogContent sx={{ p: { xs: 2, md: 4 } }} >
        <Box width="100%" position="absolute" top="1px" left="0" zIndex={0} sx={{ transform: "rotate(180deg)" }}>
          <SvgCurve flipped />
        </Box>
        <Box width="100%" position="absolute" bottom="-1px" left="0" zIndex={0}>
          <SvgCurve flipped />
        </Box>
        {children}
      </DialogContent>
      {footer}
    </Dialog>
  )
}

export default Modal
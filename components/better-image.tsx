import { useState } from "react";
import { useTheme, Box, Typography, Stack, IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import Image, { ImageProps } from "next/image"
import LoadingSkrim from "./loading-skrim";


interface BetterImageProps extends ImageProps {
  placeholderText?: string;
  height: number,
  width: number,
  src: string,
}

const BetterImage = ({ placeholderText, alt, height, width, src: initSrc, ...rest }: BetterImageProps) => {
  const {palette} = useTheme()
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [src, setSrc] = useState(initSrc)

  const heightRatio = `${(height / width) * 100}%` //so the scrim can respond to responsive sizing like the image can
  
  const displayImage = !error && loaded 

  const handleRefreshImage = () => {
    setSrc("")
    setError(false)
    setLoaded(false)
    setTimeout(() => {
      setSrc(initSrc)
    }, 1000)
  }
  return (
    <Box
      position="relative"
      borderRadius={2} overflow="hidden" boxShadow="2px 3px 4px rgba(0,0,0,0.4)"
      sx={{
        backgroundColor: palette.primary.main,
      }}
    >
      {!loaded && (
        <Box paddingBottom={heightRatio} width={width}>
          <LoadingSkrim title={placeholderText} />
        </Box>
      )}
      {error && (
        <Box paddingBottom={heightRatio} width={width}>
          <Stack spacing={2} position="absolute" height="100%" alignItems="center" justifyContent="center">
            <Typography color="white" px={4} textAlign="center">
              Looks like there was a problem loading the image from metadata.
              <br />
              <br />
              You can try refreshing.
            </Typography>
            <IconButton color="secondary" onClick={handleRefreshImage} disabled={!loaded}>
              <RefreshIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
      <Box
        position={displayImage ? "static" : "absolute"}
        sx={{
          transition: "2s",
          opacity: displayImage ? 1 : 0,
          "& span:first-of-type": {
            display: "block !important",
          }
        }}
      >
        <Image src={src} alt={alt} height={height} width={width} {...rest}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true)
            setLoaded(true)
          }}
        />  
      </Box>
    </Box> 
  )
}

export default BetterImage
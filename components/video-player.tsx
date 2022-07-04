import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useEffect,  useRef,  useState } from "react";
import { useTheme, SxProps, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Fab, Button, Skeleton } from "@mui/material";
import useElementObserver from "../hooks/useElementObserver";

interface VideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  isSmall?: boolean;
  isActive?: boolean;
  placeholderHeight?: number;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, autoPlay = false, isSmall = false, isActive = true, placeholderHeight = 700, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [showingControls, setShowingControls] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef()
  const containerVisible = useElementObserver(containerRef, "0px")
  const { breakpoints, palette } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("sm"))
  const isSSR = typeof window === 'undefined'

  useEffect(() => {
    if (isSmall && !isActive && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive, isSmall])

  useEffect(() => {
    if(!isPlaying) setShowingControls(true)
  }, [isPlaying, showingControls])

  useEffect(() => {
    console.log("🚀 ~ file: video-player.tsx ~ line 48 ~ useEffect ~ containerVisible && !isSSR", containerVisible, !isSSR)
    //lazy loading and forcing client side rendering
    if (containerVisible && !isSSR) {
      //the video element doesn't fire events correctly when rendered server side, 
      //adding this mounted check forces it to be rendered client side
      setMounted(true)
      setTimeout(()=>setLoaded(true), 1000)
    }
  }, [containerVisible, isSSR])

  const size = (isSmall || isMobile) ? "small" : "medium"
  const smallWidth = isMobile ? 300 : 400
  const playerWidth = isSmall ? smallWidth : 700;
  const controlsPadding = isSmall ? 1 : 1.5;
  const playPause = isPlaying ? <PauseIcon fontSize={size} /> : <PlayArrowIcon fontSize={size} />
  const mutedUnmuted = isMuted ? <VolumeOffIcon fontSize={size} /> : <VolumeUpIcon fontSize={size} />
  const buttonSx = {
    zIndex: 2,
    borderRadius: 1,
  }

  const videoSx: SxProps<Theme> = {
    boxShadow: "2px 3px 4px rgba(0,0,0,0.4)",
    transition: "filter 2s",
    filter: loaded ? "" : "blur(3px)",
    backgroundColor: palette.primary.main
  }
  
  const controlsSx: SxProps<Theme> = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    p: controlsPadding,
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    boxSizing: "border-box",
    opacity: showingControls ? 1 : 0,
    transition: "0.7s",
  }

  const controlScrimSx: SxProps<Theme> = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: 0,
    cursor: "default",
    boxSizing: "border-box",
  }

  const hideControls = () => {
    setTimeout(() => setShowingControls(false), 2000)
  }
  
  const handleMouseEnter = () => {
    setShowingControls(true)
  }
  const handleMouseOut = () => {
    setShowingControls(false)
  }

  const handlePlayClick = () => {
    setIsPlaying(prev => {
      if (!prev) {
        videoRef.current?.play()
      } else {
        videoRef.current?.pause()
        hideControls()
      }
      return !prev
    })
  }

  const handleMuteClick = () => {
    setIsMuted(prev => !prev)
  }

  const handleControlsClick = () => {
    if (isMobile) {
      if (showingControls) {
        if (!isPlaying) handlePlayClick()
        else setShowingControls(false)
      } else setShowingControls(true)
    }
    else handlePlayClick();
  }

  return (
    <Box position="relative" sx={videoSx} width={playerWidth} margin={isSmall ? "auto" : "inherit"} ref={containerRef}>
      <Box sx={controlsSx} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut}>
        <Button onClick={handleControlsClick} variant="text" sx={controlScrimSx} disabled={!isActive}/>
        <Fab color="secondary" onClick={handlePlayClick} sx={buttonSx} size={size} disabled={!isActive} >
          {playPause}
        </Fab>
        <Fab color="secondary" onClick={handleMuteClick} sx={buttonSx} size={size} disabled={!isActive} >
          {mutedUnmuted}
        </Fab>
      </Box>
      {!loaded && <Skeleton variant="rectangular" width="100%" height={placeholderHeight} animation="wave" sx={{ bgcolor: 'grey.800' }} />}
      {mounted && <video
        loop
        playsInline
        disablePictureInPicture
        height="auto"
        width="100%"
        poster={thumbnail}
        ref={videoRef}
        muted={isMuted}
        src={url}
        onLoadedData={() => setLoaded(true)}
        onCanPlayThrough={()=> setLoaded(true)}
        style={{ display: loaded ? "block" : "none" }}
      />}      
    </Box>
  )
}

export default VideoPlayer;
import { useEffect,  useRef,  useState } from "react";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Fab, Button, useTheme, SxProps, Theme, useMediaQuery, makeStyles, Fade } from "@mui/material";
import useElementObserver from "../hooks/useElementObserver";
import LoadingSkrim from "./loading-skrim";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  isSmall?: boolean;
  isActive?: boolean;
  heightRatio?: string;
  thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isSmall = false, isActive = true, heightRatio = "100%", thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showingControls, setShowingControls] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const { breakpoints, palette, spacing } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("sm"))
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef()
  const containerVisible = useElementObserver(containerRef, "0px")
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5
      videoRef.current.onpause = () => {
        setIsPlaying(false)
      }
      videoRef.current.onplay = () => {
        setIsPlaying(true)
      }
      videoRef.current.onvolumechange = (e: any) => {
        setIsMuted(e.target.muted)
      }
      videoRef.current.onfullscreenchange = (e: any) => {
        if (videoRef.current) {
          const isFullscreen = Boolean(document.fullscreen)
          videoRef.current.controls = isFullscreen

        }
      }
    }
  }, [mounted])

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
    //lazy loading and forcing Client rendering so events fire properly
    if (containerVisible) {
      setMounted(true)
    }
  }, [containerVisible, url])  

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
    filter: loaded ? "" : "blur(1px)",
    backgroundColor: palette.primary.main,
  }
  
  const controlsSx: SxProps<Theme> = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    p: controlsPadding,
    zIndex: 2,
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

  const canRequestFullScreen = videoRef.current?.requestFullscreen
  const handleFullScreen = () => {
    if (!videoRef.current || !canRequestFullScreen) return
    videoRef.current.requestFullscreen();
  }

  return (
    <Box position="relative" sx={videoSx} width={playerWidth} margin={isSmall ? "auto" : "inherit"} ref={containerRef} borderRadius={2} overflow="hidden">
      {!loaded && (
        <Box width="100%" paddingBottom={heightRatio}>
          <LoadingSkrim />
        </Box>
      )}
      {mounted && 
        <video
          controls={false}
          loop
          playsInline
          disablePictureInPicture
          height="auto"
          width="100%"
          poster={thumbnail}
          ref={videoRef}
          muted={isMuted}
          src={url + (thumbnail ? "" : "#t=0.001")} //"#t=0.001" (skips first millisecond and acts as thumbnail)
          onLoadedMetadata={() => setLoaded(true)}
          style={{
            display: "block",
            transition: "3s",
            position: loaded ? "static" : "fixed",
            bottom: loaded ? "inherit" : "150vh",
            opacity: loaded ? 1 : 0,
          }}
        />
      }      
      <Box sx={controlsSx} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut}>
        <Button onClick={handleControlsClick} variant="text" sx={controlScrimSx} disabled={!isActive} />
        {Boolean(canRequestFullScreen) && (
          <Fab
            color="secondary"
            onClick={handleFullScreen}
            sx={{
              position: "absolute",
              top: spacing(controlsPadding),
              right: spacing(controlsPadding),
              ...buttonSx
            }}
            size={size}
            disabled={!isActive || !loaded}
          >
            <FullscreenIcon fontSize={size} />
          </Fab>
        )}
        <Fab color="secondary" onClick={handlePlayClick} sx={buttonSx} size={size} disabled={!isActive || !loaded}>
          {playPause}
        </Fab>
        <Fab color="secondary" onClick={handleMuteClick} sx={buttonSx} size={size} disabled={!isActive || !loaded}>
          {mutedUnmuted}
        </Fab>
      </Box>
    </Box>
  )
}

export default VideoPlayer;
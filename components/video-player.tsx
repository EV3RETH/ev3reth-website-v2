import ReactPlayer from "react-player"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useEffect,  useState } from "react";
import { useTheme, SxProps, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LinearProgress, Box, Fab, Button } from "@mui/material";

interface VideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  isSmall?: boolean;
  isActive?: boolean;
  placeHolder?: JSX.Element
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, autoPlay = false, isSmall = false, isActive = true, placeHolder }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [showingControls, setShowingControls] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const { breakpoints, palette } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("sm"))

  useEffect(() => {
    if (isSmall && !isActive) {
      setIsPlaying(false)
    }
  }, [isActive, isSmall])

  useEffect(() => {
    if(!isPlaying) setShowingControls(true)
  }, [isPlaying, showingControls])

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
      if(!prev) hideControls()
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
    <Box position="relative" sx={videoSx} width={playerWidth} margin={isSmall ? "auto" : "inherit"}>
      <Box sx={controlsSx} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut}>
        <Button onClick={handleControlsClick} variant="text" sx={controlScrimSx} disabled={!isActive}/>
        <Fab color="secondary" onClick={handlePlayClick} sx={buttonSx} size={size} disabled={!isActive} >
          {playPause}
        </Fab>
        <Fab color="secondary" onClick={handleMuteClick} sx={buttonSx} size={size} disabled={!isActive} >
          {mutedUnmuted}
        </Fab>
      </Box>
      {!loaded && placeHolder}
      <ReactPlayer
        onReady={() => setLoaded(true)}
        style={{display: loaded ? "block" : "none"}}
        height="auto"
        width="100%" 
        url={url}
        loop
        playing={isPlaying}
        muted={isMuted}
        volume={0.7}
        config={{
          vimeo: {
            playerOptions: {
              playsinline: true,
              width: playerWidth,
              controls: false,
              responsive: true,
              pip: false
            }
          }
        }}
      />
    </Box>
  )
}

export default VideoPlayer;
import ReactPlayer from "react-player"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

interface VideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  isSmall?: boolean;
  isActive?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, autoPlay = false, isSmall = false, isActive = true }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)

  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down("sm"))

  useEffect(() => {
    if (isSmall) {
      setIsPlaying(isActive)
    }
  }, [isActive, isSmall])

  const size = isSmall ? "small" : "medium"
  const smallWidth = isMobile ? 300 : 400
  const playerWidth = isSmall ? smallWidth : 700;
  const controlsPadding = isSmall ? 1 : 1.5;

  const playPause = isPlaying ? <PauseIcon fontSize={size} /> : <PlayArrowIcon fontSize={size} />
  const playOpacity = isPlaying ? 0.3 : 1;
  const playSx = {
    opacity: playOpacity,
    borderRadius: 1
  }

  const mutedUnmuted = isMuted ? <VolumeOffIcon fontSize={size} /> : <VolumeUpIcon fontSize={size} />
  const muteOpacity = isMuted ? 1 : 0.3;
  const muteSx = {
    opacity: muteOpacity,
    borderRadius: 1
  }

  const videoSx = !isMobile || isSmall
    ? {
      boxShadow: "2px 3px 4px rgba(0,0,0,0.6)",
    }
    : {}

  const handlePlayClick = () => {
    setIsPlaying(prev => !prev)
    if(isMuted) setIsMuted(false)
  }

  const handleMuteClick = () => {
    setIsMuted(prev => !prev)
  }

  return (
    <Box position="relative" sx={videoSx} width={playerWidth} m="auto">
      <Box position="absolute" bottom={0} width="100%" height="100%" p={controlsPadding} zIndex={1} display="flex" justifyContent="space-between" alignItems="flex-end">
        <Fab color="secondary" onClick={handlePlayClick} sx={playSx} size={size} disabled={!isActive}>
          {playPause}
        </Fab>
        <Fab color="secondary" onClick={handleMuteClick} sx={muteSx} size={size} disabled={!isActive}>
          {mutedUnmuted}
        </Fab>
      </Box>
      <ReactPlayer
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
              width: playerWidth,
              controls: false,
              responsive: true
            }
          }
        }}
      />
    </Box>
  )
}

export default VideoPlayer;
import ReactPlayer from "react-player"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";

interface VideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  isSmall?: boolean;
  isActive?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, autoPlay = false, isSmall = false, isActive = true }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay || (isSmall && isActive))
  const [isMuted, setIsMuted] = useState(true)

  const { palette, spacing } = useTheme()

  useEffect(() => {
    if (isSmall) {
      setIsPlaying(isActive)
      if (!isActive) setIsMuted(true)
    }
  }, [isActive, isSmall])

  const size = isSmall ? "small" : "medium"
  const playerWidth = isSmall ? 400 : 700;
  const borderStyle = isSmall ? "inherit" : `${spacing(0.7)} solid ${palette.secondary.main}`
  const controlsPadding = isSmall ? 2 : 3;

  const playPause = isPlaying ? <PauseIcon fontSize={size} /> : <PlayArrowIcon fontSize={size} />
  const playOpacity = isPlaying ? 0.3 : 1;
  const playSx = {
    opacity: playOpacity
  }

  const mutedUnmuted = isMuted ? <VolumeOffIcon fontSize={size} /> : <VolumeUpIcon fontSize={size} />
  const muteOpacity = isMuted ? 1 : 0.3;
  const muteSx = {
    opacity: muteOpacity,
    float: "right",
  }

  const videoSx = {
    '& video': {
      border: borderStyle,
    }
  }

  const handlePlayClick = () => {
    setIsPlaying(prev => !prev)
  }

  const handleMuteClick = () => {
    setIsMuted(prev => !prev)
  }

  return (
    <Box position="relative" sx={videoSx} maxWidth={playerWidth} m="auto">
      <ReactPlayer
        height="auto"
        width="100%"
        url={url}
        loop
        playing={isPlaying}
        muted={isMuted}
        volume={0.7}
      />

      <Box position="absolute" bottom={0} width="100%" p={controlsPadding}>
        <Fab color="secondary" onClick={handlePlayClick} sx={playSx} size={size} disabled={!isActive}>
          {playPause}
        </Fab>
        <Fab color="secondary" onClick={handleMuteClick} sx={muteSx} size={size} disabled={!isActive}>
          {mutedUnmuted}
        </Fab>
      </Box>
    </Box>
  )
}

export default VideoPlayer;
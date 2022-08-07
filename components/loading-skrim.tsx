import { Box, LinearProgress, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { keyframes } from '@mui/system';
import logoIcon from '../public/logo-100.png'

const pulse = keyframes`
  from {
    filter: blur(0.5px) brightness(0.9);
  }
  to {
    filter: blur(4px) brightness(0.7);
  }
`;

const LoadingSkrim: FC<{ title?: string }> = ({ title = "" }) => {
  const { palette } = useTheme()
  return (
    <Stack
      height="100%"
      width="100%"
      spacing={5}
      justifyContent="center"
      alignItems="center"
      position="absolute"
    >
      <Typography variant="h5" color="secondary" px={5} textAlign="center">{title}</Typography>

      <Box sx={{ animation: `${pulse} 2s infinite alternate ease-in` }}>
        <Image src={logoIcon} alt="" width={100} height={100} />
      </Box>

      <LinearProgress sx={{width: "50%"}}/>
    </Stack>
  )
}

export default LoadingSkrim
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { blackBgSx, maxDisplayWidth } from '../styles/theme';
import { Ev3rethTwitterLink } from './navigation';

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <Box sx={blackBgSx} boxShadow="0px -3px 4px rgba(0,0,0,0.2)">
      <Box m="auto" py={2} px={3} maxWidth={maxDisplayWidth} display="flex" justifyContent="space-between" alignContent="center">
        <Typography>
          &copy; {year} EV3RETH
        </Typography>
        <Box>
          <Ev3rethTwitterLink />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
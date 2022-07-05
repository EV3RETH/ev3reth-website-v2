import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';

const pages = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: "SNxEV3",
    path: "/snxev3"
  },
  {
    label: 'Tune Out',
    path: '/tune-out'
  },
  {
    label: 'Collaborations',
    path: '/collaborations'
  }
];

export const Ev3rethTwitterLink = () => (
  <a href="https://twitter.com/EV3RETH" target="_blank" rel="noreferrer">
    <TwitterIcon fontSize='small' />
  </a>
)

export const DiscordLink = () => (
  <a href="https://discord.gg/CwvgaWdfwM" target="_blank" rel="noreferrer">
    <Image src="/discord.png" height={17} width={17} alt="discord"/>
  </a>
)

const Navigation: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<Element | null>(null);
  const { palette } = useTheme()
  const router = useRouter()

  const handleOpenNavMenu: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (path: string) => {
    router.push(path)
    handleCloseNavMenu()
  }

  return (
    <>
      <AppBar position="fixed" sx={{ background: palette.primary.light}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Button color="inherit" variant='text' onClick={()=> handleNavClick("/")} sx={{p:0}}>
                  <Typography
                    variant="h6"
                    noWrap
                  >
                    EV3RETH
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: "flex-end" }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      '& .MuiPaper-elevation': {
                        backgroundColor: palette.background.default
                      }
                    }}
                  >
                    {pages.map(({ label, path }) => (
                      <MenuItem
                        key={path}
                        onClick={() => handleNavClick(path)}
                        selected={path === router.pathname}
                      >
                        <Typography textAlign="center">{label}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <Ev3rethTwitterLink />
                      <Box ml={2}>
                        <DiscordLink />
                      </Box>
                    </MenuItem>
                  </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end", alignItems: "center" }}>
                  {pages.map(({ label, path }) => {
                    const isActive = path === router.pathname
                    const sx = {
                      my: 2,
                      color: 'white',
                      display: 'block',
                      borderRadius: 0,
                      "& :after": {
                        position: "absolute",
                        bottom: 0,
                        left: "inherit",
                        content: "''",
                        width: "100%",
                        height: 2,
                        opacity: isActive ? 1 : 0,
                        backgroundColor: "white",
                        transition: "0.3s"
                      }
                    }
                    return (
                      <Button
                        key={path}
                        onClick={() => handleNavClick(path)}
                        sx={sx}
                      >
                        {label}
                      </Button>
                    )
                  })}
                  <Button sx={{ mb: -1, ml: 2, p: 0, color: 'white', minWidth: "inherit",  height: 20}}>
                    <Ev3rethTwitterLink />
                  </Button>
                  <Button sx={{ mb: -1, ml: 2, p: 0, filter: "invert(1)", minWidth: "inherit", height: 20 }}>
                    <DiscordLink />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};
export default Navigation;
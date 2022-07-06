import { MouseEventHandler, useEffect, useState } from 'react';
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
import { colors, Tab, Tabs, useMediaQuery } from '@mui/material';
import logoIcon from '../public/logo-small.png'

const pages = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "EV3: Genesis",
    path: "/genesis"
  },
  {
    label: "SNxEV3",
    path: "/snxev3"
  },
  {
    label: "Tune Out",
    path: "/tune-out"
  },
  {
    label: "Collaborations",
    path: "/collaborations"
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
  const [tab, setTab] = useState(0)
  const [anchorElNav, setAnchorElNav] = useState<Element | null>(null);
  const { palette, typography, breakpoints } = useTheme()
  const isTablet = useMediaQuery(breakpoints.down("md"))
  const router = useRouter()
  const {pathname} = router

  useEffect(() => {
    pages.forEach((page, i) => {
      if (pathname === page.path) {
        setTab(i)
      }
    })
  }, [pathname])

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

  const handleLogoClick = () => {
    handleNavClick("/")
  }

  const displayTabs = () => (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end", alignItems: "center" }}>
      <Tabs variant="scrollable" value={tab} indicatorColor="secondary" textColor="inherit"
        TabIndicatorProps={{
          style: {
            bottom: 7,
          }
        }}
      >
        {pages.map(({ label, path }) => (
          <Tab
            key={path}
            onClick={() => handleNavClick(path)}
            label={label}
          />
        ))}
      </Tabs>
      <Button sx={{ mb: -1, ml: 2, p: 0, color: 'white', minWidth: "inherit", height: 20 }}>
        <Ev3rethTwitterLink />
      </Button>
      <Button sx={{ mb: -1, ml: 2, p: 0, filter: "invert(1)", minWidth: "inherit", height: 20 }}>
        <DiscordLink />
      </Button>
    </Box>
  )

  const displayMenu = () => (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end" }}>
      <IconButton
        size="large"
        aria-label="menu icon"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        sx={{ transition: "transform 1s", transform: Boolean(anchorElNav) ? "rotate(-90deg)" : "rotate(0deg)" }}
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
        transitionDuration={{
          enter: 2000,
          exit: 200
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
            boxShadow: "none",
            width: "100%",
            backgroundColor: "transparent",
            color: colors.grey[400]
          }
        }}
      >
        {pages.map(({ label, path }) => (
          <MenuItem
            key={path}
            onClick={() => handleNavClick(path)}
            selected={path === router.pathname}
            sx={{ height: "50px", "&.Mui-selected": { color: "white", borderLeft: "2px solid gray", transition: "1s" } }}
          >
            <Typography textAlign="center">{label}</Typography>
          </MenuItem>
        ))}

        <Box display="flex" gap={3} m={2}>
          <Ev3rethTwitterLink />
          <Box sx={{ filter: "invert(0.7)" }}>
            <DiscordLink />
          </Box>
        </Box>

      </Menu>
    </Box>
  )

  return (
    <>
      <AppBar position="fixed" sx={{ background: palette.primary.light}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters
            sx={{
              height: (Boolean(anchorElNav) && isTablet) ? 380 : 60,
              alignItems: "flex-start",
              transition: "height 1s",
              pt: 1
            }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={2}>
                <Button color="inherit" variant='text' onClick={handleLogoClick} sx={{p:0, ...typography.h6}}>
                  <Image width="35px" height="35px" src={logoIcon} alt="EV3RETH"/>
                </Button>
              </Grid>
              <Grid item xs={10}>
                {isTablet ? displayMenu() : displayTabs()}
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
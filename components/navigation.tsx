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
import { useTheme } from '@mui/material/';
import TwitterIcon from '@mui/icons-material/Twitter';
import Image from 'next/image';
import { colors, Hidden, Tab, Tabs, useMediaQuery } from '@mui/material';
import { DISCORD_LINK, TWITTER_LINK, SMALL_LOGO_LINK } from '../utils/links';
import { useGlobalContext } from '../context/globalProvider';
import { setNfts } from '../context/actions';
import { DiscordIcon } from '../styles/svgs'; 
import logo from '../public/clover-transp.png'

const pages = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Your Gallery",
    path: "/holder-gallery"
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

export const Ev3rethTwitterLink = () => {
  const {palette} = useTheme()
  return (
    <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
      <TwitterIcon fontSize='small' sx={{ fill: palette.background.default }} />
    </a>
  )
}

export const DiscordLink = () => (
  <a href={DISCORD_LINK} target="_blank" rel="noreferrer">
    <DiscordIcon />
  </a>
)

const Navigation: React.FC = () => {
  const { palette, typography, breakpoints } = useTheme()
  const isMenuNav = useMediaQuery(breakpoints.down("lg"))
  const router = useRouter()
  const { state, dispatch } = useGlobalContext()
  const wallet = state.wallet

  const [tab, setTab] = useState(0)
  const [anchorElNav, setAnchorElNav] = useState<Element | null>(null);
  const { pathname } = router


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

  const handleWalletConnection = async () => {
    try {
      if (!wallet) throw new Error("No Wallet Connection Found")
      
      if (wallet.isSignedIn()) {
        await wallet.signOut()
        dispatch(setNfts([]))
        router.replace(router.pathname) //clear urlk params from wallet
      } else {
        await wallet.requestSignIn({}, "EV3RETH")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const displayTabs = () => (
    <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", mr: 2 }}>
      <Tabs variant="scrollable" value={tab} indicatorColor="secondary" textColor="inherit"
        sx={{
        }}
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
            disableRipple
          />
        ))}
      </Tabs>
      <Button sx={{ mb: -1, ml: 2, p: 0, minWidth: "inherit", height: 20 }}>
        <Ev3rethTwitterLink />
      </Button>
      <Button sx={{ mb: -1, ml: 2, p: 0, minWidth: "inherit", height: 20 }}>
        <DiscordLink />
      </Button>
    </Box>
  )

  const displayMenu = () => (
    <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>
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
          display: { xs: 'block', lg: 'none' },
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
            disableRipple
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
              height: (Boolean(anchorElNav) && isMenuNav) ? 420 : 60,
              alignItems: "flex-start",
              transition: "height 1s",
              pt: 1
            }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={2}>
                <Button color="inherit" variant='text' onClick={handleLogoClick} disableRipple sx={{p:0, ...typography.h6}}>
                  <Image width="35px" height="35px" src={logo} alt="EV3RETH" priority/>
                </Button>
              </Grid>
              <Grid item xs={10} display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
                <Hidden lgDown>
                  {displayTabs()}
                </Hidden>
                <Button variant="contained" color="secondary" onClick={handleWalletConnection} sx={{minWidth: 160}}>
                  {wallet?.isSignedIn() ? "Disconnect" : "Connect Wallet"}
                </Button>
                <Hidden lgUp>
                  {displayMenu()}
                </Hidden>
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
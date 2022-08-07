import { useEffect, useMemo, useRef, useState } from "react"
import { alpha, Box, Button, CircularProgress, Divider, Fade, Stack, Typography, useTheme } from "@mui/material"
import { NextPage } from "next"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SwiperDisplay, { SwiperDisplayItem } from "../components/swiper-display"
import { setNfts } from "../context/actions"
import { useGlobalContext } from "../context/globalProvider"
import { getAllEv3rethNftsByOwner } from "../hooks/useContract"
import BannerWrapper from "../components/banner-wrapper";
import SvgCurve from "../components/svgCurve";
import { genesisItems } from "./genesis";
import { snxItems } from "./snxev3";
import { tuneOutDisplayItems } from "./tune-out";
import QuickLinks from "../components/quick-links";



const HolderGallery: NextPage = () => { 
  const { palette } = useTheme()
  const { state, dispatch } = useGlobalContext()
  const { wallet, nfts } = state

  const [displayRows, setDisplayRows] = useState(0)
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const hasFetched = useRef(false)
  
  useEffect(() => {
    if (!wallet?.isSignedIn() || hasFetched.current) return

    setLoading(true);

    (async () => {
      //Fetch owned NFTs and set in state
      const fetchedNfts = await getAllEv3rethNftsByOwner(wallet)
      dispatch(setNfts(fetchedNfts))
      hasFetched.current = true
    })()

    setLoading(false)
  }, [wallet, dispatch])

  const handleConnect = async () => {
    try {
      if (!wallet) throw new Error("No Wallet Connection Found")
      await wallet.requestSignIn({}, "EV3RETH")
    } catch (e) {
      console.log(e)
    }
  }
  
  const displayNfts = useMemo(() => {
    const fullList: SwiperDisplayItem[][] = [[]]
    let i = 0
    nfts?.forEach(nft => {
      const displayNft = {
        url: nft.content.normal,
        hiResUrl: nft.content.hiRes,
        label: nft.title || "",
        isVideo: nft.content.type === "video"
      }

      if (fullList[i].length < 11) {
        fullList[i].push(displayNft)
      } else {
        fullList.push([displayNft])
        i++
      }
    }) 
    return fullList
  }, [nfts])

  const displayTruncated = () => displayNfts.map((row, i) => {
    if (i > displayRows) return null
    return (
      <Fade in={true} timeout={2000} key={"swiper-row-" + i}>
        <Box>
          <SwiperDisplay items={row} />
          <Divider />
        </Box>
      </Fade>
    )
  })

  return (
    <Box component="main">
      <BannerWrapper>
        <Typography variant="h1" mb={3} >
          Personal Gallery
        </Typography>
        <Typography variant="h4" mb={4}>
          Enjoy all your art in one place
        </Typography>
        {wallet?.isSignedIn()
          ? <Typography variant="h6" textTransform={"uppercase"} fontStyle="italic">
            {wallet.getAccountId().replace(".near", "")}
          </Typography>
          : (
          <Button color="secondary" variant="contained" sx={{ mt: 3 }} onClick={handleConnect}>
            Connect Wallet
          </Button>
        )}
      </BannerWrapper>
      <SvgCurve />
      {!!displayRows && (
        <Box pt={5} display="flex" justifyContent="center" sx={{ backgroundColor: alpha(palette.primary.main, 0.2) }}>
          <Button variant="outlined" startIcon={<RemoveIcon />} onClick={() => setDisplayRows(prev => prev - 1)} disabled={displayRows === 0}>
            Display Less
          </Button>
        </Box>
      )}

      {loading || (wallet?.isSignedIn() && !nfts)
        ? <Stack alignItems="center" justifyContent="center" height={550}>
          <CircularProgress />
        </Stack>
        : displayNfts[0].length
          ? displayTruncated()
          : (
            <Fade in={true} timeout={1000}>
              <Box position="relative">
                <Box position="absolute" width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" zIndex={1100}>
                  <Box py={4} px={8} borderRadius={3} sx={{ background: alpha(palette.primary.main, 0.8), boxShadow: "2px 2px 2px rgba(0,0,0,0.5)" }}>
                    {!wallet?.isSignedIn()
                      ? <Typography variant="h4" color="white">
                        Connect wallet to view your art
                      </Typography>
                      : <Stack alignItems="center" spacing={3}>
                        <Typography color="white" maxWidth="400px">
                          Looks like you don&apos;t have any EV3RETH NFTs in this wallet. Check out these secondary market places or join my discord for info on the latest auctions.
                        </Typography>
                        <Button color="secondary" variant="contained" onClick={() => setQuickLinksOpen(true)}>
                          Secondary Market Links
                        </Button>
                      </Stack>
                    }
                  </Box>
                </Box>
                <SwiperDisplay items={[genesisItems[0], tuneOutDisplayItems[0], snxItems[0]]} />
              </Box>
            </Fade>
          )
      }

      <Divider />
      {(wallet?.isSignedIn() && displayNfts.length > displayRows + 1) && (
        <Box py={3} display="flex" justifyContent="center" sx={{ backgroundColor: alpha(palette.primary.main, 0.2) }}>
          <Button
            variant="outlined" startIcon={<AddIcon />} onClick={() => setDisplayRows(prev => prev + 1)} disabled={displayRows > displayNfts.length}>
            Display More
          </Button>
        </Box>
      )}

      <QuickLinks
        onlyMarketLinks
        open={quickLinksOpen}
        onClose={() => setQuickLinksOpen(false)} />
    </Box>
  )
}

export default HolderGallery;
import { useEffect, useMemo, useRef, useState } from "react"
import { alpha, Box, Button, CircularProgress, Divider, Fade, Stack, Typography, useTheme } from "@mui/material"
import { NextPage } from "next"
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
    return nfts?.map(nft => {
      return {
        url: nft.content.normal,
        hiResUrl: nft.content.hiRes,
        label: nft.title || "",
        isVideo: nft.content.type === "video",
        contractId: nft.contractId,
        tokenId: nft.tokenId
      }
    }) 
  }, [nfts])

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
          <Button color="secondary" variant="contained" onClick={handleConnect}>
            Connect Wallet
          </Button>
        )}
      </BannerWrapper>
      <SvgCurve />

      {loading || (wallet?.isSignedIn() && !nfts)
        ? <Stack alignItems="center" justifyContent="center" height={550}>
          <CircularProgress />
        </Stack>
        : displayNfts?.length
          ? <SwiperDisplay items={displayNfts} />
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
                          It looks like you don&apos;t have any EV3RETH NFTs in this wallet. Check out the secondary market or join my discord for info on the latest auctions.
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

      <QuickLinks
        onlyMarketLinks
        open={quickLinksOpen}
        onClose={() => setQuickLinksOpen(false)}
      />
    </Box>
  )
}

export default HolderGallery;
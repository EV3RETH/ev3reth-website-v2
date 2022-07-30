import { Box } from "@mui/material"
import { NextPage } from "next"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/globalProvider"
import useWallet from "../hooks/useWallet"

const HolderGallery: NextPage = () => { 
  // const wallet = useWallet()
  const { state } = useContext(GlobalContext)
  const { wallet, nfts } = state
  console.log("🚀 ~ file: holder-gallery.tsx ~ line 11 ~ nfts", nfts)

  return (
    <Box component="main">
      <h1>GALLERY Coming Soon</h1>
    </Box>
  )
}

export default HolderGallery;
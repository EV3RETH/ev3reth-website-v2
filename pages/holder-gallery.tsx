import { Box } from "@mui/material"
import { NextPage } from "next"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/globalProvider"
import useWallet from "../hooks/useWallet"

const HolderGallery: NextPage = () => { 
  // const wallet = useWallet()
  const { state } = useContext(GlobalContext)
  const { wallet } = state
  const id = wallet?.getAccountId()
  console.log("🚀 ~ file: holder-gallery.tsx ~ line 8 ~ id", id)

  useEffect(() => {
    (async () => {
      if (!id) return
      const collections = await fetch(`https://api.kitwallet.app/account/${id}/likelyNFTs`).then(res => res.json())
      console.log(collections)

    })()
  })

  return (
    <Box component="main">
      <h1>GALLERY Coming Soon</h1>
    </Box>
  )
}

export default HolderGallery;
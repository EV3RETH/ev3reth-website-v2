import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import theme from '../styles/theme'
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import GlobalProvider from '../context/globalProvider';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <title>EV3RETH</title>
        </Head>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp

import Layout from '../component/layout/layout'
import '@/styles/globals.css'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
 
 
import {CartContextProvider} from '../store/product-context'
 

export default function App({ Component, pageProps:{session,...pageProps}, }) {
  return (
    <SessionProvider session={session}> 
    <CartContextProvider>
     
     
     <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <meta
          name='description'
          content='We have African processed food ingridents for export across the world!'
        />
        <link rel="shortcut icon" href="logo.png" type="image/x-icon"></link>
      </Head>
    <Component {...pageProps} />
     
  
   
    </CartContextProvider>
    </SessionProvider>
   
  )

}

 import classes from './checkoutOrShop.module.css'
 import Link from 'next/link'
 import { useContext } from 'react'
 import FavouriteContext from '@/store/favourite-context'
 import EmojiFaceIcon from '@/icons/emojiFace'
 

function FavouritesOrAdd(){
 const favCtx = useContext(FavouriteContext)
   const product = favCtx.favourite.length>0
   
    
    return(
        <div className={classes.bannerButton}>
            <div className={classes.check}>
            {product?(" "):<EmojiFaceIcon/>}
            </div>
           <div className={classes.shop}>
           {""}
           </div>
           
            
        </div>
    )
}

export default FavouritesOrAdd
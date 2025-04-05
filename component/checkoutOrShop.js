 import classes from './checkoutOrShop.module.css'
 import Link from 'next/link'
 import { useContext } from 'react'
 import CartsContext from '@/store/product-context'
 import EmojiFaceIcon from '@/icons/emojiFace'
 

function CheckOutOrShop(){
 const cartCtx = useContext(CartsContext)
   const product = cartCtx.carts.length>0
   
    
    return(
        <div className={classes.bannerButton}>
            <div className={classes.check}>
            {product?(<button><Link href='./checkOut'>Check Out</Link></button>):<EmojiFaceIcon/>}
            </div>
           <div className={classes.shop}>
           <button><Link href='/shop'>Shop More</Link></button>
           </div>
           
            
        </div>
    )
}

export default CheckOutOrShop
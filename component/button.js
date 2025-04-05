import { Fragment } from 'react';
import classes from './button.module.css'
import Link from 'next/link';

const Button = () => {
    return ( 
    <Fragment>
        <div className={classes.bannerButton}>
                <button> <Link href='/shop'>Shop Now</Link></button>
           </div>     
        </Fragment>      
     );
}
 
export default Button;
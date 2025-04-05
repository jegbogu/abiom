import classes from './footer.module.css'
import Logo from './logo';
import Link from 'next/link';
import FacebookIcon from '../../icons/facebook';
import InstagramIcon from '../../icons/instagram';
import EmailIcon from '../../icons/email';
import WhatsappIcon from '../../icons/whatsapp';
 
  
 

const Footer = () => {
    return ( 
        <div className={classes.section}>
              <div className={classes.hr}></div>
        <div className={classes.footer}>
            <div className={classes.menu}>
                     <ul>
                        <li><Link href='/'>Home</Link></li>
                         
                        <li><Link href='/about'>About</Link></li>
                        
                        <li><Link href='/contact'>Contact</Link></li>

                        <li><Link href='/shop'>Shop</Link></li>
                      
                        <li><Link href='https://blog.abiomsupply.com/' target="_blank">Blog</Link></li>
                       
                        <li><Link href='/privacy-policy'>Privacy Policy</Link></li>
                       
                        <li><Link href='/terms-and-condition'>Terms & Condition</Link></li>
                       
                    </ul>
                 
            </div>
            <div className={classes.icons}>
                <p className={classes.rof}>Reach Out & Folow Us:</p>
         
         <span><Link href="https://web.facebook.com/profile.php?id=100091959078750&_rdc=1&_rdr/"><FacebookIcon/></Link> </span> 
         <span><Link href="https://www.instagram.com/abiomsupply/?igshid=ZGUzMzM3NWJiOQ%3D%3D"><InstagramIcon/></Link> </span> 
         <span><Link href="mailto:abiomsupply@gmail.com"><EmailIcon/></Link></span>
         <span><Link href='tel:7137144747'><WhatsappIcon/></Link></span> 
         
          
          
            </div>
            <div className={classes.logo}>
            <Logo/>
            </div>
        </div>
        <p className={classes.copy}>Copyright @Abiom International Supplies</p>
        <p className={classes.design}>Designed and Developed by E. Joseph for Abiom International Supplies</p>
        </div>
     );
}
 
export default Footer;
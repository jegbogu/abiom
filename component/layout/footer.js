import classes from './footer.module.css';
import Logo from './logo';
import Link from 'next/link';
import FacebookIcon from '../../icons/facebook';
import InstagramIcon from '../../icons/instagram';
import EmailIcon from '../../icons/email';
import WhatsappIcon from '../../icons/whatsapp';

const Footer = () => {
  return (
    <footer className={classes.section} aria-label="Footer">
      <div className={classes.hr}></div>
      <div className={classes.footer}>
        {/* Logo */}
        <div className={classes.logo}>
          <Logo />
        </div>

        {/* Navigation */}
        <nav className={classes.menu} aria-label="Footer Navigation">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li>
              <Link href="https://blog.abiomsupply.com/" target="_blank" rel="noopener noreferrer">
                Blog
              </Link>
            </li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-and-condition">Terms & Conditions</Link></li>
          </ul>
        </nav>

        {/* Social & Contact */}
        <div className={classes.icons}>
          <p className={classes.rof}>Reach Out & Follow Us:</p>
          <span>
            <Link href="https://web.facebook.com/profile.php?id=100091959078750&_rdc=1&_rdr/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </Link>
          </span>
          <span>
            <Link href="https://www.instagram.com/abiomsupply/?igshid=ZGUzMzM3NWJiOQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </Link>
          </span>
          <span>
            <Link href="mailto:abiomsupply@gmail.com" aria-label="Email">
              <EmailIcon />
            </Link>
          </span>
          <span>
            <Link href="tel:+17137144747" aria-label="WhatsApp or Call">
              <WhatsappIcon />
            </Link>
          </span>
        </div>
      </div>

      {/* Business Details (optional) */}
      <div className={classes.businessInfo}>
        <p>Abiom International Supplies</p>
        <p>Houston, TX, USA</p>
        <p>Email: <a href="mailto:abiomsupply@gmail.com">abiomsupply@gmail.com</a></p>
        <p>Phone: <a href="tel:+17137144747">+1 (713) 714-4747</a></p>
      </div>

      {/* Legal & Credits */}
      <div className={classes.legal}>
        <p className={classes.copy}>© {new Date().getFullYear()} Abiom International Supplies. All rights reserved.</p>
        <p className={classes.design}>
          <span>Designed by </span>
          <span>
          <Link href="https://www.mediaplur.com/" target="_blank" rel="noopener noreferrer">
            <img src="logo.webp"  width={90} alt="Your Logo" className={classes.logo} />   
          </Link>
          </span>
          
        </p>
      </div>
    </footer>
  );
};

export default Footer;

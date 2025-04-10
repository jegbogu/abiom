import Image from "next/image";
 

const Logo = () => {
    return ( 
      <Image
      src='/brand.webp'
      alt="logo"
      width={120}
      height = {50}
      />

    
     );
}
 
export default Logo;
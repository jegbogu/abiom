import Image from "next/image";
 

const Logo = () => {
    return ( 
      <Image
      src='/brand.webp'
      alt="logo"
      width={140}
      height = {70}
      />

    
     );
}
 
export default Logo;
import Image from "next/image";
 

const Logo = () => {
    return ( 
      <Image
      src='/brand.png'
      alt="logo"
      width={140}
      height = {70}
      />

    
     );
}
 
export default Logo;
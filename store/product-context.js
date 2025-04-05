import { createContext, useState, useEffect } from "react";

const CartsContext = createContext({
    carts:[],
    totalCarts: 0,
    addCarts:(prevUserCarts)=>{},
    removeCart:(productId)=>{},
    firstProd:(productCart)=>{},
   
    totalQty:()=>{}
    
})

export function CartContextProvider(props){
    const[userCarts,setUserCarts] = useState([]);
    const [userAdmin, setUserAdmin] = useState({})
    const[userQty,setUserQty] = useState(0)

    

    const [isHydrated, setIsHydrated] = useState(false); // Track hydration status

    // Load cart from localStorage after the component mounts (only on client-side)
    useEffect(() => {
      if (typeof window !== "undefined") {
        const savedCarts = localStorage.getItem("cart");
        if (savedCarts) {
          setUserCarts(JSON.parse(savedCarts));
        }
        setIsHydrated(true); // Mark that the client has fully hydrated
      }
    }, []);
  
    // Save cart to localStorage whenever userCarts changes
    useEffect(() => {
      if (isHydrated) {
        localStorage.setItem("cart", JSON.stringify(userCarts));
        totalQtyHandler();
      }
    }, [userCarts, isHydrated]);

    function addCartHandler(cartProduct){
        setUserCarts((prevUserCarts)=>{
        return prevUserCarts.concat(cartProduct);
     });
       
    }
   
    
    
    
    
function removeCartHandler(productId){
    setUserCarts(prevUserCarts=>{
        return prevUserCarts.filter(product=>product.id!==productId)
    });

}
function productIsInCartHadler (productId){
    return userCarts.some(product=> product.id===productId);
}

 

function totalQtyHandler (){
  const prodQty =  userCarts.some(el=>el.qty>1)
    
    if(prodQty===false){
        
          return setUserQty(userCarts.length)
    }
    else {
      const cartQty =   userCarts.map((el)=>{
            return el.qty
        }).reduce((acc,cv)=>{
            return  acc+cv
        })
        
        return setUserQty(cartQty)
    }
    
    }
    
 

 
 
const context = {
    carts:userCarts,
    totalCarts:  userQty,
    addCarts: addCartHandler,
    removeCart: removeCartHandler,
    productIsInCart:productIsInCartHadler,
    totalQty: totalQtyHandler,
  
    userAdmin,setUserAdmin
    
}
    return(
        <CartsContext.Provider value={context}>
            {props.children}
        </CartsContext.Provider>
    )
}

export default CartsContext;
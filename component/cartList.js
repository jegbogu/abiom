import classes from './cartList.module.css'
import CartItem from './cartItem'

function CartList(props){
    console.log("cartList",props)
return(
    <ul className={classes.list}>
        {props.products.map((product)=>(
            <CartItem 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            qty={product.qty}
            description={product.description}
            
            />
        ))}
    </ul>
)
}

export default CartList
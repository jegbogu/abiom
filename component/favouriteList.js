import classes from './cartList.module.css'
import FavouriteItem from './favouriteItem'

function FavouriteList(props){
    
return(
    <ul className={classes.list}>
        {props.products.map((product)=>(
            <FavouriteItem 
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

export default FavouriteList
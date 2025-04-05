import classes from './basketList.module.css'
import BasketItem from './basketItem'

function BasketList(props) {
    return (
        <ul className={classes.list}>
            {props.basketProducts.map((product) => (
                <BasketItem
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

export default BasketList
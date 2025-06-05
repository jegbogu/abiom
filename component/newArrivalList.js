import classes from "./productList.module.css";
import ProductItem from "./productItem";

function NewArrivalsList(props) {
  const lengthOfArray = props.products.length;
  const productToMap = props.products.slice(
    lengthOfArray - 5,
    lengthOfArray + 1
  );
  return (
    <ul className={classes.list}>
      {productToMap.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          qty={product.qty}
          nutrition={product.nutrition}
          description={product.description}
        />
      ))}
    </ul>
  );
}

export default NewArrivalsList;

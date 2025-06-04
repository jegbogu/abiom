import classes from "./productList.module.css";
import ProductItem from "./productItem";

function ProductList(props) {
  const productThree = props.products.slice(17, 22);
  const productOne = props.products.slice(9, 12);
  const productTwo = props.products.slice(24, 100);
  const productTo = productThree.concat(productOne, productTwo);

  const productToMap = productTo.slice(5, 10);

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

export default ProductList;

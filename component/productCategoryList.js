import classes from "./productList.module.css";
import ProductItemCategories from "./productItemCategories";

function ProductCategoryList(props) {
  return (
    <ul className={classes.list}>
      {props.products.map((product) => (
        <ProductItemCategories
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

export default ProductCategoryList;

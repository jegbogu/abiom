import { useState } from "react";
import classes from "./productDetail.module.css";
import { useContext } from "react";
import CartContext from "../store/product-context";
import { useRouter } from "next/router";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "./utils/button";

function ProductDetail(props) {
  const router = useRouter();
  const [show, setShow] = useState();
  const [count, setCount] = useState(0);
  const cartCtx = useContext(CartContext);

  function displayCartBtn() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      router.push("/cart");
    } else {
      setShow(!show);
      cartCtx.addCarts({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        price: props.price,
        qty: props.qty,
      });
      setCount(1);
      cartCtx.totalQty();
    }
  }

  function addHandler() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      const prodObj = cartCtx.carts.find((product) => product.id === props.id);
      prodObj.qty = prodObj.qty + 1;
      setCount(count + 1);
      cartCtx.totalQty();
    } else {
      cartCtx.addCarts({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        price: props.price,
        qty: props.qty,
      });

      setCount(count + 1);
      cartCtx.totalQty();
    }
  }

  function subtractHandler() {
    if (count === 0) {
      setCount(0);
      return;
    }
    const prodValue = cartCtx.productIsInCart(props.id);
    const prodObj = cartCtx.carts.find((product) => product.id === props.id);
    const checkQty = prodObj.qty;
    if (prodValue && checkQty === 1) {
      cartCtx.removeCart(props.id);
      prodObj.qty = prodObj.qty - 1;
      setCount(0);
      cartCtx.totalQty();
    } else if (prodValue && checkQty > 1) {
      prodObj.qty = prodObj.qty - 1;
      setCount(count - 1);
      cartCtx.totalQty();
    }
  }
  function toSentenceCaseMulti(text) {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  }

  function toList(text) {
    return text
      .split("\n")
      .filter((item) => item.trim() !== "")
      .map((item) => item.replace(/^•\s*/, "").trim());
  }

  const highlights = toList(props.description);
  const nutrition = toList(props.nutrition);

  return (
    <div className={classes.productDetail}>
      <section className={classes.section}>
        <div className={classes.figure}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.description}>
          <span className={classes.price}>$ {props.price}</span>
          <div className={classes.details}>
            <div className={classes.article}>
              <h1 className={classes.title}>{props.title}</h1>
              {props.nutrition !== "--" && (
                <>
                  <span>
                    <h1>Nutrition</h1>
                    <ChevronUp size={20} />
                  </span>
                  <div className={classes.highlights}>
                    <h3 className="font-semibold">Contents</h3>
                    <ul>
                      {nutrition.map((item, index) => (
                        <li key={index} className="font-normal">
                          {toSentenceCaseMulti(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <span>
                <h1>Item details</h1>
                <ChevronUp size={20} />
              </span>
              <div className={classes.highlights}>
                <h3 className="font-semibold">Highlights</h3>
                <ul>
                  {highlights.map((item, index) => (
                    <li key={index} className="font-normal">
                      {toSentenceCaseMulti(item)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />

            <hr />
          </div>

          <div className={classes.btn}>
            {show ? (
              <div className={classes.cartBtn}>
                <div className={classes.cartBtnOne}>
                  <Button size="md" variant="default" onClick={addHandler}>
                    +
                  </Button>
                </div>
                <div className={classes.cartBtnTwo}>
                  <Button size="md" variant="default">
                    {count}
                  </Button>
                </div>
                <div className={classes.cartBtnThree}>
                  <Button size="md" variant="default" onClick={subtractHandler}>
                    -
                  </Button>
                </div>
              </div>
            ) : (
              <button onClick={displayCartBtn}>Add to Cart</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;

import { useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./productCarousel.module.css";

import Spinner from "../icons/spinner";
import CartContext from "../store/product-context";
import CartIcon from "@/icons/cartIcon";
import Button from "./utils/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProductCarousel({ title, products }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const stockFish = products.slice(13, 17);
  const productOne = products.slice(0, 9);
  const productTwo = products.slice(22, 23);

  const productTomap = productOne.concat(stockFish, productTwo);

  return (
    <div className="p-4">
      <div className={classes.header}>
        {title}
        <div className={classes.carouselBtns}>
          <Button size="icon" onClick={() => scroll("left")}>
            <ArrowLeft size={20} />
          </Button>
          <Button size="icon" onClick={() => scroll("right")}>
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
      <div className={classes.carouselWrapper}>
        <div className={classes.carouselContainer} ref={carouselRef}>
          {productTomap.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductItem(props) {
  const [spinner, setSpinner] = useState(false);
  const [show, setShow] = useState(false);

  const [count, setCount] = useState(0);
  const cartCtx = useContext(CartContext);
  const router = useRouter();

  function showDetailsHandler() {
    setSpinner(<Spinner />);
    router.push("/shop/" + props.product.id);
  }

  function displayCartBtn() {
    const prodValue = cartCtx.productIsInCart(props.product.id);
    if (prodValue) {
      router.push("/cart");
    } else {
      setShow(!show);
      cartCtx.addCarts({
        id: props.product.id,
        title: props.product.title,
        description: props.product.description,
        image: props.product.image,
        price: props.product.price,
        qty: props.product.qty,
      });
      setCount(1);
      //  console.log(cartCtx.carts)
      cartCtx.totalQty();
    }
  }

  function addHandler() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      const prodObj = cartCtx.carts.find(
        (product) => product.id === props.product.id
      );
      prodObj.qty = prodObj.qty + 1;
      setCount(count + 1);
      cartCtx.totalQty();
    } else {
      cartCtx.addCarts({
        id: props.product.id,
        title: props.product.title,
        description: props.product.description,
        image: props.product.image,
        price: props.product.price,
        qty: props.product.qty,
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
    const prodValue = cartCtx.productIsInCart(props.product.id);
    const prodObj = cartCtx.carts.find(
      (product) => product.id === props.product.id
    );
    const checkQty = prodObj.qty;
    if (prodValue && checkQty === 1) {
      cartCtx.removeCart(props.product.id);
      prodObj.qty = prodObj.qty - 1;
      setCount(0);
      cartCtx.totalQty();
    } else if (prodValue && checkQty > 1) {
      prodObj.qty = prodObj.qty - 1;
      setCount(count - 1);
      cartCtx.totalQty();
    }
  }

  let showCart;
  const prodValue = cartCtx.productIsInCart(props.id);
  if (prodValue) {
    const prodObj = cartCtx.carts.find(
      (product) => product.id === props.product.id
    );
    const checkQty = prodObj.qty;
    showCart = (
      <div className={classes.cart}>
        {" "}
        <CartIcon />
        {checkQty}
      </div>
    );
  }

  return (
    <div className={classes.productItem}>
      <div className={classes.item}>
        <div className={classes.figure}>
          <img
            src={props.product.image}
            alt={props.product.title}
            width={220}
            height={220}
          />
        </div>

        <div className={classes.itemBody}>
          <h3 className="productTitle">{props.product.title}</h3>
          <p className="actualPrice">$ {props.product.price}</p>
          <div className="flex gap-2">
            {show ? (
              <div className={classes.cartBtn}>
                <div className={classes.cartBtnOne}>
                  <button onClick={addHandler}>+</button>
                </div>
                <div className={classes.cartBtnTwo}>
                  <button>{count}</button>
                </div>
                <div className={classes.cartBtnThree}>
                  <button onClick={subtractHandler}>-</button>
                </div>
              </div>
            ) : (
              <Button variant="default" onClick={displayCartBtn}>
                Add to Cart
              </Button>
            )}

            <Button variant="outline" onClick={showDetailsHandler}>
              Show Details{spinner}
            </Button>
          </div>
        </div>
        {showCart}
      </div>
    </div>
  );
}

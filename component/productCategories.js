import { useRef } from "react";
import classes from "./productCategories.module.css";
import { useRouter } from "next/router";

const products = [
  {
    id: 1,
    name: "Home Appliances",
    image: "/blender.avif",
    link: `/product_categories/home appliences`,
  },
  {
    id: 2,
    name: "Food and Soup",
    image: "/Whole Ogbonor seed 2 M.png",
    link: `/product_categories/food and soup`,
  },
  {
    id: 3,
    name: "Basket",
    image: "/gift-basket.avif",
    link: `/product_categories/basket`,
  },
  {
    id: 4,
    name: "Drinks",
    image: "/close-up-wine-bottle-glass_23-2148673781.avif",
    link: `/product_categories/drinks`,
  },
  {
    id: 5,
    name: "Cooking Oil",
    image: "/avocado pear oil.webp",
    link: `/product_categories/cooking oil`,
  },
  {
    id: 6,
    name: "Grains and Pasta",
    image: "/garri.avif",
    link: `/product_categories/grains and pasta`,
  },
];

export default function ProductCategories() {
  const router = useRouter();
  return (
    <div className={classes.carouselWrapper}>
      <div className={classes.carouselContainer}>
        <div className={classes.carousel}>
          {products.map((product) => (
            <div
              key={product.id}
              className={classes.productCard}
              onClick={() => {
                router.push(product.link);
              }}
            >
              <div className={classes.figure}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={classes.productImage}
                  width={242.7}
                  height={242.7}
                />
              </div>
              <p className={classes.productName}>
                <Link href={product.link}>{product.name}</Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

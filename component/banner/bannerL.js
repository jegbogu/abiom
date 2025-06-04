import Image from "next/image";
import classes from "./bannerL.module.css";
import { useRouter } from "next/router";
import Button from "../utils/button";

const BannerL = () => {
  const router = useRouter();
  return (
    <div className={classes.banner}>
      <section className={`homeSection ${classes.bannerSection} !mt-0`}>
        <div
          className={classes.bannerOne}
          onClick={() => {
            router.push(`/product_categories/basket`);
          }}
        >
          <div className={classes.bannerOneWriteUp}>
            <h3>Best Birthday yet!</h3>
            <p>Give a gift that says, "I get you"</p>
            <div>
              <Button size="lg">
                <a href={`/product_categories/basket`}> Shop Special</a>
              </Button>
            </div>
          </div>
          <div className={classes.bannerImage}>
            <Image
              src="/table-with-lemons-chair_23-2148450530.avif"
              alt="Cupcake Still Life"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div
          className={classes.bannerTwo}
          onClick={() => {
            router.push(`/product_categories/home appliences`);
          }}
        >
          <div className={classes.bannerImageTwo}>
            <Image
              src="/prod1.png"
              alt="Cupcake Still Life"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h3>
            Great deals from <br></br>small shops
          </h3>
          <p
            onClick={() => {
              router.push(`/product_categories/home appliences`);
            }}
          >
            Shop now
          </p>
        </div>
      </section>
    </div>
  );
};

export default BannerL;

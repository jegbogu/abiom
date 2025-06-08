import { useRouter } from "next/router";
import { useState, useEffect, useRef,useContext } from "react";
import Cart from "./cart";
import Logo from "./logo";
import LogoMobile from "./logoMobile";
 
import Hamburger from "./hamburger";
import Favourite from "./favourite";
import Gift from "./gift";
import SearchIcon from "@/icons/search";
import classes from "./main-navigation.module.css";
 
import CartsContext from '../../store/product-context'
import TrashIcon from "@/icons/trash";
import SearchIconMobile from "@/icons/searchMobile";

const MainNavigation = ({ categories, products }) => {
    const [showCategory, setShowCategory] = useState(false);
    const [getCategory, setGetCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const categoryDropdownDesktopRef = useRef(null);
    const categoryDropdownMobileRef = useRef(null)
    const searchDropdownDesktopRef = useRef(null);
    const searchDropdownMobileRef = useRef(null);
    const searchInputRef = useRef(null);
    const router = useRouter();
    const [userCarts, setUserCarts] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);  

    const cartCtx = useContext(CartsContext)



 // Load from localStorage
 useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCarts = localStorage.getItem("cart");
      if (savedCarts) {
        setUserCarts(JSON.parse(savedCarts));
      }
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(userCarts));
     
    }
  }, [userCarts, isHydrated]);


    let cart = cartCtx.carts

     

    let cartTotalQty;
    const prodQty = cartCtx.carts.some(el => el.qty > 1)
    if (prodQty) {
        const cartQty = cart.map((el) => {
            return el.qty
        }).reduce((acc, cv) => {
            return acc + cv
        })
        cartTotalQty = cartQty
    } else if (prodQty === false) {
        cartTotalQty = cart.length
    }

    let totalCartdiv
    let content;
  
    if (cartCtx.carts.length > 0) {

        content = <div onClick={deleteCartHandler} className={classes.deleteCart}>
            <TrashIcon />
           
            </div>
            totalCartdiv = <div className={classes.totalCarts}>{cartTotalQty}</div>
    }

    

   

    function deleteCartHandler() {
        while (cart.length != 0) {
            cart.pop()
            if (cart.length == 0) {
                router.reload('/cart')
                break;
            }
        }
        localStorage.removeItem("cart"); // Clear cart from localStorage
         
    };







    // Toggle category dropdown
    const toggleCategoryDropdown = () => {
        setShowCategory((prev) => !prev);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickOutsideCategoryDropdown =
                (!categoryDropdownDesktopRef.current || !categoryDropdownDesktopRef.current.contains(event.target)) &&
                (!categoryDropdownMobileRef.current || !categoryDropdownMobileRef.current.contains(event.target));
    
            if (isClickOutsideCategoryDropdown) {
                setShowCategory(false);
            }
    
            const isClickOutsideSearchDropdown =
                (!searchDropdownDesktopRef.current || !searchDropdownDesktopRef.current.contains(event.target)) &&
                (!searchDropdownMobileRef.current || !searchDropdownMobileRef.current.contains(event.target));
    
            if (isClickOutsideSearchDropdown) {
                setFilteredProducts([]);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    

    const handleGetCategory = (category) => {
       
        setGetCategory(category);
        setShowCategory(false);
       
        router.push("/product_categories/" + encodeURIComponent(category));
    };
    
    // Search function
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (!term.trim()) {
            setFilteredProducts([]);
            return;
        }

        const uniqueCategories = [...new Set(products.map((el) => el.category))];

        const filteredProducts = products.filter(
            (el) => el.title.toLowerCase().includes(term) || el.category.toLowerCase().includes(term)
        );

        const filteredCategories = uniqueCategories.filter((category) =>
            category.toLowerCase().includes(term)
        );

        setFilteredProducts([...filteredProducts, ...filteredCategories]);
    };
 
const prodFnc = (product) =>{
     
    router.push(`/shop/${product.id}`)
}
const categoryFnc = (product) =>{
    router.push("/product_categories/" + product);
}
    return (
      <div>
        <div className={classes.desktop}>
          <div className={classes.header}>
            <div className={classes.headerLogo}>
              <a href="/">
                <Logo />
              </a>
            </div>

            <div
              className={classes.headerHamCategories}
              onClick={toggleCategoryDropdown}
            >
              <div className={classes.headerHamburger}>
                <Hamburger />
              </div>
              <div className={classes.headerCategories}>
                <p>Categories</p>
              </div>
            </div>

            <div className={classes.headerSearch}>
              <input
                type="text"
                placeholder="Search for anything"
                ref={searchInputRef}
                onChange={handleSearch}
              />
              <button>
                <SearchIcon />
              </button>

              {/* Display search results */}
              {filteredProducts.length > 0 && (
                <div
                  className={classes.searchResults}
                  ref={searchDropdownDesktopRef}
                >
                  <ul>
                    {filteredProducts.map((product, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          categories.includes(product)
                            ? categoryFnc(product)
                            : prodFnc(product)
                        }
                      >
                        <a href="#">{product.title || product}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={classes.headerUsers}>
              <div className={classes.headerItem}>
                <div className={classes.headerFavourite}>
                  <a href={"/favourites"}>
                    {" "}
                    <Favourite />{" "}
                  </a>{" "}
                </div>
                <div className={classes.headerFavouriteHover}>Favourite</div>
              </div>

              <div className={classes.headerItem}>
                <div className={classes.headerGift}>
                  <a href={`/product_categories/basket`}>
                    <Gift />
                  </a>{" "}
                </div>
                <div className={classes.headerGiftHover}> Gift</div>
              </div>

              <div className={classes.headerItem}>
                <div className={classes.headerCart}>
                  <a href="/cart">
                    <Cart />
                  </a>{" "}
                </div>
                {totalCartdiv}
                {content}
              </div>
            </div>
          </div>

          <div className={classes.items}>
            <div>
              <p>
                <a href={`/product_categories/basket`}>Gifts</a>{" "}
              </p>
            </div>
            <div>
              <p>
                <a href={`/product_categories/food and soup`}>Sellers Deal</a>{" "}
              </p>
            </div>
            <div>
              <p>
                <a href={`/product_categories/home appliences`}>
                  Home Favourites{" "}
                </a>
              </p>
            </div>
            <div>
              <p>
                <a a href={`/shop`}>
                  All Products{" "}
                </a>
              </p>
            </div>
          </div>

          {/* Category Dropdown */}
          {showCategory && (
            <div
              className={classes.categoryDropdown}
              ref={categoryDropdownDesktopRef}
            >
              <ul>
                {categories && categories.length > 0 ? (
                  categories.map((category, index) => {
                    let transCategory;
                    if (category.includes("and")) {
                      const [fname, sname] = category
                        .split("and")
                        .map((str) => str.trim());
                      transCategory = `${fname[0].toUpperCase()}${fname.slice(
                        1
                      )} and ${sname[0].toUpperCase()}${sname.slice(1)}`;
                    } else if (category.includes(" ")) {
                      const [fname, sname] = category
                        .split(" ")
                        .map((str) => str.trim());
                      transCategory = `${fname[0].toUpperCase()}${fname.slice(
                        1
                      )} ${sname[0].toUpperCase()}${sname.slice(1)}`;
                    } else {
                      transCategory = `${category[0].toUpperCase()}${category.slice(
                        1
                      )}`;
                    }
                    return (
                      <li
                        key={index}
                        onMouseDown={() => handleGetCategory(category)}
                      >
                        {transCategory}
                      </li>
                    );
                  })
                ) : (
                  <li>No Categories Available</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* THIS IS FOR MOBILE VIEW */}
        <div className={classes.mobile}>
          <div className={classes.mobileHeader}>
            <div
              className={classes.headerHamCategories}
              onClick={toggleCategoryDropdown}
            >
              <div className={classes.headerHamburger}>
                <Hamburger />
              </div>
            </div>
            <div className={classes.headerLogo}>
              <a href="/">
                <LogoMobile />
              </a>
            </div>
            <div className={classes.headerSearch}>
              <input
                type="text"
                placeholder="Search"
                ref={searchInputRef}
                onChange={handleSearch}
              />
              <button>
                <SearchIconMobile />
              </button>

              {/* Display search results */}
              {filteredProducts.length > 0 && (
                <div
                  className={classes.searchResults}
                  ref={searchDropdownMobileRef}
                >
                  <ul>
                    {filteredProducts.map((product, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          categories.includes(product)
                            ? categoryFnc(product)
                            : prodFnc(product)
                        }
                      >
                        <a href="#">{product.title || product}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={classes.headerUsers}>
              <div className={classes.headerItem}>
                <div className={classes.headerFavourite}>
                  <Favourite />
                </div>
              </div>

              <div className={classes.headerItem}>
                <div className={classes.headerGift}>
                  <a href={`/product_categories/basket`}>
                    <Gift />
                  </a>{" "}
                </div>
              </div>

              <div className={classes.headerItem}>
                <div className={classes.headerCart}>
                  <a href="/cart">
                    <Cart />
                  </a>{" "}
                </div>
                {totalCartdiv}
                {content}
              </div>
              {/* Category Dropdown */}
              {showCategory && (
                <div
                  className={classes.categoryDropdown}
                  ref={categoryDropdownMobileRef}
                >
                  <ul>
                    {categories && categories.length > 0 ? (
                      categories.map((category, index) => {
                        let transCategory;
                        if (category.includes("and")) {
                          const [fname, sname] = category
                            .split("and")
                            .map((str) => str.trim());
                          transCategory = `${fname[0].toUpperCase()}${fname.slice(
                            1
                          )} and ${sname[0].toUpperCase()}${sname.slice(1)}`;
                        } else if (category.includes(" ")) {
                          const [fname, sname] = category
                            .split(" ")
                            .map((str) => str.trim());
                          transCategory = `${fname[0].toUpperCase()}${fname.slice(
                            1
                          )} ${sname[0].toUpperCase()}${sname.slice(1)}`;
                        } else {
                          transCategory = `${category[0].toUpperCase()}${category.slice(
                            1
                          )}`;
                        }
                        return (
                          <li
                            key={index}
                            onClick={() => handleGetCategory(category)}
                          >
                            {transCategory}
                          </li>
                        );
                      })
                    ) : (
                      <li>No Categories Available</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default MainNavigation;

import { createContext, useState, useEffect } from "react";

const FavouriteContext = createContext({
  favourite: [],
  totalFavourite: 0,
  addFavourite: (favouriteProduct) => {},
  removeFavourite: (productId) => {},
  isFavourite: (productId) => {},
  totalQty: () => {}
});

export function FavouriteContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);
  const [userQty, setUserQty] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration status

  // Load favourites from localStorage after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavourites = localStorage.getItem("favourite");
      if (savedFavourites) {
        setUserFavourites(JSON.parse(savedFavourites));
      }
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("favourite", JSON.stringify(userFavourites));
      totalQtyHandler();
    }
  }, [userFavourites, isHydrated]);

  function addFavouriteHandler(favouriteProduct) {
    setUserFavourites((prevFavourites) => {
      return prevFavourites.concat(favouriteProduct);
    });
  }

  function removeFavouriteHandler(productId) {
    setUserFavourites((prevFavourites) => {
      return prevFavourites.filter((product) => product.id !== productId);
    });
  }

  function isFavouriteHandler(productId) {
    return userFavourites.some((product) => product.id === productId);
  }

  function totalQtyHandler() {
    const hasQty = userFavourites.some((el) => el.qty > 1);

    if (!hasQty) {
      return setUserQty(userFavourites.length);
    } else {
      const total = userFavourites
        .map((el) => el.qty)
        .reduce((acc, val) => acc + val, 0);
      return setUserQty(total);
    }
  }

  const context = {
    favourite: userFavourites,
    totalFavourite: userQty,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    isFavourite: isFavouriteHandler,
    totalQty: totalQtyHandler
  };

  return (
    <FavouriteContext.Provider value={context}>
      {props.children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContext;

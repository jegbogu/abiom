import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/component/layout/layout';
import { MongoClient } from 'mongodb';
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalCardFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import CartsContext from '../store/product-context';
import classes from './checkOut.module.css';
import CheckOutOrShop from '@/component/checkoutOrShop';

function CheckOut(props) {
  const cartCtx = useContext(CartsContext);
  const [price, setPrice] = useState(0);
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    adminArea1: '',
    adminArea2: '',
    countryCode: '',
    postalCode: '',
  });

  const cart = cartCtx.carts;
  const products = cart.length > 0;

  useEffect(() => {
    const total = cart.reduce((acc, el) => acc + Number(el.price * el.qty), 0);
    setPrice(total);
  }, [cart]);

  const initialOptions = {
"client-id": process.env.PAYPAL_CLIENT_ID,
  currency: "USD",
  components: "buttons,card-fields"
};

  const createOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await response.json();
    return data.id;
  };

  const onApprove = async (data) => {
  const response = await fetch(`/api/orders/${data.orderID}/capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      billingAddress,
      cart, // ✅ send purchased items
    }),
  });

  const orderData = await response.json();
  // console.log("Order captured:", orderData);
};


  const handleBillingAddressChange = (field, value) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout categories={props.categories} products={props.products}> 
    <div className={classes.checkout}>
      {products ? (
        <div className={classes.section}>
          <h3>
            Your Total Amount is <span className={classes.amount}>${price.toFixed(2)}</span>
          </h3>

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              style={{ layout: 'vertical', label: 'paypal', color: 'gold' }}
            />

            <PayPalCardFieldsProvider createOrder={createOrder} onApprove={onApprove}>
              <div className={classes.cardFields}>
                <PayPalNameField />
                <PayPalNumberField />
                <PayPalExpiryField />
                <PayPalCVVField />
              </div>

              <div className={classes.billingForm}>
                <input placeholder="Address line 1" onChange={(e) => handleBillingAddressChange("addressLine1", e.target.value)} />
                <input placeholder="Address line 2" onChange={(e) => handleBillingAddressChange("addressLine2", e.target.value)} />
                <input placeholder="Admin Area 1" onChange={(e) => handleBillingAddressChange("adminArea1", e.target.value)} />
                <input placeholder="Admin Area 2" onChange={(e) => handleBillingAddressChange("adminArea2", e.target.value)} />
                <input placeholder="Country Code" onChange={(e) => handleBillingAddressChange("countryCode", e.target.value)} />
                <input placeholder="Postal Code" onChange={(e) => handleBillingAddressChange("postalCode", e.target.value)} />
              </div>

              <SubmitPayment billingAddress={billingAddress} />
            </PayPalCardFieldsProvider>
          </PayPalScriptProvider>

          <div className={classes.figure}>
            <img src='payment.png' alt='payment portal' width={180} />
          </div>
        </div>
      ) : (
        <CheckOutOrShop />
      )}
    </div>
    </Layout>
  );
}
const SubmitPayment = ({ billingAddress }) => {
  const { cardFieldsForm } = usePayPalCardFields();
  const [isPaying, setIsPaying] = useState(false);

  const handleClick = async () => {
    if (!cardFieldsForm) {
      alert("Payment form is not ready");
      return;
    }

    const formState = await cardFieldsForm.getState();
    if (!formState.isFormValid) {
      alert("Card form is invalid. Please fill in all required fields.");
      return;
    }

    setIsPaying(true);

    try {
      const result = await cardFieldsForm.submit({
        billingAddress: {
          address: {
            address_line_1: billingAddress.addressLine1,
            address_line_2: billingAddress.addressLine2,
            admin_area_1: billingAddress.adminArea1,
            admin_area_2: billingAddress.adminArea2,
            postal_code: billingAddress.postalCode,
            country_code: billingAddress.countryCode,
          }
        },
        options: {
          debug: true
        }
      });

      console.log("✅ cardFieldsForm.submit result:", result);
    } catch (err) {
      console.error("❌ Error during card submission:", err);
      alert("Payment failed. Please verify your card and billing details.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isPaying} className={classes.payButton}>
      {isPaying ? "Processing..." : "Pay"}
    </button>
  );
};

// const SubmitPayment = ({ billingAddress }) => {
//   const { cardFieldsForm } = usePayPalCardFields();
//   const [isPaying, setIsPaying] = useState(false);

//   const handleClick = async () => {
//     if (!cardFieldsForm) return alert("Form not found");
//     const formState = await cardFieldsForm.getState();
//     if (!formState.isFormValid) return alert("Form is invalid");

//     setIsPaying(true);
//     cardFieldsForm.submit({ billingAddress }).catch(() => {
//       setIsPaying(false);
//     });
//   };

//   return (
//     <button onClick={handleClick} disabled={isPaying} className={classes.payButton}>
//       {isPaying ? "Processing..." : "Pay"}
//     </button>
//   );
// };

export default CheckOut;

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.DB);
  const db = client.db();
  const productsCollection = db.collection("products");

  // Fetch all products
  const products = await productsCollection
    .find({}, { projection: { _id: 1, title: 1, price: 1, category: 1, image: 1, nutrition: 1, description: 1, qty: 1 ,outOfStock:1} })
    .toArray();

  // Fetch distinct categories
  const categories = await productsCollection.distinct("category");

  client.close();

  return {
    props: {
      products: products.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        nutrition: product.nutrition,
        description: product.description,
        outOfStock: product.outOfStock,
        qty: Number(product.qty),
      })),
      basketProducts: products
        .filter((product) => product.category === "basket") // Filter in-memory
        .map((product) => ({
          id: product._id.toString(),
          title: product.title,
          price: product.price,
          category: product.category,
          image: product.image,
          nutrition: product.nutrition,
          description: product.description,
          outOfStock: product.outOfStock,
          qty: Number(product.qty),
        })),
      categories,  
    },
  };
}
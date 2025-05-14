// /pages/api/orders.js

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("PayPal token error:", data);
    throw new Error("Could not authenticate with PayPal");
  }

  return data.access_token;
}

export default async function handler(req, res) {
  try {
    const { cart } = req.body;
    // console.log("Cart data:", cart);

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const auth = await getPayPalAccessToken();

    const response = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
      }),
    });

    const data = await response.json();
console.log("Create order response:", data);
    if (!response.ok) {
      console.error("Create order failed:", data);
      return res.status(500).json({ error: data });
    }

    res.status(200).json({ id: data.id });
  } catch (err) {
    console.error("Error creating PayPal order:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

// /pages/api/orders/[orderID]/capture.js
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { orderID } = req.query;
  const { billingAddress, cart } = req.body;

  try {
    const accessToken = await getPayPalAccessToken();

    const captureRes = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await captureRes.json();
    console.log("Capture response:", data);

    if (!captureRes.ok) {
      console.error("Capture failed:", data);
      return res.status(500).json({ error: data });
    }

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Connect to MongoDB and log the order
    const client = await MongoClient.connect(process.env.DB);
    const db = client.db();
    const ordersCollection = db.collection("orders");

    await ordersCollection.insertOne({
      orderID,
      capturedAt: new Date(),
      billingAddress,
      cart,
      paypalData: data,
      payer: data.payer,
      purchase_units: data.purchase_units,
      status: data.status,
    });

    client.close();

    // Send Order Confirmation Email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create the email content
    const emailContent = `
      <h1>Thank you for your order!</h1>
      <p><strong>Order ID:</strong> ${orderID}</p>
      <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
      <h3>Billing Address</h3>
      <p>${billingAddress.addressLine1}</p>
      <p>${billingAddress.addressLine2}</p>
      <p>${billingAddress.adminArea1}</p>
      <p>${billingAddress.adminArea2}</p>
      <p>${billingAddress.countryCode}</p>
      <p>${billingAddress.postalCode}</p>
      <h3>Order Details</h3>
      <ul>
        ${cart.map(item => `
          <li>
            ${item.title} x ${item.qty} - $${(item.price * item.qty).toFixed(2)}
          </li>
        `).join('')}
      </ul>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"Your Shop" <${process.env.EMAIL_USER}>`,
      to: data.payer.email_address,
      subject: "Order Confirmation",
      html: emailContent,
    });

    res.status(200).json(data);

  } catch (err) {
    console.error("Capture error:", err);
    res.status(500).json({ error: "Something went wrong while capturing and logging payment" });
  }
}

 
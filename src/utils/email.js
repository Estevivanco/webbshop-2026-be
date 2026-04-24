import { Resend } from "resend";

const FRONTEND_URL = "https://webbshop-2026-fe.vercel.app/";
const resend = new Resend("re_cLs3WYvU_BfU44FYft3aQxAA6G68A4cPV");

export const sendOrderRecieved = async (order, user) => {
    console.log("Sending to:", user?.email, "User object:", user);

  const result = await resend.emails.send({
    //Temporary email testing
    from: "onboarding@resend.dev",
    to: "daviddahlgren@gmail.com",
    subject: "Order recieved",
    html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="font-size: 24px; padding-bottom: 6px;">
              Hello ${user.firstName}, we are currently reviewing your order!
            </h1>
            <p style="font-size: 14px;">  
              You will recieve an update when the order is confirmed.</p>
              <p style="font-size: 14px;"><i>Kind regards, the Sole Search team.</i></p>
             <h2 style="font-size: 18px; margin-top: 24px;">Order Summary</h2>
            <ul style="list-style: none; padding: 0;">
                ${order.items
                  .map(
                    (item) => `
                    <li style="padding: 8px 0; border-bottom: 1px solid black;">
                      ${item.product.name}, size ${item.size}: á ${item.unitPrice} kr
                    </li>
                    `,
                  )
                  .join("")}
            </ul>
            <p style="font-size: 14px;"><strong>Order Total:</strong> ${order.orderTotal} kr</p>
          </div>
    `,
  });
  console.log(result);
};

export const sendOrderConfirmation = async (order, user) => {
  await resend.emails.send({
    //Temporary email testing
    from: "onboarding@resend.dev",
    to: "daviddahlgren@gmail.com",
    subject: `Order confirmation # ${order._id}`,
    html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="font-size: 24px; padding-bottom: 6px;">
              Thank you for shopping at Sole Search ${user.firstName}!
            </h1>
              <p style="font-size: 14px;"> 
                Your order <i>#${order._id}</i> is being processed for shipping.</p>
              <p style="font-size: 14px;">
                If you have any questions or wish to change or cancel your order, please contact us as soon as possible.</p>
                <p style="font-size: 14px;"><i>Kind regards, the Sole Search team.</i></p>
            <h2 style="font-size: 18px; margin-top: 24px;">Order Summary</h2>
            <ul style="list-style: none; padding: 0;">
                ${order.items
                  .map(
                    (item) => `
                    <li style="padding: 8px 0; border-bottom: 1px solid black;">
                      ${item.product.name}, size ${item.size}: á ${item.unitPrice} kr
                    </li>
                    `,
                  )
                  .join("")}
            </ul>
            <p style="font-size: 14px;">Order Total: ${order.orderTotal} kr</p>
              <a href="${FRONTEND_URL}/orders/${order._id}/track"
                 style="display: inline-block; padding: 12px 24px; text-decoration: none; font-size: 14px; border: none;">
                Track you order
              </a>
          </div>
        `,
  });
};

export const sendOrderShipped = async (order, user) => {
  await resend.emails.send({
    //Temporary email testing
    from: "onboarding@resend.dev",
    to: "daviddahlgren@gmail.com",
    subject: `Your order has beed shipped out for delivery!`,
    html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="font-size: 24px; padding-bottom: 6px;">
              Hello ${user.firstName}!
            </h1>
            <p style="font-size: 14px;"> Your order <i>#${order._id}</i> has been shipped out and will be delivered to your adress.</p>
             <p style="font-size: 14px;">If you have any questions, please contact us.</p>
             <p style="font-size: 14px;"><i>Kind regards, the Sole Search team.</i></p>
              <a href="${FRONTEND_URL}/orders/${order._id}/track"
                 style="display: inline-block; padding: 12px 24px; text-decoration: none; font-size: 14px; border: none;">
                Track you order
              </a>
        `,
  });
};

export const sendOrderDelivered = async (order, user) => {
  await resend.emails.send({
    //Temporary email testing
    from: "onboarding@resend.dev",
    to: "daviddahlgren@gmail.com",
    subject: `Your order has beed delivered!`,
    html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="font-size: 24px; padding-bottom: 6px;">
              Hi <strong>${user.firstName} </strong> and thank's again for shopping at Sole Search!
            </h1>
            <p style="font-size: 14px;"> Your order <i>#${order._id}</i> has been been delivered. Please rate and review our site and enjoy your brand new sneakers!</p>
            <p style="font-size: 14px;">If you have any questions, please contact us.</p>
            <p style="font-size: 14px;"><i>Kind regards, the Sole Search team.</i></p>
          </div>
        `,
  });
};

export const sendOrderCancellation = async (order, user) => {
  await resend.emails.send({
    //Temporary email testing
    from: "onboarding@resend.dev",
    to: "daviddahlgren@gmail.com",
    subject: `Your order #${order._id} has been cancelled.`,
    html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h1 style="font-size: 24px; padding-bottom: 6px;">
              Your order has been cancelled!
            </h1>
            <p style="font-size: 14px;">Hi <strong>${user.firstName}</strong>, your order <i>#${order._id}</i> has been cancelled.</p>
            <p style="font-size: 14px;">If you have any questions, please contact us.</p>
          </div>
        `,
  });
};

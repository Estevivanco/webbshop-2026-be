import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderRecieved = async (order, user) => {
  const result = await resend.emails.send({
    //Temporary email testing
    from: "onboarding@resend.dev",
    to: "hej@millenialmuzik.se",
    subject: "Order recieved",
    html: `
    <p> Hello ${user.firstName}, we are currently reviewing your order. 
        You will recieve an update when the order is confirmed!</p>
            <h2>Order Summary</h2>
            <ul>
                ${order.items
                  .map(
                    (item) => `
                    <li>${item.product.name}, size ${item.size}: á ${item.unitPrice} kr</li>
                    `,
                  )
                  .join("")}
            </ul>
            <p>Order Total: ${order.orderTotal} kr</p>
            <p>
    `,
  });
  console.log(result)
};

export const sendOrderConfirmation = async (order, user) => {
  await resend.emails.send({
    from: "solesearch@sole.search",
    to: user.email,
    subject: `Order confirmation # ${order._id}`,
    html: `
            <h1>Thank you for shopping at Sole Search ${user.firstName}!</h1>
            <p> Your order <i>#${order._id}</i> is being processed for shipping.</p>
            <h2>Order Summary</h2>
            <ul>
                ${order.items
                  .map(
                    (item) => `
                    <li>${item.product.name}, size ${item.size}: á ${item.unitPrice} kr</li>
                    `,
                  )
                  .join("")}
            </ul>
            <p>Order Total: ${order.orderTotal} kr</p>
            <p>
              <a href="${process.env.FRONTEND_URL}/orders/${order._id}/track">
                Track you order
              </a>
            </p>
        `,
  });
};

export const sendOrderCancellation = async (order, user) => {
  await resend.emails.send({
    from: "solesearch@sole.search",
    to: user.email,
    subject: `Your order #${order._id} has been cancelled.`,
    html: `
            <h1>Your order has been cancelled</h1>
            <p>Hi ${user.firstName}, your order <i>#${order._id}</i> has been cancelled.</p>
            <p>If you have any questions, please contact us.</p>
        `,
  });
};

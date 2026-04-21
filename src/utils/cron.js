import cron from "node-cron";
import Product from "./models/Product.js";

export function startCronJobs() {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    await Product.updateMany(
      { dropStatus: "Upcoming", dropAt: { $lte: now } },
      { $set: { dropStatus: "Live" } }
    );
    console.log("Drop status check ran at", now);
  });

  console.log("Cron jobs started");
}
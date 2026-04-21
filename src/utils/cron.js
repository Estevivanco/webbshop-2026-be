import cron from "node-cron";
import Product from "../models/Product.js";

export function startCronJobs() {
  console.log("Cron jobs started");
  
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const now = new Date();
      const result = await Product.updateMany(
        { dropStatus: "Upcoming", dropAt: { $lte: now } },
        { $set: { dropStatus: "Live" } }
      );
    } catch (err) {
      console.error("Cron error:", err);
    }
  });
}
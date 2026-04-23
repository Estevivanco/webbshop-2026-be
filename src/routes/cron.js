// routes/cron.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/update-drops", async (req, res) => {
  // Basic secret check to prevent abuse
  const secret = req.headers["x-cron-secret"];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const now = new Date();
    const result = await Product.updateMany(
      { dropStatus: "Upcoming", dropAt: { $lte: now } },
      { $set: { dropStatus: "Live" } }
    );
    res.json({ updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
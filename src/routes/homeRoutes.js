import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Return warm welcome message to the phantom web app user.
 *     responses:
 *       200:
 *         description: Welcome message to welcome to the phantom web app.
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to phantom app backend side",
  });
});

export { router as default };

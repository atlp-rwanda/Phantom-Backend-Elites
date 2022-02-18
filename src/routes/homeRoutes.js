import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Return warm welcome message to the phantom web app user.
 *     responses:
 *       200:
 *         description: The list of the books
 */
router.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "Welcome to phantom app backend side",
  });
});

// export default router;
export { router as default };

import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import programActions from "./modules/programs/programActions";
router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);

import sayActions from "./modules/say/sayActions";

/* ************************************************************************* */
// Declaration of a "Welcome" route

router.get("/", sayActions.sayWelcome);

import type { RequestHandler } from "express";

const sayWelcome: RequestHandler = (req, res) => {
  res.send("Welcome to Wild Series !");
};

router.get("/", sayWelcome);

export default router;

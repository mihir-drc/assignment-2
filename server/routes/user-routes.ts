import {
  fetchAccounts,
  addAccount,
  fetchRecievers,
  fetchRecieverBankAccount,
  fetchCategories,
  addTransaction,
} from "../controllers/user-controller";

const express = require("express");
const router = express.Router();
router.post("/addAccount", addAccount);
router.post("/addTransaction", addTransaction);
router.get("/fetchAccounts", fetchAccounts);
router.post("/fetchRecievers", fetchRecievers);
router.post("/fetchRecieversAccounts", fetchRecieverBankAccount);
router.get("/fetchCategories", fetchCategories);
module.exports = router;

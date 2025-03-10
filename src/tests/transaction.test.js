const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { MONGO_URI } = require("../constants/const");

let walletId;
let transactionId;

describe("Transaction API", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
     // Create a wallet and ensure it completes before proceeding
     const walletRes = await request(app)
     .post("/api/wallet/setup")
     .send({ name: "Test Wallet", balance: 500 });
  
   walletId = walletRes.body.id; // Assign walletId correctly
   expect(walletId).toBeDefined(); // Ensure walletId is valid
  });
  
  afterAll(async () => {
    await Wallet.deleteMany({});
    await Transaction.deleteMany({});
    await mongoose.connection.close();
  });

  test("Create a transaction (Debit)", async () => {
    expect(walletId).toBeDefined(); // Ensure walletId is not undefined

    const res = await request(app).post(`/api/transact/${walletId}`).send({
      amount: -500,
      description: "Test Debit Transaction",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("balance", 0); // Balance should be 0 after -500 debit
    expect(res.body).toHaveProperty("transactionId");
    transactionId = res.body.transactionId;
  });

  test("Create a transaction with insufficient funds", async () => {
    expect(walletId).toBeDefined(); // Ensure walletId is valid

    const res = await request(app).post(`/api/transact/${walletId}`).send({
      amount: -600, // More than available balance
      description: "Test Insufficient Funds",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Insufficient balance");
  });

  test("Get transaction history", async () => {
    expect(walletId).toBeDefined(); // Ensure walletId exists

    const res = await request(app).get(`/api/transact?walletId=${walletId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0); // Ensure at least one transaction exists
  });

  test("Get transaction history for non-existent wallet", async () => {
    const nonExistentWalletId = new mongoose.Types.ObjectId(); // Generate a valid but non-existent ID

    const res = await request(app).get(`/api/transact?walletId=${nonExistentWalletId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0); // Should return an empty array
  });
});

const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { MONGO_URI } = require("../constants/const");

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await Wallet.deleteMany({});
  await Transaction.deleteMany({});
  await mongoose.connection.close();
});

describe("Wallet API", () => {
  let walletId;

  test("Create a wallet", async () => {
    const res = await request(app).post("/api/wallet/setup").send({
      name: "Test Wallet",
      balance: 1000
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.balance).toBe(1000);
    walletId = res.body.id;
  });

  test("Get wallet details", async () => {
    const res = await request(app).get(`/api/wallet/${walletId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", walletId);
    expect(res.body).toHaveProperty("balance", 1000);
  });

  test("Get wallet details for non-existent wallet", async () => {
    const res = await request(app).get(`/api/wallet/654321abcd1234abcd567890`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Wallet not found");
  });
});

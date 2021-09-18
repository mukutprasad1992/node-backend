const request = require("supertest");
const mongoose = require("mongoose");
const config = require("config");
const dbConfig = config.get("dbConfig");
const app = require("../app");

describe("Test API is working", () => {
  test("Yes API is successfully initiated...", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("User API is unauthorized", () => {
  test("Yes User API is unauthorized until login.", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(401);
  });
});

beforeAll(async () => {
  await mongoose.connect(dbConfig.srvUri, {
    useUnifiedTopology: false,
    useNewUrlParser: true,
  });
});

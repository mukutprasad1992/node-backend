const request = require("supertest");
const app = require("../app");
let cookie;
let userId;
// Before each is used for call every time when we go for next API or test case in this file...
beforeEach(async () => {
  const response = await request(app).post("/auth/login").send({
    username: "mukut@gmail.com",
    password: "mukut@@123",
  });
  expect(response.statusCode).toBe(200);
  let content = JSON.parse(response.text);
  userId = content.results._id;
  cookie = response.headers["set-cookie"];
});

describe("Create users API", () => {
  test("Create users API is working...", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        username: `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
        password: "mukut@@123",
      });
    expect(response.statusCode).toBe(200);
  });
});

describe("Find all users API", () => {
  test("Find all users API is working...", async () => {
    const response = await request(app).get("/users").set("cookie", cookie);
    expect(response.statusCode).toBe(200);
  });
});

describe("Find users by Id API", () => {
  test("Find users by Id API is working...", async () => {
    const response = await request(app)
      .get("/users/610cb6222cdda63770824264")
      .set("cookie", cookie);
    expect(response.statusCode).toBe(200);
  });
});

describe("Delete users API", () => {
  test("Delete users by Id API is working...", async () => {
    const response = await request(app)
      .delete(`/users/${userId}`)
      .set("cookie", cookie);
    expect(response.statusCode).toBe(200);
  });
});

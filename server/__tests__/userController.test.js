import request from "supertest";
import { app } from "../app.js";

describe("User SignUp Endpoints", () => {
  it("returns a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users")
      .send({
        name: "test",
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });

  it("returns a 400 if user already exists", async () => {
    await request(app)
      .post("/api/users")
      .send({
        name: "Test user",
        email: "test2@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users")
      .send({
        name: "Test user2",
        email: "test2@test.com",
        password: "password",
      })
      .expect(400);
  });
});

describe("User Login Endpoints", () => {
  it("returns a 200 on successful login", async () => {
    await request(app)
      .post("/api/users")
      .send({
        name: "test",
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);
    expect(res.body.token).toBeDefined();
  });

  it("returns a 404 if no user", async () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(404);
  });

  it("fails when an incorrect password is entered", async () => {
    await request(app)
      .post("/api/users")
      .send({
        name: "Test user",
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "word",
      })
      .expect(404);
  });
});

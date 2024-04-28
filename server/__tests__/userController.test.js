import request from "supertest";
import { app } from "../app.js";

// sign up user

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

it("returns a 400 for an invalid request", async () => {
  return request(app)
    .post("/api/users")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

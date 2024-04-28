import request from "supertest";
import { app } from "../app";

export const signup = async () => {
  const name = "test";
  const email = "test@test.com";
  const password = "password";

  const res = await request(app)
    .post("/api/users")
    .send({
      name,
      email,
      password,
    })
    .expect(201);
  return res;
};

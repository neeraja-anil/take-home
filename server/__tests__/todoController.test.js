import request from "supertest";
import { app } from "../app.js";
import { signup } from "../test/authHelper.js";

describe("Todo create endpoints", () => {
  it("returns a 201 on todo create", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    const project = await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        userId: id,
      })
      .expect(201);
    const projectId = project.body.id;

    return await request(app)
      .post("/api/todos/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        description: "Test Description",
        projectId,
        status: "PENDING",
      })
      .expect(201);
  });

  it("returns a 400 on invalid request ( name field id is missing)", async () => {
    const res = await signup();
    const token = res.body.token;
    const id = res.body.id;

    const project = await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        userId: id,
      })
      .expect(201);
    const projectId = project.body.id;

    const todo = await request(app)
      .post("/api/todos/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test Description",
        projectId,
        status: "PENDING",
      })
      .expect(400);
  });
});

describe("Todo update endpoints", () => {
  it("should update a todo", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    const project = await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        userId: id,
      })
      .expect(201);
    const projectId = project.body.id;

    const todo = await request(app)
      .post("/api/todos/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        description: "Test Description",
        projectId,
        status: "PENDING",
      })
      .expect(201);

    const todoId = todo.body.id;

    return await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo updated",
        description: "",
        status: "COMPLETED",
      })
      .expect(200);
  });

  it("should return 404 if todo not found", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    const project = await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        userId: id,
      })
      .expect(201);
    const projectId = project.body.id;

    const todo = await request(app)
      .put(`/api/todos/`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        description: "Test Description",
        projectId,
        status: "PENDING",
      })
      .expect(404);
  });

  it("should return 400 if invalid input payload", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    const project = await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        userId: id,
      })
      .expect(201);
    const projectId = project.body.id;

    const todo = await request(app)
      .post("/api/todos/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        description: "Test Description",
        projectId,
        status: "PENDING",
      })
      .expect(201);

    const todoId = todo.body.id;

    const todoupdate = await request(app)
      .put(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);
  });
});

describe("Todo delete endpoints", () => {
  it("should delete todo", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    const project = await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test user",
        userId: id,
      })
      .expect(201);
    const projectId = project.body.id;

    const todo = await request(app)
      .post("/api/todos/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test todo",
        description: "Test Description",
        projectId,
        status: "PENDING",
      })
      .expect(201);

    const todoId = todo.body.id;

    return await request(app)
      .delete(`/api/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
  it("should return 400 if todo is not found ", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    return await request(app)
      .get(`/api/todos/`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

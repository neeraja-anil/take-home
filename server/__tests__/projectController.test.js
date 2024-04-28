import request from "supertest";
import { app } from "../app.js";
import { signup } from "../test/authHelper.js";

describe("Project create endpoints", () => {
  it("returns a 201 on project create", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    return await request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test project",
        userId: id,
      })
      .expect(201);
  });

  it("returns a 400 on invalid request", async () => {
    const res = await signup();
    const token = res.body.token;

    return request(app)
      .post("/api/projects/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
        user_id: "",
      })
      .expect(400);
  });
});

describe("Project update", () => {
  it("should update project", async () => {
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

    return await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test user",
      })
      .expect(200);
  });

  it("should return 400 with invalid input data", async () => {
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

    return await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({})
      .expect(400);
  });
});

describe("Project delete", () => {
  it("should delete project", async () => {
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

    return await request(app)
      .delete(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should return 400 if project is not found ", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    return await request(app)
      .get(`/api/projects/`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("Get all projects", () => {
  it("should get all projects", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;

    return await request(app)
      .get(`/api/projects/list/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

describe("Get a project", () => {
  it("should return 200 if project if found", async () => {
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

    return await request(app)
      .get(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should return 404 if project is not found", async () => {
    const res = await signup();
    const id = res.body.id;
    const token = res.body.token;
    return await request(app)
      .get(`/api/projects/${id}`) // passing user id instead of project id
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

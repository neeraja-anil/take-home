import { Sequelize, DataTypes } from "sequelize";
import {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect as _dialect,
  pool as _pool,
} from "../config/db.js";

import ProjectModel from "./projectModel.js";
import TodoModel from "./todoModel.js";
import UserModel from "./userModel.js";

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: false,

  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projects = ProjectModel(sequelize, DataTypes);
db.todos = TodoModel(sequelize, DataTypes);
db.users = UserModel(sequelize, DataTypes);

db.sequelize.sync({ alter: false }).then(() => {
  console.log("Re-sync db");
});

export default db;

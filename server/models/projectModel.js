import todoModel from "./todoModel.js";

export default (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project",
    {
      project_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Project.hasMany(todoModel(sequelize, DataTypes), {
    as: "todos",
    foreignKey: "project_id",
  });

  return Project;
};

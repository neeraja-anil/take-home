import db from "../models/index.js";

const Project = db.projects;

//@desc CREATE NEW PROJECT
//@route POST /api/project/create
//@access private
const addProject = async (req, res, next) => {
  const { name, userId } = req.body;
  try {
    const project = await Project.create({ name, user_id: userId });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

//@desc UPDATE PROJECT
//@route POST /api/project/id
//@access private
const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const [row, updatedProject] = await Project.update(
      { name },
      { where: { project_id: id }, returning: true }
    );
    if (updatedProject && updatedProject !== 0) {
      res.status(200).json({ message: "Project Name Updated" });
    } else {
      res.status(500).json({ error: "Project Not Fouond" });
    }
  } catch (error) {
    next(error);
  }
};

//@desc GET ALL PROJECT
//@route POST /api/projects/list
//@access private
const getAllProjects = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const projects = await Project.findAll({
      where: { user_id: userId },
      include: [{ model: db.todos, as: "todos" }],
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

//@desc GET SINGLE PROJECT
//@route POST /api/project/id
//@access private
const getProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id, {
      include: [{ model: db.todos, as: "todos" }],
    });

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Project Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

//@desc DELETE PROJECT
//@route POST /api/project/id
//@access private
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.destroy({ where: { project_id: id } });
    if (project !== 0) {
      res.status(200).json({ message: "Project Deleted" });
    } else {
      res.status(404).json({ error: "Project Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

export { addProject, getAllProjects, getProject, deleteProject, updateProject };

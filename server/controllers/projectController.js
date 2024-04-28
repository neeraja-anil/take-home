import Project from "../models/projectModel.js";

//@desc CREATE NEW PROJECT
//@route POST /api/project/create
//@access private
const addProject = async (req, res, next) => {
  const { name, userId } = req.body;
  try {
    if (!name || !userId) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const project = await Project.create({ name, user_id: userId });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
//@desc UPDATE PROJECT
//@route POST /api/project/:id
//@access private
const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (!name) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (updatedProject) {
      res.status(200).json({ message: "Project Name Updated" });
    } else {
      res.status(404).json({ error: "Project Not Found" });
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
    if (!userId) {
      res.status(400);
      throw new Error("User Id Not Found");
    }
    const projects = await Project.find({ user_id: userId }).populate("todos");
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

//@desc GET SINGLE PROJECT
//@route POST /api/projects/:id
//@access private
const getProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("todos");

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
//@route POST /api/projects/:id
//@access private
const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);

    if (project) {
      await project.deleteOne();
      res.status(200).json({ message: "Project Deleted" });
    } else {
      res.status(404).json({ error: "Project Not Found" });
    }
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

const downloadProject = async (req, res, next) => {
  try {
    const { title, completedTodos, totalTodos, pendingTodos } = req.body;

    const generateTodoList = (todos) => {
      return todos.map((todo) => `- [ ] ${todo.name}\n`).join("");
    };

    const markdownContent = `# ${title}
    
## Summary:
${completedTodos.length} / ${totalTodos} completed.
    
## Section 1: Pending Todos
${generateTodoList(pendingTodos)}
    
## Section 2: Completed Todos
${generateTodoList(completedTodos)}
`;

    res.setHeader("Content-Type", "text/markdown");
    res.setHeader("Content-Disposition", `attachment; filename="${title}.md"`);
    res.status(200).send(markdownContent);
  } catch (error) {
    next(error);
  }
};

export {
  addProject,
  getAllProjects,
  getProject,
  deleteProject,
  updateProject,
  downloadProject,
};

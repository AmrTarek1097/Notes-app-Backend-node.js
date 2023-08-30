import taskModel from "../../../DB/models/task.model.js";
import userModel from "../../../DB/models/user.model.js";

const addTask = async (req, res) => {
  const { _id } = req.user;
  const { deadline, assignTo } = req.body;
  const mydeadline = new Date(deadline);
  const currentDate = new Date();

  if (mydeadline <= currentDate) {
    return res.json({ message: "Enter Valid Date. . ." });
  } else if (!(await userModel.findById(assignTo))) {
    return res.json({ message: "Cant assign to this user.." });
  } else {
    await taskModel.insertMany({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      assignTo: req.body.assignTo,
      userId: _id,
    });

    return res.json({ message: "success" });
  }
};

//--------------------------------------------------------------------------------------------------------
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { _id } = req.user;
  const { title, description, status, deadline, assignTo } = req.body;

  //  const task = await taskModel.find({"$and": [
  //   {_id:taskId},
  //   {userId: id}
  // ]});

  const task = await taskModel.findOne({ _id: taskId });

  if (!task) return res.json({ message: "No task found" });

  if (_id.toString() != task.userId)
    return res.json({ message: "You are not allowed to update this task" });

  if (new Date(deadline) <= new Date())
    return res.json({ message: "Enter Valid Date. . ." });

  if (!(await userModel.findById(assignTo)))
    return res.json({ message: "Cant assign to this user.." });

  const updatedTask = await taskModel.findByIdAndUpdate(
     taskId ,
    {
      title,
      description,
      status,
      deadline,
      assignTo,
    },{new:true}
  );

  return res.json({ message: "Success", updatedTask });
};

//--------------------------------------------------------------------------------------------------------
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const { _id } = req.user;

  const task = await taskModel.findById({ _id: taskId });

  if (!task) return res.json({ message: "No task found" });
  
  if (_id.toString() == task.userId) {
    console.log(typeof(_id.toString()));
    console.log(typeof(task.userId));
    console.log(_id.toString());
    console.log(task.userId);
    await taskModel.deleteOne({});
    return res.json({ message: "Success", task, _id });
  }
  return res.json({ message: "You are not allowed to delete this task" });
};

//--------------------------------------------------------------------------------------------------------
const getAllTasks = async (req, res) => {
  const Tasks = await taskModel
    .find({})
    .populate("assignTo", "userName email")
    .populate("userId", "userName email");
  res.json({ message: "Success", Tasks });
};

//--------------------------------------------------------------------------------------------------------
const getAllCreatedTasks = async (req, res) => {
  const { _id } = req.user;

  const Tasks = await taskModel
    .find({ userId: _id })
    .populate("assignTo", "userName email")
    .populate("userId", "userName email");
  res.json({ message: "Success", Tasks });
};

//--------------------------------------------------------------------------------------------------------
const getAllAssignedTasks = async (req, res) => {
  const { _id } = req.user;

  const Tasks = await taskModel
    .find({ assignTo: _id })
    .populate("assignTo", "userName email")
    .populate("userId", "userName email");
  res.json({ message: "Success", Tasks });
};

//--------------------------------------------------------------------------------------------------------
const tasksAfterDeadline = async (req, res) => {
  const { _id } = req.user;

  const tasks = await taskModel.find({
    $and: [{ userId: _id }, { deadline: { $lte: new Date() } }],
  });
  return res.json({ message: "Success", tasks });
};

export {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getAllCreatedTasks,
  getAllAssignedTasks,
  tasksAfterDeadline,
};

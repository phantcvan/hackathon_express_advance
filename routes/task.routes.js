const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const checkExistId = require("../middleware/checkExistId");
const validateData = require("../middleware/validateData");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM task_keeper.tbl_task");
    let [tasks] = data;
    res.json({
      status: "success",
      tasks,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/",validateData, async (req, res) => {
  const { Content, Due_date, Status, User_name } = req.body;
  try {
    const query = `INSERT INTO task_keeper.tbl_task(Content,Due_date, Status, User_name) VALUES (?, ?, ?, ?)`;
    let data = await database.execute(query, [Content, Due_date, Status, User_name]);
    let [tasks] = data;
    console.log(tasks);
    res.json({
      message: "Add task successfully",
      tasks,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:id",checkExistId, async (req, res) => {
  const { id } = req.params;
  const { Content, Due_date, Status, User_name } = req.body;
  console.log(req.body);
  try {
    const query = `
    UPDATE task_keeper.tbl_task SET Content = ?, Due_date = ?, Status = ?, User_name = ? 
    WHERE Task_id = ?`;
    let data = await database.execute(query, [Content, Due_date, Status, User_name, id]);
    console.log("123");
    let [tasks] = data;
    res.json({
      message: "Update task successfully",
      tasks,
    });
  } catch (error) {
    res.json({ error });
  }
});


router.delete("/:id",async (req, res) => {
  let { id } = req.params;
  // Sd database lấy về toàn bộ tasks
  try {
    let data = await database.execute(`DELETE FROM task_keeper.tbl_task WHERE Task_id = ${id}`);
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;

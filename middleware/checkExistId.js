const database = require("../utils/database");
const checkExistId = async (req, res, next) => {
    try {
      const {id} = req.params; // Lấy ID từ tham số trong yêu cầu
  
      // Thực hiện truy vấn để kiểm tra ID tồn tại
      let data = await database.execute(`SELECT * FROM task_keeper.tbl_task WHERE Task_id=${id}`);
      let [findTask] = data;
      if (findTask.length>0) {
        next();
      } else {
        // Nếu ID không tồn tại, trả về lỗi
        return res.status(404).json({ error: "ID not found" });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "An error occurred while checking ID" });
    }
  };

module.exports = checkExistId;
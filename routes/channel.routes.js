const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM `clone-yt`.channels");
    let [channels] = data;
    res.json({
      status: "success",
      channels,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
    try {
      let { id } = req.params
      const query = 'SELECT * FROM `clone-yt`.channels WHERE channel_id = ?';
      let data = await database.execute(query, [id])
      let [findChannel] = data;
      // response về cho client
      res.status(200).json({
        findChannel,
      })
    } catch (error) {
      res.json({
        error,
      })
    }
  })

router.post("/", async (req, res) => {
    const { email, logoUrl, channel_name, joinDate, thumbnailM } = req.body;
    const newChannel=[email,
        logoUrl ,
        channel_name,
        joinDate,
        thumbnailM || null]
    console.log(req.body);
    try {
      const query = `
      INSERT INTO channels (email, logoUrl, channel_name, joinDate, thumbnailM)
       VALUES (?, ?, ?, ?, ?)`;
      let data = await database.execute(query, newChannel);
      console.log("123");
      let [channel] = data;
      res.json({
        message: "Update task successfully",
        channel,
      });
    } catch (error) {
        console.log(error);
      res.json({ error });
    }
  });

module.exports = router;
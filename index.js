import express from "express";
import { User } from "./db.js";

const app = express();

const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/post', async (req, res) => {
    const { body } = req.body;
    const user = await User.create({ name: body });
    res.status(201).json(user);
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
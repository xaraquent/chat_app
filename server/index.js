const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors")
app.use(cors({ origin: "*" }))
app.use(express.json())

require("dotenv").config()
const url = process.env.mongodbURL
const PORT = process.env.PORT

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 1,
        },
    },
    { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema);

app.get("/messages", async (req, res) => {
    const messages = await Message.find()
    res.send(messages)
})

app.post("/message", async (req, res) => {
    console.log(req.body)
    const message = await Message.create(req.body)
    res.send(message)
})

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`)
    await mongoose.connect(url)
})
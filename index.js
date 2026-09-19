require ("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const webhookURL = process.env.DISCORD_WEBHOOK_URL;

app.use(express.json());

app.use(express.static("public"));

app.post("/submit",async (req, res) =>{
    const {name, message} = req.body;

    console.log("Received form submission");
    console.log("Name: ", name);
    console.log("Message: ", message);

    const discordMessage = {
        content : `New Form Submission:\nName: ${name}\nMessage: ${message}`
    };

    try {
        const response = await fetch(webhookURL,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(discordMessage)
        });
        if (!response.ok) {
            console.log("Discord webhook failed.");
            return res.status(500).json({
                message: "Failed to send message to Discord."
            });
        }
        console.log("Message sent to Discord.");

        res.json({
            message: "Message sent successfully!"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Sommething went wrong."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
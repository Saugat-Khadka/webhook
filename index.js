require ("dotenv").config();

const webhookURL = process.env.DISCORD_WEBHOOK_URL;

const message = {
    content : "Hello from my first Discord Webhook!"
};

fetch(webhookURL,{
    method : "POST",
    headers : {
        "Content-Type" : " application/json"
    },
    body : JSON.stringify(message)
}
).then(response => {
    if(response.ok) {
        console.log("Message sent successfully!");
    } else {
        console.log("Failed to send message.");
        console.log("Status: ",response.status);
    }
}).catch(error => {
    console.log("Error",error.message);
});
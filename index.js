require ("dotenv").config();

const webhookURL = process.env.DISCORD_WEBHOOK_URL;

const messageText = process.argv.slice(2).join("");

if(!messageText){
    console.log("No messgage text provided");
    console.log("Usage: node index.js <message text>");
    process.exit(1);
}

const message = {
    content : `New message from Node.js: ${messageText}`
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
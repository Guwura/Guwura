const Eris = require("eris");


const token = process.env.token
const prefix = process.env.prefix


var bot = new Eris(token);
 


bot.on("ready", () => { 
    console.log("Ready!"); 
})
bot.on("messageCreate", (msg) => { 
    if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    } else if(msg.content === "!pong") {
        bot.createMessage(msg.channel.id, "Ping!");
    }
});
 
bot.connect();
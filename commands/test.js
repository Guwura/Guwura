const Eris = require("eris");

module.exports.run = (bot, msg, args, tools) => {
    bot.createMessage(msg.channel.id, "qwq");
}

module.exports.help = {
    name: "test"
} 

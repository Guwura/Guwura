const Discord = require('discord.js'); 
 
module.exports.run = (bot, message, args, tools) => {

    let date = new Date()
    let embed = new Discord.RichEmbed()
        .setDescription(`@everyone`)
        .addField(`${date} 更新快報`,args[1],true)
    bot.channels.filter(c => c.id === `${arg[0]}`).forEach(c => c.send(embed).then(m => message.push(m)));
    
}

module.exports.help = {
    name: "everyone"
} 

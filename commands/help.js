const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let helplist = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Here is da the help list test")
        .addField('test1', "1" )
        .addField('test2', "2" )
        .addField('test3', "3" )
        .setTimestamp(new Date())
        .setFooter(`${message.author.tag}`);

        
    return message.channel.send(helplist);
        

}

module.exports.help = {
    name: "help",
}
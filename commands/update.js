const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('抱歉,你沒有**管理員權限**來使用這個指令').then(message => message.delete(5000));
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('我沒有**管理員權限**來刪除訊息').then(message => message.delete(5000));

    let maxLen = 1000
    if(args.join(' ').length > maxLen) return message.channel.send(`你發了超過** ${maxLen} **個字!`).then(message => message.delete(5000)); 
  
    if(!args[0]) return message.channel.send('請在指令後方填上你要打的字...').then(message => message.delete(5000));
    if(!args[1]) return message.channel.send('請在指令後方填上你要打的字...').then(message => message.delete(5000));

    let m = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("**最新更新**")
        .setColor(0x00D4FF)
        .addField(args[0],`\`\`\`fix\n${args.slice(1).join(" ")}\`\`\``)
        .setTimestamp(new Date())
        .setFooter("WeiKuOuO","https://avatars1.githubusercontent.com/u/43096905?s=400&u=264c38ae1fe19184e491b8fdbcdca8bea00e1612&v=4")
    bot.channels.get("508661180093693973").send(m)
    bot.channels.get("507175076412784650").send(m)
    message.delete().catch(O_o=>{});
}
    
module.exports.help = {
    name: "update",
}


const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('抱歉,你沒有**管理員權限**來使用這個指令').then(message => message.delete(5000));
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('我沒有**管理員權限**來刪除訊息').then(message => message.delete(5000));

    if (!args[0]) return message.channel.send('請填一個**1~100**的數字').then(message => message.delete(5000));
    if (args[0] < 1) return message.channel.send('請填一個**1~100**的數字').then(message => message.delete(5000));
    if (args[0] > 100) return message.channel.send('請填一個**1~100**的數字').then(message => message.delete(5000));
    if (isNaN(args[0])) return message.channel.send('請填一個**1~100**的數字').then(message => message.delete(5000));

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`🗑 我吃掉了 **${args[0]}** 行文字`).then(message => message.delete(5000));
    }).catch().catch((e) => message.channel.send('你不能刪除14天以前的訊息'));
    
}

module.exports.help = {
    name: "purge",
}





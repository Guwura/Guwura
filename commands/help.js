const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let helplist = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTitle("Here is da the help list test")
        .addField('• 指令', "```py\n1# muhc/help\n2# muhc/ping \n3# muhc/ascii\n4# muhc/purge\n5# muhc/test```" )
        .addField('• 說明', "```fix\n開啟此列表\n查詢延遲\n藝術文字:wrench:\n大量刪除訊息:wrench:\n測試用指令```" )
        .addField('• 建議', ":wrench: 代表需要Admin權限\n如果有任何有關於指令的建議，像是想要新增指令或是功能\n還歡迎聯絡 ***微苦#3402***\n我會很樂意為你服務的\n[MUHCYoutube](https://muhc.tw/yt) | [MUHCDiscord](https://muhc.tw/dc) | [MUHCWebsite]( https://muhc.tw) | [MUHCBotInvite](https://muhc.tw/bot)\n如果可以的話請把Bot邀請到你的Discord群 你的支持是我們的動力" )
        .setTimestamp(new Date())
        .setFooter(`${message.author.tag}`);

        
    return message.channel.send(helplist);
        

}

module.exports.help = {
    name: "help",
}
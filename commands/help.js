const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let helplist = new Discord.RichEmbed()
        .setColor(0x9EFF00)
        .setDescription("這裡可以讓你知道這隻機器人的**所有**資訊，但是請勿**濫用**指令來刷頻\n某些指令我們已經做了權限控制\n")
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setTitle("指令列表")
        .addField('• 指令', "```py\n1# wc/help\n2# wc/guild\n3# wc/player\n4# wc/playerfull```",true )
        .addField('• 說明', "```fix\n開啟此列表\n查詢公會資訊\n查詢玩家資訊(簡易版)\n查詢玩家資訊(完整版)```",true)
        .addField('• 建議', "(Admin) 代表需要Admin權限\n如果有任何有關於指令的建議，像是想要新增指令或是功能\n還歡迎聯絡 ***WeiKu#3402***\n我會很樂意為你服務的\n[WynnCraft中文討論群](https://wynncraft.pw/dc) | [WynnCraft中文資訊站官網](https://wynncraft.pw) | [機器人邀請碼](https://wynncraft.pw/bot)\n如果可以的話請把Bot邀請到你的Discord群~~" )
        .setTimestamp(new Date())
        .setFooter(`${message.author.tag}`);

        
    return message.channel.send(helplist);
        

}

module.exports.help = {
    name: "help",
}
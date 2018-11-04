const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
const token = process.env.token
const prefix = process.env.prefix

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

let allstatus = 
[
  ` 使用muhc/help查詢指令`,
  ` 機器人製作-微苦`
];
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
  console.log(`${bot.user.username}成功啟動了!^w^, [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);

  bot.setInterval(async () => {
    let status = allstatus[Math.floor(Math.random()*allstatus.length)];
    bot.user.setActivity(status, { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"})
  }, 2000);

  let m = await bot.channels.get("507175036092940299").send('Bot啟動成功!')
  bot.setInterval(async () => {
  cpuStat.usagePercent(async function(err, percent, seconds) {
    if (err) {
        return console.log(err);
    }
    const duration = moment.duration(bot.uptime).format(" D [天], H [小時], m [分鐘], s [秒]");
    const embedStats = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("**Bot資訊**")
        .setColor("RANDOM")
        .addField(":desktop: MUHC群組人數","```" + (bot.users.size.toLocaleString()) + "```" , true)
        .addField(":bust_in_silhouette: MUHC頻道數 ", "```" + (bot.channels.size.toLocaleString()) + "```" , true)
        .addField("• 記憶體使用量", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("• 運行時間 ", `${duration}`, true)
        .addField("• Discord.js版本", `v${version}`, true)
        .addField("• Node.js版本", `${process.version}`, true)
        .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
        .addField("• CPU 使用率", `\`${percent.toFixed(2)}%\``, true)
        .addField("• 位元數", `\`${os.arch()}\``, true)
        .addField("• 主機平台", `\`\`${os.platform()}\`\``, true)
        .addField("與CPU-Status API和主機延遲", `${Math.round(bot.ping)}ms`) 
    m.edit(embedStats);
    });
  }, 2001);
})

fs.readdir("./commands/", (err,files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("找不到任何的程式la");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} 載入成功!`)
    bot.commands.set(props.help.name, props);
  })
})
bot.on("message", async message => {
	if (message.author.bot || message.channel.type === 'dm') return;
	if (message.content.toLowerCase().indexOf(prefix) !== 0) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
	try{
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(bot, message, args);
	}catch(err){
		message.reply(`未知指令! 請輸入 **${prefix}help** 查看指令列表`)
	}
})


bot.on("guildCreate", guild => {
  console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
  bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`, { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
});

bot.on("guildDelete", guild => {
  console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
  bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`, { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
})  

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  const sender = message.author;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const msg = message.content.toUpperCase();

})

bot.login(token);
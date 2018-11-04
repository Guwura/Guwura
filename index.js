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
        .addField(":desktop: 服務人數",`\`\`\`xl\n${bot.users.size}\`\`\``, true)
        .addField(":bust_in_silhouette: 服務伺服器數 ",`\`\`\`xl\n${bot.guilds.size}\`\`\`` , true)
        .addField(":wrench: 記憶體使用量", `\`\`\`xl\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\`\``, true)
        .addField(":stopwatch: 運行時間 ", `\`\`\`xl\n${duration}\`\`\``, true)
        .addField(":blue_book: Discord.js版本", `\`\`\`diff\n - v${version}\`\`\``, true)
        .addField(":green_book: Node.js版本", `\`\`\`diff\n - ${process.version}\`\`\``, true)
        .addField(":gear: CPU", `\`\`\`css\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
        .addField(":pager: CPU 使用率", `\`\`\`fix\n${percent.toFixed(2)}%\`\`\``, true)
        .addField(":orange_book: 位元數", `\`\`\`fix\n${os.arch()}\`\`\``, true)
        .addField(":triangular_flag_on_post: 主機平台", `\`\`\`fix\n${os.platform()}\`\`\``, true)
        .addField(":ping_pong: Ping", `\`\`\`xl\n${Math.round(bot.ping)} ms\`\`\``) 
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

  //fs的command handler不用理他
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
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  //單字簡化
  const sender = message.author;
  const msg = message.content.toUpperCase();

})


bot.on("guildCreate", guild => {
  console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
  bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`, { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
});

bot.on("guildDelete", guild => {
  console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
  bot.user.setActivity(`我正在 ${bot.guilds.size} 個群組潛水`, { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
});

bot.login(token);
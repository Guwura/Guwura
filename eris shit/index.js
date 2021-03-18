const Eris = require("eris");
const fs = require("fs")

const token = process.env.token
const prefix = process.env.prefix

var bot = new Eris(token);
 
bot.on("ready", () => { 
    console.log("Ready!"); 
})

fs.readdir("./commands/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("找不到任何指令");
      return;
    }   
  
    jsfile.forEach((f, i) => {
      console.log(`${f} 載入成功!`)
    })
  })
  
  bot.on("messageCreate", async msg => {
  
    //command handler
      if (msg.author.bot || msg.channel.type === 'dm') return;
      if (msg.content.toLowerCase().indexOf(prefix) !== 0) return
      const args = msg.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      try{
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(bot, msg, args);
      }catch(err){
          if(msg.content == "uwu"){
              return
          }else{
            bot.createMessage(msg.channel.id, `Unknowon cowommand! Use **${prefix}help** tu showo cowommand list`)
          }
    }
    if(msg.author.bot) return;
    if(msg.content.indexOf(prefix) !== 0) return;
  
  })

bot.on("messageCreate", (msg) => { 
    if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    } else if(msg.content === "!pong") {
        bot.createMessage(msg.channel.id, "Ping!");
    }
});
 
bot.connect();
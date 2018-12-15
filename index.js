
const Discord = require('discord.js');
const fs = require("fs");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const DBL = require("dblapi.js");

const token = process.env.token
const prefix = process.env.prefix
const dbltoken = process.env.dbltoken

const bot = new Discord.Client();
const queue = new Map();
const dbl = new DBL(dbltoken, bot);
bot.commands = new Discord.Collection();



let index = 0;

// JSON Files
let userData = JSON.parse(fs.readFileSync('./Storage/userData.json', 'utf8'));
let exp = JSON.parse(fs.readFileSync('./Storage/exp.json', 'utf8'));
let money = JSON.parse(fs.readFileSync('./Storage/money.json', 'utf8'));



// Optional events
dbl.on('error', e => {
 console.log(`${e}`);
})
bot.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.split(` `);
    const searchString = args.slice(1).join(` `);
    const url = args[1] ? args[1].replace(/<(.*)>/g, `$1`) : ``;
    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🚫 ERROR`,
                color: 0x7070db,
                description: `請先進入語音頻道`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        if (!message.guild.me.hasPermission('CONNECT')) {
            return message.channel.send({
                embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL,
                    },
                    title: `🚫 ERROR`,
                    color: 0x7070db,
                    description: `無法進入語音頻道\n請先給予\`連線\`權限`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        }
        // if (message.guild.me.hasPermission(`SPEAK`)) {
        //     return message.channel.send({
        //         embed: {
        //             author: {
        //                 name: bot.user.username,
        //                 icon_url: bot.user.avatarURL,
        //             },
        //             title: `🚫 ERROR`,
        //             color: 0x7070db,
        //             description: `無法使用麥克風\n請先給予\`說話\`權限`,
        //             footer: {
        //                 icon_url: message.author.avatarURL,
        //                 text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
        //             },
        //         }
        //     });
        // }

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, voiceChannel, true);
            }
            return message.channel.send({
                embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL,
                    },
                    title: `  PlayList`,
                    color: 0x7070db,
                    description: `Youtube播放清單 **${playlist.title}** 已新增`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var index = 0;
                    message.channel.send({
                        embed: {
                            author: {
                                name: bot.user.username,
                                icon_url: bot.user.avatarURL,
                            },
                            title: `🎶 Music Choose`,
                            color: 0x7070db,
                            description: `__**選擇你所要播放的音樂**__
                    ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`,
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                            },
                        }
                    });
                    try {
                        var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                            maxMatches: 1,
                            time: 20000,
                            errors: [`time`]
                        });
                    } catch (err) {
                        console.error(err);
                        return message.channel.send({
                            embed: {
                                author: {
                                    name: bot.user.username,
                                    icon_url: bot.user.avatarURL,
                                },
                                title: `❌ Cancel`,
                                color: 0x7070db,
                                description: `選擇時間到\n**已取消**`,
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                                },
                            }
                        });
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send({
                        embed: {
                            author: {
                                name: bot.user.username,
                                icon_url: bot.user.avatarURL,
                            },
                            title: `🚫 Search_ERROR`,
                            color: 0x7070db,
                            description: `無法搜尋到結果\n**請重試**`,
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                            },
                        }
                    });
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    } else if (message.content.startsWith(`${prefix}skip`)) {
        if (!message.member.voiceChannel) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ Skip`,
                color: 0x7070db,
                description: `Bot不在語音頻道中`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        if (!serverQueue) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ Skip`,
                color: 0x7070db,
                description: `請先確認音樂清單中有任何歌曲`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        serverQueue.connection.dispatcher.end(`skip command used`);
        return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
        if (!message.member.voiceChannel) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🚫 ERROR`,
                color: 0x7070db,
                description: `請先進入語音頻道`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        if (!serverQueue) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🚫 ERROR`,
                color: 0x7070db,
                description: `Bot不在語音頻道內`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end(`stop command used`);
        return;
    } else if (message.content.startsWith(`${prefix}volume`)) {
        if (!message.member.voiceChannel) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🚫 ERROR`,
                color: 0x7070db,
                description: `請先進入語音頻道`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        if (!serverQueue) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ Volume`,
                color: 0x7070db,
                description: `音樂清單中沒有任何音樂`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        if (!args[1]) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🔉 Volume`,
                color: 0x7070db,
                description: `目前音量 **${serverQueue.volume}** / **100**`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🔉 Volume`,
                color: 0x7070db,
                description: `音量變更至 **${serverQueue.volume}** / **100**`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`${prefix}np`)) {
        if (!serverQueue) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ NowPlaying`,
                color: 0x7070db,
                description: `目前沒有任何音樂正在播放`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `▶ NowPlaying`,
                color: 0x7070db,
                description: `正在播放: **${serverQueue.songs[0].title}**`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`${prefix}queue`)) {
        if (!serverQueue) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ Queue`,
                color: 0x7070db,
                description: `音樂清單內沒有任何音樂`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `  Queue`,
                color: 0x7070db,
                description: `
            ▶ __Now Playing__: \n **${serverQueue.songs[0].title}** \n⬇ **NEXT** ⬇
            ${serverQueue.songs.map(song => `**-** **${song.title}**`).join('\n')}`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`${prefix}pause`)) {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send({
                embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL,
                    },
                    title: `⏸ Pause`,
                    color: 0x7070db,
                    description: `音樂已暫停\n使用**${prefix}Resume** 繼續播放音樂`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        }
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ Pause`,
                color: 0x7070db,
                description: `沒有音樂正在播放`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`${prefix}resume`)) {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send({
                embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL,
                    },
                    title: `▶ Resume`,
                    color: 0x7070db,
                    description: `播放音樂中\n正在播放**${serverQueue.songs[0].title}**`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        }
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ Resume`,
                color: 0x7070db,
                description: `沒有音樂正在播放`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    }
    return;
});

async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    console.log(video)
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);

        } catch (error) {
            console.error(`ERROR: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send({
                embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL,
                    },
                    title: `🚫 ERROR`,
                    color: 0x7070db,
                    description: `ERROR!\n${error}`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return;
        else return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `🎶 Music Add`,
                color: 0x7070db,
                description: `➕ 已新增 ${song.title}`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用${prefix}help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    }
    return;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on(`end`, reason => {
            if (reason == `Stream is not generating quickly enough.`) console.log(`song ended`);
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on(`error`, error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
    serverQueue.textChannel.send(`🎶 正在播放: ${serverQueue.songs[0].title}`)
}

bot.on('ready', function() {
  const statuslist = [
      `muhc/help | 任何問題請WeiKu#3402 ♪`,
      `機器人製作 | 微苦 ♪`,
      `頭像繪製 | 星亞 ♪`,
      `官方網站 | Muhc.tw ♪`,
      `邀請Kizinn | Muhc.tw/bot ♪`,
      `幫Kizinn按讚 | Muhc.tw/vote ♪`,
      `Muhc官方頻道 | Muhc.tw/yt ♪`,
      `Muhc官方群組 | Muhc.tw/dc ♪`,
      `如想在你的伺服器使用kizinn-info請洽WeiKu#3402 ♪`
  ];
  bot.setInterval(() => {
    bot.user.setActivity(statuslist[index], { type: "STREAMING", url: "https://www.twitch.tv/weikuouo"});
    index++
    if (index === statuslist.length) index = 0;
}, 3000)
});

bot.on('message', async message => {
  if (message.author.bot) return
  if (message.channel.id == "411894866222514188") {
    if (message.content === "我同意") {
      if (message.member.roles.has("411897336621432832")) {
          message.channel.send("你已經同意了").then(message => message.delete(5000))
          message.delete()
      } else {
          message.member.addRole('411897336621432832').then(message.channel.send("已給予身分組").then(message => message.delete(5000)))
          message.delete()
      }
    } else {
      message.channel.send("請輸入\"我同意\"").then(message => message.delete(5000));
      message.delete()
    }
  }
})

bot.on("ready", async () => {
  console.log(`${bot.user.username}成功啟動了!^w^, [ ${bot.guilds.size} | ${bot.channels.size} | ${bot.users.size} ]`);
  bot.channels.filter(c => c.name=="kizinn-info").forEach(c => c.bulkDelete("50"))
  const statusmessage = new Discord.RichEmbed()
      .setAuthor(bot.user.username)
      .setTitle("**Bot資訊**")
      .setColor("RANDOM")
      .addField(":desktop: 服務人數",`\`\`\`xl\n計算中...\`\`\``, true)
      .addField(":bust_in_silhouette: 服務伺服器數 ",`\`\`\`xl\n計算中...\`\`\`` , true)
      .addField(":wrench: 記憶體使用量", `\`\`\`xl\n正在啟動...\`\`\``, true)
      .addField(":stopwatch: 運行時間 ", `\`\`\`xl\n正在啟動...\`\`\``, true)
      .addField(":blue_book: Discord.js版本", `\`\`\`diff\n- 偵測中...\`\`\``, true)
      .addField(":green_book: Node.js版本", `\`\`\`diff\n- 偵測中...\`\`\``, true)
      .addField(":gear: CPU", `\`\`\`css\n偵測中...\`\`\``)
      .addField(":pager: CPU 使用率", `\`\`\`fix\n正在啟動...\`\`\``, true)
      .addField(":orange_book: 位元數", `\`\`\`fix\n正在啟動...\`\`\``, true)
      .addField(":triangular_flag_on_post: 主機平台", `\`\`\`fix\n正在啟動...\`\`\``, true)
      .addField(":ping_pong: Ping", `\`\`\`xl\n偵測中...\`\`\``)
      .addField("**相關連結**",`\`\`\`diff\n+ Discord邀請連結 - https://muhc.tw/dc \n- 官方網站 - https://muhc.tw \`\`\``)
  var statusMessages = [];
  bot.channels.filter(c => c.name === "kizinn-info").forEach(c => c.send(statusmessage).then(m => statusMessages.push(m)));
      
  setInterval(function(){
    cpuStat.usagePercent(async function(err){
      if (err) {
          return console.log(err);
      }
      const duration = moment.duration(bot.uptime).format(" D [天] H [時] m [分] s [秒]");
      const botinfo = new Discord.RichEmbed()
          .setAuthor(bot.user.username)
          .setTitle("**Bot資訊**")
          .setDescription("\`\`\`js\n如果需要此資訊列表\n請在你的群組創建一個名為\"kizinn-info\"的頻道\n機器人將會在下一次啟動時載入資料`\`\`")
          .setColor("RANDOM")
          .addField(":desktop: 服務人數",`\`\`\`xl\n${bot.users.size}\`\`\``, true)
          .addField(":bust_in_silhouette: 服務伺服器數 ",`\`\`\`xl\n${bot.guilds.size}\`\`\`` , true)
          .addField(":wrench: 記憶體使用量", `\`\`\`xl\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)} / 66200 MB\`\`\``, true)
          .addField(":stopwatch: 運行時間 ", `\`\`\`xl\n${duration}\`\`\``, true)
          .addField(":blue_book: Discord.js版本", `\`\`\`diff\n- v${version}\`\`\``, true)
          .addField(":green_book: Node.js版本", `\`\`\`diff\n- ${process.version}\`\`\``, true)
          .addField(":gear: CPU", `\`\`\`css\nIntel(R) Xeon(R) CPU E7-2860 v4 @ 2.26GHz\`\`\``)
          .addField(":pager: CPU 使用率", `\`\`\`fix\n${((((Math.random() * 5) + 1) / 5) * 6).toFixed(2)}%\`\`\``, true)
          .addField(":orange_book: 位元數", `\`\`\`fix\n${os.arch()}\`\`\``, true)
          .addField(":triangular_flag_on_post: 主機平台", `\`\`\`fix\n${os.platform()}\`\`\``, true)
          .addField(":ping_pong: Ping", `\`\`\`xl\n${Math.round(bot.ping)} ms\`\`\``) 
          .addField("**相關連結**",`\`\`\`diff\n+ Discord邀請連結 - https://muhc.tw/dc \n- 官方網站 - https://muhc.tw \n+ 幫機器人按讚 - https://muhc.tw/vote \n- 機器人邀請連結 - https://muhc.tw/bot \`\`\``)
          .addField("目前狀態","Vote數量")
          .setImage("https://discordbots.org/api/widget/506843065424543745.png")
      statusMessages.forEach(m => m.edit(botinfo))
    });
  },2200)
  })



fs.readdir("./commands/", (err,files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("找不到任何指令");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} 載入成功!`)
    bot.commands.set(props.help.name, props);
  })
})

bot.on("message", async message => {

  //command handler
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

})


bot.on("guildCreate", guild => {
  console.log(`加入群組 ${guild.name} [ ${guild.memberCount} ](id: ${guild.id})`);
});

bot.on("guildDelete", guild => {
  console.log(`退出群組 ${guild.name} [ ${guild.memberCount} ] (id: ${guild.id})`);
});


bot.login(token);

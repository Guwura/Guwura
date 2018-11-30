const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (message.author.bot) return;
    const queue = new Map();
    const args = message.content.split(` `);
    const searchString = args.slice(1).join(` `);
    const url = args[1] ? args[1].replace(/<(.*)>/g, `$1`) : ``;
    const serverQueue = queue.get(message.guild.id);
  
    if (message.content.startsWith(`muhc/play`)) {
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        const permissions = voiceChannel.permissionsFor(message.bot.user);
        if (!permissions.has('CONNECT')) {
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
                        text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        }
        if (!permissions.has(`SPEAK`)) {
            return message.channel.send({
                embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL,
                    },
                    title: `🚫 ERROR`,
                    color: 0x7070db,
                    description: `無法使用麥克風\n請先給予\`說話\`權限`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                    },
                }
            });
        }
  
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
                    title: `播放清單`,
                    color: 0x7070db,
                    description: `Youtube播放清單 **${playlist.title}** 已新增`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                                text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                                text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                            },
                        }
                    });
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    } else if (message.content.startsWith(`muhc/skip`)) {
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        serverQueue.connection.dispatcher.end(`skip command used`);
        return;
    } else if (message.content.startsWith(`muhc/stop`)) {
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end(`stop command used`);
        return;
    } else if (message.content.startsWith(`muhc/volume`)) {
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`muhc/np`)) {
        if (!serverQueue) return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `❌ 正在播放`,
                color: 0x7070db,
                description: `目前沒有任何音樂正在播放`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `▶ 正在播放`,
                color: 0x7070db,
                description: `正在播放: **${serverQueue.songs[0].title}**`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`muhc/queue`)) {
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
        return message.channel.send({
            embed: {
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL,
                },
                title: `排列`,
                color: 0x7070db,
                description: `
            ▶ 正在播放: \n **${serverQueue.songs[0].title}** \n⬇ **NEXT** ⬇
            ${serverQueue.songs.map(song => `**-** **${song.title}**`).join('\n')}`,
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`muhc/pause`)) {
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
                    description: `音樂已暫停\n使用**muhc/Resume** 繼續播放音樂`,
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    } else if (message.content.startsWith(`muhc/resume`)) {
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
                        text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
                },
            }
        });
    }
    return;
  };
  
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
                        text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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
                    text: `使用muhc/help 查詢指令 | Requested by ${message.author.username}`,
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

  module.exports.help = {
    name: "play",
}   
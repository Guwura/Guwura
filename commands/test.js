const Discord = require("discord.js")
var request = require('request');

module.exports.run = async (bot, message, args) => {

  const assassin = bot.emojis.get("577051297027457036");
  const warrior = bot.emojis.get("577054598062276619");
  const archer = bot.emojis.get("577054598238306314");
  const mage = bot.emojis.get("577055020168511488");

  const mining = bot.emojis.get("577882452287029248");
  const woodcutting = bot.emojis.get("577883376456040489");

  const playerName = args.join("");
  const urlMain = `https://api.wynncraft.com/v2/player/${playerName}/stats`
  if (playerName == "") {
    message.channel.send("你並未輸入玩家名稱...")
  } else {
    request(urlMain, function (err, response, player) {
      if (err) {
        console.log(err);
        return message.channel.send('在查詢時出了點問題:P');
      }
      player = JSON.parse(player);
      if (player.message == "Bad Request") {
        message.channel.send("你輸入了錯誤的玩家ID")
      } else {
        if (!player.data[0].classes[4]) {
          if (player.data[0].classes[4].name == "assassin") {
            var role1 = `${assassin} 刺客 / Assassin`
          }
          if (player.data[0].classes[4].name == "archer") {
            var role1 = `${archer}  弓箭手 / Archer`
          }
          if (player.data[0].classes[4].name == "warrior") {
            var role1 = `${warrior} 戰士 / Warrior`
          }
          if (player.data[0].classes[4].name == "mage") {
            var role1 = `${mage} 法師 / Mage`
          }
          if (player.data[0].classes[4].name == "ninja") {
            var role1 = `${assassin} 忍者 / Ninja`
          }
          if (player.data[0].classes[4].name == "hunter") {
            var role1 = `${archer}  獵人 / Hunter`
          }
          if (player.data[0].classes[4].name == "knight") {
            var role1 = `${warrior} 騎士 / Knight`
          }
          if (player.data[0].classes[4].name == "darkwizard") {
            var role1 = `${mage} 黑暗巫師 / Dark Wizard`
          }
          if (player.data[0].classes[4].name == "assassin1") {
            var role1 = `${assassin} 刺客 / Assassin`
          }
          if (player.data[0].classes[4].name == "archer1") {
            var role1 = `${archer}  弓箭手 / Archer`
          }
          if (player.data[0].classes[4].name == "warrior1") {
            var role1 = `${warrior} 戰士 / Warrior`
          }
          if (player.data[0].classes[4].name == "mage1") {
            var role1 = `${mage} 法師 / Mage`
          }
          if (player.data[0].classes[4].name == "ninja1") {
            var role1 = `${assassin} 忍者 / Ninja`
          }
          if (player.data[0].classes[4].name == "hunter1") {
            var role1 = `${archer}  獵人 / Hunter`
          }
          if (player.data[0].classes[4].name == "knight1") {
            var role1 = `${warrior} 騎士 / Knight`
          }
          if (player.data[0].classes[4].name == "darkwizard1") {
            var role1 = `${mage} 黑暗巫師 / Dark Wizard`
          }
          if (player.data[0].classes[4].name == "assassin2") {
            var role1 = `${assassin} 刺客 / Assassin`
          }
          if (player.data[0].classes[4].name == "archer2") {
            var role1 = `${archer}  弓箭手 / Archer`
          }
          if (player.data[0].classes[4].name == "warrior2") {
            var role1 = `${warrior} 戰士 / Warrior`
          }
          if (player.data[0].classes[4].name == "mage2") {
            var role1 = `${mage} 法師 / Mage`
          }
          if (player.data[0].classes[4].name == "ninja2") {
            var role1 = `${assassin} 忍者 / Ninja`
          }
          if (player.data[0].classes[4].name == "hunter2") {
            var role1 = `${archer}  獵人 / Hunter`
          }
          if (player.data[0].classes[4].name == "knight2") {
            var role1 = `${warrior} 騎士 / Knight`
          }
          if (player.data[0].classes[4].name == "darkwizard2") {
            var role1 = `${mage} 黑暗巫師 / Dark Wizard`
          }
          if (player.data[0].classes[4].name == "assassin3") {
            var role1 = `${assassin} 刺客 / Assassin`
          }
          if (player.data[0].classes[4].name == "archer3") {
            var role1 = `${archer}  弓箭手 / Archer`
          }
          if (player.data[0].classes[4].name == "warrior3") {
            var role1 = `${warrior} 戰士 / Warrior`
          }
          if (player.data[0].classes[4].name == "mage3") {
            var role1 = `${mage} 法師 / Mage`
          }
          if (player.data[0].classes[4].name == "ninja3") {
            var role1 = `${assassin} 忍者 / Ninja`
          }
          if (player.data[0].classes[4].name == "hunter3") {
            var role1 = `${archer}  獵人 / Hunter`
          }
          if (player.data[0].classes[4].name == "knight3") {
            var role1 = `${warrior} 騎士 / Knight`
          }
          if (player.data[0].classes[4].name == "darkwizard3") {
            var role1 = `${mage} 黑暗巫師 / Dark Wizard`
          }
          if (player.data[0].classes[4].name == "assassin4") {
            var role1 = `${assassin} 刺客 / Assassin`
          }
          if (player.data[0].classes[4].name == "archer4") {
            var role1 = `${archer}  弓箭手 / Archer`
          }
          if (player.data[0].classes[4].name == "warrior4") {
            var role1 = `${warrior} 戰士 / Warrior`
          }
          if (player.data[0].classes[4].name == "mage4") {
            var role1 = `${mage} 法師 / Mage`
          }
          if (player.data[0].classes[4].name == "ninja4") {
            var role1 = `${assassin} 忍者 / Ninja`
          }
          if (player.data[0].classes[4].name == "hunter4") {
            var role1 = `${archer}  獵人 / Hunter`
          }
          if (player.data[0].classes[4].name == "knight4") {
            var role1 = `${warrior} 騎士 / Knight`
          }
          if (player.data[0].classes[4].name == "darkwizard4") {
            var role1 = `${mage} 黑暗巫師 / Dark Wizard`
          }
          if (player.data[0].classes[4].name == "assassin5") {
            var role1 = `${assassin} 刺客 / Assassin`
          }
          if (player.data[0].classes[4].name == "archer5") {
            var role1 = `${archer}  弓箭手 / Archer`
          }
          if (player.data[0].classes[4].name == "warrior5") {
            var role1 = `${warrior} 戰士 / Warrior`
          }
          if (player.data[0].classes[4].name == "mage5") {
            var role1 = `${mage} 法師 / Mage`
          }
          if (player.data[0].classes[4].name == "ninja5") {
            var role1 = `${assassin} 忍者 / Ninja`
          }
          if (player.data[0].classes[4].name == "hunter5") {
            var role1 = `${archer}  獵人 / Hunter`
          }
          if (player.data[0].classes[4].name == "knight5") {
            var role1 = `${warrior} 騎士 / Knight`
          }
          if (player.data[0].classes[4].name == "darkwizard5") {
            var role1 = `${mage} 黑暗巫師 / Dark Wizard`
          }
          const xp0 = [
            player.data[0].classes[5].professions.combat,
            player.data[0].classes[5].professions.woodcutting,
            player.data[0].classes[5].professions.mining,
            player.data[0].classes[5].professions.fishing,
            player.data[0].classes[5].professions.farming,
            player.data[0].classes[5].professions.alchemism,
            player.data[0].classes[5].professions.armouring,
            player.data[0].classes[5].professions.cooking,
            player.data[0].classes[5].professions.jeweling,
            player.data[0].classes[5].professions.scribing,
            player.data[0].classes[5].professions.tailoring,
            player.data[0].classes[5].professions.weaponsmithing,
            player.data[0].classes[5].professions.woodworking,
            player.data[0].classes[5].professions.profession,
            player.data[0].classes[5].professions.overall
          ]

          const profession = [
            `:crossed_swords:**戰鬥** / **Combat** | [**${xp0[0].level}** - **${xp0[0].xp}%**]\n
            ${woodcutting}**伐木** / **Wood Cutting** | [**${xp0[1].level}** - **${xp0[1].xp}%**]\n
            ${mining}**挖礦** / **Mining** | [**${xp0[2].level}** - **${xp0[2].xp}%**]`
          ]

          let playerInfo = new Discord.RichEmbed()
            .setTitle(`${role1} 的等級資訊`, `${profession}`, true)

            
          message.channel.send(playerInfo);
          if (!player.data[0].classes[3]) {
            if (player.data[0].classes[3].name == "assassin") {
              var role1 = `${assassin} 刺客 / Assassin`
            }
            if (player.data[0].classes[3].name == "archer") {
              var role1 = `${archer}  弓箭手 / Archer`
            }
            if (player.data[0].classes[3].name == "warrior") {
              var role1 = `${warrior} 戰士 / Warrior`
            }
            if (player.data[0].classes[3].name == "mage") {
              var role1 = `${mage} 法師 / Mage`
            }
            if (player.data[0].classes[3].name == "ninja") {
              var role1 = `${assassin} 忍者 / Ninja`
            }
            if (player.data[0].classes[3].name == "hunter") {
              var role1 = `${archer}  獵人 / Hunter`
            }
            if (player.data[0].classes[3].name == "knight") {
              var role1 = `${warrior} 騎士 / Knight`
            }
            if (player.data[0].classes[3].name == "darkwizard") {
              var role1 = `${mage} 黑暗巫師 / Dark Wizard`
            }
            if (player.data[0].classes[3].name == "assassin1") {
              var role1 = `${assassin} 刺客 / Assassin`
            }
            if (player.data[0].classes[3].name == "archer1") {
              var role1 = `${archer}  弓箭手 / Archer`
            }
            if (player.data[0].classes[3].name == "warrior1") {
              var role1 = `${warrior} 戰士 / Warrior`
            }
            if (player.data[0].classes[3].name == "mage1") {
              var role1 = `${mage} 法師 / Mage`
            }
            if (player.data[0].classes[3].name == "ninja1") {
              var role1 = `${assassin} 忍者 / Ninja`
            }
            if (player.data[0].classes[3].name == "hunter1") {
              var role1 = `${archer}  獵人 / Hunter`
            }
            if (player.data[0].classes[3].name == "knight1") {
              var role1 = `${warrior} 騎士 / Knight`
            }
            if (player.data[0].classes[3].name == "darkwizard1") {
              var role1 = `${mage} 黑暗巫師 / Dark Wizard`
            }
            if (player.data[0].classes[3].name == "assassin2") {
              var role1 = `${assassin} 刺客 / Assassin`
            }
            if (player.data[0].classes[3].name == "archer2") {
              var role1 = `${archer}  弓箭手 / Archer`
            }
            if (player.data[0].classes[3].name == "warrior2") {
              var role1 = `${warrior} 戰士 / Warrior`
            }
            if (player.data[0].classes[3].name == "mage2") {
              var role1 = `${mage} 法師 / Mage`
            }
            if (player.data[0].classes[3].name == "ninja2") {
              var role1 = `${assassin} 忍者 / Ninja`
            }
            if (player.data[0].classes[3].name == "hunter2") {
              var role1 = `${archer}  獵人 / Hunter`
            }
            if (player.data[0].classes[3].name == "knight2") {
              var role1 = `${warrior} 騎士 / Knight`
            }
            if (player.data[0].classes[3].name == "darkwizard2") {
              var role1 = `${mage} 黑暗巫師 / Dark Wizard`
            }
            if (player.data[0].classes[3].name == "assassin3") {
              var role1 = `${assassin} 刺客 / Assassin`
            }
            if (player.data[0].classes[3].name == "archer3") {
              var role1 = `${archer}  弓箭手 / Archer`
            }
            if (player.data[0].classes[3].name == "warrior3") {
              var role1 = `${warrior} 戰士 / Warrior`
            }
            if (player.data[0].classes[3].name == "mage3") {
              var role1 = `${mage} 法師 / Mage`
            }
            if (player.data[0].classes[3].name == "ninja3") {
              var role1 = `${assassin} 忍者 / Ninja`
            }
            if (player.data[0].classes[3].name == "hunter3") {
              var role1 = `${archer}  獵人 / Hunter`
            }
            if (player.data[0].classes[3].name == "knight3") {
              var role1 = `${warrior} 騎士 / Knight`
            }
            if (player.data[0].classes[3].name == "darkwizard3") {
              var role1 = `${mage} 黑暗巫師 / Dark Wizard`
            }
            if (player.data[0].classes[3].name == "assassin4") {
              var role1 = `${assassin} 刺客 / Assassin`
            }
            if (player.data[0].classes[3].name == "archer4") {
              var role1 = `${archer}  弓箭手 / Archer`
            }
            if (player.data[0].classes[3].name == "warrior4") {
              var role1 = `${warrior} 戰士 / Warrior`
            }
            if (player.data[0].classes[3].name == "mage4") {
              var role1 = `${mage} 法師 / Mage`
            }
            if (player.data[0].classes[3].name == "ninja4") {
              var role1 = `${assassin} 忍者 / Ninja`
            }
            if (player.data[0].classes[3].name == "hunter4") {
              var role1 = `${archer}  獵人 / Hunter`
            }
            if (player.data[0].classes[3].name == "knight4") {
              var role1 = `${warrior} 騎士 / Knight`
            }
            if (player.data[0].classes[3].name == "darkwizard4") {
              var role1 = `${mage} 黑暗巫師 / Dark Wizard`
            }
            if (player.data[0].classes[3].name == "assassin5") {
              var role1 = `${assassin} 刺客 / Assassin`
            }
            if (player.data[0].classes[3].name == "archer5") {
              var role1 = `${archer}  弓箭手 / Archer`
            }
            if (player.data[0].classes[3].name == "warrior5") {
              var role1 = `${warrior} 戰士 / Warrior`
            }
            if (player.data[0].classes[3].name == "mage5") {
              var role1 = `${mage} 法師 / Mage`
            }
            if (player.data[0].classes[3].name == "ninja5") {
              var role1 = `${assassin} 忍者 / Ninja`
            }
            if (player.data[0].classes[3].name == "hunter5") {
              var role1 = `${archer}  獵人 / Hunter`
            }
            if (player.data[0].classes[3].name == "knight5") {
              var role1 = `${warrior} 騎士 / Knight`
            }
            if (player.data[0].classes[3].name == "darkwizard5") {
              var role1 = `${mage} 黑暗巫師 / Dark Wizard`
            }
            

            const xp0 = [
              player.data[0].classes[4].professions.combat,
              player.data[0].classes[4].professions.woodcutting,
              player.data[0].classes[4].professions.mining,
              player.data[0].classes[4].professions.fishing,
              player.data[0].classes[4].professions.farming,
              player.data[0].classes[4].professions.alchemism,
              player.data[0].classes[4].professions.armouring,
              player.data[0].classes[4].professions.cooking,
              player.data[0].classes[4].professions.jeweling,
              player.data[0].classes[4].professions.scribing,
              player.data[0].classes[4].professions.tailoring,
              player.data[0].classes[4].professions.weaponsmithing,
              player.data[0].classes[4].professions.woodworking,
              player.data[0].classes[4].professions.profession,
              player.data[0].classes[4].professions.overall
            ]

            const profession = [
              `:crossed_swords:**戰鬥** / **Combat** | [**${xp0[0].level}** - **${xp0[0].xp}%**]\n
              ${woodcutting}**伐木** / **Wood Cutting** | [**${xp0[1].level}** - **${xp0[1].xp}%**]\n
              ${mining}**挖礦** / **Mining** | [**${xp0[2].level}** - **${xp0[2].xp}%**]`
            ]

            let playerInfo = new Discord.RichEmbed()
              .setTitle(`${role1} 的等級資訊`, `${profession}`, true)
            message.channel.send(playerInfo);


            if (!player.data[0].classes[3]) {
              if (player.data[0].classes[2].name == "assassin") {
                var role1 = `${assassin} 刺客 / Assassin`
              }
              if (player.data[0].classes[2].name == "archer") {
                var role1 = `${archer}  弓箭手 / Archer`
              }
              if (player.data[0].classes[2].name == "warrior") {
                var role1 = `${warrior} 戰士 / Warrior`
              }
              if (player.data[0].classes[2].name == "mage") {
                var role1 = `${mage} 法師 / Mage`
              }
              if (player.data[0].classes[2].name == "ninja") {
                var role1 = `${assassin} 忍者 / Ninja`
              }
              if (player.data[0].classes[2].name == "hunter") {
                var role1 = `${archer}  獵人 / Hunter`
              }
              if (player.data[0].classes[2].name == "knight") {
                var role1 = `${warrior} 騎士 / Knight`
              }
              if (player.data[0].classes[2].name == "darkwizard") {
                var role1 = `${mage} 黑暗巫師 / Dark Wizard`
              }
              if (player.data[0].classes[2].name == "assassin1") {
                var role1 = `${assassin} 刺客 / Assassin`
              }
              if (player.data[0].classes[2].name == "archer1") {
                var role1 = `${archer}  弓箭手 / Archer`
              }
              if (player.data[0].classes[2].name == "warrior1") {
                var role1 = `${warrior} 戰士 / Warrior`
              }
              if (player.data[0].classes[2].name == "mage1") {
                var role1 = `${mage} 法師 / Mage`
              }
              if (player.data[0].classes[2].name == "ninja1") {
                var role1 = `${assassin} 忍者 / Ninja`
              }
              if (player.data[0].classes[2].name == "hunter1") {
                var role1 = `${archer}  獵人 / Hunter`
              }
              if (player.data[0].classes[2].name == "knight1") {
                var role1 = `${warrior} 騎士 / Knight`
              }
              if (player.data[0].classes[2].name == "darkwizard1") {
                var role1 = `${mage} 黑暗巫師 / Dark Wizard`
              }
              if (player.data[0].classes[2].name == "assassin2") {
                var role1 = `${assassin} 刺客 / Assassin`
              }
              if (player.data[0].classes[2].name == "archer2") {
                var role1 = `${archer}  弓箭手 / Archer`
              }
              if (player.data[0].classes[2].name == "warrior2") {
                var role1 = `${warrior} 戰士 / Warrior`
              }
              if (player.data[0].classes[2].name == "mage2") {
                var role1 = `${mage} 法師 / Mage`
              }
              if (player.data[0].classes[2].name == "ninja2") {
                var role1 = `${assassin} 忍者 / Ninja`
              }
              if (player.data[0].classes[2].name == "hunter2") {
                var role1 = `${archer}  獵人 / Hunter`
              }
              if (player.data[0].classes[2].name == "knight2") {
                var role1 = `${warrior} 騎士 / Knight`
              }
              if (player.data[0].classes[2].name == "darkwizard2") {
                var role1 = `${mage} 黑暗巫師 / Dark Wizard`
              }
              if (player.data[0].classes[2].name == "assassin3") {
                var role1 = `${assassin} 刺客 / Assassin`
              }
              if (player.data[0].classes[2].name == "archer3") {
                var role1 = `${archer}  弓箭手 / Archer`
              }
              if (player.data[0].classes[2].name == "warrior3") {
                var role1 = `${warrior} 戰士 / Warrior`
              }
              if (player.data[0].classes[2].name == "mage3") {
                var role1 = `${mage} 法師 / Mage`
              }
              if (player.data[0].classes[2].name == "ninja3") {
                var role1 = `${assassin} 忍者 / Ninja`
              }
              if (player.data[0].classes[2].name == "hunter3") {
                var role1 = `${archer}  獵人 / Hunter`
              }
              if (player.data[0].classes[2].name == "knight3") {
                var role1 = `${warrior} 騎士 / Knight`
              }
              if (player.data[0].classes[2].name == "darkwizard3") {
                var role1 = `${mage} 黑暗巫師 / Dark Wizard`
              }
              if (player.data[0].classes[2].name == "assassin4") {
                var role1 = `${assassin} 刺客 / Assassin`
              }
              if (player.data[0].classes[2].name == "archer4") {
                var role1 = `${archer}  弓箭手 / Archer`
              }
              if (player.data[0].classes[2].name == "warrior4") {
                var role1 = `${warrior} 戰士 / Warrior`
              }
              if (player.data[0].classes[2].name == "mage4") {
                var role1 = `${mage} 法師 / Mage`
              }
              if (player.data[0].classes[2].name == "ninja4") {
                var role1 = `${assassin} 忍者 / Ninja`
              }
              if (player.data[0].classes[2].name == "hunter4") {
                var role1 = `${archer}  獵人 / Hunter`
              }
              if (player.data[0].classes[2].name == "knight4") {
                var role1 = `${warrior} 騎士 / Knight`
              }
              if (player.data[0].classes[2].name == "darkwizard4") {
                var role1 = `${mage} 黑暗巫師 / Dark Wizard`
              }
              if (player.data[0].classes[2].name == "assassin5") {
                var role1 = `${assassin} 刺客 / Assassin`
              }
              if (player.data[0].classes[2].name == "archer5") {
                var role1 = `${archer}  弓箭手 / Archer`
              }
              if (player.data[0].classes[2].name == "warrior5") {
                var role1 = `${warrior} 戰士 / Warrior`
              }
              if (player.data[0].classes[2].name == "mage5") {
                var role1 = `${mage} 法師 / Mage`
              }
              if (player.data[0].classes[2].name == "ninja5") {
                var role1 = `${assassin} 忍者 / Ninja`
              }
              if (player.data[0].classes[2].name == "hunter5") {
                var role1 = `${archer}  獵人 / Hunter`
              }
              if (player.data[0].classes[2].name == "knight5") {
                var role1 = `${warrior} 騎士 / Knight`
              }
              if (player.data[0].classes[2].name == "darkwizard5") {
                var role1 = `${mage} 黑暗巫師 / Dark Wizard`
              }
              const xp0 = [
                player.data[0].classes[2].professions.combat,
                player.data[0].classes[2].professions.woodcutting,
                player.data[0].classes[2].professions.mining,
                player.data[0].classes[2].professions.fishing,
                player.data[0].classes[2].professions.farming,
                player.data[0].classes[2].professions.alchemism,
                player.data[0].classes[2].professions.armouring,
                player.data[0].classes[2].professions.cooking,
                player.data[0].classes[2].professions.jeweling,
                player.data[0].classes[2].professions.scribing,
                player.data[0].classes[2].professions.tailoring,
                player.data[0].classes[2].professions.weaponsmithing,
                player.data[0].classes[2].professions.woodworking,
                player.data[0].classes[2].professions.profession,
                player.data[0].classes[2].professions.overall
              ]

              const profession = [
                `:crossed_swords:**戰鬥** / **Combat** | [**${xp0[0].level}** - **${xp0[0].xp}%**]\n
                ${woodcutting}**伐木** / **Wood Cutting** | [**${xp0[1].level}** - **${xp0[1].xp}%**]\n
                ${mining}**挖礦** / **Mining** | [**${xp0[2].level}** - **${xp0[2].xp}%**]`
              ]

              let playerInfo = new Discord.RichEmbed()
                .setTitle(`${player.data[0].username} 的玩家資訊`)
                .addField(`綜合資訊`,
                  `
              **玩家階級** / **Rank** | **${player.data[0].rank}**
              **公會** / **Guild** | **${player.data[0].guild.name}** - **${player.data[0].guild.rank}**
              **翻箱數** / **Chests Found** | **${player.data[0].global.chestsFound}**
              **走路格數** / **Blocks Walked** | **${player.data[0].global.blocksWalked}格**
              **物品鑑定** / **Items Identified** | **${player.data[0].global.itemsIdentified}**
              **生物擊殺數** / **Mobs Killed** | **${player.data[0].global.mobsKilled}**
              `
                  , true)
                .addField(`${role1} 的等級資訊`, `${profession}`, true)


              message.channel.send(playerInfo);
              if (!player.data[0].classes[2]) {
                if (player.data[0].classes[2].name == "assassin") {
                  var role1 = `${assassin} 刺客 / Assassin`
                }
                if (player.data[0].classes[1].name == "archer") {
                  var role1 = `${archer}  弓箭手 / Archer`
                }
                if (player.data[0].classes[1].name == "warrior") {
                  var role1 = `${warrior} 戰士 / Warrior`
                }
                if (player.data[0].classes[1].name == "mage") {
                  var role1 = `${mage} 法師 / Mage`
                }
                if (player.data[0].classes[1].name == "ninja") {
                  var role1 = `${assassin} 忍者 / Ninja`
                }
                if (player.data[0].classes[1].name == "hunter") {
                  var role1 = `${archer}  獵人 / Hunter`
                }
                if (player.data[0].classes[1].name == "knight") {
                  var role1 = `${warrior} 騎士 / Knight`
                }
                if (player.data[0].classes[1].name == "darkwizard") {
                  var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                }
                if (player.data[0].classes[1].name == "assassin1") {
                  var role1 = `${assassin} 刺客 / Assassin`
                }
                if (player.data[0].classes[1].name == "archer1") {
                  var role1 = `${archer}  弓箭手 / Archer`
                }
                if (player.data[0].classes[1].name == "warrior1") {
                  var role1 = `${warrior} 戰士 / Warrior`
                }
                if (player.data[0].classes[1].name == "mage1") {
                  var role1 = `${mage} 法師 / Mage`
                }
                if (player.data[0].classes[1].name == "ninja1") {
                  var role1 = `${assassin} 忍者 / Ninja`
                }
                if (player.data[0].classes[1].name == "hunter1") {
                  var role1 = `${archer}  獵人 / Hunter`
                }
                if (player.data[0].classes[1].name == "knight1") {
                  var role1 = `${warrior} 騎士 / Knight`
                }
                if (player.data[0].classes[1].name == "darkwizard1") {
                  var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                }
                if (player.data[0].classes[1].name == "assassin2") {
                  var role1 = `${assassin} 刺客 / Assassin`
                }
                if (player.data[0].classes[1].name == "archer2") {
                  var role1 = `${archer}  弓箭手 / Archer`
                }
                if (player.data[0].classes[1].name == "warrior2") {
                  var role1 = `${warrior} 戰士 / Warrior`
                }
                if (player.data[0].classes[1].name == "mage2") {
                  var role1 = `${mage} 法師 / Mage`
                }
                if (player.data[0].classes[1].name == "ninja2") {
                  var role1 = `${assassin} 忍者 / Ninja`
                }
                if (player.data[0].classes[1].name == "hunter2") {
                  var role1 = `${archer}  獵人 / Hunter`
                }
                if (player.data[0].classes[1].name == "knight2") {
                  var role1 = `${warrior} 騎士 / Knight`
                }
                if (player.data[0].classes[1].name == "darkwizard2") {
                  var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                }
                if (player.data[0].classes[1].name == "assassin3") {
                  var role1 = `${assassin} 刺客 / Assassin`
                }
                if (player.data[0].classes[1].name == "archer3") {
                  var role1 = `${archer}  弓箭手 / Archer`
                }
                if (player.data[0].classes[1].name == "warrior3") {
                  var role1 = `${warrior} 戰士 / Warrior`
                }
                if (player.data[0].classes[1].name == "mage3") {
                  var role1 = `${mage} 法師 / Mage`
                }
                if (player.data[0].classes[1].name == "ninja3") {
                  var role1 = `${assassin} 忍者 / Ninja`
                }
                if (player.data[0].classes[1].name == "hunter3") {
                  var role1 = `${archer}  獵人 / Hunter`
                }
                if (player.data[0].classes[1].name == "knight3") {
                  var role1 = `${warrior} 騎士 / Knight`
                }
                if (player.data[0].classes[1].name == "darkwizard3") {
                  var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                }
                if (player.data[0].classes[1].name == "assassin4") {
                  var role1 = `${assassin} 刺客 / Assassin`
                }
                if (player.data[0].classes[1].name == "archer4") {
                  var role1 = `${archer}  弓箭手 / Archer`
                }
                if (player.data[0].classes[1].name == "warrior4") {
                  var role1 = `${warrior} 戰士 / Warrior`
                }
                if (player.data[0].classes[1].name == "mage4") {
                  var role1 = `${mage} 法師 / Mage`
                }
                if (player.data[0].classes[1].name == "ninja4") {
                  var role1 = `${assassin} 忍者 / Ninja`
                }
                if (player.data[0].classes[1].name == "hunter4") {
                  var role1 = `${archer}  獵人 / Hunter`
                }
                if (player.data[0].classes[1].name == "knight4") {
                  var role1 = `${warrior} 騎士 / Knight`
                }
                if (player.data[0].classes[1].name == "darkwizard4") {
                  var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                }
                if (player.data[0].classes[1].name == "assassin5") {
                  var role1 = `${assassin} 刺客 / Assassin`
                }
                if (player.data[0].classes[1].name == "archer5") {
                  var role1 = `${archer}  弓箭手 / Archer`
                }
                if (player.data[0].classes[1].name == "warrior5") {
                  var role1 = `${warrior} 戰士 / Warrior`
                }
                if (player.data[0].classes[1].name == "mage5") {
                  var role1 = `${mage} 法師 / Mage`
                }
                if (player.data[0].classes[1].name == "ninja5") {
                  var role1 = `${assassin} 忍者 / Ninja`
                }
                if (player.data[0].classes[1].name == "hunter5") {
                  var role1 = `${archer}  獵人 / Hunter`
                }
                if (player.data[0].classes[1].name == "knight5") {
                  var role1 = `${warrior} 騎士 / Knight`
                }
                if (player.data[0].classes[1].name == "darkwizard5") {
                  var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                }

                const xp0 = [
                  player.data[0].classes[1].professions.combat,
                  player.data[0].classes[1].professions.woodcutting,
                  player.data[0].classes[1].professions.mining,
                  player.data[0].classes[1].professions.fishing,
                  player.data[0].classes[1].professions.farming,
                  player.data[0].classes[1].professions.alchemism,
                  player.data[0].classes[1].professions.armouring,
                  player.data[0].classes[1].professions.cooking,
                  player.data[0].classes[1].professions.jeweling,
                  player.data[0].classes[1].professions.scribing,
                  player.data[0].classes[1].professions.tailoring,
                  player.data[0].classes[1].professions.weaponsmithing,
                  player.data[0].classes[1].professions.woodworking,
                  player.data[0].classes[1].professions.profession,
                  player.data[0].classes[1].professions.overall
                ]

                const profession = [
                  `:crossed_swords:**戰鬥** / **Combat** | [**${xp0[0].level}** - **${xp0[0].xp}%**]\n
                  ${woodcutting}**伐木** / **Wood Cutting** | [**${xp0[1].level}** - **${xp0[1].xp}%**]\n
                  ${mining}**挖礦** / **Mining** | [**${xp0[2].level}** - **${xp0[2].xp}%**]`
                ]

                let playerInfo = new Discord.RichEmbed()
                  .setTitle(`${role1} 的等級資訊`, `${profession}`, true)

                message.channel.send(playerInfo);


                if (!player.data[0].classes[1]) {
                  if (!player.data[0].classes[0]) {
                    message.channel.send("你輸入的玩家可能還沒創建角色喔")
                    return
                  }
                  if (player.data[0].classes[0].name == "assassin") {
                    var role1 = `${assassin} 刺客 / Assassin`
                  }
                  if (player.data[0].classes[0].name == "archer") {
                    var role1 = `${archer}  弓箭手 / Archer`
                  }
                  if (player.data[0].classes[0].name == "warrior") {
                    var role1 = `${warrior} 戰士 / Warrior`
                  }
                  if (player.data[0].classes[0].name == "mage") {
                    var role1 = `${mage} 法師 / Mage`
                  }
                  if (player.data[0].classes[0].name == "ninja") {
                    var role1 = `${assassin} 忍者 / Ninja`
                  }
                  if (player.data[0].classes[0].name == "hunter") {
                    var role1 = `${archer}  獵人 / Hunter`
                  }
                  if (player.data[0].classes[0].name == "knight") {
                    var role1 = `${warrior} 騎士 / Knight`
                  }
                  if (player.data[0].classes[0].name == "darkwizard") {
                    var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                  }
                  if (player.data[0].classes[0].name == "assassin1") {
                    var role1 = `${assassin} 刺客 / Assassin`
                  }
                  if (player.data[0].classes[0].name == "archer1") {
                    var role1 = `${archer}  弓箭手 / Archer`
                  }
                  if (player.data[0].classes[0].name == "warrior1") {
                    var role1 = `${warrior} 戰士 / Warrior`
                  }
                  if (player.data[0].classes[0].name == "mage1") {
                    var role1 = `${mage} 法師 / Mage`
                  }
                  if (player.data[0].classes[0].name == "ninja1") {
                    var role1 = `${assassin} 忍者 / Ninja`
                  }
                  if (player.data[0].classes[0].name == "hunter1") {
                    var role1 = `${archer}  獵人 / Hunter`
                  }
                  if (player.data[0].classes[0].name == "knight1") {
                    var role1 = `${warrior} 騎士 / Knight`
                  }
                  if (player.data[0].classes[0].name == "darkwizard1") {
                    var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                  }
                  if (player.data[0].classes[0].name == "assassin2") {
                    var role1 = `${assassin} 刺客 / Assassin`
                  }
                  if (player.data[0].classes[0].name == "archer2") {
                    var role1 = `${archer}  弓箭手 / Archer`
                  }
                  if (player.data[0].classes[0].name == "warrior2") {
                    var role1 = `${warrior} 戰士 / Warrior`
                  }
                  if (player.data[0].classes[0].name == "mage2") {
                    var role1 = `${mage} 法師 / Mage`
                  }
                  if (player.data[0].classes[0].name == "ninja2") {
                    var role1 = `${assassin} 忍者 / Ninja`
                  }
                  if (player.data[0].classes[0].name == "hunter2") {
                    var role1 = `${archer}  獵人 / Hunter`
                  }
                  if (player.data[0].classes[0].name == "knight2") {
                    var role1 = `${warrior} 騎士 / Knight`
                  }
                  if (player.data[0].classes[0].name == "darkwizard2") {
                    var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                  }
                  if (player.data[0].classes[0].name == "assassin3") {
                    var role1 = `${assassin} 刺客 / Assassin`
                  }
                  if (player.data[0].classes[0].name == "archer3") {
                    var role1 = `${archer}  弓箭手 / Archer`
                  }
                  if (player.data[0].classes[0].name == "warrior3") {
                    var role1 = `${warrior} 戰士 / Warrior`
                  }
                  if (player.data[0].classes[0].name == "mage3") {
                    var role1 = `${mage} 法師 / Mage`
                  }
                  if (player.data[0].classes[0].name == "ninja3") {
                    var role1 = `${assassin} 忍者 / Ninja`
                  }
                  if (player.data[0].classes[0].name == "hunter3") {
                    var role1 = `${archer}  獵人 / Hunter`
                  }
                  if (player.data[0].classes[0].name == "knight3") {
                    var role1 = `${warrior} 騎士 / Knight`
                  }
                  if (player.data[0].classes[0].name == "darkwizard3") {
                    var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                  }
                  if (player.data[0].classes[0].name == "assassin4") {
                    var role1 = `${assassin} 刺客 / Assassin`
                  }
                  if (player.data[0].classes[0].name == "archer4") {
                    var role1 = `${archer}  弓箭手 / Archer`
                  }
                  if (player.data[0].classes[0].name == "warrior4") {
                    var role1 = `${warrior} 戰士 / Warrior`
                  }
                  if (player.data[0].classes[0].name == "mage4") {
                    var role1 = `${mage} 法師 / Mage`
                  }
                  if (player.data[0].classes[0].name == "ninja4") {
                    var role1 = `${assassin} 忍者 / Ninja`
                  }
                  if (player.data[0].classes[0].name == "hunter4") {
                    var role1 = `${archer}  獵人 / Hunter`
                  }
                  if (player.data[0].classes[0].name == "knight4") {
                    var role1 = `${warrior} 騎士 / Knight`
                  }
                  if (player.data[0].classes[0].name == "darkwizard4") {
                    var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                  }
                  if (player.data[0].classes[0].name == "assassin5") {
                    var role1 = `${assassin} 刺客 / Assassin`
                  }
                  if (player.data[0].classes[0].name == "archer5") {
                    var role1 = `${archer}  弓箭手 / Archer`
                  }
                  if (player.data[0].classes[0].name == "warrior5") {
                    var role1 = `${warrior} 戰士 / Warrior`
                  }
                  if (player.data[0].classes[0].name == "mage5") {
                    var role1 = `${mage} 法師 / Mage`
                  }
                  if (player.data[0].classes[0].name == "ninja5") {
                    var role1 = `${assassin} 忍者 / Ninja`
                  }
                  if (player.data[0].classes[0].name == "hunter5") {
                    var role1 = `${archer}  獵人 / Hunter`
                  }
                  if (player.data[0].classes[0].name == "knight5") {
                    var role1 = `${warrior} 騎士 / Knight`
                  }
                  if (player.data[0].classes[0].name == "darkwizard5") {
                    var role1 = `${mage} 黑暗巫師 / Dark Wizard`
                  }

                  const xp0 = [
                    player.data[0].classes[0].professions.combat,
                    player.data[0].classes[0].professions.woodcutting,
                    player.data[0].classes[0].professions.mining,
                    player.data[0].classes[0].professions.fishing,
                    player.data[0].classes[0].professions.farming,
                    player.data[0].classes[0].professions.alchemism,
                    player.data[0].classes[0].professions.armouring,
                    player.data[0].classes[0].professions.cooking,
                    player.data[0].classes[0].professions.jeweling,
                    player.data[0].classes[0].professions.scribing,
                    player.data[0].classes[0].professions.tailoring,
                    player.data[0].classes[0].professions.weaponsmithing,
                    player.data[0].classes[0].professions.woodworking,
                    player.data[0].classes[0].professions.profession,
                    player.data[0].classes[0].professions.overall
                  ]

                  const profession = [
                    `:crossed_swords:**戰鬥** / **Combat** | [**${xp0[0].level}** - **${xp0[0].xp}%**]\n
                    ${woodcutting}**伐木** / **Wood Cutting** | [**${xp0[1].level}** - **${xp0[1].xp}%**]\n
                    ${mining}**挖礦** / **Mining** | [**${xp0[2].level}** - **${xp0[2].xp}%**]`
                  ]

                  let playerInfo = new Discord.RichEmbed()
                    .setTitle(`${player.data[0].username} 的玩家資訊`)
                    .addField(`綜合資訊`,
                      `
                  **玩家階級** / **Rank** | **${player.data[0].rank}**
                  **公會** / **Guild** | **${player.data[0].guild.name}** - **${player.data[0].guild.rank}**
                  **翻箱數** / **Chests Found** | **${player.data[0].global.chestsFound}**
                  **走路格數** / **Blocks Walked** | **${player.data[0].global.blocksWalked}格**
                  **物品鑑定** / **Items Identified** | **${player.data[0].global.itemsIdentified}**
                  **生物擊殺數** / **Mobs Killed** | **${player.data[0].global.mobsKilled}**
                  `
                      , true)
                    .addField(`${role1} 的等級資訊`, `${profession}`, true)


                  message.channel.send(playerInfo);
                }
              }
            }
          }
        }
      }
    })
  }
}


// 
//                   if (player.data[0].classes[1].name == "assassin") {

//                     const xp = [
//                       xp0
//                     ]

//                     var role1 = ":dagger: 刺客 / Assassin"

//                     essage.channel.send(playerInfo)
//                   }


module.exports.help = {
  name: 'player',
};
const Discord = require('discord.js'); 
 
module.exports.run = (bot, message, args, tools) => {
 
  let pages = [
   'test1 fuck u', 
   'test2 fuck u 2', 
   'test3 did u think i will say fuck u 3?', 
   'test4 Maybe', 
   '**test5 I want to say fuck u 10**'
  ]; 
  let page = 1; 
 
  const embed = new Discord.RichEmbed() 
    .setColor(0xffffff)
    .setFooter(`Page ${page} of ${pages.length}`) 
    .setDescription(pages[page-1])
 
  message.channel.send(embed).then(msg => { 
   
    msg.react('⏪').then( r => { 
      msg.react('⏩') 
     
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id; 
     
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 }); 
     
      
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 
        embed.setDescription(pages[page-1]); 
        embed.setFooter(`Page ${page} of ${pages.length}`); 
        msg.edit(embed) 
      })
     
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1]); 
        embed.setFooter(`Page ${page} of ${pages.length}`); 
        msg.edit(embed) 
      })
   
    })
 
  })
 
}

module.exports.help = {
    name: "test"
}

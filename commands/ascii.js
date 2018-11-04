var figlet = require('figlet');

module.exports.run = (bot, message, args, tools) => {
  
  var maxLen = 100 
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('抱歉,你沒有**管理員權限**來使用這個指令').then(message => message.delete(5000));
  if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('我沒有**管理員權限**來刪除訊息').then(message => message.delete(5000));

  if(args.join(' ').length > maxLen) return message.channel.send(`你發了超過** ${maxLen} **個字!`).then(message => message.delete(5000)); 
  
  if(!args[0]) return message.channel.send('請在指令後方填上你要打的字...').then(message => message.delete(5000));
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });


}

module.exports.help = {
  name: 'ascii',
};
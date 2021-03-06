// @flow
const Discord = require('discord.js');
const logger = require('winston');
const token = require('../token.js');

const prefix = 'tb!';

// Create the bot as a new Discord Client
const bot = new Discord.Client();

// Configure Logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = 'debug';

// Initialize the Bot
bot.on('ready', () => {
  logger.info('Connected');
  bot.user.setActivity('with JavaScript (tb!intro)')
    .then(presence => logger.info(`Activity set to: ${presence.game ? presence.game.name : 'none'}`));
});

// When a user is added to the Discord
bot.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');

  if (!channel) {
    return;
  }
  channel.send(`Welcome to the server, ${member}! As this is a bot testing discord feel free to set your notification settings to "none" by selecting the server name > notification settings. Feel free to also suppress here and all.`);
});

// When a message is received in the Discord
bot.on('message', (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content.startsWith(prefix)) {
    logger.info(`Command Read: ${message}`);
    message.delete(15000);
    if (message.content.startsWith(`${prefix}intro`)) {
      // INTRODUCTION MESSAGE
      message.reply('Hi! I am a bot created for Discord to respond to simple commands, as I have been created as an experiment my complexity may change over time. Type !help to get started.')
        .then((msg) => { msg.delete(15000); });
    } else if (message.content.startsWith(`${prefix}help`)) {
      // HELP MESSAGE
      message.reply(`The commands I currently respond to are:
      - tb!help
      - tb!intro
      - tb!gitrepo`)
        .then((msg) => { msg.delete(15000); });
    } else if (message.content.startsWith(`${prefix}gitrepo`)) {
      // DISPLAY GIT REPO
      message.reply('The repository for this bot on github can be located here: https://github.com/kjscott27/DiscordBot1')
        .then((msg) => { msg.delete(15000); });
    } else {
      // IF THE COMMAND IS NOT SUPPORTED
      message.reply('It seems you gave me a command that I do not understand, type tb!help for a list of commands I do know.')
        .then((msg) => { msg.delete(15000); });
    }
  }
});

// Log the bot into Discord (this always should be the final command)
bot.login(token.DISCORD_BOT_TOKEN);

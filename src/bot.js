// @flow
const Discord = require("discord.io");
const logger = require("winston");
const auth = require("../auth.json");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});
logger.level = "debug";

// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});

bot.on("ready", () => {
  logger.info("Connected");
  logger.info(`Logged in as: ${bot.username}(${bot.id})!`);
  bot.setPresence({
    game: {
      name: "with JavaScript",
      type: 0
    }
  });
});

bot.on("message", (user, userID, channelID, message) => {
  // Commands are executed using ! -- bot will only listen and check for messages starting with !.
  if (message.substring(0, 1) === "!") {
    const args = message.substring(1).split("");
    const cmd = args[0];

    switch (cmd) {
      case "intro":
        bot.sendMessage({
          to: channelID,
          message:
            "I am a bot being used to study and test javascript skills. Type !help for a list of commands."
        });
        break;
      case "ping":
        bot.sendMessage({
          to: channelID,
          message: "Pong!"
        });
        break;
      case "help":
        bot.sendMessage({
          to: channelID,
          message: "Current Commands: !ping, !help"
        });
        break;
      default:
        bot.sendMessage({
          to: channelID,
          message: `${user} - Sorry I dont know that one, please type !help for a full list of commands`
        });
    }
  }
});

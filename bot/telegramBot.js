require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { exec } = require("child_process");
const fs = require("fs");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const adminId = parseInt(process.env.TELEGRAM_ADMIN_ID);

const chains = JSON.parse(fs.readFileSync("./chains.json"));
const allowedNetworks = Object.keys(chains);

// Generate keyboard otomatis dari chains.json
const keyboardButtons = [];
let row = [];

allowedNetworks.forEach((net, index) => {
  row.push(net);
  if (row.length === 2) {
    keyboardButtons.push(row);
    row = [];
  }
});

if (row.length > 0) keyboardButtons.push(row);

const keyboard = {
  reply_markup: {
    keyboard: keyboardButtons,
    resize_keyboard: true
  }
};

// START COMMAND
bot.onText(/\/start/, (msg) => {
  if (msg.from.id !== adminId) {
    bot.sendMessage(msg.chat.id, "⛔ Unauthorized");
    return;
  }

  bot.sendMessage(msg.chat.id, "🚀 Select chain to deploy:", keyboard);
});

// MESSAGE HANDLER
bot.on("message", (msg) => {
  if (msg.from.id !== adminId) return;

  // Abaikan command seperti /start
  if (msg.text.startsWith("/")) return;

  const network = msg.text.toLowerCase();

  if (!allowedNetworks.includes(network)) return;

  bot.sendMessage(msg.chat.id, `🚀 Deploying to ${network}...`);

  exec(
    `npx hardhat run scripts/deploy.js --network ${network}`,
    (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(msg.chat.id, `❌ Error:\n${stderr}`);
        return;
      }

      bot.sendMessage(msg.chat.id, `✅ Result:\n${stdout}`);
    }
  );
});

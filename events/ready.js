const { prefix } = require('../index')
const client = require('../index')
const { version: discordjsVersion } = require('discord.js');

client.on('ready', async () => {
  client.user.setStatus('idle');
  console.log(`${client.user.username} ✅`)
  client.user.setActivity(`${prefix}help | Min minn#9999 ${discordjsVersion}`)

})
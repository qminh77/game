const { Client, Message, MessageEmbed } = require('discord.js');
const djsGames = require('djs-games')
const ConnectFour = new djsGames.ConnectFour()

module.exports = {
    name: 'connectfour',
    aliases: ['cfr'],
    categories : 'discord_games',
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first()
        message.channel.send(
            new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Trò chơi của bạn đang bắt đầu, vui lòng đợi ....`)
                .setAuthor(message.author.tag)
                .setFooter(`Coded By Min minn#9999`)
                .setTimestamp(5000)
        ).then(msg => {
            msg.delete({ timeout: 5000 })
            if (!user) return message.channel.send(
                new MessageEmbed()
                    .setTitle(`Hãy đề cập đến bạn bè của bạn để chơi trò chơi.`)
            ).then(hehe => {
                hehe.delete({ timeout: 5000 })
            })
            setTimeout(() => {
                ConnectFour.startGame(message)
            }, 5000);
        })

    }
}
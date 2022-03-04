const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const config = require("../../config/config.json");
let prefix = config.prefix

module.exports = {
  name: 'help',
  aliases: ['h'],
  categories : 'info',
  description: 'Hiển thị tất cả các lệnh bot có sẵn',
  useage: 'help',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, user) => {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Không có tên lệnh.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Trong tiến trình." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("Nakano Help")
        .addField('Thông tin Prefix', `Prefix: \`${prefix}\`\nBạn cũng có thể đề cập đến ${client.user} để nhận thông tin prefix.`, false)
        .addField("• Developer", `\`\`\`yml\nName: Min minn#9999\nName Miya \`\`\``)
        .addField("• Các liên kết quan trọng", `**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/qukAJxpyM7)\`|\`[Youtube](https://www.youtube.com/channel/UCzkKtLRiUFvF8PJbwpgTq6w)\`**`)
        .addFields(categories)
        .setImage("https://cdn.discordapp.com/attachments/779341728695451678/896394496961548408/standard_20.gif")
        .setDescription(
          `Use \`${prefix}help\` theo sau là tên lệnh để biết thêm thông tin về lệnh. Ví dụ: \`${prefix}help snack\`.`
        )
        .setFooter(`Để xem mô tả và thông tin về lệnh, hãy nhập: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RED")
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Lệnh không khả thi! Sử dụng \`${prefix}help\` cho tất cả các lệnh của tôi!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "Không có tên cho lệnh này."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Không có bí danh cho lệnh này."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "Không có mô tả cho lệnh này."
        )
        .setFooter(
          `Yêu cầu bởi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  }
}
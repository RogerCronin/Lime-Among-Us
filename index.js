console.log("Starting...")

const discord = require("discord.js")
const fs = require("fs")

const client = new discord.Client()

client.on("ready", () => {
  console.log("Ready to rumble")
  client.user.setActivity("Among Us")
})

client.on("message", message => {
  if(message.author.bot) return
  if(message.content == "lime accuse") {
    message.channel.send(stringReplacement(accusations[Math.floor(Math.random() * accusations.length)], message))
  } else if(message.content == "lime invite") {
    let embed = new discord.MessageEmbed()
      .setColor(0x51ED39)
      .setTitle("Invite me to your server")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=754379015997095967&permissions=0&scope=bot")
    message.channel.send(embed)
  } else if(message.content == "lime help") {
    let embed = new discord.MessageEmbed()
      .setColor(0x51ED39)
      .setTitle("Commands")
      .addFields(
        { name: "lime help", value: "Sends this help message." },
        { name: "lime accuse", value: "Accuses a random member of the server." },
        { name: "lime invite", value: "Sends an invite link to the bot." }
      )
    message.channel.send(embed)
  }
})

function stringReplacement(string, message) {
  let players = message.guild.members.cache.random(2)
  return string.replace("%player%", players[0]).replace("%player2%", players[1])
}

const accusations = [
  "I saw %player% vent",
  "%player% sus",
  "%player%'s imposter",
  "%player% was taking way too long to download",
  "%player% was taking way too long to upload",
  "%player% didn't swipe at admin",
  "Guys, I think %player% might be the imposter",
  "I saw %player% walking away from %player2%'s body",
  "Guys vote %player% trust me",
  "It's %player%",
  "%player% vented",
  "%player%'s lying vote them",
  "I'm voting %player%"
]

client.login(fs.readFileSync("./token.txt", { encoding: "utf-8", flag: "r" }))

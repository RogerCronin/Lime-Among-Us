console.log("Starting...")

const discord = require("discord.js")
const fs = require("fs")

const client = new discord.Client()

client.on("ready", () => {
  console.log("Ready to rumble")
  client.user.setActivity("Among Us")
})

client.on("message", async message => {
  if(message.author.bot) return
  if(message.content == "lime accuse") {
    message.channel.send(stringReplacement(accusations[Math.floor(Math.random() * accusations.length)], message))
  } else if(message.content == "lime defend") {
    message.channel.send(stringReplacement(defends[Math.floor(Math.random() * defends.length)], message))
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
        { name: "lime defend", value: "Defends themself or a random member of the server." },
        { name: "lime invite", value: "Sends an invite link to the bot." }
      )
    message.channel.send(embed)
  }
})

function stringReplacement(string, input) {
  if(input.permissions) {
    let player2 = input.guild.members.cache.random()
    while(player2.id == input.id) {
      player2 = input.guild.members.cache.random()
    }
    return string.replace("%player%", input).replace("%player2%", player2)
  }
  let players = input.guild.members.cache.random(2)
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
  "I'm voting %player%",
  "I literally saw %player% vent, I swear if you don't vote him",
  "It had to be %player% I didn't see them do a single task this entire game",
  "%player% did a task but the bar didn't go up, kinda sus",
  "%player% didn't do medbay scan right",
  "I saw %player% standing in front of asteroids and guns never went off",
  "It wasn't me %player% is lying i saw them kill vote them"
]

const defends = [
  "It literally can't be me, I was in electrical the entire time",
  "I saw %player% do garbage at the bottom, they're safe",
  "%player% did shields and the lights turned on, they're good",
  "I can confirm %player%",
  "How was it me? I literally couldn't have killed him",
  "Where was the body?",
  "where",
  "who",
  "The lights were out, I couldn't see who killed who",
  "Dude I was doing wires in admin",
  "Stop calling meetings, I'm trying to do simon says",
  "It's not %player%, they had so many chances to kill me but didn't",
  "If you guys vote me you're actually throwing",
  "WHAT THE FUCK I WAS NO WHERE NEAR THE FUCKING BODY STOP ACCUSING ME"
]

client.login(fs.readFileSync("./token.txt", { encoding: "utf-8", flag: "r" }))

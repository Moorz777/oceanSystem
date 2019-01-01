const Discord = require("discord.js");
const client = new Discord.Client();
const developers = ["410778583682777098","316324088865882142"];
const prefix = "#";
const em = client.emojis.get("520053312498958366");


client.on("message", async message => {
    if(!message.guild) return;
        if(!developers.has(message.author.id)) return;
            var command = message.content.split(" ")[0];
                command = command.slice(prefix.length);
                    var args = message.content.split(" ").slice(1).join(" ");
                        if(!args) return;
                            if(command == "stream") {
                                client.user.setGame(args, "https://twitch.tv/9ivv");
                                    message.channel.send(`**${em} : ${args}**`).then(m => m.delete(5000));
                            }
                            if(command == "watch") {
                                client.user.setActivity(args, { type: "WATCHING" });
                                message.channel.send(`**${em} : ${args}**`).then(m => m.delete(5000));
                            }
                            if(command == "listen") {
                                client.user.setActivity(args, { type: "LISTENING" });
                                message.channel.send(`**${em} : ${args}**`).then(m => m.delete(5000));
                            }
                            if(command == "play") {
                                client.user.setGame(args);
                                message.channel.send(`**${em} : ${args}**`).then(m => m.delete(5000));
                            }
});

client.on("message", async message => {
    if(!message.guild);
        if(message.content.startsWith(prefix + "new")) {
            var holder = message.guild.roles.find(a => a.name == "Tickets");
            var station = message.guild.channels.find(c => c.name == "Tickets" && c.type == "category");
            if(!holder) console.log(".");
                if(!station) {
                    message.guild.createChannel("Tickets", "category").then(tc => {
                        tc.setPosition(1);
                        station = tc;
                    });
                        message.guild.createChannel(`${message.author.username}-ticket`, "text").then(ticket => {
                            ticket.setParent(station);
                                ticket.overwritePermissions(message.guild.id, {
                                    READ_MESSAGES: false
                                });
                                ticket.overwritePermissions(message.author.id, {
                                    READ_MESSAGES:true
                                });
                                ticket.overwritePermissions(holder.id, {
                                    READ_MESSAGES:true
                                });
                                var te = new Discord.RichEmbed()
                                .setTitle("Welcome To Ocean Tickets.")
                                .setColor("BLACK").setDescription("**.يرجى منك تزويدنا بكل المعلومات الازمة الخاصة بمشكلتك**")
                                .setFooter(`${message.author.username} | Ticket.`, message.author.displayAvatarURL);
                                ticket.sendEmbed(te);

                        });
                }
        }
        if(message.content.startsWith(prefix + "close")) {
            if(!message.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return;
                if(!message.channel.name.includes("ticket")) return;
                    message.channel.send("**Are sure you want to close this ticket? vote with *yes* or *no*.").then(msg => {
                        var filter = m => m.author.id == message.author.id;
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 10000,
                                errors: ["time"]
                            }).then(collected => {
                                if(collected.first().content == "yes") {
                                    message.channel.delete();
                                }
                                if(collected.filter().content == "no") {
                                    msg.delete();

                                }
                                setTimeout(() => {
                                    msg.delete();
                                }, 11000);
                            });
                    });
        }
});




client.login(process.env.BOT_TOKEN);

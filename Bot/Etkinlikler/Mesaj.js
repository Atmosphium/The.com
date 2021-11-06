const { RichEmbed } = require ('discord.js')
module.exports = Mesaj => {
  const Bot = Mesaj.client
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
    
  if (Mesaj.author.bot) return
  if (!Mesaj.content.startsWith ('_')) return
  const komutİsmi = Mesaj.content.split (' ') [0].slice ('_'.length)
  const Argüman = Mesaj.content.split (' ').slice (1)
  const Yetki = Bot.Yetkilendirme (Mesaj)
  var Komut

  if (Bot.commands.has (komutİsmi)) {
    Komut = Bot.commands.get (komutİsmi)
  } else {
    if (Bot.aliases.has (komutİsmi)) {
      Komut = Bot.commands.get (Bot.aliases.get (komutİsmi))
    } else {
      Hata.setDescription ('Böyle bir komut bulunamadı.')
      Mesaj.channel.send (Hata)
    }
  }
  
  if (Komut) {
    if (Yetki < Komut.Yapılandırma.yetkiSeviyesi) return
    Komut.run (Bot, Mesaj, Argüman, Yetki)
  }
}

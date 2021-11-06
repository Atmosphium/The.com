const { RichEmbed } = require ('discord.js')
exports.run = (Bot, Mesaj) => {
  const kayıtMesajÖzel = new RichEmbed ()
  .setColor ('#ff0000')
  .setThumbnail (Bot.user.avatarURL)
  .setTitle ('Ayyıldız Resmi Discord Sunucusu')
  .setDescription ('*Kayıt olmak için <a:Onaylandi:655184893449469962> emojisine tıklayın.*')
    
  Mesaj.channel.send (kayıtMesajÖzel).then (_Mesaj => {
    _Mesaj.react ('a:Onaylandi:655184893449469962')
  })
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: [],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Özel',
  İsim: 'kayıtMesajÖzel'
}
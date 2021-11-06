const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const İçerik = Argüman.slice ().join (' ')
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Başarılı = new RichEmbed ()
  .setColor ('#007fff')
  .setFooter (Mesaj.guild.name, Mesaj.guild.iconURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    if (!İçerik) {
      Hata.setDescription ('Bir mesaj belirtiniz.')
      Mesaj.channel.send (Hata)
    } else {
      Başarılı.setDescription (İçerik)
      Mesaj.channel.bulkDelete (1)
      Mesaj.channel.send (Başarılı)
    }
  }
  
  spamKoruması.add (Mesaj.author.id)
  setTimeout ( () => {
    spamKoruması.delete (Mesaj.author.id)
  }, 3000)
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['EmbedYazı', 'EmbedYaz', 'Embed', 'embedyazı', 'embedyaz', 'embed'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eğlence',
  İsim: 'Embed Yaz'
}
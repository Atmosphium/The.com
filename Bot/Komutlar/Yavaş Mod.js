const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Saniye = Number (Argüman [0])
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Başarılı = new RichEmbed ()
  .setColor ('#007f00')
  .setTitle ('Başarılı!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    if (!Mesaj.member.hasPermission ('MANAGE_MESSAGES')) {
      Hata.setDescription ('Bu komutu kullanmak için `Mesajları Yönet` yetkisine sahip olmanız gerekmektedir.')
    } else {
      if (!Saniye) {
        Hata.setDescription ('Bir saniye girmelisiniz.')
        Mesaj.channel.send (Hata)
      } else {
        Başarılı.setDescription ('Yavaş mod başarıyla ayarlandı!')
        Mesaj.channel.send (Başarılı)
      
        Mesaj.channel.setRateLimitPerUser (Saniye)
      }
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
  Lakap: ['YavaşMod', 'SlowMode', 'yavaşmod', 'slowmode'],
  yetkiSeviyesi: 0
};

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Yavaş Mod'
}
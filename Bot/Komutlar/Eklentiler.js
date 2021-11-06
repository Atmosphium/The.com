const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Eklentiler = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Yardım Menüsü')
  .addField ('**Ayyıldız | Eklentiler**', '**&Oto-Rol** Sunucuya gelen üyelere otomatik rol verir.\n**&Sayaç** Sunucunun üye istatistiğidir.\n**&HG-BB** Sunucunuza gelen kişileri karşılar, gidenleri uğurlar.\n**&Sunucu-İst** Sunucunuzun üye istatistiğidir.')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    if (!Mesaj.member.hasPermission ('MANAGE_NICKNAMES') || !Mesaj.member.hasPermission ('MANAGE_MESSAGES') || !Mesaj.member.hasPermission ('MANAGE_GUILD')) {
      Hata.setDescription ('Bu komutu kullanmak için `İsimleri Yönet`, `Mesajları Yönet`, `Sunucuyu Yönet` yetkisinden birine sahip olmalısınız.')
    } else {
      Mesaj.channel.send (Eklentiler)
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
  Lakap: ['eklentiler'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Eklentiler'
}
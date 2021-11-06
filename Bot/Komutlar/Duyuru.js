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
  .setThumbnail (Mesaj.guild.iconURL)
  .setAuthor (`${Mesaj.author.tag} adlı yetkiliden:`, Mesaj.author.displayAvatarURL)
  .setTitle ('Duyuru!')
  .setFooter (Mesaj.guild.name, Mesaj.guild.iconURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    Hata.setDescription ('Lütfen spam yapma.')
    Mesaj.channel.send (Hata)
  } else {
    if (!Mesaj.member.hasPermission ('MANAGE_MESSAGES')) {
      Hata.setDescription ('Bu komutu kullanmak için `Mesajları Yönet` yetkisine sahip olmanız gerekmektedir.')
      Mesaj.channel.send (Hata)
    } else {
      if (!İçerik) {
        Hata.setDescription ('Bir duyuru mesajı belirtiniz.')
        Mesaj.channel.send (Hata)
      } else {
        Başarılı.setDescription (İçerik)
        Mesaj.channel.bulkDelete (1)
        Mesaj.channel.send (Başarılı)
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
  Lakap: ['Duyuru', 'Duyur', 'duyuruyap', 'duyuru', 'duyur'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Duyuru Yap'
}
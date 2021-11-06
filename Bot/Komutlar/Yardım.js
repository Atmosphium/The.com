const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Yardım = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Yardım Menüsü')
  .addField ('**Ayyıldız | Komut Kategorileri**', '**&Yardım** Bu pencereyi gösterir.\n**&Yardım Eğlence** Eğlence komutlarını gösterir.\n**&Yardım Yetkili** Yetkili komutlarını gösterir.\n**&Yardım Ekstra** Ekstra komutları gösterir.\n')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Eğlence = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Yardım Menüsü')
  .addField ('**Ayyıldız | Eğlence Komutları**', '**&Yardım Eğlence** Bu pencereyi gösterir.\n**&Avatar** Avatarı gösterir.\n**&AşkÖlçer** *O* seni seviyor mu?.\n**&EmbedYazı** Yazdığınız yazıyı *embed* bir şekilde atar.')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Yetkili = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Yardım Menüsü')
  .addField ('**Ayyıldız | Yetkili Komutları**', '**&Yardım Yetkili** Bu pencereyi gösterir.\n**&Eklentiler** Sunucuyu yönetmek için gerekli olan eklentileri gösterir.\n**&Temizle** Belirtilen sayıda mesajı siler.\n**&Duyuru** Yazdığınız mesajı duyuru şeklinde atar.\n**&YavaşMod** Kanal için yavaş modu ayarlar.')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Ekstra = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Yardım Menüsü')
  .addField ('**Ayyıldız | Ekstra Komutlar**', '**&Yardım Ekstra** Bu pencereyi gösterir.\n**&Gecikme** Botun gecikme süresini gösterir.\n**&AyyıldızPlus** AyyıldızPlus üyeliği hakkında bilgi verir.\n**&RolBilgi** Rol hakkında bilgi verir.')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    if (!Argüman [0]) if (Argüman [0] && Argüman [0] !== 'Eğlence' || Argüman [0] !== 'eğlence' || Argüman [0] !== 'ehlence' || Argüman [0] !== 'e' || Argüman [0] !== 'Yetkili' || Argüman [0] !== 'yetkili' || Argüman [0] !== 'Yeykili' || Argüman [0] !== 'Ekstra' || Argüman [0] !== 'Ek' || Argüman [0] !== 'ekstra' || Argüman [0] !== 'ek') Mesaj.channel.send (Yardım)
    if (Argüman [0] == 'Eğlence' || Argüman [0] == 'eğlence' || Argüman [0] == 'ehlence' || Argüman [0] == 'e') Mesaj.channel.send (Eğlence)
    if (Argüman [0] == 'Yetkili' || Argüman [0] == 'yetkili' || Argüman [0] == 'yeykili' || Argüman [0] == 'y') Mesaj.channel.send (Yetkili)
    if (Argüman [0] == 'Ekstra' || Argüman [0] == 'Ek' || Argüman [0] == 'ekstra' || Argüman [0] == 'ek') Mesaj.channel.send (Ekstra)
  }

  spamKoruması.add (Mesaj.author.id)
  setTimeout ( () => {
    spamKoruması.delete (Mesaj.author.id)
  }, 3000)
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['Y', 'yardım', 'y'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Ekstra',
  İsim: 'Yardım'
}
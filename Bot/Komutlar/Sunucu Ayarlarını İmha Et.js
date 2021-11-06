const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const otomesajHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Oto-Mesaj.json', 'utf8'))
const otorolHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Oto-Rol.json', 'utf8'))
const sayaçHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Sayaç.json', 'utf8'))
const sunucuistatistiğiHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Sunucu İstatistiği.json', 'utf8'))
const hgbbHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Hoşgeldin-Görüşürüz.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj) => {
    
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
    if (!Mesaj.member.hasPermission ('MANAGE_GUILD')) {
      Hata.setDescription ('Bu komutu kullanmak için `Sunucuyu Yönet` yetkisine sahip olmanız gerekmektedir.')
      Mesaj.channel.send (Hata)
    } else {
      delete otomesajHafızaDosyası [Mesaj.guild.id]
      delete otorolHafızaDosyası [Mesaj.guild.id]
      delete sayaçHafızaDosyası [Mesaj.guild.id]
      delete sunucuistatistiğiHafızaDosyası [Mesaj.guild.id]
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
  Lakap: ['SunucuİmhaEt', 'SunucuyuİmhaEt', 'SunucuSıfırla', 'SunucuyuSıfırla', 'sunucuimhaet', 'sunucuyuimhaet', 'sunucusıfırla', 'sunucuyusıfırla'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Sunucu Ayarlarını İmha Et'
}
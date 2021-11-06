const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const apHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Ayyıldız Plus.json', 'utf8'))
const sunucuİstatistiğiHafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Sunucu İstatistiği.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj) => {
  
 const sunucuAPDoğrulaması = apHafızaDosyası [Mesaj.guild.id]
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Başarılı = new RichEmbed ()
  .setColor ('#007f00')
  .setThumbnail (Bot.user.avatarURL)
  .setTitle ('Başarılı!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    Hata.setDescription ('Lütfen spam yapma.')
    Mesaj.channel.send (Hata)
  } else {
    if (!Mesaj.member.hasPermission ('MANAGE_GUILD')) {
      Hata.setDescription ('Bu komutu kullanmak için `Sunucuyu Yönet` yetkisine sahip olmanız gerekmektedir.')
      Mesaj.channel.send (Hata)
    } else {
      if (sunucuAPDoğrulaması) {
        const Kategori = Mesaj.guild.createChannel ('✯ Sunucu Paneli ✯', 'category')
        const toplamÜye = Mesaj.guild.createChannel ('✯ Toplam Üye ║', 'voice')
        const aktifÜye = Mesaj.guild.createChannel ('✯ Aktif Üye ║', 'voice')
        const toplamBot = Mesaj.guild.createChannel ('✯ Toplam Bot ║', 'voice')
        const rekorÜye = Mesaj.guild.createChannel ('✯ Aktif Üye Rekoru ║', 'voice')
        
        toplamÜye.setParent (Mesaj.guild.channels.find (Kanal => Kanal.id === Kategori.id))
        aktifÜye.setParent (Mesaj.guild.channels.find (Kanal => Kanal.id === Kategori.id))
        toplamBot.setParent (Mesaj.guild.channels.find (Kanal => Kanal.id === Kategori.id))
        rekorÜye.setParent (Mesaj.guild.channels.find (Kanal => Kanal.id === Kategori.id))
        
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id] = {
          'toplamÜyeKanalı': toplamÜye.id,
          'aktifÜyeKanalı': aktifÜye.id,
          'toplamBotKanalı': toplamBot.id,
          'aktifRekorKanalı': rekorÜye.id,
          'aktifRekor': Mesaj.guild.members.size
        }
        
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].toplamÜyeKanalı = toplamÜye.id
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].aktifÜyeKanalı = aktifÜye.id
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].toplamBotKanalı = toplamBot.id
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].aktifRekorKanalı = rekorÜye.id
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].aktifRekor = Mesaj.guild.members.size
        
        Yazıcı.writeFile ('./Bot/Hafıza/Ayyıldız Plus.json', JSON.stringify (sunucuİstatistiğiHafızaDosyası), Hata => {
          if (Hata) throw Hata
        })
      } else {
        /*const Kategori = Mesaj.guild.createChannel ('✯ Sunucu Paneli ✯', {type: 'category'}, [{
          id: Mesaj.guild.id
        }])*/
        
        Mesaj.guild.createChannel (`✯ Toplam Üye ║ ${Mesaj.guild.members.size}`, {type: 'voice'})
        Mesaj.guild.createChannel (`✯ Aktif Üye ║ ${Mesaj.guild.members.filter (Üye => Üye.status !== 'offline').size}`, {type: 'voice'})
        Mesaj.guild.createChannel (`✯ Toplam Bot ║ ${Mesaj.guild.members.filter (Üye => Üye.bot == 'true').size}`, {type: 'voice'})
        
        const toplamÜye = Mesaj.guild.channels.find (Kanal => Kanal.name == `✯ Toplam Üye ║ ${Mesaj.guild.members.size}`)
        const aktifÜye = Mesaj.guild.channels.find (Kanal => Kanal.name == `✯ Aktif Üye ║ ${Mesaj.guild.members.size}`)
        const toplamBot = Mesaj.guild.channels.find (Kanal => Kanal.name == `✯ Toplam Bot ║ ${Mesaj.guild.members.size}`)
        
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id] = {
          'toplamÜyeKanalı': toplamÜye.id,
          'aktifÜyeKanalı': aktifÜye.id,
          'toplamBotKanalı': toplamBot.id
        }
        
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].toplamÜyeKanalı = toplamÜye.id
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].aktifÜyeKanalı = aktifÜye.id
        sunucuİstatistiğiHafızaDosyası [Mesaj.guild.id].toplamBotKanalı = toplamBot.id
        
        Yazıcı.writeFile ('./Bot/Hafıza/Sunucu İstatistiği.json', JSON.stringify (sunucuİstatistiğiHafızaDosyası), Hata => {
          if (Hata) throw Hata
        })
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
  Lakap: ['Sunucuİstatistiği', 'Sunucu-İst', 'sunucuistatistiği', 'sunucu-ist'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Sunucu İstatistiği'
}
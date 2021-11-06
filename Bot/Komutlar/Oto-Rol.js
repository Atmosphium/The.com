const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const hafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Oto-Rol.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Kanal = Mesaj.mentions.channels.first ()
  const Rol = Mesaj.mentions.roles.first ()
  
  const Bilgi = new RichEmbed ()
  .setColor ('#7f00ff')
  .setTitle ('Ayyıldız: Oto-Rol Eklentisi').setURL ('https://ayyildiz-inc.glitch.me/Komutlar/Eklentiler/Oto-Rol')
  .addField ('**Oto-Rol nedir?**', 'Oto-Rol eklentisi, sunucunuza gelen üyelere otomatik olarak verilen roldür. Sunucunuza bir hedef ve bir rol belirlerseniz, her yeni üye geldiğinde bot üyeye sizin ayarladığınız rolü otomatik olarak verir.', true)
  .addField ('**Oto-Rol nasıl ayarlanır?**', 'Eklentiyi ayarlamak için bota 2 adet veri lazımdır: *oto-rol kanalı* ve bir *rol*.\n**&oto-rol @rol #kanal (örn. &oto-rol @Üye #oto-rol)** yazarak oto-rolü ayarlayabilirsiniz.', true)
  .addField ('**Oto-Rol nasıl sıfırlanır?**', '**&oto-rol sıfırla** komutunu kullanarak eklentiyi sıfırlayabilirsiniz.', true)
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
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
    if (!Mesaj.member.hasPermission ('MANAGE_SERVER')) {
      Hata.setDescription ('Bu komutu kullanmak için `Sunucuyu Yönet` yetkisine sahip olmanız gerekmektedir.')
      Mesaj.channel.send (Hata)
    } else {
      if (!Kanal && !Rol && Argüman [0] !== 'sıfırla') Mesaj.channel.send (Bilgi)
      if (!Kanal && Rol && Argüman [0] !== 'sıfırla') {
        Hata.setDescription ('Bir kanal belirtiniz.')
        Mesaj.channel.send (Hata)
      }
  
      if (Kanal && !Rol && Argüman [0] !== 'sıfırla') {
        Hata.setDescription ('Bir rol belirtiniz.')
        Mesaj.channel.send (Hata)
      }
  
      if (Kanal && Rol && Argüman [0] !== 'sıfırla') {
        Başarılı.setDescription (`Oto-Rol kanalı başarıyla *${Kanal}*, rol ise başarıyla *${Rol}* olarak ayarlandı!`)
        Mesaj.channel.send (Başarılı)
      
        hafızaDosyası [Mesaj.guild.id] = {
          Kanal: Kanal.id,
          Rol: Rol.id
        }
    
        hafızaDosyası [Mesaj.guild.id].Kanal = Kanal.id
        hafızaDosyası [Mesaj.guild.id].Rol = Rol.id
        Yazıcı.writeFile ('./Bot/Hafıza/Oto-Rol.json', JSON.stringify (hafızaDosyası), Hata => {
          if (Hata) throw Hata
        })
      }
  
      if (Argüman [0] == 'sıfırla') {
        if (hafızaDosyası [Mesaj.guild.id]) {
          Başarılı.setDescription ('Oto-Rol başarıyla sıfırlandı!')
          Mesaj.channel.send (Başarılı)
          delete hafızaDosyası [Mesaj.guild.id]
          Yazıcı.writeFile ('./Bot/Hafıza/Oto-Rol.json', JSON.stringify (hafızaDosyası), Hata => {
            if (Hata) throw Hata
          })
        } else {
          Hata.setDescription ('Oto-Rol, zaten ayarlanmamış.')
          Mesaj.channel.send (Hata)
        }
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
  Lakap: ['OtoRol', 'oto-rol', 'otorol'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eklentiler',
  İsim: 'Oto-Rol'
}
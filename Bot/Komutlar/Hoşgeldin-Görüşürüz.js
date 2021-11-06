const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const hafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Hoşgeldin-Görüşürüz.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Kanal = Mesaj.mentions.channels.first ()
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Bilgi = new RichEmbed ()
  .setColor ('#7f00ff')
  .setTitle ('Ayyıldız: Hoşgeldin-Görüşürüz Eklentisi').setURL ('https://ayyildiz-inc.glitch.me/Komutlar/Eklentiler/HG-BB')
  .addField ('**HG-BB nedir?**', 'Hoşgeldin-Görüşürüz eklentisi, sunucunuza gelen ve ya çıkan üyelere atılan bir mesajdır. Sunucunuza bir kanal belirlerseniz, her yeni üye geldiğinde veya çıktığında belirlediğiniz kanala mesaj atar.', true)
  .addField ('**HG-BB nasıl ayarlanır?**', 'Eklentiyi ayarlamak için bota 2 adet veri lazımdır: *HG-BB kanalı* ve bir *özel mesaj (isteğe göredir, ayarlamasanız bot kendi mesajını atar.)*.\n**&hg-bb #kanal (örn. &hg-bb #hg-bb)** yazarak eklentiyi ayarlayabilirsiniz.', true)
  .addField ('**HG-BB özel mesajı nasıl ayarlanır?**', 'Özel mesajı ayarlamak için `&hgmesaj` ve `&bbmesaj` komutları bulunmaktadır. Eğer mesajda üyenin etiketlenmesini istiyorsanız *-üyeetiket-*, üyenin ismini `Üye#1234` şeklinde yazmasını istiyorsanız *-üyeisim-*, üyenin sadece kullanıcı ismini yazsın istiyorsanız *-üye-*; sunucunun ismini yazsın istiyorsanız *-sunucu-*, sunucudaki kişi sayısı yazsın istiyorsanız *-sunucuüye-* yazın.', true)
  .addField ('**HG-BB nasıl sıfırlanır?**', 'Eklentiyi sıfırlamak için **&hg-bb sıfırla** komutunu kullanarak eklentiyi sıfırlayabilirsiniz.', true)
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
      if (!Kanal && Argüman [0] !== 'sıfırla') Mesaj.channel.send (Bilgi)
      if (Kanal && Argüman [0] !== 'sıfırla') {
        hafızaDosyası [Mesaj.guild.id] = {
          Kanal: Kanal.id
        }
    
        hafızaDosyası [Mesaj.guild.id].Kanal = Kanal.id
        Yazıcı.writeFile ('./Bot/Hafıza/Hoşgeldin-Görüşürüz.json', JSON.stringify (hafızaDosyası), Hata => {
          if (Hata) throw Hata
        })
        
        Başarılı.setDescription (`Hoşgeldin-Görüşürüz kanalı başarıyla *${Kanal}* olarak ayarlandı!`)
        Mesaj.channel.send (Başarılı)
      }
  
      if (Argüman [0] == 'sıfırla') {
        if (hafızaDosyası [Mesaj.guild.id]) {
          Başarılı.setDescription ('Hoşgeldin-Görüşürüz başarıyla sıfırlandı!')
          Mesaj.channel.send (Başarılı)
          delete hafızaDosyası [Mesaj.guild.id]
          Yazıcı.writeFile ('./Bot/Hafıza/Hoşgeldin-Görüşürüz.json', JSON.stringify (hafızaDosyası), Hata => {
            if (Hata) throw Hata
          })
        } else {
          Hata.setDescription ('Hoşgeldin-Görüşürüz, zaten ayarlanmamış.')
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
  Lakap: ['Hoşgeldin-Görüşürüz', 'HG-BB', 'HGBB', 'hoşgeldin-görüşürüz', 'hg-bb', 'hgbb'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eklentiler',
  İsim: 'Hoşgeldin-Görüşürüz'
}
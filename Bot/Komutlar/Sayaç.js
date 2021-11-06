const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const hafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Sayaç.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Kanal = Mesaj.mentions.channels.first ()
  const Hedef = Number (Argüman [0])
  const Yazı = Argüman.slice ().join (' ')
  .replace (`${Kanal}`, '')
  .replace (`${Hedef}`, '')
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Bilgi = new RichEmbed ()
  .setColor ('#7f00ff')
  .setTitle ('Ayyıldız: Sayaç Eklentisi').setURL ('https://ayyildiz-inc.glitch.me/Komutlar/Eklentiler/Sayac')
  .addField ('**Sayaç nedir?**', 'Sayaç eklentisi, sunucunuza gelen üyelerin bir istatistiğidir. Sunucunuza bir hedef ve bir kanal belirlerseniz, her yeni üye geldiğinde veya çıktığında şu an sunucunuzun kaç kişi olduğunu, ve hedefe kaç kişi kaldığını görürsünüz.', true)
  .addField ('**Sayaç nasıl ayarlanır?**', 'Eklentiyi ayarlamak için bota 2 adet veri lazımdır: *sayaç kanalı* ve bir *üye hedefi*.\n**&sayaç üye #kanal (örn. &sayaç 100 #sayaç)** yazarak sayacı ayarlayabilirsiniz.', true)
  .addField ('**Sayaç nasıl sıfırlanır?**', 'Belirlenen hedefe ulaşıldığında, eklenti kendisini sıfırlar. Ama siz de isterseniz **&sayaç sıfırla** komutunu kullanarak eklentiyi sıfırlayabilirsiniz.', true)
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
      if (!Kanal && !Hedef && Argüman [0] !== 'sıfırla') Mesaj.channel.send (Bilgi)
      if (!Kanal && Hedef && Argüman [0] !== 'sıfırla') {
        Hata.setDescription ('Bir kanal belirtiniz.')
        Mesaj.channel.send (Hata)
      }
    
      if (Kanal && !Hedef && Argüman [0] !== 'sıfırla') {
        Hata.setDescription ('Bir hedef belirtiniz.')
        Mesaj.channel.send (Hata)
      }
  
      if (Kanal && Hedef && Argüman [0] !== 'sıfırla') {
        if (!Yazı) {
          Başarılı.setDescription (`Sayaç kanalı başarıyla *${Kanal}*, hedef ise başarıyla *${Hedef}* olarak ayarlandı!`)
          Mesaj.channel.send (Başarılı)
    
          if (!hafızaDosyası [Mesaj.guild.id]) {
            hafızaDosyası [Mesaj.guild.id] = {
              Kanal: Kanal.id,
              Hedef: Hedef
            }
    
            hafızaDosyası [Mesaj.guild.id].Kanal = Kanal.id
            hafızaDosyası [Mesaj.guild.id].Hedef = Hedef
            Yazıcı.writeFile ('./Bot/Hafıza/Sayaç.json', JSON.stringify (hafızaDosyası), Hata => {
              if (Hata) throw Hata
            })
          } else {
            delete hafızaDosyası [Mesaj.guild.id]
            hafızaDosyası [Mesaj.guild.id] = {
              Kanal: Kanal.id,
              Hedef: Hedef
            }
    
            hafızaDosyası [Mesaj.guild.id].Kanal = Kanal.id
            hafızaDosyası [Mesaj.guild.id].Hedef = Hedef
            Yazıcı.writeFile ('./Bot/Hafıza/Sayaç.json', JSON.stringify (hafızaDosyası), Hata => {
              if (Hata) throw Hata
            })
          }
        } else {
          Başarılı.setDescription (`Sayaç kanalı başarıyla *${Kanal}*, hedef başarıyla *${Hedef}*, özel sayaç mesajı ise **${Yazı}** olarak ayarlandı!`)
          Mesaj.channel.send (Başarılı)
    
          if (hafızaDosyası [Mesaj.guild.id]) {
            hafızaDosyası [Mesaj.guild.id] = {
              Kanal: Kanal.id,
              Hedef: Hedef,
              Mesaj: Yazı
            }
    
            hafızaDosyası [Mesaj.guild.id].Kanal = Kanal.id
            hafızaDosyası [Mesaj.guild.id].Hedef = Hedef
            hafızaDosyası [Mesaj.guild.id].Mesaj = Yazı
            Yazıcı.writeFile ('./Bot/Hafıza/Sayaç.json', JSON.stringify (hafızaDosyası), Hata => {
              if (Hata) throw Hata
            })
          } else {
            delete hafızaDosyası [Mesaj.guild.id]
            
            hafızaDosyası [Mesaj.guild.id] = {
              Kanal: Kanal.id,
              Hedef: Hedef,
              Mesaj: Yazı
            }
    
            hafızaDosyası [Mesaj.guild.id].Kanal = Kanal.id
            hafızaDosyası [Mesaj.guild.id].Hedef = Hedef
            hafızaDosyası [Mesaj.guild.id].Mesaj = Yazı
            Yazıcı.writeFile ('./Bot/Hafıza/Sayaç.json', JSON.stringify (hafızaDosyası), Hata => {
              if (Hata) throw Hata
            })
          }
        }
      }
  
      if (Argüman [0] == 'sıfırla') {
        if (hafızaDosyası [Mesaj.guild.id]) {
          Başarılı.setDescription ('Sayaç başarıyla sıfırlandı!')
          Mesaj.channel.send (Başarılı)
          delete hafızaDosyası [Mesaj.guild.id]
          Yazıcı.writeFile ('./Bot/Hafıza/Sayaç.json', JSON.stringify (hafızaDosyası), Hata => {
            if (Hata) throw Hata
          })
        } else {
          Hata.setDescription ('Sayaç, zaten ayarlanmamış.')
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
  Lakap: ['sayaç'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eklentiler',
  İsim: 'Sayaç'
}
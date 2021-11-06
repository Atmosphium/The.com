const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const hafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Oto-Mesaj.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Bilgi = new RichEmbed ()
  .setColor ('#7f00ff')
  .setTitle ('Ayyıldız: Oto-Mesaj Eklentisi').setURL ('https://ayyildiz-inc.glitch.me/Komutlar/Eklentiler/Oto-Mesaj')
  .addField ('**Oto-Mesaj nedir?**', 'Oto-Mesaj eklentisi, sunucunuzda yazılan mesajlara botun otomatik cevap vermesidir.', true)
  .addField ('**Oto-Mesaj nasıl ayarlanır?**', 'Eklentiyi ayarlamak için bota 1 adet veri lazımdır: eklentinin *açık* veya *kapalı* olması.\n**&oto-mesaj aç** yazarak oto-mesajı aça, **&oto-mesaj kapat** yazrak oto-mesajı kapatabilirsiniz.', true)
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
    if (!Mesaj.member.hasPermission ('MANAGE_MESSAGES')) {
      Hata.setDescription ('Bu komutu kullanmak için `Mesajları Yönet` yetkisine sahip olmanız gerekmektedir.')
      Mesaj.channel.send (Hata)
    } else {
      if (!Argüman [0] || Argüman [0] !== 'aç' || Argüman [0] !== 'kapat' || Argüman [0] !== 'kapa') Mesaj.channel.send (Bilgi)
  
      if (Argüman [0] && Argüman [0] == 'aç') {
        Başarılı.setDescription (`Oto-Mesaj başarıyla açıldı!`)
        Mesaj.channel.send (Başarılı)
    
        hafızaDosyası [Mesaj.guild.id] = {
          Ayar: 'Açık'
        }
    
        hafızaDosyası [Mesaj.guild.id].Ayar = 'Açık'
        Yazıcı.writeFile ('./Bot/Hafıza/Oto-Mesaj.json', JSON.stringify (hafızaDosyası), Hata => {
          if (Hata) throw Hata
        })
      }
  
      if (Argüman [0] == 'kapat' || Argüman [0] == 'kapa') {
        if (hafızaDosyası [Mesaj.guild.id].Ayar == 'Açık') {
          Başarılı.setDescription ('Oto-Mesaj başarıyla kapatıldı!')
          Mesaj.channel.send (Başarılı)
          delete hafızaDosyası [Mesaj.guild.id]
          Yazıcı.writeFile ('./Bot/Hafıza/Oto-Mesaj.json', JSON.stringify (hafızaDosyası), Hata => {
            if (Hata) throw Hata
          })
        } else {
          Hata.setDescription ('Oto-Mesaj, zaten ayarlanmamış.')
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
  Lakap: ['OtoMesaj', 'Oto-Cevap', 'OtoCevap', 'oto-mesaj', 'oto-cevap', 'otomesaj', 'otocevap'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eklentiler',
  İsim: 'Oto-Mesaj'
}
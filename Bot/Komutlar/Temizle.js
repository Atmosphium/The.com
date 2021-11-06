const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Sayı = Number (Argüman [0])
  
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
      if (!Sayı) {
        Hata.setDescription ('Bir sayı belirtiniz.')
        Mesaj.channel.send (Hata)
      } else {
        if (Sayı < 101) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (Sayı)
        }
        if (Sayı > 100 && Sayı < 200) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 100)
          })
        }
        if (Sayı > 200 && Sayı < 300) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 200)
          })
        }
        if (Sayı > 300 && Sayı < 400) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 300)
          })
        }
        if (Sayı > 400 && Sayı < 500) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 400)
          })
        }
        if (Sayı > 500 && Sayı < 600) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 500)
          })
        }
        if (Sayı > 600 && Sayı < 700) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 600)
          })
        }
        if (Sayı > 700 && Sayı < 800) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 700)
          })
        }
        if (Sayı > 800 && Sayı < 900) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 800)
          })
        }
        if (Sayı > 900 && Sayı < 1000) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100).then (() => {
            Mesaj.channel.bulkDelete (Sayı - 900)
          })
        }
        
        if (Sayı == 1000) {
          Başarılı.setDescription (`${Sayı} adet mesaj başarıyla silindi!`)
          Mesaj.channel.send (Başarılı)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
          Mesaj.channel.bulkDelete (100)
        }
        if (Sayı > 1000) {
          Hata.setDescription ('En fazla 1000 adet mesaj silebilirsiniz.')
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
  Lakap: ['Temizle', 'sil', 'temizle'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Sil'
}
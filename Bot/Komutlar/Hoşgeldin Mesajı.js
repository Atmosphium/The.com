const { RichEmbed } = require ('discord.js')
const Yazıcı = require ('fs')
const hafızaDosyası = JSON.parse (Yazıcı.readFileSync ('./Bot/Hafıza/Hoşgeldin-Görüşürüz.json', 'utf8'))
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Yazı = Argüman.slice ().join (' ')
  
  const Bilgi = new RichEmbed ()
  .setColor ('#7f00ff')
  .setTitle ('Ayyıldız: Üye Giriş Mesajı')
  .addField ('**Üye Giriş Mesajı nasıl ayarlanır?**', '`&hgmesaj Mesaj` yazarak ayarlayabilirsiniz.', true)
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
      if (!Yazı) {
        Mesaj.channel.send (Bilgi)
      } else {
        Başarılı.setDescription ('Üye giriş mesajı başarıyla ayarlandı!')
        Mesaj.channel.send (Başarılı)
        
        hafızaDosyası [Mesaj.guild.id] = {
          Giriş: Yazı
        }
        
        hafızaDosyası [Mesaj.guild.id].Giriş = Yazı
        Yazıcı.writeFile ('./Bot/Hafıza/Hoşgeldin-Görüşürüz.json', JSON.stringify (hafızaDosyası), Hata => {
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
  Lakap: ['HGMesajı', 'hg-mesajı', 'hgmesajı', 'hgmesaj'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eklentiler',
  İsim: 'HG Mesajı'
}
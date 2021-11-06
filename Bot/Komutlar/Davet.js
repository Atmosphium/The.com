const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj, Argüman) => {
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Davet = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Davet Linki')
  .addField ('**Ayyıldız | Davet**', '[**Buraya**](https://discordapp.com/oauth2/authorize?client_id=639164934709575701&permissions=2146958847&scope=bot&response_type=code&redirect_uri=https://ayyildiz-inc.glitch.me/Bot/Tesekkurler) tıklayarak botu sunucunuza ekleyebilirsiniz.')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    Mesaj.channel.send (Davet)
  }
  
  spamKoruması.add (Mesaj.author.id)
  setTimeout ( () => {
    spamKoruması.delete (Mesaj.author.id)
  }, 3000)
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['Ekle', 'davet', 'ekle'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Yetkili',
  İsim: 'Davet'
}
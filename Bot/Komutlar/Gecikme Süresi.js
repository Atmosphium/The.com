const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj) => {
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const gecikmeSüresi = new RichEmbed ()
  .setColor ('#7f00ff')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ayyıldız: Gecikme Süresi')
  .setDescription (`Ayyıldız'ın gecikme süresi ${Math.round (Bot.ping)} milisaniye.`)
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    Mesaj.channel.send (gecikmeSüresi)
  }
  
  spamKoruması.add (Mesaj.author.id)
  setTimeout ( () => {
    spamKoruması.delete (Mesaj.author.id)
  }, 3000)
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['Gecikme', 'GecikmeSüresi', 'Ping', 'gecikme', 'gecikmesüresi', 'ping'],
  yetkiSeviyesi: 0
};

exports.Bilgi = {
  Kategori: 'Ekstra',
  İsim: 'Gecikme Süresi'
}
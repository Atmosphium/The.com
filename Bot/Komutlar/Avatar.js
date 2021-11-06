const { RichEmbed } = require ('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj) => {
  
  var Kullanıcı
  if (!Mesaj.mentions.users.first ()) Kullanıcı = Mesaj.author
  if (Mesaj.mentions.users.first ()) Kullanıcı = Mesaj.mentions.users.first ()
  
  var botDenetlemesi
  if (Kullanıcı.bot.toString () == 'true') botDenetlemesi = 'botun'
  if (Kullanıcı.bot.toString () == 'false') botDenetlemesi = 'istifadəçinin'
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ay-Ulduz', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Avatar = new RichEmbed ()
  .setColor ('#7f00ff')
  .setAuthor (`${Mesaj.author.tag} tərəfindən istifadə olunan "${exports.Bilgi.İsim}" əmri.`, Mesaj.author.displayAvatarURL)
  .setTitle (`${Kullanıcı.tag} adlı ${botDenetlemesi} avatarı:`).setURL (Kullanıcı.displayAvatarURL)
  .setImage (Kullanıcı.displayAvatarURL)
  .setFooter ('Ay-Ulduz', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (spamKoruması.has (Mesaj.author.id)) {
    Hata.setDescription ('Zəhmət olmazsa spam eləmə.')
    Mesaj.channel.send (Hata)
  } else {
    Mesaj.channel.send (Avatar)
  }
  
  spamKoruması.add (Mesaj.author.id)
  setTimeout ( () => {
    spamKoruması.delete (Mesaj.author.id)
  }, 3000) 
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['PP', 'avatar', 'pp'],
  yetkiSeviyesi: 0
};

exports.Bilgi = {
  Kategori: 'Eğlence',
  İsim: 'Avatar'
}
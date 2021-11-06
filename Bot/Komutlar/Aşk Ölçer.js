const { RichEmbed } = require ('discord.js')
exports.run = (Bot, Mesaj) => {
  
  const aşkSeviyesi = Math.round (Math.random () * 101)
  var Kalp
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Xəta!')
  .setFooter ('Ay-Ulduz', Bot.user.avatarURL)
  .setTimestamp ()
    
  const aşkÖlçer = new RichEmbed ()
  .setColor ('#ff007f')
  .setThumbnail (Bot.user.avatarURL)
  .setAuthor (`${Mesaj.author.tag} tərəfindən istifadə olunan "${exports.Bilgi.İsim}" əmri.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Ay-Ulduz: Aşk-Ölçer')
  .setFooter ('Ay-Ulduz', Bot.user.avatarURL)
  .setTimestamp ()
  
  if (!Mesaj.mentions.users.first ()) {
    Hata.setDescription ('Bu əmrdən istifadə etmək üçün birisini etiketləməlisiniz.')
    Mesaj.channel.send (Hata)
  }
  
  if (!Mesaj.mentions.users.first () && Mesaj.mentions.users.first () == Mesaj.author) {
    Hata.setDescription ('Ə bu dəli olub özü özün sevir ki')
    Mesaj.channel.send (Hata)
  }

  if (Mesaj.author.id !== '339514931277856778' && Mesaj.mentions.users.first ().id !== '615591156230914079') {
    if (Mesaj.mentions.users.first () && Mesaj.mentions.users.first () !== Mesaj.author) {
      if (aşkSeviyesi < 11) {
        Kalp = ':heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Aga bu iş olmaz, ${aşkSeviyesi}% ile aşk mı olur?\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 21 && aşkSeviyesi > 10) {
        Kalp = ':heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Olabilir belki, ama olmaz. ${aşkSeviyesi}% ile olabilir mi?\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 31 && aşkSeviyesi > 20) {
        Kalp = ':heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Well yes, but actually no (${aşkSeviyesi}%).\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 41 && aşkSeviyesi > 30) {
        Kalp = ':heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Denemekten zarar gelmez. Sonuçta ${aşkSeviyesi}% de bir şey, değil mi?\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 51 && aşkSeviyesi > 40) {
        Kalp = ':heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Nerrredeyse yarı yarıya (${aşkSeviyesi}%)!\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 61 && aşkSeviyesi > 50) {
        Kalp = ':heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Bilemedim ki yani şimdi, :poop: da çıkabilir (${aşkSeviyesi}%).\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 71 && aşkSeviyesi > 60) {
        Kalp = ':heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`Well yes, but actually **YES**! ${aşkSeviyesi}%...\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 81 && aşkSeviyesi > 70) {
        Kalp = ':heart::heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart:'
        aşkÖlçer.setDescription (`YouTube'daki yorumlardan çok kalp aldın aga... (${aşkSeviyesi}%)\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi < 91 && aşkSeviyesi > 80) {
        Kalp = ':heart::heart::heart::heart::heart::heart::heart::heart::heart::black_heart:'
        aşkÖlçer.setDescription (`1 puanla büte kaldın be aga... (${aşkSeviyesi}%)\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    
      if (aşkSeviyesi > 90) {
        Kalp = ':heart::heart::heart::heart::heart::heart::heart::heart::heart::heart:'
        aşkÖlçer.setDescription (`**YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEESSSSSSSSS!** ( ${aşkSeviyesi}%)\n${Kalp}`)
        Mesaj.channel.send (aşkÖlçer)
      }
    }
  }
  
  if (Mesaj.author.id == '339514931277856778' && Mesaj.mentions.users.first ().id == '615591156230914079') {
    Kalp = ':heart::heart::heart::heart::heart::heart::heart::heart::heart::heart:'
    aşkÖlçer.setDescription (`**Sizin bir birinizi sevmemeniz mümkün mü?!** 101% !\n${Kalp}`)
    Mesaj.channel.send (aşkÖlçer)
  }
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['sevgi'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eğlence',
  İsim: 'Sevgi'
}
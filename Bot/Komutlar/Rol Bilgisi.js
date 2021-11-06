const { RichEmbed } = require ('discord.js')
exports.run = async (Bot, Mesaj, Argüman) => {
  
  var Rol, renkliDynoLogo, mesajRengi, Renk
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const RolBilgi = new RichEmbed ()
  .setAuthor (`${Mesaj.author.tag} tarafından kullanılan "${exports.Bilgi.İsim}" komutu.`, Mesaj.author.displayAvatarURL)
  .setTitle ('Rol Bilgisi:')
  .setFooter ('Rolün Oluşturulma Tarihi')
  
  if (!Mesaj.mentions.roles.first () && !Argüman [0]) {
    Hata.setDescription ('Lütfen bir rol etiketleyiniz, veya bir rol ismi/ID\'si giriniz.')
    Mesaj.channel.send (Hata)
  } else {
    if (Mesaj.mentions.roles.first () || Argüman && Mesaj.guild.roles.find (rolBul => rolBul.id === Argüman [0]) || Mesaj.guild.roles.find (rolBul => rolBul.name === Argüman.slice ().join (' '))) {
      if (Mesaj.mentions.roles.first ()) Rol = Mesaj.mentions.roles.first ()
      if (Argüman && Mesaj.guild.roles.find (rolBul => rolBul.id === Argüman [0])) Rol = Argüman && Mesaj.guild.roles.find (rolBul => rolBul.id === Argüman [0])
      if (Mesaj.guild.roles.find (rolBul => rolBul.name === Argüman.slice ().join (' '))) Rol = Mesaj.guild.roles.find (rolBul => rolBul.name === Argüman.slice ().join (' '))
      
      var rolEtiketlenmesi = Rol.mentionable
      var üyeMisin = Mesaj.member.roles.some (üyeRolleri => üyeRolleri.name === Rol.name)
    
      if (rolEtiketlenmesi == true) rolEtiketlenmesi = 'Açık'
      if (rolEtiketlenmesi == false) rolEtiketlenmesi = 'Kapalı'
    
      if (üyeMisin == true) üyeMisin = 'Aktif'
      if (üyeMisin == false) {
        if (Rol.members.size > 0) üyeMisin = 'Pasif'
        if (Rol.members.size == 0) üyeMisin = 'Rolde kimse olmadığına\nve sen de bir\nsihirbaz olmadığına göre...'
      }
    
      if (Rol.hexColor == '#000000') Renk = 'Rol sıradan renkte.'
      if (Rol.hexColor !== '#000000') Renk = `(Hex) ${Rol.hexColor}`
    
      if (Rol.hexColor == '#000000') renkliDynoLogo = 'https://color.dyno.gg/color/c7ccd1/960x960.png'
      if (Rol.hexColor !== '#000000') renkliDynoLogo = `https://color.dyno.gg/color/${Rol.hexColor.replace('#', '')}/960x960.png`
    
      if (Rol.hexColor == '#000000') RolBilgi.setColor ('#c7ccd1')
      if (Rol.hexColor !== '#000000') RolBilgi.setColor (Rol.hexColor)
      
      RolBilgi.setThumbnail (renkliDynoLogo)
      RolBilgi.addField ('**Sıra**', `Yukarıdan ${Number (Mesaj.guild.roles.size) - Number(Rol.position)},\naşağıdan ${Rol.position}`, true)
      RolBilgi.addField ('**Üye Sayısı**', Rol.members.size, true)
      RolBilgi.addField ('**Rengi**', `${Renk}`, true)
      RolBilgi.addField ('**Senin Bu Roldeki\nÜyelik Durumun**', üyeMisin, true)
      RolBilgi.setTimestamp (Rol.createdAt)
      
      if (Mesaj.mentions.roles.first ()) {
        RolBilgi.addField ('**Etiketlenebilmesi**', 'Sen bu rolün bilgisini\netiketleyerek aldığına göre...', true)
        RolBilgi.addField ('**İsmi**', Rol.name, true)
        RolBilgi.addField ('**ID**', Rol.id, true)
      } else {
        if (Mesaj.guild.roles.find (rolBul => rolBul.id === Argüman [0])) {
          RolBilgi.addField ('**Etiketlenebilmesi**', rolEtiketlenmesi, true)
          RolBilgi.addField ('**İsmi**', Rol.name, true)
          RolBilgi.addField ('**ID**', 'Sen benden\ndaha iyi bilirsin.', true)
        }
        
        if (Mesaj.guild.roles.find (rolBul => rolBul.name === Argüman.slice ().join (' '))) {
          RolBilgi.addField ('**Etiketlenebilmesi**', rolEtiketlenmesi, true)
          RolBilgi.addField ('**İsmi**', 'Sen benden\ndaha iyi bilirsin.', true)
          RolBilgi.addField ('**ID**', Rol.id, true)
        }
      }
      
      Mesaj.channel.send (RolBilgi)
    }
  }
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: true,
  Lakap: ['RolBilgisi', 'Rol-Bilgi', 'RolBilgi', 'rolbilgisi', 'rol-bilgi', 'rolbilgi'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Ekstra',
  İsim: 'Rol Bilgisi'
}
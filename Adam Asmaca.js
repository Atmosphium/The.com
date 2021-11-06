const { RichEmbed } = require('discord.js')
const spamKoruması = new Set ()
exports.run = (Bot, Mesaj) => {
  
  const Hata = new RichEmbed ()
  .setColor ('#7f0000')
  .setTitle ('Hata!')
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
    
  const adamAsmaca = new RichEmbed ()
  .setFooter ('Ayyıldız', Bot.user.avatarURL)
  .setTimestamp ()
  
  const Kelimeler = ['Türkiye', 'ilgili', 'çerçeve', 'mektup', 'sorun', 'şart', 'hemen', 'karanlık', 'çizgi', 'hız', 'ileri', 'güzel', 'denge', 'içmek']
  
  const Durumlar = [
    '╔═══════۩۞ Adam Asmaca ۞۩═══════╗\n║    ║\n║  (x_x)\n║  —( )—\n║   / \\n║\n║\n║'
  ]
  if (spamKoruması.has (Mesaj.author.id)) {
    if (!Mesaj.author.bot) {
      Hata.setDescription ('Lütfen spam yapma.')
      Mesaj.channel.send (Hata)
    }
  } else {
    Mesaj.channel.send (adamAsmaca)
  }
  
  spamKoruması.add (Mesaj.author.id)
  setTimeout ( () => {
    spamKoruması.delete (Mesaj.author.id)
  }, 3000)
}

exports.Yapılandırma = {
  enabled: true,
  guildOnly: false,
  Lakap: ['Adam-Asmaca', 'AdamAsmaca', 'adam-asmaca', 'adamasmaca'],
  yetkiSeviyesi: 0
}

exports.Bilgi = {
  Kategori: 'Eğlence',
  İsim: 'Adam Asmaca'
}
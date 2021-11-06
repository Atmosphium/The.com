const Discord = require ('discord.js')
module.exports = Bot => {
  
  const aktiviteListesi = [
    'Ayyıldız – Türkiye\'nin botu!',
    '[YENİ!] Ayarlanabilir Mesajlı HG-BB!',
    '[YENİ!] Oto-Rol, Sayaç, HG-BB!',
    '[YAKINDA!] AyyıldızPlus Üyeliği!'
  ]
  
  setInterval (() => {
    const Aktivite = Math.floor (Math.random () * (aktiviteListesi.length - 1))
    Bot.user.setActivity (aktiviteListesi [Aktivite])
  }, 7000)
  
  const g = Bot.guilds.get('622405967249932309')
}
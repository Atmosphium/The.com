const etkinlikBul = etkinlikİsmi => require(`./${etkinlikİsmi}`)
module.exports = Bot => {
  Bot.on ('message', etkinlikBul ('Mesaj'))
  Bot.on ('ready', () => etkinlikBul ('Hazır') (Bot))
}
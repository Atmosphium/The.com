// ===== Site Kodları ===== \\

// ==== Ayarlar ==== \\

const siteAyarlayıcı = require("express");
const Site = siteAyarlayıcı();
const HTTP = require("http");

Site.use(siteAyarlayıcı.static("Site/Ayarlar"));
Site.listen(3000);

Site.set("view engine", "ejs");

// ==== Ayarlar ==== \\

// ==== Sayfalar ==== \\

Site.get("/", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Anasayfa.html`);
});

Site.get("/Bot", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Bot/Anasayfa.html`);
});

Site.get("/Bot/Komutlar", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Bot/Komutlar.html`);
});

Site.get("/Bot/Komutlar/Panel/Sayac", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Bot/Panel/Sayaç.html`);
});

Site.get("/Bot/Uyelikler", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Bot/Üyelikler.html`);
});

Site.get("/KodEgitimleri", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Kod Eğitimleri.html`);
});

Site.get("/Bot/Tesekkurler", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/Bot/Teşekkürler.html`);
});

Site.get("/DiscordGiris", (dosyayıAra, Sonuç) => {
  Sonuç.redirect(
    "https://discordapp.com/api/oauth2/authorize?client_id=639164934709575701&redirect_uri=https%3A%2F%2Fayyildiz-inc.glitch.me%2FBot&response_type=code&scope=identify%20guilds"
  );
});

Site.get("/!", (dosyayıAra, Sonuç) => {
  Sonuç.sendFile(`${__dirname}/Site/Sayfalar/! Test.html`);
});

// ==== Sayfalar ==== \\

// ===== Site Kodları ===== \\

// ===== Bot Kodları ===== \\

// ==== Ayarlar ==== \\

// === Sınırsız Çalışma === \\

setInterval(() => {
  HTTP.get(`http://ayulduz-az.glitch.me/`);
}, 280000);

// === Sınırsız Çalışma === \\

const { Client, WebhookClient, RichEmbed, Collection } = require("discord.js");
const Bot = new Client();
const Yazıcı = require("fs");
const Zamanlayıcı = require("moment");
require("./Bot/Etkinlikler/! Etkinlik Çalıştırıcı")(Bot);

const bilgiMesajı = Mesaj => {
  console.log(`
╔═══════════════════════════════════════۩۞ Ayyıldız ۞۩═══════════════════════════════════════╗
║ ► Bot, kullanım için hazır!
║ ► ${Mesaj}
╚═══════════════════════════════════════۩۞ Ayyıldız ۞۩═══════════════════════════════════════╝
  `);
};

Bot.commands = new Collection();
Bot.aliases = new Collection();
Yazıcı.readdir("./Bot/Komutlar/", (err, files) => {
  bilgiMesajı(`${files.length} komut çalıştırılıyor.`);
  if (err) console.error(err);
  files.forEach(f => {
    const Komut = require(`./Bot/Komutlar/${f}`);
    Bot.commands.set(Komut.Bilgi.İsim, Komut);
    Bot.commands.set(Komut.Bilgi.İsim, Komut);
    Komut.Yapılandırma.Lakap.forEach(alias => {
      Bot.aliases.set(alias, Komut.Bilgi.İsim);
    });
  });
});

Bot.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Bot/Komutlar/${command}`)];
      let komutDosyası = require(`./Bot/Komutlar/${command}`);
      Bot.commands.delete(command);
      Bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) Bot.aliases.delete(alias);
      });
      Bot.commands.set(command, komutDosyası);
      komutDosyası.Yapılandırma.Lakap.forEach(alias => {
        Bot.aliases.set(alias, komutDosyası.Bilgi.İsim);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

Bot.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./Bot/Komutlar/${command}`);
      Bot.commands.set(command, cmd);
      cmd.Yapılandırma.Lakap.forEach(alias => {
        Bot.aliases.set(alias, cmd.Bilgi.İsim);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

Bot.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Bot/Komutlar/${command}`)];
      let cmd = require(`./Bot/Komutlar/${command}`);
      Bot.commands.delete(command);
      Bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) Bot.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

Bot.Yetkilendirme = Mesaj => {
  let yetkiSeviyesi = 0;
  if (Mesaj.member.hasPermission("SEND_MESSAGES")) yetkiSeviyesi = 1;
  if (Mesaj.member.hasPermission("MANAGE_MESSAGES")) yetkiSeviyesi = 2;
  if (Mesaj.member.hasPermission("BAN_MEMBERS")) yetkiSeviyesi = 3;
  if (Mesaj.member.hasPermission("ADMINISTRATOR")) yetkiSeviyesi = 4;
  if (Mesaj.author.id === "339514931277856778") yetkiSeviyesi = 5;
  return yetkiSeviyesi;
};

function botİstatistikKanalları() {
  setInterval(() => {
    Bot.guilds
      .get("642396091916222474")
      .channels.get("647692468992868362")
      .setName(`💬 Toplam Sunucu: ${Bot.guilds.size}`);
    Bot.guilds
      .get("642396091916222474")
      .channels.get("647692498835079168")
      .setName(`💬 Toplam Kullanıcı: ${Bot.users.size}`);
    Bot.guilds
      .get("642396091916222474")
      .channels.get("647692517503926285")
      .setName(
        `👤 Aktif Kullanıcı: ${
          Bot.users.filter(Kullanıcı => Kullanıcı.status !== "offline").size
        }`
      );
  }, 3000);
}

Bot.login("NjU4MjEyMTc0MTc4ODExOTA1.Xf8i3w._pSJC7y3piqeLENAQg4O2C33gpk");

// ==== Ayarlar ==== \\

// ==== Komutlar ==== \\

Bot.on("message", Mesaj => {
  const hataMesajı = [
    "Bu komutu kullanmak için gerekli yetkiye sahip görünmüyorsunuz.",
    "Bu komutu kullanmak için argüman girmeniz lazım.\nArgümanlara bakmak için [tıklayın](https://ayyildiz-inc.glitch.me/Bot/Komutlar/Arguman)",
    "Bu komutu kullanmak için birisini etiketlemelisiniz.",
    "Bu komutu kullanmak için bir rol etiketlemelisiniz.",
    "Bu komutu kullanmak için bir kanal etiketlemelisiniz."
  ];

  const Hata = new RichEmbed()
    .setColor("#7f0000")
    .setTitle("Hata!")
    .setFooter("Ayyıldız", Bot.user.avatarURL)
    .setTimestamp();

  const Komut = Mesaj.content.split(" ")[0].slice("&");
  const Argüman = Mesaj.content.split(" ").slice(0);
});

// === Eklentiler === \\

// == Sayaç == \\

Bot.on("guildMemberAdd", Üye => {
  const sayaçHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Sayaç.json", "utf8")
  );
  if (sayaçHafızaDosyası[Üye.guild.id]) {
    const Sunucu = sayaçHafızaDosyası[Üye.guild.id];
    const Kanal = Sunucu.Kanal;
    const kanalBul = Bot.guilds.get(Üye.guild.id).channels.get(Kanal);
    const Hedef = Sunucu.Hedef;
    const Yazı = Sunucu.Mesaj;

    const kayıtTarihi = Zamanlayıcı(Üye.user.createdAt)
      .format(
        `DD MMMM dddd YYYY ${Number(
          Zamanlayıcı(Üye.user.createdAt).format("HH")
        ) + 3}:mm`
      )
      .replace("Monday", "Pazartesi")
      .replace("Tuesday", "Salı")
      .replace("Wednesday", "Çarşamba")
      .replace("Thursday", "Perşembe")
      .replace("Friday", "Cuma")
      .replace("Saturday", "Cumartesi")
      .replace("Sunday", "Pazar")

      .replace("January", "Ocak")
      .replace("February", "Şubat")
      .replace("March", "Mart")
      .replace("April", "Nisan")
      .replace("May", "Mayıs")
      .replace("June", "Haziran")
      .replace("July", "Temmuz")
      .replace("August", "Ağustos")
      .replace("September", "Eylül")
      .replace("October", "Ekim")
      .replace("November", "Kasım")
      .replace("December", "Aralık");

    const Mesaj = new RichEmbed()
      .setColor("#007f00")
      .setAuthor(`${Üye.user.tag}`, Üye.user.displayAvatarURL)
      .setThumbnail(Üye.user.displayAvatarURL)
      .setFooter("Ay-Ulduz", Bot.user.avatarURL)
      .setTimestamp();

    if (Üye.guild.members.size < Hedef) {
      if (!Yazı) {
        Mesaj.setDescription(`Sayende ${Üye.guild.members.size} kişi olduk!`)
          .addField("**İstifadəçi məlumatları:**", "Görək kimsən? :)")
          .addField("**İstifadəçi adı:**", Üye.user.tag, true)
          .addField("**Şəxsiyyət nömrəsi:**", Üye.user.id, true)
          .addField("**Discord'a qeyd olduğu tarix:**", kayıtTarihi, true)
          .setFooter("Ay-Ulduz", Bot.user.avatarURL)
          .setTimestamp();
      } else {
        Mesaj.setDescription(Yazı);
      }
      Mesaj.setTitle("Serverimizə xoş gəldin!!");
      kanalBul.send(Mesaj);
    }

    if (Üye.guild.members.size == Hedef) {
      Mesaj.setTitle(
        `Serverimizə xoş gəldin, sayəndə ${Hedef} nəfərlik hədəfə çatdıq!`
      );
      kanalBul.send(Mesaj);
      delete sayaçHafızaDosyası[Üye.guild.id];
      Yazıcı.writeFile(
        "./Bot/Hafıza/Sayaç.json",
        JSON.stringify(sayaçHafızaDosyası),
        Hata => {
          if (Hata) throw Hata;
        }
      );
    }
  }
});

Bot.on("guildMemberRemove", Üye => {
  const sayaçHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Sayaç.json", "utf8")
  );
  if (sayaçHafızaDosyası[Üye.guild.id]) {
    const Sunucu = sayaçHafızaDosyası[Üye.guild.id];
    const Kanal = Sunucu.Kanal;
    const kanalBul = Bot.guilds.get(Üye.guild.id).channels.get(Kanal);
    const Hedef = Sunucu.Hedef;
    const Yazı = Sunucu.Mesaj;

    const kayıtTarihi = Zamanlayıcı(Üye.user.createdAt)
      .format(
        `DD MMMM dddd YYYY ${Number(
          Zamanlayıcı(Üye.user.createdAt).format("HH")
        ) + 3}:mm`
      )
      .replace("Monday", "Pazartesi")
      .replace("Tuesday", "Salı")
      .replace("Wednesday", "Çarşamba")
      .replace("Thursday", "Perşembe")
      .replace("Friday", "Cuma")
      .replace("Saturday", "Cumartesi")
      .replace("Sunday", "Pazar")

      .replace("January", "Ocak")
      .replace("February", "Şubat")
      .replace("March", "Mart")
      .replace("April", "Nisan")
      .replace("May", "Mayıs")
      .replace("June", "Haziran")
      .replace("July", "Temmuz")
      .replace("August", "Ağustos")
      .replace("September", "Eylül")
      .replace("October", "Ekim")
      .replace("November", "Kasım")
      .replace("December", "Aralık");

    const Mesaj = new RichEmbed()
      .setColor("#7f0000")
      .setAuthor(`${Üye.user.tag}`, Üye.user.displayAvatarURL)
      .setThumbnail(Üye.user.displayAvatarURL)
      .setTitle("Serverimizdən çıxdı!");

    if (!Yazı) {
      Mesaj.setDescription(
        `Çıxdığın üçün təəssüf ki, ${Üye.guild.members.size} nəfərik...`
      )
        .addField("**İstifadəçi məlumatlari:**", "Baxaq kim idin? :(")
        .addField("**İstifadəçi adı:**", Üye.user.tag, true)
        .addField("**Kimlik Numarası:**", Üye.user.id, true)
        .addField("**Discord'a kayıt olduğu tarih:**", kayıtTarihi, true)
        .setFooter("Ayyıldız", Bot.user.avatarURL)
        .setTimestamp();
      kanalBul.send(Mesaj);
    } else {
      Mesaj.setDescription(Yazı);
      kanalBul.send(Mesaj);
    }
  }
});

// == Sayaç == \\

// == Oto-Rol == \\

Bot.on("guildMemberAdd", Üye => {
  const otorolHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Oto-Rol.json", "utf8")
  );
  if (otorolHafızaDosyası[Üye.guild.id]) {
    const Sunucu = otorolHafızaDosyası[Üye.guild.id];
    const Kanal = Sunucu.Kanal;
    const kanalBul = Bot.guilds.get(Üye.guild.id).channels.get(Kanal);
    const Rol = Sunucu.Rol;
    var Yazı = Sunucu.Mesaj;

    const kayıtTarihi = Zamanlayıcı(Üye.user.createdAt)
      .format(
        `DD MMMM dddd YYYY ${Number(
          Zamanlayıcı(Üye.user.createdAt).format("HH")
        ) + 3}:mm`
      )
      .replace("Monday", "Pazartesi")
      .replace("Tuesday", "Salı")
      .replace("Wednesday", "Çarşamba")
      .replace("Thursday", "Perşembe")
      .replace("Friday", "Cuma")
      .replace("Saturday", "Cumartesi")
      .replace("Sunday", "Pazar")

      .replace("January", "Ocak")
      .replace("February", "Şubat")
      .replace("March", "Mart")
      .replace("April", "Nisan")
      .replace("May", "Mayıs")
      .replace("June", "Haziran")
      .replace("July", "Temmuz")
      .replace("August", "Ağustos")
      .replace("September", "Eylül")
      .replace("October", "Ekim")
      .replace("November", "Kasım")
      .replace("December", "Aralık");

    const Mesaj = new RichEmbed()
      .setColor("#007f00")
      .setAuthor(`${Üye.user.tag}`, Üye.user.displayAvatarURL)
      .setThumbnail(Üye.user.displayAvatarURL)
      .setTitle("Sunucumuza hoşgeldin!")
      .setDescription("Buyur, rolün!")
      .addField("**Üye bilgileri:**", "Bakalım kimmişsin? :)")
      .addField("**Kullanıcı ismi:**", Üye.user.tag, true)
      .addField("**Kimlik Numarası:**", Üye.user.id, true)
      .addField("**Discord'a kayıt olduğu tarih:**", kayıtTarihi, true)
      .setFooter("Ayyıldız", Bot.user.avatarURL)
      .setTimestamp();

    kanalBul.send(Mesaj);
    Üye.addRole(Üye.guild.roles.get(Rol));
  }
});

// == Oto-Rol == \\

// == Sunucu İstatistiği == \\

// = Kanal Adları = \\

Bot.on("message", Mesaj => {
  const sunucuİstatistiğiHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Sunucu İstatistiği.json", "utf8")
  );
  if (sunucuİstatistiğiHafızaDosyası[Mesaj.guild.id]) {
    const Sunucu = sunucuİstatistiğiHafızaDosyası[Mesaj.guild.id];

    const toplamÜyeKanalı = Sunucu.toplamÜye.Kanal;
    const toplamÜyeKanalİsmi = Sunucu.toplamÜye.İsim;

    const aktifÜyeKanalı = Sunucu.aktifÜye.Kanal;
    const aktifÜyeKanalİsmi = Sunucu.aktifÜye.İsim;

    const toplamBotKanalı = Sunucu.toplamBot.Kanal;
    const toplamBotKanalİsmi = Sunucu.toplamBot.İsim;

    const aktifÜyeRekorKanalı = Sunucu.aktifRekor.Kanal;
    const aktifÜyeRekorKanalİsmi = Sunucu.aktifRekor.İsim;
    const aktifÜyeRekoru = Sunucu.aktifRekor.Sayı;

    if (toplamÜyeKanalİsmi) {
      if (toplamÜyeKanalİsmi.includes("-veri-"))
        toplamÜyeKanalİsmi = toplamÜyeKanalİsmi.replace(
          "-veri-",
          Mesaj.guild.members.size
        );
      Bot.guilds
        .get(Mesaj.guild.id)
        .channels.get(toplamÜyeKanalı)
        .setName(toplamÜyeKanalİsmi);
    } else {
      Bot.guilds
        .get(Mesaj.guild.id)
        .channels.get(toplamÜyeKanalı)
        .setName(`✯ Toplam Üye ║ ${Mesaj.guild.members.size}`);
    }

    if (aktifÜyeKanalİsmi) {
      if (aktifÜyeKanalİsmi.includes("-veri-"))
        aktifÜyeKanalİsmi = aktifÜyeKanalİsmi.replace(
          "-veri-",
          Mesaj.guild.members.filter(
            Kullanıcı => Kullanıcı.status !== "offline"
          ).size
        );
      Bot.guilds
        .get(Mesaj.guild.id)
        .channels.get(aktifÜyeKanalı)
        .setName(aktifÜyeKanalİsmi);
    } else {
      Bot.guilds
        .get(Mesaj.guild.id)
        .channels.get(aktifÜyeKanalı)
        .setName(
          `✯ Aktif Üye ║ ${
            Mesaj.guild.members.filter(
              Kullanıcı => Kullanıcı.status !== "offline"
            ).size
          }`
        );
    }

    if (toplamBotKanalİsmi) {
      if (toplamBotKanalİsmi.includes("-veri-"))
        toplamBotKanalİsmi = aktifÜyeKanalİsmi.replace(
          "-veri-",
          Mesaj.guild.members.filter(Kullanıcı => Kullanıcı.bot == "true").size
        );
      Bot.guilds
        .get(Mesaj.guild.id)
        .channels.get(toplamBotKanalı)
        .setName(toplamBotKanalİsmi);
    } else {
      Bot.guilds
        .get(Mesaj.guild.id)
        .channels.get(toplamBotKanalı)
        .setName(
          `✯ Toplam Bot ║ ${
            Mesaj.guild.members.filter(Kullanıcı => Kullanıcı.bot == "true")
              .size
          }`
        );
    }

    if (aktifÜyeRekorKanalı) {
      if (aktifÜyeRekorKanalİsmi) {
        if (aktifÜyeRekorKanalİsmi.includes("-veri-"))
          aktifÜyeRekorKanalİsmi = aktifÜyeRekorKanalİsmi.replace(
            "-veri-",
            aktifÜyeRekoru
          );
        Bot.guilds
          .get(Mesaj.guild.id)
          .channels.get(aktifÜyeRekorKanalı)
          .setName(aktifÜyeRekorKanalİsmi);
      } else {
        Bot.guilds
          .get(Mesaj.guild.id)
          .channels.get(aktifÜyeRekorKanalı)
          .setName(`✯ Aktif Üye Rekoru ║ ${aktifÜyeRekoru}`);
      }
    }
  }
});

Bot.on("guildMemberAdd", Üye => {
  const sunucuİstatistiğiHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Sunucu İstatistiği.json", "utf8")
  );
  if (sunucuİstatistiğiHafızaDosyası[Üye.guild.id]) {
    const Sunucu = sunucuİstatistiğiHafızaDosyası[Üye.guild.id];

    const toplamÜyeKanalı = Sunucu.toplamÜye.Kanal;
    const toplamÜyeKanalİsmi = Sunucu.toplamÜye.İsim;

    const aktifÜyeKanalı = Sunucu.aktifÜye.Kanal;
    const aktifÜyeKanalİsmi = Sunucu.aktifÜye.İsim;

    const toplamBotKanalı = Sunucu.toplamBot.Kanal;
    const toplamBotKanalİsmi = Sunucu.toplamBot.İsim;

    const aktifÜyeRekorKanalı = Sunucu.aktifRekor.Kanal;
    const aktifÜyeRekorKanalİsmi = Sunucu.aktifRekor.İsim;
    const aktifÜyeRekoru = Sunucu.aktifRekor.Sayı;

    if (toplamÜyeKanalİsmi) {
      if (toplamÜyeKanalİsmi.includes("-veri-"))
        toplamÜyeKanalİsmi = toplamÜyeKanalİsmi.replace(
          "-veri-",
          Üye.guild.members.size
        );
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamÜyeKanalı)
        .setName(toplamÜyeKanalİsmi);
    } else {
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamÜyeKanalı)
        .setName(`✯ Toplam Üye ║ ${Üye.guild.members.size}`);
    }

    if (aktifÜyeKanalİsmi) {
      if (aktifÜyeKanalİsmi.includes("-veri-"))
        aktifÜyeKanalİsmi = aktifÜyeKanalİsmi.replace(
          "-veri-",
          Üye.guild.members.filter(Kullanıcı => Kullanıcı.status !== "offline")
            .size
        );
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(aktifÜyeKanalı)
        .setName(aktifÜyeKanalİsmi);
    } else {
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(aktifÜyeKanalı)
        .setName(
          `✯ Aktif Üye ║ ${
            Üye.guild.members.filter(
              Kullanıcı => Kullanıcı.status !== "offline"
            ).size
          }`
        );
    }

    if (toplamBotKanalİsmi) {
      if (toplamBotKanalİsmi.includes("-veri-"))
        toplamBotKanalİsmi = aktifÜyeKanalİsmi.replace(
          "-veri-",
          Üye.guild.members.filter(Kullanıcı => Kullanıcı.bot == "true").size
        );
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamBotKanalı)
        .setName(toplamBotKanalİsmi);
    } else {
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamBotKanalı)
        .setName(
          `✯ Toplam Bot ║ ${
            Üye.guild.members.filter(Kullanıcı => Kullanıcı.bot == "true").size
          }`
        );
    }

    if (aktifÜyeRekorKanalı) {
      if (aktifÜyeRekorKanalİsmi) {
        if (aktifÜyeRekorKanalİsmi.includes("-veri-"))
          aktifÜyeRekorKanalİsmi = aktifÜyeRekorKanalİsmi.replace(
            "-veri-",
            aktifÜyeRekoru
          );
        Bot.guilds
          .get(Üye.guild.id)
          .channels.get(aktifÜyeRekorKanalı)
          .setName(aktifÜyeRekorKanalİsmi);
      } else {
        Bot.guilds
          .get(Üye.guild.id)
          .channels.get(aktifÜyeRekorKanalı)
          .setName(`✯ Aktif Üye Rekoru ║ ${aktifÜyeRekoru}`);
      }
    }
  }
});

Bot.on("guildMemberRemove", Üye => {
  const sunucuİstatistiğiHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Sunucu İstatistiği.json", "utf8")
  );
  if (sunucuİstatistiğiHafızaDosyası[Üye.guild.id]) {
    const Sunucu = sunucuİstatistiğiHafızaDosyası[Üye.guild.id];

    const toplamÜyeKanalı = Sunucu.toplamÜye.Kanal;
    const toplamÜyeKanalİsmi = Sunucu.toplamÜye.İsim;

    const aktifÜyeKanalı = Sunucu.aktifÜye.Kanal;
    const aktifÜyeKanalİsmi = Sunucu.aktifÜye.İsim;

    const toplamBotKanalı = Sunucu.toplamBot.Kanal;
    const toplamBotKanalİsmi = Sunucu.toplamBot.İsim;

    const aktifÜyeRekorKanalı = Sunucu.aktifRekor.Kanal;
    const aktifÜyeRekorKanalİsmi = Sunucu.aktifRekor.İsim;
    const aktifÜyeRekoru = Sunucu.aktifRekor.Sayı;

    if (toplamÜyeKanalİsmi) {
      if (toplamÜyeKanalİsmi.includes("-veri-"))
        toplamÜyeKanalİsmi = toplamÜyeKanalİsmi.replace(
          "-veri-",
          Üye.guild.members.size
        );
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamÜyeKanalı)
        .setName(toplamÜyeKanalİsmi);
    } else {
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamÜyeKanalı)
        .setName(`✯ Toplam Üye ║ ${Üye.guild.members.size}`);
    }

    if (aktifÜyeKanalİsmi) {
      if (aktifÜyeKanalİsmi.includes("-veri-"))
        aktifÜyeKanalİsmi = aktifÜyeKanalİsmi.replace(
          "-veri-",
          Üye.guild.members.filter(Kullanıcı => Kullanıcı.status !== "offline")
            .size
        );
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(aktifÜyeKanalı)
        .setName(aktifÜyeKanalİsmi);
    } else {
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(aktifÜyeKanalı)
        .setName(
          `✯ Aktif Üye ║ ${
            Üye.guild.members.filter(
              Kullanıcı => Kullanıcı.status !== "offline"
            ).size
          }`
        );
    }

    if (toplamBotKanalİsmi) {
      if (toplamBotKanalİsmi.includes("-veri-"))
        toplamBotKanalİsmi = aktifÜyeKanalİsmi.replace(
          "-veri-",
          Üye.guild.members.filter(Kullanıcı => Kullanıcı.bot == "true").size
        );
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamBotKanalı)
        .setName(toplamBotKanalİsmi);
    } else {
      Bot.guilds
        .get(Üye.guild.id)
        .channels.get(toplamBotKanalı)
        .setName(
          `✯ Toplam Bot ║ ${
            Üye.guild.members.filter(Kullanıcı => Kullanıcı.bot == "true").size
          }`
        );
    }

    if (aktifÜyeRekorKanalı) {
      if (aktifÜyeRekorKanalİsmi) {
        if (aktifÜyeRekorKanalİsmi.includes("-veri-"))
          aktifÜyeRekorKanalİsmi = aktifÜyeRekorKanalİsmi.replace(
            "-veri-",
            aktifÜyeRekoru
          );
        Bot.guilds
          .get(Üye.guild.id)
          .channels.get(aktifÜyeRekorKanalı)
          .setName(aktifÜyeRekorKanalİsmi);
      } else {
        Bot.guilds
          .get(Üye.guild.id)
          .channels.get(aktifÜyeRekorKanalı)
          .setName(`✯ Aktif Üye Rekoru ║ ${aktifÜyeRekoru}`);
      }
    }
  }
});

// = Kanal Adları = \\

// = Aktif Üye Rekoru Kaydetme = \\

Bot.on("message", Mesaj => {
  const sunucuİstatistiğiHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Sunucu İstatistiği.json", "utf8")
  );
  /*  const apHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Ayyıldız Plus.json", "utf8")
  );*/

  if (
    // apHafızaDosyası[Mesaj.guild.id] &&
    sunucuİstatistiğiHafızaDosyası[Mesaj.guild.id]
  ) {
    if (
      Mesaj.guild.members.size >
      sunucuİstatistiğiHafızaDosyası[Mesaj.guild.id].aktifRekor
    ) {
      sunucuİstatistiğiHafızaDosyası[Mesaj.guild.id] = {
        aktifRekor: Mesaj.guild.members.size
      };

      sunucuİstatistiğiHafızaDosyası[Mesaj.guild.id].aktifRekor =
        Mesaj.guild.members.size;

      Yazıcı.writeFile(
        "./Bot/Hafıza/Sunucuİstatistiği.json",
        JSON.stringify(sunucuİstatistiğiHafızaDosyası),
        Hata => {
          if (Hata) throw Hata;
        }
      );
    }
  }
});

// = Aktif Üye Rekoru Kaydetme = \\

// == Sunucu İstatistiği == \\

// == Hoşgeldin-Görüşürüz == \\

Bot.on("guildMemberAdd", Üye => {
  const hgbbHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Hoşgeldin-Görüşürüz.json", "utf8")
  );
  const Sunucu = hgbbHafızaDosyası[Üye.guild.id];
  const Kanal = Sunucu.Kanal;
  const kanalBul = Bot.guilds.get(Üye.guild.id).channels.get(Kanal);
  var Yazı = Sunucu.Giriş;

  const Mesaj = new RichEmbed().setColor("#007f00");

  if (Yazı) {
    if (Yazı.includes("-üyeetiket-"))
      Yazı = Yazı.replace("-üyeetiket-", Üye.user);
    if (Yazı.includes("-üyeisim-"))
      Yazı = Yazı.replace("-üyeisim-", Üye.user.tag);
    if (Yazı.includes("-üye-")) Yazı = Yazı.replace("-üye-", Üye.user.username);
    if (Yazı.includes("-sunucu-")) Yazı = Yazı.replace("-sunucu-", Üye.guild);
    if (Yazı.includes("-sunucuüye-"))
      Yazı = Yazı.replace("-sunucuüye-", Üye.guild.members.size);
    Mesaj.setDescription(Yazı);
  } else {
    Mesaj.setDescription(
      `Serverimizə xoş gəldin ${Üye.user}, sayəndə \`${Üye.guild}\` adlı serverimiz ${Üye.guild.members.size} nəfər oldu!`
    );
  }

  kanalBul.send(Mesaj);
});

Bot.on("guildMemberRemove", Üye => {
  const hgbbHafızaDosyası = JSON.parse(
    Yazıcı.readFileSync("./Bot/Hafıza/Hoşgeldin-Görüşürüz.json", "utf8")
  );
  const Sunucu = hgbbHafızaDosyası[Üye.guild.id];
  const Kanal = Sunucu.Kanal;
  const kanalBul = Bot.guilds.get(Üye.guild.id).channels.get(Kanal);
  var Yazı = Sunucu.Çıkış;

  const Mesaj = new RichEmbed().setColor("#7f0000");

  if (Yazı) {
    if (Yazı.includes("-üyeetiket-"))
      Yazı = Yazı.replace("üyeetiket-", Üye.user);
    if (Yazı.includes("-üyeisim-"))
      Yazı = Yazı.replace("-üyeisim-", Üye.user.tag);
    if (Yazı.includes("-üye-")) Yazı = Yazı.replace("-üye-", Üye.user.username);
    if (Yazı.includes("-sunucu-")) Yazı = Yazı.replace("-sunucu-", Üye.guild);
    if (Yazı.includes("-sunucuüye-"))
      Yazı = Yazı.replace("-sunucuüye-", Üye.guild.members.size);
    Mesaj.setDescription(Yazı);
  } else {
    Mesaj.setDescription(
      `Güle güle ${Üye.user}, çıktığın için \`${Üye.guild}\` adlı sunucumuz ${Üye.guild.members.size} kişi oldu!`
    );
  }

  kanalBul.send(Mesaj);
});

// == Hoşgeldin-Görüşürüz == \\

// === Eklentiler === \\

// ==== Komutlar ==== \\

Bot.on("guildCreate", Sunucu => {
  const Mesaj = Yazıcı.readFileSync("./Bot/Sunucuya Eklendim.txt", "utf8");

  const Kanal = Sunucu.channels.forEach();
  const kanalBul = Math.random() * Kanal.length;

  Bot.guilds
    .get(Sunucu.id)
    .channels.get(Kanal[kanalBul].id)
    .send(Mesaj);
});

// ===== Bot Kodları ===== \\

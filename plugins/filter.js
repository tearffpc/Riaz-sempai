/* Copyright (C) 2020 farhan-dqz.
re codded by nexusNw
*/
const fs = require('fs')
const Riaz = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const Riz = require('../riaz')
const afnp = Riaz.PLKAFN !== false ? Riaz.PLKAFN.split(',') : [];
const jid = Config.DISBGM !== false ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.STANDPLK == 'off' || Config.STANDPLK == 'OFF') {
if (Config.WORKTYPE == 'private') {

Riaz.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Riaz.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Riaz.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918129624395@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['name entha','Helo','King','Kooi','Tuttu','Azaru','Ramos','Tentacion','baby','Love','nirthada','Neymar','umma','Music','Kurup','Friend','Rose','aara','Alone','ayilla','bie','Chiri','colony','enth','entha','Fuck','Goal','Hambada','Kanja','Killedi','kuthirappavan','mathi','Meeting','mier','moonji','Name','Oh no','pever','Potta','Serious','Soldier','Sry','Subscribe','thottu','Va','Vada','vimanam','sorry','nanban','Lala','Smile','ghost','La be','Sed','Uff','Legend','music','Fek','Psycho','Town','Pwoli','Uyir','Malang','Bad','Boss','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','myr','Malappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','😎','Akshay uyir','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Myre','myre','Oompi','oompi','parayatte','Fresh','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','Lamiya engineering','lamiya engineering','nallath','Nallath','Neymer','neymer','patti','Patti','poora','Poora','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Caption','caption','onn poyi','Onn poyi','problem','Problem','lub','recharge','Recharge','chill','Chill','help','Help','kunda','Kunda','povano','Povano','sthalam','Sthalam','tholvi','Tholvi','vannu','Vannu']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Riaz.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Riaz.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
    
if (Config.PLKBGM == 'one') {  
    
Riaz.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918129624395@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/media/nexmen.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
        if (!!message.mention && message.mention[0] == Config.AFNN) {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/media/tagre.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['name entha','Helo','King','Kooi','Love','Thamasha','big fan','charlie','gd n8','kar98','love u','Endi','endi','noob','Poweresh','Perfect ok','perfect ok','power','saji','sed','single','waiting','Myr','myr','Malappuram','uyir','thug','avastha','Moodesh','sketched','Cr7','Z aayi','manasilayo','Hi','Hlo','Poda','nirtheda','Aarulle','Cr7 back','Portugal','ennitt','Boss',,'Haters','ayn','Kgf','sed bgm','Messi','Hehe','hehe','Set aano','set aano','Bot myren','Venda','venda','chadhi','Chadhi','Hbday','hbday','Bot','R yyi padicho','Umbi','umbi','parayatte','Fresh','fresh','Ok da','ok da','Feel aayi','feel aaayi','Scene','scene','Ok bei','ok bei','Da','Kozhi','kozhi','adi','Adi','kali','Kali','thantha','Thantha','Aysheri','aysheri','thund','Thund','thot','Thot','sneham','Sneham','pm','Pm','paatt','Paatt','njan','Njan','life','Life','Killadi','killadi','good bye','Good bye','evide','Evide','achan','Achan','kunna','Kunna','broken','Broken','why','Why','enth patti','Enth patti','pani','Pani','padicho','Padicho','paad','Paad','Chatho','chatho','lover','Lover','nanayikoode','Nanayikoode','Die','die','hate','Hate','nallath','Nallath','Neymer','neymer','patti','Patti','Rohit','rohit','thall','Thall','Theri','theri','potte','Potte','Caption','caption','onn poyi','Onn poyi','problem','Problem','Chill','chill','help','Help','Kunda','kunda','povano','sthalam','Sthalam','tholvi','Tholvi','vannu','Vannu','malayalam','Malayalam','vaa','Vaa','lub','Ayin','thyr','Thyr','Sad','sad','Sed','kiss','Kiss','baby','Baby','hi','voice','love','Admin','admin','Remove','remove','boss','sorry','Sorry','Gud nyt','dream','Dream','Avastha','Bye','bye','nexusnw','Nexus','Riaz sempai','Aflah','nwakhil']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/media/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
    if (Config.PLKBGM == 'two') {    
    Riaz.addCommand({on: 'text', fromMe: false}, (async (message, match) => {   
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918129624395@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/media/nexmen.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
        if (!!message.mention && message.mention[0] == Config.AFNN) {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/media/tagre.mp3'),  MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['Hi','Fek','Hlo','How','Kali','Kd','King','Love','Lover','Vere bot','Wait','da','delete','enth','happy','hehe','hello','king','paatt','pro','pwoli','remove','sed','sheri','sherikkum','vaa','vanno','vannu','hi','nexusnw','Nexus']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/bgmone/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
Riaz.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.STICKERP){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '8129624395@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/stickers/nexus Nw.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['ayin','back','Back','Bot','fuck','Fuck','Hehe','Hello','Hlo','Kill','kill','kiss','line','love','mwolu','Mwolu','single','tha','thund','z','Z','bie','Bie','Nexus','Riaz sempai','Aflah','nwakhil']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/stickers/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
    }
);
}));
     async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
 
     Riaz.addCommand({on: 'text', fromMe: false,onlyGroup: true}, (async (message, match) => {

        if(Pinky.afnp !== 'false'){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        
const array = afnp
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
    await message.client.sendMessage(message.jid,Lang.KICK, MessageType.text, {quoted: message.data });  
    await message.client.groupRemove(message.jid, [message.data.participant]);                
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        }
    );
}));

}
}

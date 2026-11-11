// Üreticiyi (araclar/uretici.js) ve yol tablosunu (araclar/yol.json) oyun dosyasına gömer. Kullanım: node araclar/yol-gom.js
// Oyun tek dosya olduğu için üretici kodu dosyanın içinde durur; kaynağı uretici.js'tir, oyun dosyasındaki kopya elle değiştirilmez.
const fs=require('fs'),path=require('path');const F=path.join(__dirname,'..','prototipler','01-kum-sisesi.html');
let s=fs.readFileSync(F,'utf8');const ur=fs.readFileSync(path.join(__dirname,'uretici.js'),'utf8').trimEnd(),yol=JSON.parse(fs.readFileSync(path.join(__dirname,'yol.json'),'utf8'));
if(/<\/script/i.test(ur))throw new Error('üretici kodunda </script olamaz');
const koy=(ad,govde)=>{const a='// <'+ad+'>',b='// </'+ad+'>',i=s.indexOf(a),j=s.indexOf(b);if(i<0||j<0||j<i)throw new Error(ad+' işareti yok');const le=s.indexOf('\n',i);s=s.slice(0,le+1)+govde+'\n'+s.slice(j);};
koy('uretici',ur);koy('yol','const YOL='+JSON.stringify(yol)+';');fs.writeFileSync(F,s);
console.log('gömüldü:',yol.length,'yol öğesi,',ur.length,'bayt üretici');

// Oyunun tek kaynağı prototipler/01-kum-sisesi.html. Bu betik onu uygulama için www/ altına kopyalar:
// three.js'i CDN yerine pakete gömer ve Google Fonts bağlantısını kaldırır (uygulama internetsiz çalışır;
// yazı tipi iPhone'da sistemin yuvarlak yazısına, ui-rounded / SF Pro Rounded'a düşer).
import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const src=join(root,'..','..','prototipler','01-kum-sisesi.html');
const www=join(root,'www');
mkdirSync(join(www,'lib'),{recursive:true});
copyFileSync(join(root,'node_modules','three','build','three.min.js'),join(www,'lib','three.min.js'));
let html=readFileSync(src,'utf8');
const cdn='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
if(!html.includes(cdn))throw new Error('three.js CDN adresi kaynakta bulunamadı');
html=html.replace(cdn,'lib/three.min.js');
html=html.replace(/<link rel="preconnect"[^>]*>\s*/g,'').replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>\s*/g,'');
// İzin verilen tek dış adres: Ayarlar'daki gizlilik politikası bağlantısı (Safari'de açılır)
const rest=html.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g,'').replace('https://www.investa.com.tr/sandful/privacy.html','');
if(/https?:\/\//.test(rest))throw new Error('www/index.html hâlâ dış adres içeriyor: '+rest.match(/https?:\/\/[^\s'"`)]+/)[0]);
writeFileSync(join(www,'index.html'),html);
console.log('www/index.html hazır');

// Google Play görselleri: öne çıkan görsel (1024x500) ve mağaza simgesi (512x512). Ham ekran görüntülerini (ekran-ham.js) kullanır.
// Kullanım: NUNITO=<@fontsource/nunito/files> NODE_PATH=$(npm root -g) node uygulamalar/sandful/scripts/play-gorsel.js
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const F=(process.env.NUNITO||'')+'/';const TMP=path.join(require('os').tmpdir(),'sandful-ekran');
const APP=path.join(__dirname,'..');const OUT=path.join(APP,'magaza','play');fs.mkdirSync(OUT,{recursive:true});
const font=[800,900].map(w=>['latin','latin-ext'].map(s=>`@font-face{font-family:'Nunito';font-weight:${w};src:url(file://${F}nunito-${s}-${w}-normal.woff2) format('woff2');}`).join('')).join('');
const ph=(raw,x,y,r,w)=>`<div class="ph" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${r}deg)"><img src="file://${TMP}/raw-en/${raw}.png" style="width:${w}px;height:${(w*932/430).toFixed(1)}px"></div>`;
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});
 const p=await (await b.newContext({viewport:{width:1024,height:500},deviceScaleFactor:1})).newPage();
 fs.writeFileSync(TMP+'/_one.html',`<!doctype html><meta charset="utf-8"><style>${font}
  html,body{margin:0;width:1024px;height:500px;overflow:hidden}
  body{position:relative;font-family:'Nunito',sans-serif;background:radial-gradient(70% 120% at 72% 55%,rgba(255,255,255,.6),rgba(255,255,255,0) 62%),linear-gradient(135deg,#fbe9d2 0%,#f1cfa4 55%,#e3ad7c 100%)}
  .t{position:absolute;left:64px;top:132px;width:400px}
  .ic{width:84px;height:84px;border-radius:20px;box-shadow:0 10px 24px rgba(90,50,10,.28);display:block}
  h1{margin:22px 0 0;font-weight:900;font-size:82px;line-height:1;letter-spacing:-1.5px;color:#e8843c;text-shadow:0 2px 0 rgba(255,255,255,.55)}
  h2{margin:12px 0 0;font-weight:800;font-size:31px;line-height:1.15;color:#5a3d26}
  .ph{position:absolute;padding:7px;border-radius:40px;background:#1c1510;box-shadow:0 26px 50px rgba(60,30,5,.36),0 6px 14px rgba(60,30,5,.22),inset 0 0 0 1.5px rgba(255,255,255,.12)}
  .ph img{display:block;border-radius:33px}
 </style>
 <div class="t"><img class="ic" src="file://${APP}/resources/icon.png"><h1>Sandful</h1><h2>Relaxing Sand Art</h2></div>
 ${ph('02-geceSehri',500,96,-7,206)}${ph('08-gokkusagi',780,70,7,206)}${ph('01-gunbatimi',632,34,0,222)}`);
 await p.goto('file://'+TMP+'/_one.html');await p.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(i=>i.decode())]));
 await p.screenshot({path:OUT+'/one-cikan-1024x500.png',type:'png'});
 await p.setViewportSize({width:512,height:512});
 await p.setContent(`<style>html,body{margin:0}img{display:block;width:512px;height:512px}</style><img src="file://${APP}/resources/icon.png">`);await p.evaluate(()=>document.images[0].decode());
 await p.screenshot({path:OUT+'/simge-512.png',type:'png'});
 console.log(fs.readdirSync(OUT));await b.close();})();

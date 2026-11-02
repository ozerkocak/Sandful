// ekran-ham.js görüntülerini başlıklı App Store karelerine çevirir. App Store Connect'in istediği boyut: 1206x2622 (6.3" iPhone,
// "iPhone with Dynamic Island, medium display"). Tasarım 430x932 CSS px sahnede çizilir, 402x874 @3x görünüme sığdırılır. JPEG → magaza/ekran-goruntuleri/<dil>/
// Kullanım: NUNITO=<@fontsource/nunito/files> NODE_PATH=$(npm root -g) node uygulamalar/sandful/scripts/ekran-kare.js
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const F=(process.env.NUNITO||'')+'/';const TMP=path.join(require('os').tmpdir(),'sandful-ekran');
const font=[700,800,900].map(w=>['latin','latin-ext'].map(s=>`@font-face{font-family:'Nunito';font-weight:${w};src:url(file://${F}nunito-${s}-${w}-normal.woff2) format('woff2');}`).join('')).join('');
const OUT=path.join(__dirname,'..','magaza','ekran-goruntuleri');
// sıra, ham dosya, başlık (en/tr), arka plan, yazı rengi
const S=[
 ['01','01-ana',{en:'Three worlds,<br>thirty calm scenes',tr:'Üç dünya,<br>otuz sakin manzara'},['#f6ecd9','#ecd7b1','#dfc08e'],'#4a3826'],
 ['02','02-kuzey',{en:'Glowing sand<br>under the night sky',tr:'Gece göğünde<br>ışıldayan kum'},['#2c3566','#1d2350','#121636'],'#fff6e6'],
 ['03','03-gunbatimi',{en:'Pour sand.<br>Watch a scene appear.',tr:'Kum dök,<br>manzara ortaya çıksın.'},['#fbe3d6','#f3c0a8','#e79a86'],'#4a2a22'],
 ['04','04-yagmur',{en:'Draw rain and waves<br>with a stick',tr:'Çubukla yağmur<br>ve dalga çiz'},['#e6ecf2','#c9d4e0','#a9b8ca'],'#2a3442'],
 ['05','05-ilkkar',{en:'Pour while<br>the jar rocks',tr:'Kavanoz sallanırken<br>dök'},['#eef3f8','#d5e2ee','#b8cde0'],'#2a3a4a'],
 ['06','06-lale',{en:'Sand that changes<br>color as you pour',tr:'Döktükçe renk<br>değiştiren kum'},['#fde8e2','#f6c6b8','#eea08f'],'#4a2522'],
 ['07','07-koy',{en:'Place a house,<br>a pine, a star',tr:'Ev, çam, yıldız:<br>yerine bırak'},['#e3e9f6','#c3cde8','#9eabd6'],'#232c58'],
];
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});
 const VW=402,VH=874,Z=VW/430;const p=await (await b.newContext({viewport:{width:VW,height:VH},deviceScaleFactor:3})).newPage();
 for(const lang of ['en','tr']){fs.mkdirSync(`${OUT}/${lang}`,{recursive:true});
  for(const [n,raw,cap,bg,ink] of S){
   const img=`file://${TMP}/raw-${lang}/${raw}.png`;
   fs.writeFileSync(TMP+'/_frame.html',`<!doctype html><meta charset="utf-8"><style>${font}
    html,body{margin:0;width:100vw;height:100vh;overflow:hidden}
    .st{position:absolute;left:0;top:${((VH-932*Z)/2).toFixed(2)}px;width:430px;height:932px;zoom:${Z}}
    body{background:radial-gradient(120% 70% at 50% 62%,rgba(255,255,255,.55),rgba(255,255,255,0) 60%),linear-gradient(180deg,${bg[0]} 0%,${bg[1]} 55%,${bg[2]} 100%);font-family:'Nunito',sans-serif;color:${ink};position:relative}
    h1{margin:0;position:absolute;top:62px;left:0;right:0;text-align:center;font-weight:900;font-size:34.5px;line-height:1.12;letter-spacing:-.2px}
    .ph{position:absolute;left:50%;top:196px;transform:translateX(-50%);width:318px;padding:8px;border-radius:50px;background:#1c1510;
        box-shadow:0 28px 60px rgba(40,20,5,.35),0 6px 16px rgba(40,20,5,.25),inset 0 0 0 1.5px rgba(255,255,255,.12)}
    .ph img{display:block;width:318px;height:${(318*932/430).toFixed(1)}px;border-radius:42px}
   </style><div class="st"><h1>${cap[lang]}</h1><div class="ph"><img src="${img}"></div></div>`);await p.goto('file://'+TMP+'/_frame.html');
   await p.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(i=>i.decode())]));
   const file=`${OUT}/${lang}/${n}.jpg`;await p.screenshot({path:file,type:'jpeg',quality:92});
   console.log(file,Math.round(fs.statSync(file).size/1024)+'KB');}}
 await b.close();})();

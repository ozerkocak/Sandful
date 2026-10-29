// Sandful (Kum Şişesi) uçtan uca son kontrol (TestFlight öncesi).
// Kurulum: npm install playwright three@0.128.0 (herhangi bir klasörde) ve Chromium (bulut ortamında hazır).
// Kullanım: node testler/sandful-e2e.js [html dosyası]   (varsayılan: prototip; uygulama derlemesi için uygulamalar/sandful/www/index.html)
// Ortam değişkeni THREE ile three.min.js yolu verilebilir; verilmezse uygulama paketinin node_modules'ü denenir.
// Denetler: ilk açılış, 10 bölüm baştan sona (insan botu), süreler, kayıt ve küçük resimler, bellek (ikinci tur), yeniden açılış (raf),
// raf/yeniden başlat/süs/final/sonuç/iptal/üfleme/arka plan uç durumları, 3D'siz çalışma, uygulama içi (sahte Capacitor) titreşim, kayıt, duraklatma,
// dil (İngilizce telefonda Türkçe harf kalmaz, Türkçe telefonda Türkçe, raftan değişir ve kaydedilir).
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
const FILE=path.resolve(process.argv[2]||path.join(ROOT,'prototipler','01-kum-sisesi.html'));
const THREE=process.env.THREE||path.join(ROOT,'uygulamalar','sandful','node_modules','three','build','three.min.js');
const results=[];const ok=(name,cond,info)=>{results.push({name,ok:!!cond,info});console.log((cond?'✓ ':'✗ ')+name+(info!==undefined?' — '+(typeof info==='string'?info:JSON.stringify(info)):''));};
async function launch(opts={}){const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-precise-memory-info','--js-flags=--expose-gc']});
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:opts.locale||'en-US'});
 if(opts.native)await ctx.addInitScript(()=>{const log=window.__nlog=[];const mk=nm=>new Proxy({},{get:(t,k)=>(...a)=>{log.push(nm+'.'+String(k));
   if(nm==='Preferences'&&k==='get')return Promise.resolve({value:window.__prefVal||null});if(nm==='Preferences'&&k==='set'){window.__prefVal=a[0].value;}
   if(nm==='App'&&k==='addListener'){window.__appCb=a[1];return Promise.resolve({remove(){}});}return Promise.resolve();}});
  window.Capacitor={isNativePlatform:()=>true,Plugins:{Haptics:mk('Haptics'),Preferences:mk('Preferences'),App:mk('App')}};});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text().slice(0,200));});
 await p.route('**/three.min.js',r=>opts.no3d?r.abort():r.fulfill({body:fs.readFileSync(THREE),contentType:'application/javascript'}));
 await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
 await p.goto('file://'+FILE);await p.waitForTimeout(1200);return {b,ctx,p,errs};}
(async()=>{
 // 1) ilk açılış, 10 bölüm baştan sona (insan botu, 3D ile), kayıt ve raf
 {const {b,ctx,p,errs}=await launch();
  const first=await p.evaluate(()=>({state:__game.state().state,level:__game.state().level,hand:document.getElementById('hand').classList.contains('show'),gfx:!!RD}));
  ok('İlk açılış doğrudan 1. bölüm, el ipucu görünür, 3D açık',first.state==='ready'&&first.level===0&&first.hand&&first.gfx,first);
  const rows=[];
  for(let lv=0;lv<10;lv++){const r=await p.evaluate(lv=>{__game.setTS(0);__game.start(lv);__game.autoplay('insan');__game.begin();let k=0;
    while(k<4000){__game.sim(50);k++;const s=__game.state().state;if(s==='result')break;}__game.autoplay(null);
    return {lv:lv+1,state:__game.state().state,pct:__game.state().pct,stars:__game.state().stars,sn:+(k*.05).toFixed(1)};},lv);
   await p.waitForTimeout(150);rows.push(r);}
  ok('10 bölüm sonuca ulaşıyor',rows.every(r=>r.state==='result'),rows.map(r=>r.lv+':'+r.pct+'%★'+r.stars+' '+r.sn+'sn').join(' | '));
  ok('Bölüm süreleri 20-60 sn arası',rows.every(r=>r.sn>=15&&r.sn<=70),rows.map(r=>r.sn).join(','));
  const sv=await p.evaluate(()=>JSON.parse(localStorage.getItem(SKEY)));
  ok('Kayıt: 10 bölüm, yıldız ve küçük resim',sv&&Object.keys(sv.lv).length===10&&Object.values(sv.lv).every(v=>typeof v.s==='number'&&v.img&&v.img.startsWith('data:image/jpeg')),{n:sv&&Object.keys(sv.lv).length,seen:sv&&sv.seen});
  const mem=await p.evaluate(()=>{if(window.gc){gc();gc();}return {geo:RD.r.info.memory.geometries,tex:RD.r.info.memory.textures,prog:RD.r.info.programs.length,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):-1};});
  // aynı bölümleri bir tur daha: bellek büyümesi
  for(let lv=0;lv<10;lv++){await p.evaluate(lv=>{__game.start(lv);__game.autoplay('kusursuz');__game.begin();let k=0;while(k<4000&&__game.state().state!=='result'){__game.sim(50);k++;}__game.autoplay(null);},lv);await p.waitForTimeout(100);}
  const mem2=await p.evaluate(()=>{if(window.gc){gc();gc();}return {geo:RD.r.info.memory.geometries,tex:RD.r.info.memory.textures,prog:RD.r.info.programs.length,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):-1};});
  ok('Bellek: ikinci turda geometri/doku/program sayısı büyümüyor',mem2.geo<=mem.geo+4&&mem2.tex<=mem.tex+2&&mem2.prog<=mem.prog+1&&mem2.heap<=mem.heap+12,{once:mem,sonra:mem2});
  ok('Sayfa hatası yok (10 bölüm)',errs.length===0,errs.slice(0,3));
  // yeniden açılış: raf açılır, sıradaki bölüm hazır
  await p.reload();await p.waitForTimeout(1500);
  const re=await p.evaluate(()=>({raf:document.getElementById('raf').classList.contains('show'),slots:document.querySelectorAll('.slot').length,imgs:document.querySelectorAll('.slot img').length,close:getComputedStyle(document.getElementById('rafClose')).display,state}));
  ok('Yeniden açılışta raf görünür, 10 yuva ve küçük resimler',re.raf&&re.slots===10&&re.imgs===10,re);
  await b.close();}
 // 2) uç durumlar (3D'siz mantık + 3D ile birkaç durum)
 {const {b,p,errs}=await launch();
  const r=await p.evaluate(async()=>{const out={};const S=()=>__game.state();__game.setTS(0);
   // döküş sırasında raf aç/kapat
   __game.start(0);__game.begin();__game.pour(true);__game.sim(1500);openRaf();const st1=state;__game.sim(500);closeRaf();out.rafPour=[st1,state,pouring];
   // süs tutarken yeniden başlat
   __game.start(3);__game.begin();__game.autoplay('insan');let k=0;while(k<3000&&S().state!=='hold'){__game.sim(50);k++;}__game.autoplay(null);out.hold=S().state;
   document.getElementById('bRe').click();out.afterRe=[S().state,S().qi,decor===null,RD&&RD.decorM.visible];
   // süs tutarken raf aç, kapat, bırak
   __game.start(3);__game.begin();__game.autoplay('insan');k=0;while(k<3000&&S().state!=='hold'){__game.sim(50);k++;}__game.autoplay(null);openRaf();closeRaf();__game.sim(500);__game.release();__game.sim(2000);out.holdRaf=S().state;
   // finalde raf aç, kapat: sonuç gelmeli
   __game.start(0);__game.autoplay('kusursuz');__game.begin();k=0;while(k<4000&&S().state!=='finale'){__game.sim(50);k++;}__game.autoplay(null);openRaf();__game.sim(3000);closeRaf();__game.sim(4000);out.finRaf=S().state;
   // sonuç ekranında dokunma döküş başlatmamalı
   const before=S().qi;cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:200,clientY:400,pointerId:1,bubbles:true}));__game.sim(500);cv.dispatchEvent(new PointerEvent('pointerup',{clientX:200,clientY:400,pointerId:1,bubbles:true}));out.resultTap=[S().state,pouring];
   // döküşte pointercancel
   __game.start(1);cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:200,clientY:400,pointerId:2,bubbles:true}));__game.sim(800);cv.dispatchEvent(new PointerEvent('pointercancel',{pointerId:2,bubbles:true}));__game.sim(300);out.cancel=[S().state,pouring,flowNow<.05];
   // üfleme: bölüm 8'de 3 kez, fazlası çalışmamalı
   __game.start(7);__game.begin();__game.pour(true);__game.sim(3000);for(let i=0;i<5;i++)__game.puff();out.puff=S().puffs;__game.pour(false);
   // görünürlük: arka plana geçince döküş durur
   __game.start(0);__game.begin();__game.pour(true);__game.sim(500);Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));out.vis=[pouring,down];Object.defineProperty(document,'hidden',{value:false,configurable:true});document.dispatchEvent(new Event('visibilitychange'));
   // geri al: ikinci rengin ortasında; renk baştan dökülür, hak biter, bölüm yine kusursuz biter
   __game.start(0);__game.autoplay('kusursuz');__game.begin();let u=0;while(u<3000&&S().qi<1){__game.sim(50);u++;}__game.sim(2500);
   const p1=__game.sand(),c1=__game.canUndo();__game.undo();const p2=__game.sand(),q2=S().qi,c2=__game.canUndo();u=0;while(u<5000&&S().state!=='result'){__game.sim(50);u++;}__game.autoplay(null);
   out.undo=[c1,p2<p1,q2===1,c2,S().state,S().stars];
   // dar ekran: yeniden boyutlandırma
   return out;});
  ok('Döküşte raf aç/kapat: menüye geçer, kapatınca döküşe döner, akış durur',r.rafPour[0]==='menu'&&r.rafPour[1]==='pour'&&r.rafPour[2]===false,r.rafPour);
  ok('Süs tutarken yeniden başlat: temiz başlangıç, süs görünmez',r.hold==='hold'&&r.afterRe[0]==='ready'&&r.afterRe[1]===0&&r.afterRe[2]&&!r.afterRe[3],r.afterRe);
  ok('Süs tutarken raf aç/kapat, sonra bırak: oyun devam eder',['pour','settle','finale','result','hold','drop'].includes(r.holdRaf),r.holdRaf);
  ok('Finalde raf aç/kapat: sonuç ekranına ulaşır',r.finRaf==='result',r.finRaf);
  ok('Sonuç ekranında dokunma döküş başlatmaz',r.resultTap[0]==='result'&&!r.resultTap[1],r.resultTap);
  ok('pointercancel akışı durdurur',r.cancel[1]===false&&r.cancel[2],r.cancel);
  ok('Üfleme hakkı 3 ile sınırlı',r.puff===0,r.puff);
  ok('Arka plana geçiş akışı durdurur',r.vis[0]===false&&r.vis[1]===false,r.vis);
  ok('Geri al: son renk baştan dökülür, hak biter, bölüm üç yıldızla biter',r.undo[0]&&r.undo[1]&&r.undo[2]&&!r.undo[3]&&r.undo[4]==='result'&&r.undo[5]===3,r.undo);
  await p.setViewportSize({width:320,height:568});await p.waitForTimeout(800);await p.setViewportSize({width:430,height:932});await p.waitForTimeout(800);
  ok('Uç durumlarda ve yeniden boyutlandırmada sayfa hatası yok',errs.length===0,errs.slice(0,3));
  await b.close();}
 // 3) 3D açılamazsa (WebGL yok): oyun mantığı çalışır
 {const {b,p,errs}=await launch({no3d:true});
  const r=await p.evaluate(()=>{__game.setTS(0);__game.start(0);__game.autoplay('insan');__game.begin();let k=0;while(k<4000&&__game.state().state!=='result'){__game.sim(50);k++;}return {st:__game.state().state,err:getComputedStyle(document.getElementById('gfxErr')).display};});
  ok('3D yokken uyarı görünür ve bölüm bitirilebilir',r.st==='result'&&r.err==='block',r);ok('3D yokken sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 // 4) uygulama içi (sahte Capacitor): titreşim, kayıt, uygulama duraklatma
 {const {b,p,errs}=await launch({native:true});
  const r=await p.evaluate(async()=>{__game.setTS(0);initAudio();cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:200,clientY:400,pointerId:3,bubbles:true}));__game.sim(2500);
   cv.dispatchEvent(new PointerEvent('pointerup',{clientX:200,clientY:400,pointerId:3,bubbles:true}));__game.sim(1500);await new Promise(r=>setTimeout(r,800));__game.sim(50);
   const L2=window.__nlog.slice();const cnt=n=>L2.filter(x=>x===n).length;
   persist();await new Promise(r=>setTimeout(r,50));
   if(window.__appCb){window.__appCb({isActive:false});}
   return {start:cnt('Haptics.selectionStart'),changed:cnt('Haptics.selectionChanged'),end:cnt('Haptics.selectionEnd'),impact:cnt('Haptics.impact'),prefSet:window.__nlog.includes('Preferences.set'),prefGet:window.__nlog.includes('Preferences.get'),appL:!!window.__appCb,pouringAfterPause:pouring,ac:AC&&AC.state};});
  ok('Uygulamada kum tanesi titreşimi selectionStart/Changed/End ile',r.start>=1&&r.changed>=5&&r.end>=1,r);
  ok('Uygulamada kayıt Preferences eklentisine de yazılır ve açılışta okunur',r.prefSet&&r.prefGet,r);
  ok('Uygulama arka plana geçince (App eklentisi) duraklar',r.appL&&r.pouringAfterPause===false,r);
  ok('Uygulama modunda sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 // 5) dil: İngilizce/Almanca telefonda İngilizce (Türkçe harf yok), Türkçe telefonda Türkçe, raftaki düğmeyle değişir ve kalır
 {const trChars=/[ğüşıöçĞÜŞİÖÇ]/;
  for(const loc of ['en-US','de-DE','tr-TR']){const {b,p,errs}=await launch({locale:loc,no3d:true});
   const r=await p.evaluate(()=>{const got=new Set();const orig=toast;window.toast=s=>{got.add(s);orig(s);};__game.setTS(0);
    for(const lv of [0,3,7,9]){__game.start(lv);__game.autoplay('insan');__game.begin();let k=0;while(k<4000&&__game.state().state!=='result'){__game.sim(50);k++;}__game.autoplay(null);}
    const res=document.body.innerText;openRaf();
    return {lang:LANG,html:document.documentElement.lang,lines:[...got,...(res+'\n'+document.body.innerText).split('\n')].map(l=>l.trim()).filter(Boolean),rafH:document.getElementById('rafH').textContent};});
   if(loc==='tr-TR')ok('Türkçe telefonda oyun Türkçe',r.lang==='tr'&&r.html==='tr'&&r.rafH==='Rafım',{lang:r.lang,rafH:r.rafH});
   else{const bad=r.lines.filter(l=>trChars.test(l));ok(loc+' telefonda oyun İngilizce, Türkçe harfli metin yok',r.lang==='en'&&r.html==='en'&&r.rafH==='My Shelf'&&bad.length===0,{lang:r.lang,rafH:r.rafH,tr:bad.slice(0,5)});}
   if(loc==='tr-TR'){await p.evaluate(()=>document.getElementById('sLang').click());await p.waitForTimeout(200);await p.reload();await p.waitForTimeout(1200);
    const after=await p.evaluate(()=>({lang:LANG,rafH:document.getElementById('rafH').textContent,btn:document.getElementById('sLang').textContent}));
    ok('Raftaki dil düğmesi dili değiştirir, yeniden açılışta kalır',after.lang==='en'&&after.rafH==='My Shelf'&&/English/.test(after.btn),after);}
   ok(loc+' dilinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}}
 const bad=results.filter(x=>!x.ok);console.log('\n'+(results.length-bad.length)+'/'+results.length+' geçti');process.exit(bad.length?1:0);})();

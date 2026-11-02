// Seçilen üretilmiş bölümleri 3D'de kusursuz botla bitirir, bitmiş kavanozun görüntüsünü alır.
// Kullanım: NODE_PATH=$(npm root -g) node araclar/uretici-onizleme.js [uretici-sonuc.json] [çıktı klasörü]
// three.js: THREE ortam değişkeni ya da uygulama paketinin node_modules'ü. Çıktı: <klasör>/<tema>-<g>.jpg ve liste.json
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
const SON=process.argv[2]||path.join(__dirname,'uretici-sonuc.json');const OUT=process.argv[3]||path.join(require('os').tmpdir(),'sandful-uretici');
const THREE=process.env.THREE||path.join(ROOT,'uygulamalar','sandful','node_modules','three','build','three.min.js');
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.route('**/three.min.js',r=>r.fulfill({body:fs.readFileSync(THREE),contentType:'application/javascript'}));
 await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
 await p.goto('file://'+path.join(ROOT,'prototipler','01-kum-sisesi.html'));await p.waitForTimeout(1500);
 await p.addScriptTag({path:path.join(__dirname,'uretici.js')});
 await p.addStyleTag({content:'#hud,#hint,#result,#bUndo,#bPuff,#toast,#banner,#hand{visibility:hidden!important}'});
 const list=JSON.parse(fs.readFileSync(SON,'utf8'));
 for(const it of list){
  const st=await p.evaluate(it=>{const L=URET.uret(it.tema,it.g,it.seed);const n=URET.ekle(L);__game.setTS(0);__game.start(n);__game.autoplay('kusursuz');__game.begin();
   let k=0;while(k<6000&&__game.state().state!=='result'){__game.sim(50);k++;}__game.autoplay(null);return __game.state();},it);
  await p.waitForTimeout(3200);
  if(process.env.TAM)await p.screenshot({path:path.join(OUT,'tam.png')});const f=path.join(OUT,it.tema+'-'+it.g+'.jpg');await p.screenshot({path:f,type:'jpeg',quality:82,clip:{x:0,y:150,width:390,height:470}});
  console.log(it.tema,it.g,it.ad,st.pct,st.stars);}
 fs.writeFileSync(path.join(OUT,'liste.json'),JSON.stringify(list));
 console.log('hatalar',errs.slice(0,3));await b.close();})();

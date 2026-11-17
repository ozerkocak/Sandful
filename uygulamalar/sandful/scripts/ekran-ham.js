// App Store ham ekran görüntüleri (sürüm 1.2): 430x932 @3x, WebGL SwiftShader (ekran-kare.js bunları 1206x2622 karelere yerleştirir).
// Kullanım: NODE_PATH=$(npm root -g) node uygulamalar/sandful/scripts/ekran-ham.js en-US|tr-TR
// Yazı tipi için NUNITO=<@fontsource/nunito/files klasörü> (npm install @fontsource/nunito). Ham görüntüler geçici klasöre yazılır, sonra ekran-kare.js.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const APP=path.join(__dirname,'..');const ROOT=path.join(APP,'..','..');const F=(process.env.NUNITO||'')+'/';
const THREE=process.env.THREE||path.join(APP,'node_modules','three','build','three.min.js');
const css=!process.env.NUNITO?'':[600,700,800,900].map(w=>['latin','latin-ext'].map(s=>`@font-face{font-family:'Nunito';font-weight:${w};font-style:normal;font-display:block;src:url(file://${F}nunito-${s}-${w}-normal.woff2) format('woff2');}`).join('')).join('');
const loc=process.argv[2]||'en-US';const out=path.join(require('os').tmpdir(),'sandful-ekran','raw-'+loc.slice(0,2));fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});
 const ctx=await b.newContext({viewport:{width:430,height:932},deviceScaleFactor:3,isMobile:true,hasTouch:true,locale:loc});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.route('**/three.min.js',r=>r.fulfill({body:fs.readFileSync(THREE),contentType:'application/javascript'}));
 await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:css,contentType:'text/css'}));
 await p.goto('file://'+path.join(ROOT,'prototipler','01-kum-sisesi.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>document.fonts.ready);
 const shot=async(n)=>{await p.waitForTimeout(2500);await p.screenshot({path:`${out}/${n}.png`});console.log('ok',n,JSON.stringify(await p.evaluate(()=>__game.state())));};
 // Bölümleri kusursuz botla oynat, istenen anlarda çek. when: çekim anı; pre: çekimden önce ilerletilecek süre (ms); pour: çekimde akış görünsün.
 // Bölüm numaraları 0'dan sayılır (g-1). 1.2 planı: döküş, gece şehri, dağ, ana ekran, dama, rüzgâr, silüet kurma, gökkuşağı.
 await p.evaluate(()=>{SAVE.mek={sus:1,ufle:1,cubuk:1,gecis:1,salla:1,isilti:1,ruzgar:1,uc:1,islak:1,kart:1};}); // "Yeni" kartları çekimlere girmesin
 const plan={
  7:{when:st=>st.state==='pour'&&st.qi>=Math.floor(st.ql*.8),pour:true,name:'01-gunbatimi'},
  30:{when:st=>st.state==='pour'&&st.qi===1&&Math.abs(windNow)>1.3,pour:true,pre:500,name:'06-ruzgar'},
  54:{when:st=>st.state==='finale',pre:900,name:'08-gokkusagi'},
  72:{when:st=>st.state==='pour'&&st.qi===5,pre:2200,name:'05-dama'},
  94:{when:st=>st.state==='hold'&&st.qi===3,pre:400,name:'07-siluet'},
  96:{when:st=>st.state==='finale',pre:2600,name:'02-geceSehri'},
  116:{when:st=>st.state==='finale',pre:900,name:'03-zirve'}};
 // ana ekran için ilk 45 bölüm (küçük resimler), sonra çekim bölümleri; ONLY=54,96: sadece o bölümlerin karelerini yeniden çek
 const ONLY=process.env.ONLY?process.env.ONLY.split(',').map(Number):null,ANA=45;
 const sira=ONLY||[...Array(ANA).keys(),54,72,94,96,116];
 for(const lv of sira){const pl=plan[lv];
  await p.evaluate(lv=>{__game.setTS(0);__game.start(lv);__game.autoplay('kusursuz');__game.begin();},lv);
  if(!pl){await p.evaluate(()=>{let k=0;while(k<1500&&__game.state().state!=='result'){__game.sim(100);k++;}});}
  else{let took=false;
   for(let k=0;k<1500;k++){const st=await p.evaluate(()=>{__game.sim(100);return __game.state();});
    if(!took&&await p.evaluate(f=>(0,eval)('('+f+')')(__game.state()),pl.when.toString())){
     await p.evaluate(([pre,pour])=>{if(pour){__game.autoplay(null);__game.pour(true);}__game.sim(pre);},[pl.pre??600,!!pl.pour]);took=true;await shot(pl.name);
     await p.evaluate(()=>{__game.pour(false);__game.autoplay('kusursuz');});}
    if(st.state==='result')break;}
   if(!took)console.log('ÇEKİLEMEDİ',pl.name);}
  await p.evaluate(()=>__game.sim(2500));await p.waitForTimeout(300);
  if(lv===ANA-1&&!ONLY){ // uzun yolun ana ekranı: önceki dünyalar katlı, Çöl ve Vaha açık
   await p.evaluate(()=>{rafAcik=null;state='menu';prevState=null;openRaf();});await p.waitForTimeout(800);await shot('04-ana');
   // satın alma ürününün inceleme görüntüsü: Ayarlar'da "Reklamsız oyna" satırı (fiyat mağazadan gelir; burada örnek)
   await p.evaluate(()=>{SAT.urun={priceString:'$3.99'};setTexts();document.getElementById('sRestore').style.display='';openSet();});await p.waitForTimeout(600);await shot('ayarlar');
   await p.evaluate(()=>{SAT.urun=null;closeSet();closeRaf(true);});}}
 console.log('hatalar',errs.slice(0,5));await b.close();})();

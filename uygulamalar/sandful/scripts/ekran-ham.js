// App Store ham ekran görüntüleri (sürüm 1.1): 430x932 @3x, WebGL SwiftShader (ekran-kare.js bunları 1206x2622 karelere yerleştirir).
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
 // bölümleri sırayla kusursuz oynat (ana ekran küçük resimleri için), istenen anlarda çek. when: çekim anı; pre: çekimden önce ilerletilecek süre (ms)
 const plan={
  7:{when:st=>st.state==='pour'&&st.qi>=Math.floor(st.ql*.8),pour:true,name:'03-gunbatimi'},
  21:{when:st=>st.state==='pour'&&st.qi===2,pre:6000,name:'06-lale'},
  24:{when:st=>st.state==='finale',pre:900,name:'04-yagmur'},
  26:{when:st=>st.state==='pour'&&st.qi>=1&&st.pct>58&&Math.abs(tiltA)>.11,pre:0,name:'05-ilkkar'},
  27:{when:st=>st.state==='hold'&&st.qi===3,pre:400,name:'07-koy'},
  28:{when:st=>st.state==='finale',pre:2600,name:'02-kuzey'}};
 const ONLY=process.env.ONLY?process.env.ONLY.split(',').map(Number):null; // ONLY=21,26: sadece o bölümlerin karelerini yeniden çek
 for(let lv=0;lv<30;lv++){const pl=plan[lv];if(ONLY&&!ONLY.includes(lv))continue;
  if(lv===23&&!ONLY){await p.evaluate(()=>{state='menu';prevState=null;openRaf();});await p.waitForTimeout(800);await shot('01-ana');await p.evaluate(()=>closeRaf(true));}
  await p.evaluate(lv=>{__game.setTS(0);__game.start(lv);__game.autoplay('kusursuz');__game.begin();},lv);
  if(!pl){await p.evaluate(()=>{let k=0;while(k<1500&&__game.state().state!=='result'){__game.sim(100);k++;}});}
  else{let took=false;
   for(let k=0;k<1500;k++){const st=await p.evaluate(()=>{__game.sim(100);const s=__game.state();s.tilt=tiltA;return s;});
    if(!took&&await p.evaluate(f=>(0,eval)('('+f+')')(__game.state()),pl.when.toString())){
     await p.evaluate(([pre,pour])=>{if(pour){__game.autoplay(null);__game.pour(true);}__game.sim(pre);},[pl.pre??600,!!pl.pour]);took=true;await shot(pl.name);
     await p.evaluate(()=>{__game.pour(false);__game.autoplay('kusursuz');});}
    if(st.state==='result')break;}}
  await p.evaluate(()=>__game.sim(2500));await p.waitForTimeout(300);}
 console.log('hatalar',errs.slice(0,5));await b.close();})();

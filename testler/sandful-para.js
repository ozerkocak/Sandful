// Sandful reklam, Reklamsız satın alma ve ölçüm testi (sahte Capacitor eklentileriyle; gerçek reklam ya da mağaza yok).
// Kullanım: NODE_PATH=$(npm root -g) node testler/sandful-para.js [oyun dosyası]
// Kurallar: fikirler/09-sandful-reklam-olcum.md
const {chromium}=require('playwright');const path=require('path');
const FILE=path.resolve(process.argv[2]||path.join(__dirname,'..','prototipler','01-kum-sisesi.html'));
const results=[];const ok=(ad,c,det)=>{results.push({ad,ok:!!c});console.log((c?'✓ ':'✗ ')+ad+(det!==undefined?' — '+JSON.stringify(det).slice(0,300):''));};
// sahte eklentiler: çağrılar __nlog'a yazılır; reklam olayları __ad.fire ile tetiklenir; saat __skew ile ileri alınır
function sahte(cfg){const _now=Date.now.bind(Date);window.__skew=0;Date.now=()=>_now()+window.__skew;
 const log=window.__nlog=[];const ad=window.__ad={cb:{},consent:cfg.consent||{status:'NOT_REQUIRED',isConsentFormAvailable:false,canRequestAds:true,privacyOptionsRequirementStatus:'NOT_REQUIRED'},fail:!!cfg.adFail,reward:true,opts:[],
  fire(n,d){(ad.cb[n]||[]).forEach(f=>f(d||{}));}};
 const np=window.__np={env:cfg.env||'Production',owned:!!cfg.owned,cancel:false};window.__fa=[];
 const P={
  Haptics:new Proxy({},{get:()=>()=>Promise.resolve()}),
  Preferences:{get:()=>Promise.resolve({value:null}),set:()=>Promise.resolve()},
  App:{addListener:()=>Promise.resolve({remove(){}})},
  AppReview:{requestReview:()=>{log.push('AppReview.requestReview');return Promise.resolve();}},
  FirebaseAnalytics:{logEvent:o=>{window.__fa.push([o.name,o.params]);return Promise.resolve();},setUserProperty:o=>{log.push('FA.prop:'+o.key+'='+o.value);return Promise.resolve();}},
  NativePurchases:{getAppTransaction:()=>Promise.resolve({appTransaction:{environment:np.env}}),
   getProducts:()=>{log.push('NP.getProducts');return Promise.resolve({products:[{identifier:'com.investateknoloji.sandful.reklamsiz',title:'Remove Ads',priceString:'$3.99'}]});},
   getPurchases:()=>Promise.resolve({purchases:np.owned?[{productIdentifier:'com.investateknoloji.sandful.reklamsiz',transactionId:'1'}]:[]}),
   purchaseProduct:o=>{log.push('NP.purchase');if(np.cancel)return Promise.reject(new Error('cancel'));np.owned=true;return Promise.resolve({transactionId:'42',productIdentifier:o.productIdentifier});},
   restorePurchases:()=>{log.push('NP.restore');return Promise.resolve();}},
  AdMob:{addListener:(n,f)=>{(ad.cb[n]=ad.cb[n]||[]).push(f);return Promise.resolve({remove(){}});},
   initialize:()=>{log.push('AdMob.initialize');return Promise.resolve();},
   requestConsentInfo:()=>{log.push('AdMob.requestConsentInfo');return Promise.resolve(Object.assign({},ad.consent));},
   showConsentForm:()=>{log.push('AdMob.showConsentForm');ad.consent=Object.assign({},ad.consent,{status:'OBTAINED',canRequestAds:true});return Promise.resolve(Object.assign({},ad.consent));},
   showPrivacyOptionsForm:()=>{log.push('AdMob.showPrivacyOptionsForm');return Promise.resolve();},
   prepareInterstitial:o=>{log.push('AdMob.prepareInterstitial');ad.opts.push(o);return ad.fail?Promise.reject(new Error('no fill')):Promise.resolve({adUnitId:o.adId});},
   prepareRewardVideoAd:o=>{log.push('AdMob.prepareReward');ad.opts.push(o);return ad.fail?Promise.reject(new Error('no fill')):Promise.resolve({adUnitId:o.adId});},
   showInterstitial:()=>{log.push('AdMob.showInterstitial');return Promise.resolve();},
   showRewardVideoAd:()=>{log.push('AdMob.showReward');return new Promise(res=>{ad.rewardRes=res;});}}};
 if(cfg.native!==false)window.Capacitor={isNativePlatform:()=>true,Plugins:P};}
async function launch(cfg={}){const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:cfg.locale||'tr-TR'});
 await ctx.addInitScript(sahte,cfg);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.route('**/three.min.js',r=>r.abort());await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
 await p.goto('file://'+FILE);await p.waitForTimeout(900);
 await p.evaluate(()=>{window.__olc=[];__game.setTS(0);SAVE.mek={sus:1,ufle:1,cubuk:1,gecis:1,salla:1,isilti:1,ruzgar:1,uc:1,islak:1,kart:1};
  // bölümü botla bitir (sonuç ekranına kadar); cnt: bir eklenti çağrısının sayısı
  window.bitir=(k,pf)=>{__game.start(k);__game.autoplay(pf||'kusursuz');__game.begin();let n=0;while(n<6000&&__game.state().state!=='result'){__game.sim(50);n++;}__game.autoplay(null);return __game.state();};
  window.dok=()=>{__game.autoplay('kusursuz');if(__game.state().state==='ready')__game.begin();let n=0;while(n<3000&&__game.state().qi<1){__game.sim(50);n++;}__game.sim(1500);__game.autoplay(null);updateUndo();return __game.sand();};
  window.cnt=n=>window.__nlog.filter(x=>x===n).length;window.bekle=ms=>new Promise(r=>setTimeout(r,ms));});
 return {b,p,errs};}
(async()=>{
 // 1) Geçiş reklamı kuralları (uygulama, mağaza ortamı Production)
 {const {b,p,errs}=await launch({env:'Production'});
  const r=await p.evaluate(async()=>{const o={};await bekle(100);
   o.init=[cnt('AdMob.initialize'),cnt('AdMob.requestConsentInfo'),REK.izin,REK.test];
   const ileri=async()=>{const lv=LV;document.getElementById('rNext').click();await bekle(30);return {lv,ad:REK.acik,nextLv:LV,st:__game.state().state};};
   // ilk 10 bölüm: hiç reklam yok; geçiş reklamı 8 bölüm bitince yüklenir
   o.ilk=[];for(let k=0;k<10;k++){bitir(k);const x=await ileri();o.ilk.push(x.ad?1:0);if(k===6)o.yukOnce=cnt('AdMob.prepareInterstitial');}
   o.yukSonra=cnt('AdMob.prepareInterstitial');o.goster10=cnt('AdMob.showInterstitial');
   // 11. bölüm bitince: reklam çıkar, kapanana kadar sonraki bölüm başlamaz, oyun durur
   bitir(10);const a=await ileri();o.onbir=[a.ad,a.nextLv,cnt('AdMob.showInterstitial'),SAVE.rk.b,SAVE.rk.n];
   __ad.fire('interstitialAdDismissed');await bekle(30);o.onbirSonra=[REK.acik,LV,__game.state().state];
   // art arda bölümde yok; 3 bölüm dolsa da 4 dakika dolmadan yok
   o.ara=[];for(const k of [11,12,13]){bitir(k);const x=await ileri();o.ara.push(x.ad?1:0);}
   // 4 dakika geçince: 3 bölüm de dolmuş, çıkar
   window.__skew+=5*60*1000;bitir(14);const c=await ileri();o.sureSonra=c.ad;__ad.fire('interstitialAdDismissed');await bekle(30);
   // hazır değilse hiç gösterilmez ve bekletmez
   window.__skew+=5*60*1000;for(const k of [15,16])bitir(k);REK.gY=false;bitir(17);const d=await ileri();o.hazirDegil=[d.ad,d.nextLv];REK.gY=true;
   // günlük sınır
   window.__skew+=5*60*1000;SAVE.rk.b=5;SAVE.rk.n=REKLAM.gunluk;bitir(18);const e=await ileri();o.gunluk=e.ad;SAVE.rk.n=1;
   // "Tekrar" asla reklam göstermez
   SAVE.rk.b=5;bitir(19);const once=cnt('AdMob.showInterstitial');document.getElementById('rAgain').click();await bekle(30);o.tekrar=[cnt('AdMob.showInterstitial')-once,LV];
   // gerçek reklam birimi ve test bayrağı
   o.birim=__ad.opts.filter(x=>/8673265075$/.test(x.adId)).length>0&&__ad.opts.every(x=>x.isTesting===false);
   o.olay=window.__fa.filter(x=>x[0]==='ad_interstitial').length;o.pill=(()=>{SAVE.rk.top=3;state='menu';prevState=null;openRaf();return getComputedStyle(document.getElementById('rsPill')).display!=='none';})();
   return o;});
  ok('Açılışta reklam SDK\'sı ve onay bilgisi istenir; mağaza ortamı Production ise gerçek reklam',r.init[0]===1&&r.init[1]===1&&r.init[2]===true&&r.init[3]===false,r.init);
  ok('İlk 10 bölümde geçiş reklamı yok',r.ilk.every(x=>x===0)&&r.goster10===0,r.ilk);
  ok('Geçiş reklamı 8 bölüm bitmeden yüklenmez, sonra yüklenir',r.yukOnce===0&&r.yukSonra>=1,[r.yukOnce,r.yukSonra]);
  ok('11. bölümden sonra "Sonraki"de reklam çıkar; kapanana kadar bölüm başlamaz, sonra başlar',r.onbir[0]===true&&r.onbir[1]===10&&r.onbir[2]===1&&r.onbirSonra[0]===false&&r.onbirSonra[1]===11,[r.onbir,r.onbirSonra]);
  ok('Reklamdan sonra art arda bölümlerde ve 4 dakika dolmadan reklam yok',r.ara.every(x=>x===0),r.ara);
  ok('3 bölüm ve 4 dakika dolunca tekrar çıkar',r.sureSonra===true,r.sureSonra);
  ok('Reklam hazır değilse gösterilmez, sonraki bölüm hemen başlar',r.hazirDegil[0]===false&&r.hazirDegil[1]===18,r.hazirDegil);
  ok('Günlük sınır dolunca reklam yok',r.gunluk===false,r.gunluk);
  ok('"Tekrar" reklam göstermez',r.tekrar[0]===0&&r.tekrar[1]===19,r.tekrar);
  ok('App Store ortamında gerçek reklam birimi, test bayrağı kapalı; ölçüme ad_interstitial yazılır',r.birim&&r.olay===2,{birim:r.birim,olay:r.olay});
  ok('Üç geçiş reklamından sonra ana ekranda "Reklamsız oyna" hatırlatması',r.pill===true,r.pill);
  ok('Geçiş reklamı testinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 // 2) TestFlight / inceleme ortamı: test reklamları
 {const {b,p,errs}=await launch({env:'Sandbox'});
  const r=await p.evaluate(async()=>{await bekle(100);for(let k=0;k<9;k++)bitir(k);REK.hazirla();await bekle(30);return {test:REK.test,opts:__ad.opts.map(x=>x.isTesting)};});
  ok('TestFlight ve incelemede (Sandbox) test reklamı istenir',r.test===true&&r.opts.length>=2&&r.opts.every(x=>x===true),r);await b.close();}
 // 3) Ödüllü haklar: geri alma, üfleme, bölümü geçme
 {const {b,p,errs}=await launch({env:'Production'});
  const r=await p.evaluate(async()=>{const o={};await bekle(100);const U=document.getElementById('bUndo'),S=()=>__game.state();
   // ücretsiz geri alma, sonra +1 (ödüllü)
   __game.start(2);let k0=dok();
   o.ucretsiz=[U.classList.contains('show'),U.lastChild.textContent,U.classList.contains('rek')];U.click();o.geriAlindi=__game.sand()<k0-.01;
   k0=dok();
   o.ek=[U.classList.contains('show'),U.lastChild.textContent,U.classList.contains('rek')];
   // Vazgeç: hiçbir şey olmaz
   U.click();await bekle(20);o.kart=[document.getElementById('dlg').classList.contains('show'),document.getElementById('dlgH').textContent,REK.acik];
   document.getElementById('dlgNo').click();await bekle(20);o.vazgec=[document.getElementById('dlg').classList.contains('show'),REK.acik,cnt('AdMob.showReward'),__game.sand()===k0];
   // İzle ama reklamı erken kapat: hak yok
   U.click();await bekle(20);document.getElementById('dlgOk').click();await bekle(30);o.gosterildi=[cnt('AdMob.showReward'),REK.acik];
   __ad.fire('onRewardedVideoAdDismissed');await bekle(30);o.erken=[__game.sand()===k0,undoEk,REK.acik];
   // İzle ve ödülü kazan: geri alma yapılır
   await bekle(30);U.click();await bekle(20);document.getElementById('dlgOk').click();await bekle(30);
   __ad.fire('onRewardedVideoAdReward');__ad.rewardRes({type:'hak',amount:1});__ad.fire('onRewardedVideoAdDismissed');await bekle(30);o.kazandi=[__game.sand()<k0-.01,undoEk,REK.acik,cnt('AdMob.showReward')];
   // reklam yoksa: hak yine verilir
   k0=dok();
   __ad.fail=true;REK.oY=false;const once=cnt('AdMob.showReward');U.click();await bekle(20);document.getElementById('dlgOk').click();await bekle(5600);o.bedava=[__game.sand()<k0-.01,undoEk,cnt('AdMob.showReward')-once,REK.acik];__ad.fail=false;
   // üfleme: haklar bitince +1
   __game.start(7);__game.begin();__game.pour(true);__game.sim(2500);for(let i=0;i<3;i++)__game.puff();__game.pour(false);updatePuffBtn();const P=document.getElementById('bPuff');
   o.ufle=[puffs,P.querySelector('b').textContent,P.classList.contains('rek')];REK.oY=true;P.click();await bekle(20);document.getElementById('dlgOk').click();await bekle(30);
   __ad.fire('onRewardedVideoAdReward');__ad.fire('onRewardedVideoAdDismissed');await bekle(30);o.ufleSonra=[puffs,ufleEk];
   // bölümü geç: 0 yıldızla biten bölümde
   SAVE.lv={};for(let k=0;k<4;k++)SAVE.lv[k]={p:90,s:3};const st=bitir(4,'dokunmayan');const N=document.getElementById('rNext'),K=document.getElementById('rSkip');
   o.gec=[st.stars,getComputedStyle(K).display!=='none',getComputedStyle(N).display==='none',lvOpen(5)];REK.oY=true;K.click();await bekle(20);o.gecKart=document.getElementById('dlgH').textContent;
   document.getElementById('dlgOk').click();await bekle(30);__ad.fire('onRewardedVideoAdReward');__ad.fire('onRewardedVideoAdDismissed');await bekle(30);o.gecSonra=[LV,lvOpen(5),SAVE.lv[4].gec,SAVE.lv[4].s];
   o.olay=['ad_offer','ad_rewarded','ad_free','level_skip'].map(e=>window.__fa.filter(x=>x[0]===e).length);return o;});
  ok('Ücretsiz geri alma çalışır; bitince düğme "+1" ve reklam işaretiyle görünür',r.ucretsiz[0]&&r.ucretsiz[1]==='1'&&!r.ucretsiz[2]&&r.geriAlindi&&r.ek[0]&&r.ek[1]==='+1'&&r.ek[2],[r.ucretsiz,r.geriAlindi,r.ek]);
  ok('"+1"e basınca önce onay kartı çıkar, oyun durur; Vazgeç ile reklam başlamaz',r.kart[0]&&r.kart[1]==='Bir geri alma daha'&&r.kart[2]===true&&!r.vazgec[0]&&r.vazgec[1]===false&&r.vazgec[2]===0&&r.vazgec[3]===true,[r.kart,r.vazgec]);
  ok('Reklam erken kapatılırsa hak verilmez',r.gosterildi[0]===1&&r.gosterildi[1]===true&&r.erken[0]===true&&r.erken[1]===3&&r.erken[2]===false,[r.gosterildi,r.erken]);
  ok('Reklam izlenince geri alma yapılır, kalan hak azalır',r.kazandi[0]===true&&r.kazandi[1]===2&&r.kazandi[2]===false&&r.kazandi[3]===2,r.kazandi);
  ok('Reklam yüklenemezse hak yine verilir (reklam gösterilmeden)',r.bedava[0]===true&&r.bedava[1]===1&&r.bedava[2]===0&&r.bedava[3]===false,r.bedava);
  ok('Üfleme hakkı bitince "+1"; reklamdan sonra bir üfleme gelir',r.ufle[0]===0&&r.ufle[1]==='+1'&&r.ufle[2]&&r.ufleSonra[0]===1&&r.ufleSonra[1]===1,[r.ufle,r.ufleSonra]);
  ok('0 yıldızda "Bölümü geç" çıkar; reklamdan sonra sonraki bölüm açılır, yıldız verilmez',r.gec[0]===0&&r.gec[1]&&r.gec[2]&&!r.gec[3]&&r.gecKart==='Bölümü geç'&&r.gecSonra[0]===5&&r.gecSonra[1]&&r.gecSonra[2]===1&&r.gecSonra[3]===0,[r.gec,r.gecSonra]);
  ok('Ödül olayları ölçüme yazılır (teklif, izlendi, reklamsız verildi, geçildi)',r.olay[0]>=5&&r.olay[1]===3&&r.olay[2]===1&&r.olay[3]===1,r.olay);
  ok('Ödüllü haklar testinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 // 4) Reklamsız: satın alma, iptal, geri yükleme, açılışta kendiliğinden tanıma
 {const {b,p,errs}=await launch({env:'Production'});
  const r=await p.evaluate(async()=>{const o={};await bekle(100);openSet();const row=id=>document.getElementById(id),gor=id=>getComputedStyle(row(id)).display!=='none';
   o.satir=[row('sNoAds').textContent,gor('sRestore'),gor('sPriv'),gor('sPol')];
   __np.cancel=true;row('sNoAds').click();await bekle(40);o.iptal=[!!SAVE.rs,row('setMsg').textContent];
   __np.cancel=false;row('sNoAds').click();await bekle(40);o.alindi=[SAVE.rs,row('sNoAds').textContent,row('setMsg').textContent,gor('sRestore'),JSON.parse(localStorage.getItem(SKEY)).rs];
   // Reklamsız: geçiş reklamı yok, ödüllü haklar reklamsız
   for(let k=0;k<12;k++)SAVE.lv[k]={p:90,s:3};SAVE.rk={t:0,b:9,g:gunAd(),n:0,top:0};REK.gY=true;bitir(12);document.getElementById('rNext').click();await bekle(30);o.gecisYok=[REK.acik,LV,cnt('AdMob.showInterstitial')];
   dok();const U=document.getElementById('bUndo');U.click();const k1=dok();
   o.rsUndo=[U.lastChild.textContent,U.classList.contains('rek')];U.click();await bekle(20);o.rsUndoSonra=[__game.sand()<k1-.01,document.getElementById('dlg').classList.contains('show'),cnt('AdMob.showReward')];
   o.olay=window.__fa.filter(x=>x[0]==='noads_buy').map(x=>x[1].result);return o;});
  ok('Ayarlarda Reklamsız satırı fiyatı mağazadan gösterir; geri yükleme ve gizlilik politikası var',/\$3\.99/.test(r.satir[0])&&r.satir[1]&&!r.satir[2]&&r.satir[3],r.satir);
  ok('Satın alma iptal edilirse reklamlar kalkmaz, mesaj çıkar',r.iptal[0]===false&&r.iptal[1].length>0,r.iptal);
  ok('Satın alınca Reklamsız kayda yazılır, satır ✓ olur',r.alindi[0]===true&&/✓/.test(r.alindi[1])&&r.alindi[2].length>0&&!r.alindi[3]&&r.alindi[4]===true,r.alindi);
  ok('Reklamsız oyuncuya geçiş reklamı çıkmaz',r.gecisYok[0]===false&&r.gecisYok[1]===13&&r.gecisYok[2]===0,r.gecisYok);
  ok('Reklamsız oyuncu ek geri almayı reklamsız, kart çıkmadan alır',r.rsUndo[0]==='+1'&&!r.rsUndo[1]&&r.rsUndoSonra[0]===true&&!r.rsUndoSonra[1]&&r.rsUndoSonra[2]===0,[r.rsUndo,r.rsUndoSonra]);
  ok('Satın alma sonuçları ölçüme yazılır',r.olay.join()==='fail,ok',r.olay);
  ok('Satın alma testinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 {const {b,p}=await launch({env:'Production',owned:true});
  const r=await p.evaluate(async()=>{await bekle(150);return {rs:SAVE.rs,prep:cnt('AdMob.prepareReward')+cnt('AdMob.prepareInterstitial')};});
  ok('Daha önce satın alan oyuncu açılışta kendiliğinden Reklamsız olur',r.rs===true,r);await b.close();}
 {const {b,p}=await launch({env:'Production'});
  const r=await p.evaluate(async()=>{await bekle(100);openSet();__np.owned=true;document.getElementById('sRestore').click();await bekle(40);return {rs:SAVE.rs,msg:document.getElementById('setMsg').textContent,n:cnt('NP.restore')};});
  ok('"Satın alımları geri yükle" satın almayı geri getirir',r.rs===true&&r.n===1&&r.msg.length>0,r);await b.close();}
 // 5) Avrupa onayı: onay verilmeden reklam istenmez; pencere 8 bölüm bitince ana ekranda
 {const {b,p,errs}=await launch({env:'Production',consent:{status:'REQUIRED',isConsentFormAvailable:true,canRequestAds:false,privacyOptionsRequirementStatus:'REQUIRED'}});
  const r=await p.evaluate(async()=>{const o={};await bekle(100);o.bas=[REK.izin,cnt('AdMob.prepareReward')+cnt('AdMob.prepareInterstitial'),cnt('AdMob.showConsentForm')];
   for(let k=0;k<7;k++)bitir(k);state='menu';prevState=null;openRaf();await bekle(30);o.yedi=cnt('AdMob.showConsentForm');
   bitir(7);state='menu';prevState=null;openRaf();await bekle(30);o.sekiz=[cnt('AdMob.showConsentForm'),REK.izin,cnt('AdMob.prepareReward')>=1];
   openRaf();await bekle(30);o.tekrar=cnt('AdMob.showConsentForm');openSet();const g=document.getElementById('sPriv');o.gizlilik=getComputedStyle(g).display!=='none';g.click();await bekle(20);o.form=cnt('AdMob.showPrivacyOptionsForm');return o;});
  ok('Onay gereken bölgede onay verilmeden reklam istenmez, açılışta pencere çıkmaz',r.bas[0]===false&&r.bas[1]===0&&r.bas[2]===0,r.bas);
  ok('Onay penceresi 8 bölüm bitince ana ekranda bir kez çıkar; sonra reklam istenebilir',r.yedi===0&&r.sekiz[0]===1&&r.sekiz[1]===true&&r.sekiz[2]&&r.tekrar===1,[r.yedi,r.sekiz,r.tekrar]);
  ok('Onay gereken bölgede Ayarlar\'da Gizlilik seçenekleri satırı çalışır',r.gizlilik&&r.form===1,[r.gizlilik,r.form]);
  ok('Onay testinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 // 6) Ölçüm olayları ve puan isteme
 {const {b,p,errs}=await launch({env:'Production'});
  const r=await p.evaluate(async()=>{const o={};await bekle(100);const F=n=>window.__fa.filter(x=>x[0]===n);
   __game.start(0);o.basOnce=F('level_start').length;bitir(0);o.bas=F('level_start').slice(-1)[0];o.son=F('level_end').slice(-1)[0];
   __game.start(7);__game.begin();__game.pour(true);__game.sim(2000);__game.puff();__game.pour(false);document.getElementById('bRe').click();o.retry=F('level_retry').slice(-1)[0];
   __game.begin();__game.pour(true);__game.sim(1500);__game.pour(false);openRaf();o.quit=F('level_quit').slice(-1)[0];closeRaf();
   SAVE.mek={};__game.start(30);o.mek=F('mechanic_intro').map(x=>x[1].mech);document.getElementById('mekGo').click();
   document.getElementById('sSnd').click();document.getElementById('sSnd').click();o.ayar=F('setting_change').map(x=>x[1].setting+'='+x[1].value);
   o.kisisel=window.__fa.every(x=>Object.values(x[1]).every(v=>typeof v==='number'||(typeof v==='string'&&v.length<=40)));
   // puan isteme: 12. bölümden önce yok; sonra üç yıldızda bir kez
   for(let k=0;k<12;k++)SAVE.lv[k]={p:90,s:3};const s5=bitir(5);await bekle(1700);o.puanErken=cnt('AppReview.requestReview');
   const s12=bitir(12);await bekle(1700);o.puan=[s12.stars,cnt('AppReview.requestReview'),SAVE.puan];bitir(13);await bekle(1700);o.puanTekrar=cnt('AppReview.requestReview');
   o.prop=window.__nlog.filter(x=>/^FA\.prop:levels_done/.test(x)).length;return o;});
  ok('level_start bölüm kurulunca değil ilk dokunuşta yazılır (bölüm, dünya, mekanik)',r.basOnce===0&&r.bas&&r.bas[1].level===1&&r.bas[1].world===1&&typeof r.bas[1].mech==='string',[r.basOnce,r.bas]);
  ok('level_end: bölüm, yüzde, yıldız, süre, geri alma ve üfleme sayısı',r.son&&r.son[1].level===1&&r.son[1].pct>=86&&r.son[1].stars===3&&r.son[1].sec>10&&r.son[1].undo===0&&r.son[1].puff===0,r.son);
  ok('level_retry ve level_quit ne kadar dökülmüşken olduğunu yazar',r.retry&&r.retry[1].where==='play'&&r.retry[1].level===8&&r.quit&&r.quit[1].level===8&&typeof r.quit[1].progress==='number',[r.retry,r.quit]);
  ok('mechanic_intro ve setting_change yazılır',r.mek.includes('ruzgar')&&r.ayar.join()==='sound=false,sound=true',[r.mek,r.ayar]);
  ok('Olaylarda sadece sayı ve kısa etiket var (kişisel veri yok)',r.kisisel===true,r.kisisel);
  ok('Puan penceresi 12. bölümden önce istenmez; sonra üç yıldızda bir kez istenir',r.puanErken===0&&r.puan[0]===3&&r.puan[1]===1&&r.puan[2]===1&&r.puanTekrar===1,[r.puanErken,r.puan,r.puanTekrar]);
  ok('Ölçüm testinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 // 7) Tarayıcı önizlemesi: eklenti yok, reklamın yerine kısa kart; İngilizce metinler; tanı
 {const {b,p,errs}=await launch({native:false,locale:'en-US'});
  const r=await p.evaluate(async()=>{const o={};const tr=/[ğüşıöçĞÜŞİÖÇ]/;
   for(let k=0;k<10;k++)SAVE.lv[k]={p:90,s:3};SAVE.rk={t:0,b:5,g:gunAd(),n:0,top:0};bitir(10);document.getElementById('rNext').click();await bekle(40);
   o.kart=[document.getElementById('dlg').classList.contains('show'),document.getElementById('dlgH').textContent,LV];await bekle(2200);o.sonra=[document.getElementById('dlg').classList.contains('show'),LV,REK.acik];
   dok();const U=document.getElementById('bUndo');U.click();const k1=dok();U.click();await bekle(20);
   o.metin=[document.getElementById('dlg').innerText];document.getElementById('dlgOk').click();await bekle(2300);o.odul=[__game.sand()<k1-.01,undoEk];
   openSet();o.metin.push(document.getElementById('setSheet').innerText);document.getElementById('sNoAds').click();await bekle(20);o.metin.push(document.getElementById('setSheet').innerText);o.rs=SAVE.rs;
   for(let i=0;i<5;i++)document.getElementById('setVer').click();o.tani=document.getElementById('tani').textContent.split('\n').length;
   o.trHarf=o.metin.join('\n').split('\n').filter(l=>tr.test(l)&&!/Türkçe/.test(l));o.ceviri=Object.values(ODUL).flat().filter(x=>x.length>3&&EN[x]==null);return o;});
  ok('Önizlemede geçiş reklamının yerine 2 saniyelik kart çıkar, sonra bölüm başlar',r.kart[0]&&/preview/.test(r.kart[1])&&r.kart[2]===10&&!r.sonra[0]&&r.sonra[1]===11&&r.sonra[2]===false,[r.kart,r.sonra]);
  ok('Önizlemede ödüllü hak karttan sonra verilir; Reklamsız denenebilir',r.odul[0]===true&&r.odul[1]===2&&r.rs===true,[r.odul,r.rs]);
  ok('Yeni metinlerin İngilizcesi var (Türkçe harfli satır yok)',r.trHarf.length===0&&r.ceviri.length===0,[r.trHarf.slice(0,4),r.ceviri]);
  ok('Sürüm yazısına 5 dokunuşta tanı satırları açılır',r.tani===4,r.tani);
  ok('Önizleme testinde sayfa hatası yok',errs.length===0,errs.slice(0,3));await b.close();}
 const bad=results.filter(x=>!x.ok);console.log('\n'+(results.length-bad.length)+'/'+results.length+' geçti');process.exit(bad.length?1:0);})();

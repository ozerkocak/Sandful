// Üretilen bölümleri botlarla eler. Her yer için tohumları sırayla dener, kuralları geçen ilk bölümü seçer.
// Kullanım: NODE_PATH=$(npm root -g) node araclar/uretici-sec.js [plan.json] [çıktı.json]
// Plan: [{tema:'kiyi', g:[1,2,3,4,6,...]}, ...]  (g: yoldaki sıra; 5'in katları el yapımı sahnelere ayrılır)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
const plan=process.argv[2]?JSON.parse(fs.readFileSync(process.argv[2],'utf8')):[
 {tema:'kiyi',g:[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19]},
 {tema:'kis',g:[101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119]}];
const OUT=process.argv[3]||path.join(__dirname,'uretici-sonuc.json');
// insan botunun ortalama yıldızı yoldaki sıraya göre bu aralıkta olmalı (ilk bölümler kolay)
const bant=g=>g<=20?[2.3,3]:g<=60?[2,3]:g<=120?[1.7,2.7]:[1.4,2.5];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
 await p.route('**/three.min.js',r=>r.abort());await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('file://'+path.join(ROOT,'prototipler','01-kum-sisesi.html'));await p.waitForTimeout(800);
 await p.addScriptTag({path:path.join(__dirname,'uretici.js')});
 const out=[];
 for(const pl of plan){let onceki=null;const adlar=new Set(),say={},tavan=Math.ceil(pl.g.length*.3),secilen=[];
  for(const g of pl.g){let ok=null,denenen=0;const neden={};
   for(let sd=g*1000+1;sd<g*1000+60&&!ok;sd++){denenen++;
    const r=await p.evaluate(([tema,g,sd])=>{const L=URET.uret(tema,g,sd);if(!L)return {red:'üretilemedi'};
     const n=URET.ekle(L);const v=URET.dogrula(n);if(v){LEVELS.pop();return {red:v};}
     const run=(pf,s)=>{const x=__game.bot(pf,n,s);x.marks=stickMarks.map(m=>m.ok?1:0).join('');return x;};
     const K=[run('kusursuz',1),run('kusursuz',2)];
     const bad=K.find(x=>x.yildiz<3||x.yuzde<90||/✗/.test(x.sus)||/0/.test(x.marks)||x.sn<15||x.sn>60);
     if(bad){LEVELS.pop();return {red:'kusursuz '+bad.yuzde+'% '+bad.sus+bad.marks+' '+bad.sn+'sn',ad:L.ad};}
     const D=run('dokunmayan',1);if(D.yildiz>0){LEVELS.pop();return {red:'dokunmayan yıldız aldı',ad:L.ad};}
     const I=[1,2,3].map(s=>run('insan',s)),G=[1,2].map(s=>run('daginik',s));
     const avg=a=>a.reduce((s,x)=>s+x.yildiz,0)/a.length,pc=a=>Math.round(a.reduce((s,x)=>s+x.yuzde,0)/a.length);
     LEVELS.pop();
     return {ad:L.ad,en:EN[L.ad],tarif:L.uretim.tarif,sekil:L.sekil,mek:[L.cubuk?'çubuk':'',L.katman.some(q=>q[2]&&q[2].gecis)?'geçiş':'',L.salla?'salla':'',L.katman.some(q=>q[0]==='isilti'||q[0]==='kuzey')?'ışıltı':'',L.ufle?'üfleme':'',L.ruzgar?'rüzgâr':'',L.uc?'uç':'',L.kart?'kart':'',L.katman.some(q=>q[2]&&q[2].islak)?'ıslak':'',L.sus?L.sus.length+' süs':''].filter(Boolean).join(', '),
      ym:!!(L.ruzgar||L.uc||L.kart||L.salla||L.katman.some(q=>q[2]&&q[2].islak)),
      kus:pc(K),ins:pc(I),insY:+avg(I).toFixed(2),dag:pc(G),dagY:+avg(G).toFixed(2),dok:D.yuzde,sn:K[0].sn};},[pl.tema,g,sd]);
    if(r.red){neden[r.red.split(' ')[0]]=(neden[r.red.split(' ')[0]]||0)+1;continue;}
    const [lo,hi]=bant(g);
    if(r.insY<lo||r.insY>hi){neden.bant=(neden.bant||0)+1;continue;}
    if(r.dagY>r.insY+.34){neden.daginik=(neden.daginik||0)+1;continue;}
    // çeşitlilik: art arda aynı tarif yok (ilk 5 bölüm hariç), bir tarif temanın en fazla %30'u, ad tekrarı yok
    if((g>5&&r.tarif===onceki)||(say[r.tarif]||0)>=tavan||adlar.has(r.ad)){neden.tekrar=(neden.tekrar||0)+1;continue;}
    // mekanikli bölüm (rüzgâr, uç, kart, ıslak kum, sallanan kavanoz): 10 bölümde en fazla 2, art arda değil
    if(r.ym&&(secilen.slice(-1).some(x=>x.ym)||secilen.slice(-9).filter(x=>x.ym).length>=2)){neden.mekanik=(neden.mekanik||0)+1;continue;}
    ok=Object.assign({tema:pl.tema,g,seed:sd},r);}
   if(ok){onceki=ok.tarif;adlar.add(ok.ad);say[ok.tarif]=(say[ok.tarif]||0)+1;secilen.push(ok);out.push(ok);}
   console.log(ok?`${pl.tema} ${g}: ${ok.ad} (${ok.en}) · ${ok.tarif} · ${ok.sekil} · ${ok.mek||'-'} · kusursuz ${ok.kus}% insan ${ok.ins}% ★${ok.insY} dağınık ${ok.dag}% ★${ok.dagY} dokunmayan ${ok.dok}% · ${ok.sn}sn · ${denenen}. deneme`
    :`${pl.tema} ${g}: BULUNAMADI ${JSON.stringify(neden)}`);}}
 fs.writeFileSync(OUT,JSON.stringify(out,null,1));console.log('yazıldı',OUT,out.length,'bölüm; hatalar',errs.slice(0,3));await b.close();})();

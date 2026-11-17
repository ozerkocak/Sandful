// Bir bölümü insan botuyla (uçtan uca testteki gibi: autoplay + sim, tohumsuz) çok kez oynatır ve en kötü koşuları gösterir.
// Üç tohumluk bot koşusunun göstermediği nadir felaketleri (ör. komşusunun çatısına konan bina) yakalamak için.
// Kullanım: NODE_PATH=$(npm root -g) node araclar/bot-kuyruk.js <bölüm (0'dan)> [koşu=100] [eşik=72]   (FILE=<başka sürüm> ile karşılaştırma)
// Çıktı: eşiğin altındaki her koşu için yüzde, yıldız, süslerin hedefe uzaklığı (dx, dy) ve katman puanları; sonda özet.
const {chromium}=require('playwright');const path=require('path');
const FILE=process.env.FILE?path.resolve(process.env.FILE):path.join(__dirname,'..','prototipler','01-kum-sisesi.html');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:430,height:932}})).newPage();
 await p.route('**/three.min.js',r=>r.abort());await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
 await p.goto('file://'+FILE);await p.waitForTimeout(800);
 const lv=+process.argv[2]||0,n=+(process.argv[3]||100),th=+(process.argv[4]||72);let low=0;const ps=[];
 for(let i=0;i<n;i++){const r=await p.evaluate(lv=>{__game.setTS(0);__game.start(lv);__game.autoplay('insan');__game.begin();let k=0;
   while(k<4000){__game.sim(50);k++;if(__game.state().state==='result')break;}__game.autoplay(null);const s=__game.state();
   return {pct:s.pct,stars:s.stars,sus:decorList.map(d=>({id:d.s.id,ok:d.ok,dx:+(d.wx-d.zx).toFixed(3),dy:+(d.wy+d.D.h/2-d.zy).toFixed(3)})),katman:layerScore.map(x=>+x.toFixed(2))};},lv);
  ps.push(r.pct);if(r.pct<th){low++;console.log(JSON.stringify(r));}await p.waitForTimeout(50);}
 ps.sort((a,b)=>a-b);console.log('B'+(lv+1)+': '+n+' koşu, %'+th+' altı: '+low+', en düşük %'+ps[0]+', ortanca %'+ps[n>>1]);await b.close();})();

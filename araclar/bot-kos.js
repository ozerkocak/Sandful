// Bölümleri bot profilleriyle oynatır (zorluk ayarı için). 3D gerekmez.
// Kullanım: NODE_PATH=$(npm root -g) node araclar/bot-kos.js '[14,30]' [koşu sayısı] ['<bölümü değiştiren JS>']
//   bölümler 0'dan sayılır; üçüncü parametre denemelik bir değişikliği dosyaya yazmadan sınar, ör. 'LEVELS[14].sus[0].u=.62'
// Çıktı: her profil için ortalama yüzde ve yıldız; köşeli parantezde çubuk izleri (1/0) ve süsler (✓/✗).
const {chromium}=require('playwright');const path=require('path');
const FILE=process.env.FILE?path.resolve(process.env.FILE):path.join(__dirname,'..','prototipler','01-kum-sisesi.html'); // FILE=<başka sürüm> ile karşılaştırma yapılabilir
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
 await p.route('**/three.min.js',r=>r.abort());await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('file://'+FILE);await p.waitForTimeout(800);
 const lv=JSON.parse(process.argv[2]||'[0]'),n=+(process.argv[3]||3),pfs=['kusursuz','insan','daginik','supurucu','dokunmayan'];
 if(process.argv[4])await p.evaluate(v=>{(0,eval)(v);},process.argv[4]);
 for(const l of lv){const row=[];for(const pf of pfs){let ps=0,ss=0,ex='';for(let sd=1;sd<=n;sd++){const r=await p.evaluate(([pf,l,sd])=>{const r=__game.bot(pf,l,sd);r.marks=stickMarks.map(m=>m.ok?1:0).join('');return r;},[pf,l,sd]);ps+=r.yuzde;ss+=r.yildiz;ex+=r.marks+(r.sus||'')+' ';}
   row.push(pf+' '+(ps/n).toFixed(0)+'%★'+(ss/n).toFixed(1)+(ex.trim()?' ['+ex.trim()+']':''));}
  console.log('B'+(l+1)+': '+row.join(' | '));}
 if(errs.length)console.log('hatalar',errs.slice(0,3));await b.close();})();

// Sandful bölüm üreticisi (1.2 denemesi). Oyun sayfasının içinde çalışır: flat, lin, tri, mx, yay, smooth, PAL, DEC, LEVELS, EN oyundan gelir.
// URET.uret(tema, g, tohum): g yoldaki sıra (1'den başlar, zorluğu belirler), aynı tohum hep aynı bölümü verir.
// Bölüm oyunun LEVELS biçimindedir; adı ve ipucu EN sözlüğüne eklenir. Botlarla eleme: araclar/uretici-sec.js
(function(){
const rngOf=s=>{let a=s>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};};
function kit(seed){const r=rngOf(seed*7919+13);
 return {r,u:(a,b)=>a+(b-a)*r(),p:a=>a[Math.floor(r()*a.length)],c:x=>r()<x,
  w:prs=>{let s=0;for(const q of prs)s+=q[1];let x=r()*s;for(const q of prs){if((x-=q[1])<0)return q[0];}return prs[prs.length-1][0];}};}
const clamp01=x=>Math.max(0,Math.min(1,x));
// mekaniklerin oyuncuya tanıtıldığı yer (el yapımı bölümler): bundan önce üretilmiş bölümde çıkmaz
const ACIL={ufle:8,cubuk:11,gecis:14,salla:16,isilti:20};

// ── şekil kalıpları: bir katmanın üst sınırı (u: camın solu 0, sağı 1; değer dolgu yüksekliğinin oranı). Eğim ≤ 0,5
function profil(K,tur,h){const R={tur,h,peaks:[],low:.5};
 if(tur==='duz'){R.f=flat(h);R.min=R.max=h;R.low=K.u(.25,.75);}
 else if(tur==='egim'){const d=K.u(.12,.28)*(K.c(.5)?1:-1),a=h+d/2,b=h-d/2;R.f=lin(a,b);R.min=Math.min(a,b);R.max=Math.max(a,b);R.low=a<b?.2:.8;R.peaks=[a>b?.15:.85];R.a=a;R.b=b;}
 else if(tur==='tepe'){const c=K.u(.26,.74),hp=h+K.u(.12,.26),k=K.u(.4,.5);R.f=mx(flat(h),tri(c,hp,k));R.min=h;R.max=hp;R.peaks=[c];R.low=c<.5?.82:.18;}
 else if(tur==='ikiTepe'){const c1=K.u(.2,.36),c2=K.u(.62,.8),h1=h+K.u(.1,.24),h2=h+K.u(.1,.24);R.f=mx(flat(h),tri(c1,h1,.5),tri(c2,h2,.5));R.min=h;R.max=Math.max(h1,h2);R.peaks=[c1,c2];R.low=(c1+c2)/2;}
 else if(tur==='vadi'){const c=K.u(.4,.6),k=K.u(.26,.42);R.f=u=>h+k*Math.abs(u-c);R.min=h;R.max=h+k*Math.max(c,1-c);R.low=c;R.peaks=[.15,.85];}
 else if(tur==='dalga'){const f=K.p([1,1.5,2]),a=Math.min(K.u(.03,.07),.45/(6.2832*f)),ph=K.r();R.f=u=>h+a*Math.sin(6.2832*(f*u+ph));R.min=h-a;R.max=h+a;R.wave={a,f,ph};
  let bu=0,bv=-9,lu=0,lv=9;for(let i=0;i<=40;i++){const u=.15+.7*i/40,v=R.f(u);if(v>bv){bv=v;bu=u;}if(v<lv){lv=v;lu=u;}}R.peaks=[bu];R.low=lu;}
 else if(tur==='yay'){R.f=yay(h);R.min=h-.07;R.max=h+.07;R.low=.5;R.peaks=[.15,.85];}
 return R;}
// aynı dalganın daha yukarıdaki kopyası (katmanlar birlikte dalgalanır)
const kopya=(P,dh)=>{const W=P.wave;return W?(u=>P.h+dh+W.a*Math.sin(6.2832*(W.f*u+W.ph))):P.tur==='yay'?yay(P.h+dh):flat(P.h+dh);};

// ── temalar: renkler, adlar, tarifler
const TEMA={
 kiyi:{ad:'Kıyı',en:'Coast',sekil:[['kavanoz',3],['kase',1.4],['silindir',1.4],['kadeh',.8]],
  tarif:g=>({kumsal:3,dalgalar:g<6?0:2,aksam:g<4?0:1.6,gece:g<8?0:1.3,firtina:1})},
 kis:{ad:'Kış',en:'Winter',sekil:[['kavanoz',3],['silindir',1.4],['vazo',1],['lale',.8],['kase',1]],
  tarif:g=>({karliTepe:3,dagKar:g<6?0:2,gol:g<4?0:1.6,kuzey:1.3,tipi:1})}};
// adlar: tarife uygun sıfat + isim (iki dilde)
const SIFAT={kumsal:[['Sakin','Calm'],['Sessiz','Quiet'],['Gizli','Hidden'],['Berrak','Clear'],['Altın','Golden'],['Küçük','Little'],['Uzak','Distant']],
 dalgalar:[['Mavi','Blue'],['Sakin','Calm'],['Rüzgârlı','Windy'],['Uzak','Distant'],['Serin','Cool']],aksam:[['Altın','Golden'],['Pembe','Pink'],['Sıcak','Warm'],['Sakin','Calm'],['Turuncu','Orange']],
 gece:[['Sessiz','Quiet'],['Yıldızlı','Starry'],['Mavi','Blue'],['Sakin','Calm'],['Işıltılı','Shimmering']],firtina:[['Gri','Grey'],['Uzak','Distant'],['Büyük','Great'],['Serin','Cool']],
 karliTepe:[['Karlı','Snowy'],['Beyaz','White'],['Sessiz','Quiet'],['Yumuşak','Soft'],['Küçük','Little']],dagKar:[['Beyaz','White'],['Soğuk','Cold'],['Uzak','Distant'],['Yüksek','High']],
 gol:[['Buzlu','Icy'],['Sessiz','Quiet'],['Gizli','Hidden'],['Donmuş','Frozen'],['Küçük','Little']],kuzey:[['Parlak','Bright'],['Yeşil','Green'],['Dans Eden','Dancing'],['Uzak','Distant']],
 tipi:[['Beyaz','White'],['Soğuk','Cold'],['Uzun','Long'],['Sert','Bitter']]};
const ISIM={kumsal:[['Koy','Cove'],['Kumsal','Beach'],['Kıyı','Shore'],['Liman','Harbor'],['Lagün','Lagoon']],dalgalar:[['Dalgalar','Waves'],['Gelgit','Tide'],['Köpükler','Surf']],
 aksam:[['Akşam','Evening'],['Ufuk','Horizon'],['Alacakaranlık','Dusk']],gece:[['Gece','Night'],['Mehtap','Moonlight']],firtina:[['Fırtına','Storm'],['Rüzgâr','Gale']],
 karliTepe:[['Tepeler','Hills'],['Yamaç','Slope'],['Orman','Woods']],dagKar:[['Zirve','Peak'],['Dağlar','Mountains']],gol:[['Göl','Lake'],['Gölet','Pond']],kuzey:[['Işıklar','Lights'],['Gökyüzü','Sky']],tipi:[['Tipi','Blizzard'],['Ayaz','Frost']]};
const IPUCU={kumsal:['Kumu silik çizgilere göre yığ, sonra denizi düz yay.','Pile the sand along the faint lines, then spread the sea flat.'],
 dalgalar:['Dalgaları çizgileri izleyerek dök: tepelerde biraz bekle.','Pour the waves along the lines: wait a little on the crests.'],
 aksam:['Katmanları sırayla, çizgileri izleyerek dök.','Pour the layers one by one along the lines.'],
 gece:['Önce kıyı, sonra gece. Süsler gökyüzünde asılı kalsın.','Shore first, then the night. The decorations hang in the sky.'],
 firtina:['Kavanoz sallanıyor: eğik katmanları kavanoz yatınca dök.','The jar is rocking: pour the tilted layers while it leans.'],
 karliTepe:['Karı tepelere yığ, düz yerleri ince yay.','Pile the snow on the hills and spread it thin on the flat parts.'],
 dagKar:['Önce zirveleri yığ. Kar sadece tepelere.','Build the peaks first. Snow goes only on the tops.'],
 gol:['Göl ortada düz kalsın, karı kenarlara yığ.','Keep the lake flat in the middle and pile the snow on the sides.'],
 kuzey:['Işıldayan kumu dalgayı izleyerek dök. Sonunda ışıklar söner.','Pour the glowing sand along the wave. At the end the lights go out.'],
 tipi:['Kavanoz sallanıyor: eğik katmanları kavanoz yatınca dök.','The jar is rocking: pour the tilted layers while it leans.']};
const EK={sus:['Süsleri halkaların içine bırak.','Drop the decorations inside their rings.'],cubuk:['Çubukla kesik çizgilere göre aşağı çek.','Drag down along the dashed lines with the stick.'],
 gecis:['Renk döküldükçe değişir: her yere eşit yay.','The color changes as you pour: spread it evenly.'],ufle:['Fazla kumu 💨 ile üfle.','Blow away extra sand with 💨.']};

// süs yerleştirme yardımcıları
const susYer=(id,k,o,u)=>({id,katman:k,oran:o,u:+clamp01(u).toFixed(3)});
const uzak=(us,u,m)=>us.every(v=>Math.abs(v-u)>=m);
function gokSus(K,sus,k,ids,n){const us=sus.filter(s=>s.katman===k).map(s=>s.u);for(let i=0;i<n;i++){let u=K.u(.2,.8),t=0;while(!uzak(us,u,.28)&&t++<8)u=K.u(.2,.8);if(!uzak(us,u,.28))return;us.push(u);sus.push(susYer(K.p(ids),k,+K.u(.3,.62).toFixed(2),u));}}
// çubuk izleri: üstteki renk alttakine iner; derinlik alttaki katmanın o noktadaki kalınlığına göre (dünya birimi, HF=1,96)
function cubukEkle(K,kat,k,n,us0){const izler=[],alt=u=>{let b0=0,b1=0;for(let i=0;i<k;i++){b0=b1;b1=Math.max(b1,kat[i][1](u));}return b1-b0;};
 const us=[];for(let i=0;i<n;i++)us.push(.14+.72*(i+.5)/n+K.u(-.03,.03));
 for(const u of us){if(us0&&!uzak(us0,u,.1))continue;const d=Math.max(.08,Math.min(.34,alt(u)*1.96*K.u(.45,.7)));izler.push({u:+u.toFixed(3),d:+d.toFixed(3)});}
 return izler.length>=2?{katman:k,oran:+K.u(.08,.18).toFixed(2),gen:+K.u(.04,.06).toFixed(3),izler}:null;}

// ── tarifler: {katman, sus, cubuk, salla, ufle, ortam, minor}
const TARIF={
 kumsal(K,d,g){const kum=K.p(['kum','kumAcik']),tur=K.w([['egim',1],['tepe',1.3],['duz',g<6?1:.3],['ikiTepe',d>.25?.8:0]]);
  const P=profil(K,tur,K.u(.12,.2)),ada=tur!=='duz'&&tur!=='egim'&&K.c(.4),hs=Math.min(.68,ada?P.max-K.u(.05,.1):P.max+K.u(.1,.22));
  if(hs-P.min<.12)return null;
  const deniz=K.p(['deniz','turkuaz','koyuDeniz']),kat=[[kum,P.f],[deniz,flat(hs)]],sus=[],X={};
  if(g>=ACIL.gecis&&K.c(.3))kat[1].push({gecis:deniz==='turkuaz'?'deniz':'turkuaz'});
  const aksam=g>=ACIL.gecis&&K.c(.25);kat.push(aksam?['turuncu',flat(1),{gecis:'pembe'}]:['gok',flat(1)]);
  const n=g<5?K.p([0,1]):K.p([1,1,2,d>.4?3:2]);
  if(n>0&&ada){sus.push(susYer('palmiye',0,1,P.peaks[0]));}
  else if(n>0&&K.c(.6)){sus.push(susYer(K.p(['tekne','yelkenli']),1,1,clamp01(P.low)));}
  else if(n>0)sus.push(susYer(K.p(['kabuk','denizyildizi']),0,1,P.low));
  if(n>1)gokSus(K,sus,2,aksam?['gunes','mart']:['mart','gunes'],n-1);
  return {katman:kat,sus,ortam:'deniz'};},
 dalgalar(K,d,g){const kum=K.p(['kum','kumAcik']),P0=profil(K,K.p(['duz','egim']),K.u(.12,.18));
  const h1=Math.max(P0.max+.12,K.u(.34,.42)),W=profil(K,'dalga',h1),dh=K.u(.14,.2),ust=K.p(['deniz','turkuaz']);
  const kat=[[kum,P0.f],['koyuDeniz',W.f],[ust,kopya(W,dh)],['gok',flat(1)]],sus=[],X={};
  if(g>=ACIL.gecis&&K.c(.35))kat[2].push({gecis:ust==='deniz'?'turkuaz':'deniz'});
  if(K.c(.6))sus.push(susYer('yelkenli',2,1,K.u(.25,.75)));
  if(d>.3&&K.c(.5))gokSus(K,sus,3,['mart'],1);
  if(g>=ACIL.cubuk&&K.c(.4)){const c=cubukEkle(K,kat,3,K.p([3,4]),sus.map(s=>s.u));if(c){c.izler.forEach(m=>m.d=Math.min(m.d,.13));X.cubuk=[c];}}
  return Object.assign({katman:kat,sus,ortam:'deniz'},X);},
 aksam(K,d,g){const seri=['koyuDeniz','deniz','sari','turuncu','pembe','mor'],n=K.p(d>.3?[4,5]:[4]),s0=K.p(n===5?[0,1]:[0,1,2]);
  const tur=K.w([['yay',1.2],['dalga',d>.2?1:.3],['duz',.6]]),f=K.p([1,1.5]),a=Math.min(K.u(.03,.05),.45/(6.2832*f)),ph=K.r(),kat=[];
  let h=K.u(.18,.24);const step=(.82-h)/(n-1);
  for(let i=0;i<n-1;i++){const hb=h;kat.push([seri[s0+i],tur==='yay'?yay(hb):tur==='dalga'?(u=>hb+a*Math.sin(6.2832*(f*u+ph))):flat(hb)]);h+=step*K.u(.88,1.08);}
  kat.push([seri[s0+n-1],flat(1)]);
  const X={},sus=[];if(g>=ACIL.ufle&&K.c(.6))X.ufle=3;
  if(g>=ACIL.gecis&&K.c(.35)){const i=kat.findIndex((q,k)=>q[0]==='turuncu'&&k<kat.length-1);if(i>=0)kat[i].push({gecis:'pembe'});}
  if(K.c(.5)){const i=kat.findIndex((q,k)=>(q[0]==='sari'||q[0]==='turuncu')&&k<kat.length-1);if(i>=0)sus.push(susYer('gunes',i,+K.u(.3,.6).toFixed(2),K.u(.3,.7)));}
  return Object.assign({katman:kat,sus,ortam:'deniz'},X);},
 gece(K,d,g){const kum=K.p(['kum','kumAcik']),P=profil(K,K.p(['egim','tepe']),K.u(.1,.16)),kat=[[kum,P.f]],X={minor:true};
  const isik=g>=ACIL.isilti&&K.c(.45);
  if(isik){const h=Math.max(P.max+.04,K.u(.22,.28)),W=profil(K,'dalga',h);kat.push(['koyuDeniz',flat(Math.max(P.max-.02,h-.12))]);kat.push(['isilti',W.f]);kat.push(['geceMavi',kopya(W,K.u(.16,.22))]);}
  else kat.push(['koyuDeniz',flat(Math.min(.62,P.max+K.u(.14,.26)))]);
  kat.push(g>=ACIL.gecis&&K.c(.4)?['geceMavi',flat(1),{gecis:'gece'}]:['gece',flat(1)]);
  const sus=[],gk=kat.length-1;gokSus(K,sus,gk,['ay','yildiz'],K.p(d>.3?[1,2]:[1]));
  if(isik&&g>=ACIL.cubuk&&K.c(.5)){const c=cubukEkle(K,kat,3,K.p([3,4]),null);if(c)X.cubuk=[c];}
  return Object.assign({katman:kat,sus,ortam:'gece'},X);},
 firtina(K,d,g){if(g<ACIL.salla)return null;const a=K.u(.24,.34),b=a-K.u(.12,.18)*(K.c(.5)?1:-1),c=Math.max(a,b)+K.u(.12,.18),e=c+K.u(-.16,.16);
  const kat=[['koyuDeniz',lin(a,b)],[K.p(['firtina','deniz']),lin(c,e)],['gok',flat(1)]],sus=[];
  if(d>.35&&K.c(.4))sus.push(susYer('yelkenli',1,1,K.u(.3,.7)));
  return {katman:kat,sus,ortam:'firtina',minor:true,salla:{a:+K.u(6,9).toFixed(1),p:+K.u(6.5,8).toFixed(1)}};},
 karliTepe(K,d,g){const P0=profil(K,K.p(['duz','egim']),K.u(.08,.13)),tur=K.w([['tepe',1.3],['ikiTepe',d>.2?1:.3],['egim',.6]]),P=profil(K,tur,Math.max(P0.max+.08,K.u(.2,.26)));
  const gece=g>=ACIL.gecis&&K.c(.35),kat=[[K.p(['koyuToprak','toprak']),P0.f],['kar',P.f],gece?['geceMavi',flat(1),{gecis:'gece'}]:[K.p(['gok','gok','bulut']),flat(1)]],sus=[],X={};
  if(gece){X.minor=true;X.ortam='gece';}
  const n=g<5?K.p([0,1]):K.p([1,2,2,d>.4?3:2]),yer=[];
  if(n>0&&P.peaks.length){sus.push(susYer(K.p(['ev','camAgaci']),1,1,P.peaks[0]));yer.push(P.peaks[0]);}
  if(n>1){const u=P.low;if(uzak(yer,u,.3))sus.push(susYer(K.p(['camAgaci','kardanadam']),1,1,u));}
  if(n>2)gokSus(K,sus,2,gece?['yildiz','ay','karTanesi']:['karTanesi'],1);
  if(g>=ACIL.ufle&&K.c(.3))X.ufle=3;
  return Object.assign({katman:kat,sus,ortam:'ruzgar'},X);},
 dagKar(K,d,g){const P=profil(K,K.w([['ikiTepe',1.4],['tepe',1]]),K.u(.16,.2)),th=P.max-K.u(.08,.12);
  const kat=[['toprak',flat(K.u(.1,.13))],['dag',P.f],['kar',u=>P.f(u)+.05*smooth(th-.02,th+.06,P.f(u)),{ince:1}]];
  const aks=K.c(.5);kat.push(aks?['turuncu',flat(K.u(.74,.8))]:['gok',flat(1)]);if(aks)kat.push(['mor',flat(1)]);
  const sus=[],gk=kat.length-1;if(d>.25&&K.c(.5))gokSus(K,sus,gk,aks?['gunes']:['mart'],1);
  return {katman:kat,sus,ortam:'ruzgar'};},
 gol(K,d,g){const c=K.u(.4,.6),k=K.u(.22,.32),h0=K.u(.08,.12),V=u=>h0+k*Math.abs(u-c),hl=h0+K.u(.1,.14);
  const kat=[['koyuToprak',V],['buz',flat(hl),{ince:1}],['kar',u=>V(u)+.06,{ince:1}],[K.p(['gok','bulut']),flat(1)]],sus=[],X={};
  const sk=c<.5?K.u(.78,.86):K.u(.14,.22);if(K.c(.7))sus.push(susYer(K.p(['kardanadam','camAgaci']),2,1,sk));
  if(d>.3&&K.c(.5))gokSus(K,sus,3,['karTanesi'],1);
  if(g>=ACIL.cubuk&&K.c(.35)){const lo=Math.max(.15,c-.16),hi=Math.min(.85,c+.16),izler=[];for(let i=0;i<3;i++){const u=lo+(hi-lo)*(i+.5)/3;izler.push({u:+u.toFixed(3),d:+Math.min(.18,(hl-V(u))*1.96*.6).toFixed(3)});}
   if(izler.every(m=>m.d>=.07))X.cubuk=[{katman:2,oran:.12,gen:.045,izler}];}
  return Object.assign({katman:kat,sus,ortam:'ruzgar'},X);},
 kuzey(K,d,g){if(g<ACIL.isilti)return null;const P=profil(K,K.p(['tepe','ikiTepe']),K.u(.1,.13)),W=profil(K,'dalga',Math.max(P.max+.12,K.u(.42,.48)));
  const kat=[['kar',P.f],['geceMavi',W.f],['kuzey',kopya(W,K.u(.12,.16))],['gece',flat(1)]];if(K.c(.5))kat[2].push({gecis:'mor'});
  const sus=[];if(P.peaks.length&&K.c(.7))sus.push(susYer('camAgaci',0,1,P.peaks[0]));
  return {katman:kat,sus,ortam:'gece',minor:true};},
 tipi(K,d,g){if(g<ACIL.salla)return null;const a=K.u(.2,.3),b=a-K.u(.12,.18)*(K.c(.5)?1:-1),c=Math.max(a,b)+K.u(.1,.16),e=c+(b-a)*K.u(.5,1);
  const kat=[['koyuToprak',lin(a,b)],['kar',lin(c,e)],[K.p(['bulut','gok']),flat(1)]],sus=[];
  if(K.c(.6))sus.push(susYer('kardanadam',1,1,K.u(.3,.7)));
  return {katman:kat,sus,ortam:'firtina',salla:{a:+K.u(6,8.5).toFixed(1),p:+K.u(6.5,8).toFixed(1)}};}};

// katman kalınlığı (u örnekleriyle): her ara katman ortalama ≥ .055, gökyüzü ≥ .14; süs camın üstünü aşmaz
// ince işaretli katman (dağın karı, göl) ortalamadan muaf, ama en kalın yeri ≥ .035
function kontrol(L){const N=24,b=new Array(N+1).fill(0),kal=[],enk=[];
 L.katman.forEach((q,i)=>{let s=0,m=0;for(let j=0;j<=N;j++){const u=j/N,v=i===L.katman.length-1?1:Math.max(b[j],q[1](u));s+=v-b[j];m=Math.max(m,v-b[j]);b[j]=v;}kal.push(s/(N+1));enk.push(m);});
 for(let i=0;i<kal.length-1;i++){const q=L.katman[i];if(q[2]&&q[2].ince?enk[i]<.035:kal[i]<.055)return 'ince katman '+i;}
 if(kal[kal.length-1]<.14)return 'gökyüzü ince';
 for(const s of L.sus||[]){if(s.oran<1)continue;const D=DEC[s.id];let top=0;for(let i=0;i<=s.katman;i++)top=Math.max(top,L.katman[i][1](s.u));if(top+D.h/1.96>.9)return 'süs taşar';}
 return null;}

function uret(tema,g,seed,zorla){const T=TEMA[tema],K=kit(seed),d=clamp01((g-1)/180);
 for(let tr=0;tr<12;tr++){const tid=zorla||K.w(Object.entries(T.tarif(g))),r=TARIF[tid](K,d,g);if(!r)continue;
  const L=Object.assign({sekil:K.w(T.sekil),akis:Math.round(520+150*d+K.u(-10,10)),kok:K.p([57,58,59,60,62,63,64,65]),uretim:{tema,g,seed,tarif:tid}},r);
  if(L.salla&&!['kavanoz','silindir'].includes(L.sekil))L.sekil='kavanoz';
  if(!L.sus||!L.sus.length)delete L.sus;
  if(kontrol(L))continue;
  const sf=K.p(SIFAT[tid]),is=K.p(ISIM[tid]);L.ad=sf[0]+' '+is[0];EN[L.ad]=sf[1]+' '+is[1];
  const ip=IPUCU[tid],ek=L.cubuk?EK.cubuk:L.katman.some(q=>q[2]&&q[2].gecis)?EK.gecis:L.ufle?EK.ufle:L.sus?EK.sus:null;
  L.ipucu=ip[0]+(ek?' '+ek[0]:'');EN[L.ipucu]=ip[1]+(ek?' '+ek[1]:'');
  return L;}
 return null;}
// sayfadaki oyuna ekle: LEVELS'a yazar, dizin döner
function ekle(L,dunya){L.dunya=dunya==null?3:dunya;LEVELS.push(L);return LEVELS.length-1;}
// oyun içi doğrulama: katman hacmi ve süsün cama sığması (bölüm kurulduktan sonra)
function dogrula(n){startLevel(n,{bot:true,seed:1});BOT=false;const tot=amounts.reduce((a,b)=>a+b,0);
 for(let k=0;k<amounts.length;k++){const o=L.katman[k][2];if(amounts[k]<tot*(o&&o.ince?.012:.035))return 'az hacim '+k;}
 for(const r of decorList){const bot=r.zy-r.D.h/2;if(Math.abs(r.zx)+r.D.w*.4>rIn(Math.max(0,bot))+.01)return 'süs cama sığmıyor';if(r.zy+r.D.h/2>HF*.97)return 'süs taşar';}
 return null;}
window.URET={uret,ekle,dogrula,TEMA,ACIL};
})();

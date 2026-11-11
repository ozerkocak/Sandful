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
const ACIL={ufle:8,cubuk:11,gecis:14,salla:16,isilti:20,ruzgar:31,islak:38,uc:51,kart:72}; // 1.2: rüzgâr çölde, ıslak kum piramitlerde, uç bahçede, kart tatlılarda tanıtılır

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
 else if(tur==='kubbe'){const a=K.u(.08,.14);R.f=u=>h+a*Math.sin(Math.PI*u);R.min=h;R.max=h+a;R.low=.12;R.peaks=[.5];R.kubbe=a;}
 return R;}
// aynı dalganın daha yukarıdaki kopyası (katmanlar birlikte dalgalanır)
const kopya=(P,dh)=>{const W=P.wave;return W?(u=>P.h+dh+W.a*Math.sin(6.2832*(W.f*u+W.ph))):P.tur==='yay'?yay(P.h+dh):P.kubbe?(u=>P.h+dh+P.kubbe*Math.sin(Math.PI*u)):P.tur==='duz'?flat(P.h+dh):(u=>P.f(u)+dh);};

// ── temalar: renkler, adlar, tarifler
const TEMA={
 kiyi:{ad:'Kıyı',en:'Coast',sekil:[['kavanoz',3],['kase',1.4],['silindir',1.4],['kadeh',.8]],
  tarif:g=>({kumsal:3,dalgalar:g<6?0:2,aksam:g<4?0:1.6,gece:g<8?0:1.3,firtina:1})},
 kis:{ad:'Kış',en:'Winter',sekil:[['kavanoz',3],['silindir',1.4],['vazo',1],['lale',.8],['kase',1]],
  tarif:g=>({karliTepe:3,dagKar:g<6?0:2,gol:g<4?0:1.6,kuzey:1.3,tipi:1})},
 col:{ad:'Çöl ve Vaha',en:'Desert and Oasis',gok:1,sekil:[['kavanoz',3],['silindir',1.4],['vazo',1],['kase',1]],
  tarif:g=>({kumullar:3,vaha:2,colGecesi:1.4,kumFirtinasi:g>=ACIL.ruzgar?1.2:0,piramit:g>=ACIL.islak?2.2:0})},
 bahce:{ad:'Bahçe ve Çiçekler',en:'Garden and Flowers',gok:1,sekil:[['kavanoz',3],['vazo',1.4],['lale',1.2],['silindir',1]],
  tarif:g=>({cicekTarlasi:3,bahceTepe:2,gokkusagi:1.4,cicekUc:g>=ACIL.uc?1.6:0,ikiBahce:g>=ACIL.kart?1.2:0})},
 tatli:{ad:'Tatlı Kavanozları',en:'Dessert Jars',sekil:[['kase',2],['kadeh',1.6],['silindir',1.4],['kavanoz',1.4]],
  tarif:g=>({katmanli:3,cikolatali:2,dondurma:1.6,mermer:g>=ACIL.cubuk?1.8:0,ikiTat:g>=ACIL.kart?1.4:0})}};
const GOKR=new Set(['gok','bulut','gece','geceMavi','turuncu','pembe','mor','sari','firtina']); // gökyüzü olabilecek renkler
// adlar: tarife uygun sıfat + isim (iki dilde)
const SIFAT={kumsal:[['Sakin','Calm'],['Sessiz','Quiet'],['Gizli','Hidden'],['Berrak','Clear'],['Altın','Golden'],['Küçük','Little'],['Uzak','Distant']],
 dalgalar:[['Mavi','Blue'],['Sakin','Calm'],['Rüzgârlı','Windy'],['Uzak','Distant'],['Serin','Cool']],aksam:[['Altın','Golden'],['Pembe','Pink'],['Sıcak','Warm'],['Sakin','Calm'],['Turuncu','Orange']],
 gece:[['Sessiz','Quiet'],['Yıldızlı','Starry'],['Mavi','Blue'],['Sakin','Calm'],['Işıltılı','Shimmering']],firtina:[['Gri','Grey'],['Uzak','Distant'],['Büyük','Great'],['Serin','Cool']],
 karliTepe:[['Karlı','Snowy'],['Beyaz','White'],['Sessiz','Quiet'],['Yumuşak','Soft'],['Küçük','Little']],dagKar:[['Beyaz','White'],['Soğuk','Cold'],['Uzak','Distant'],['Yüksek','High']],
 gol:[['Buzlu','Icy'],['Sessiz','Quiet'],['Gizli','Hidden'],['Donmuş','Frozen'],['Küçük','Little']],kuzey:[['Parlak','Bright'],['Yeşil','Green'],['Dans Eden','Dancing'],['Uzak','Distant']],
 tipi:[['Beyaz','White'],['Soğuk','Cold'],['Uzun','Long'],['Sert','Bitter']],
 kumullar:[['Altın','Golden'],['Sıcak','Warm'],['Sessiz','Silent'],['Uzak','Distant'],['Turuncu','Orange'],['Yumuşak','Soft']],vaha:[['Gizli','Hidden'],['Yeşil','Green'],['Serin','Cool'],['Küçük','Little'],['Sakin','Calm']],
 colGecesi:[['Yıldızlı','Starry'],['Sessiz','Silent'],['Serin','Cool'],['Mavi','Blue']],kumFirtinasi:[['Rüzgârlı','Windy'],['Sıcak','Hot'],['Turuncu','Orange'],['Uzun','Long']],
 piramit:[['Eski','Ancient'],['Altın','Golden'],['Büyük','Great'],['Sessiz','Silent']],
 cicekTarlasi:[['Renkli','Colorful'],['Bahar','Spring'],['Kırmızı','Red'],['Pembe','Pink'],['Güneşli','Sunny']],bahceTepe:[['Yeşil','Green'],['Yumuşak','Soft'],['Sakin','Calm'],['Çiçekli','Blooming']],
 gokkusagi:[['Parlak','Bright'],['Renkli','Colorful'],['Büyük','Big'],['Yumuşak','Soft']],cicekUc:[['İnce','Delicate'],['Bahar','Spring'],['Küçük','Little']],ikiBahce:[['İki','Twin'],['Komşu','Neighbor']],
 katmanli:[['Çilekli','Strawberry'],['Kremalı','Creamy'],['Yumuşak','Soft'],['Tatlı','Sweet']],cikolatali:[['Çikolatalı','Chocolate'],['Karamelli','Caramel'],['Sıcak','Warm']],
 dondurma:[['Naneli','Mint'],['Limonlu','Lemon'],['Serin','Cool'],['Yaban Mersinli','Blueberry']],mermer:[['Mermer','Marble'],['Dalgalı','Swirled']],ikiTat:[['İki Tatlı','Two-Flavor'],['Yarım Yarım','Half and Half']]};
const ISIM={kumsal:[['Koy','Cove'],['Kumsal','Beach'],['Kıyı','Shore'],['Liman','Harbor'],['Lagün','Lagoon']],dalgalar:[['Dalgalar','Waves'],['Gelgit','Tide'],['Köpükler','Surf']],
 aksam:[['Akşam','Evening'],['Ufuk','Horizon'],['Alacakaranlık','Dusk']],gece:[['Gece','Night'],['Mehtap','Moonlight']],firtina:[['Fırtına','Storm'],['Rüzgâr','Gale']],
 karliTepe:[['Tepeler','Hills'],['Yamaç','Slope'],['Orman','Woods']],dagKar:[['Zirve','Peak'],['Dağlar','Mountains']],gol:[['Göl','Lake'],['Gölet','Pond']],kuzey:[['Işıklar','Lights'],['Gökyüzü','Sky']],tipi:[['Tipi','Blizzard'],['Ayaz','Frost']],
 kumullar:[['Kumullar','Dunes'],['Çöl','Desert'],['Tepeler','Dunes']],vaha:[['Vaha','Oasis'],['Pınar','Spring']],colGecesi:[['Çöl Gecesi','Desert Night'],['Kumullar','Dunes']],
 kumFirtinasi:[['Rüzgâr','Wind'],['Kum Fırtınası','Sandstorm'],['Esinti','Breeze']],piramit:[['Piramitler','Pyramids'],['Taş Kuleler','Stone Towers']],
 cicekTarlasi:[['Tarla','Field'],['Lale Bahçesi','Tulip Garden'],['Çayır','Meadow']],bahceTepe:[['Bahçe','Garden'],['Tepe','Hill'],['Bostan','Orchard']],
 gokkusagi:[['Gökkuşağı','Rainbow']],cicekUc:[['Çiçekler','Flowers'],['Filizler','Sprouts']],ikiBahce:[['Bahçeler','Gardens'],['Tarlalar','Fields']],
 katmanli:[['Kup','Trifle'],['Pasta','Cake'],['Parfe','Parfait']],cikolatali:[['Puding','Pudding'],['Kup','Trifle'],['Pasta','Cake']],dondurma:[['Dondurma','Ice Cream'],['Sorbe','Sorbet']],
 mermer:[['Kek','Cake'],['Puding','Pudding']],ikiTat:[['Kup','Cup'],['Tatlı','Dessert']]};
const IPUCU={kumsal:['Kumu silik çizgilere göre yığ, sonra denizi düz yay.','Pile the sand along the faint lines, then spread the sea flat.'],
 dalgalar:['Dalgaları çizgileri izleyerek dök: tepelerde biraz bekle.','Pour the waves along the lines: wait a little on the crests.'],
 aksam:['Katmanları sırayla, çizgileri izleyerek dök.','Pour the layers one by one along the lines.'],
 gece:['Önce kıyı, sonra gece. Süsler gökyüzünde asılı kalsın.','Shore first, then the night. The decorations hang in the sky.'],
 firtina:['Kavanoz sallanıyor: eğik katmanları kavanoz yatınca dök.','The jar is rocking: pour the tilted layers while it leans.'],
 karliTepe:['Karı tepelere yığ, düz yerleri ince yay.','Pile the snow on the hills and spread it thin on the flat parts.'],
 dagKar:['Önce zirveleri yığ. Kar sadece tepelere.','Build the peaks first. Snow goes only on the tops.'],
 gol:['Göl ortada düz kalsın, karı kenarlara yığ.','Keep the lake flat in the middle and pile the snow on the sides.'],
 kuzey:['Işıldayan kumu dalgayı izleyerek dök. Sonunda ışıklar söner.','Pour the glowing sand along the wave. At the end the lights go out.'],
 tipi:['Kavanoz sallanıyor: eğik katmanları kavanoz yatınca dök.','The jar is rocking: pour the tilted layers while it leans.'],
 kumullar:['Kumulları çizgileri izleyerek yığ, tepelerde biraz bekle.','Pile the dunes along the lines and wait a little on the crests.'],
 vaha:['Önce kumu yığ, vahanın suyunu ortaya ince dök.','Pile the sand first, then pour the oasis water thin in the middle.'],
 colGecesi:['Kumulları yığ, sonra geceyi düz yay.','Pile the dunes, then spread the night flat.'],
 kumFirtinasi:['Rüzgâr kumu savuruyor: huniyi rüzgârın geldiği yana tut.','The wind blows the sand: hold the funnel into the wind.'],
 piramit:['Islak kum dik durur: piramitleri sivri yığ.','Wet sand stands steep: pile the pyramids to a point.'],
 cicekTarlasi:['Toprak ve çimen düz, çiçek kumunu ince dalga gibi yay.','Soil and grass flat, spread the flower sand in a thin wave.'],
 bahceTepe:['Tepeleri yığ, ağaç tepeye.','Pile the hills, the tree goes on top.'],
 gokkusagi:['Her rengi kubbe gibi dök: ortaya daha çok, kenarlara az.','Pour each color like a dome: more in the middle, less at the sides.'],
 cicekUc:['Çiçekleri ince uçla sivri yap, düz yerlere geniş uç.','Make the flowers pointed with the thin spout, the wide one for flat parts.'],
 ikiBahce:['Kart bahçeyi ikiye böler: iki yana iki ayrı çiçek.','The card splits the garden: a different flower on each side.'],
 katmanli:['Katmanları sırayla düz yay, meyveler kremanın içine.','Spread the layers flat one by one, the fruit goes into the cream.'],
 cikolatali:['Çikolatayı dalga gibi dök, üstüne krema.','Pour the chocolate in waves, cream on top.'],
 dondurma:['Topları kubbe gibi yığ, ortası yüksek.','Pile the scoops like domes, high in the middle.'],
 mermer:['Kremayı dök, çubukla çikolataya it.','Pour the cream and push it into the chocolate with the stick.'],
 ikiTat:['Kart kupu ikiye böler: bir yana çilek, bir yana çikolata.','The card splits the cup: strawberry on one side, chocolate on the other.']};
const EK={sus:['Süsleri halkaların içine bırak.','Drop the decorations inside their rings.'],cubuk:['Çubukla kesik çizgilere göre aşağı çek.','Drag down along the dashed lines with the stick.'],
 gecis:['Renk döküldükçe değişir: her yere eşit yay.','The color changes as you pour: spread it evenly.'],ufle:['Fazla kumu 💨 ile üfle.','Blow away extra sand with 💨.']};

// Gökyüzü: yer alçaksa tek renk koca bir gök yerine 2-3 bant (gündüz bulut şeridi, gün batımı, gece). Son bant ≤ %40.
const ortTop=kat=>{let s=0;const N=24;for(let j=0;j<=N;j++){let b=0;for(const q of kat)b=Math.max(b,q[1](j/N));s+=b;}return s/(N+1);};
function gokEkle(K,kat,mod){const t0=ortTop(kat),R=1-t0;
 const tek={gun:['gok'],aksam:['turuncu',{gecis:'pembe'}],gece:['gece'],sari:['sari',{gecis:'turuncu'}]}[mod];
 if(R<=.4){kat.push(tek[1]?[tek[0],flat(1),tek[1]]:[tek[0],flat(1)]);return;}
 const n=R>.62?3:2,hs=[];for(let i=1;i<n;i++)hs.push(t0+R*i/n+K.u(-.03,.03));
 if(mod==='gun'){const W={a:K.u(.02,.035),f:K.p([1,1.5,2]),ph:K.r()},hc=t0+R*K.u(.5,.58);const cl=u=>hc+W.a*Math.sin(6.2832*(W.f*u+W.ph));
  kat.push(['gok',cl]);kat.push(['beyaz',u=>cl(u)+K0,{ince:1}]);kat.push(['gok',flat(1)]);return;}
 const seri={aksam:K.p([['sari','turuncu','pembe'],['turuncu','pembe','mor'],['sari','turuncu','mor']]),gece:['mor','geceMavi','gece'],sari:['sari','turuncu','pembe']}[mod].slice(3-n);
 for(let i=0;i<n-1;i++)kat.push([seri[i],flat(hs[i])]);kat.push([seri[n-1],flat(1)]);}
const K0=.045; // bulut şeridinin kalınlığı
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
 // ── Çöl ve Vaha
 kumullar(K,d,g){const P0=profil(K,K.p(['egim','duz','tepe']),K.u(.14,.2)),P1=profil(K,K.w([['ikiTepe',1.4],['tepe',1],['dalga',.8]]),Math.max(P0.max+.06,K.u(.3,.38)));
  const kat=[[K.p(['kumul','colKumu']),P0.f],[K.p(['kum','acikSari','turuncu']),P1.f]],sus=[],X={};
  const P2=d>.15&&K.c(.6)?profil(K,K.p(['dalga','tepe']),Math.max(P1.max+.04,K.u(.5,.56))):null;if(P2)kat.push([K.p(['acikSari','kumAcik','colKumu']),P2.f]);
  const ust=kat.length-1,pk=(P2||P1).peaks;gokEkle(K,kat,K.w([['gun',1],['aksam',1.3],['sari',.6]]));
  if(pk.length)sus.push(susYer(K.p(['kaktus','kaktus','palmiye']),ust,1,pk[0]));
  if(d>.1&&K.c(.6)){const u=(P2||P1).low;if(uzak(sus.map(q=>q.u),u,.25))sus.push(susYer('deve',ust,1,u));}
  if(K.c(.55))gokSus(K,sus,kat.length-1,['gunes'],1);
  if(g>=ACIL.ufle&&K.c(.25))X.ufle=3;
  return Object.assign({katman:kat,sus,ortam:'ruzgar'},X);},
 vaha(K,d,g){const P=profil(K,K.p(['egim','duz']),K.u(.16,.22)),c=K.u(.38,.62),r=K.u(.2,.28),t=K.u(.06,.09),lens=u=>Math.max(0,t*(1-((u-c)/r)**2));
  const kat=[[K.p(['kumul','colKumu']),P.f],[K.p(['vaha','turkuaz','nehir']),u=>P.f(u)+lens(u),{ince:1}]];
  const H=profil(K,K.p(['ikiTepe','dalga','tepe']),Math.max(P.max+t+.08,K.u(.42,.5)));kat.push([K.p(['acikSari','kum','kumAcik']),H.f]);
  gokEkle(K,kat,K.c(.45)?'aksam':'gun');
  const sus=[];sus.push(susYer('palmiye',1,1,clamp01(c-r*.95)));if(K.c(.7))sus.push(susYer('palmiye',1,1,clamp01(c+r*.95)));
  if(d>.15&&K.c(.5))gokSus(K,sus,kat.length-1,['gunes'],1);
  return {katman:kat,sus,ortam:'deniz'};},
 colGecesi(K,d,g){const P0=profil(K,K.p(['egim','duz']),K.u(.14,.2)),P1=profil(K,K.p(['ikiTepe','tepe','dalga']),Math.max(P0.max+.07,K.u(.34,.42)));
  const kat=[['colKumu',P0.f],[K.p(['kumul','kum','turuncu']),P1.f]];
  if(K.c(.5))kat.push(['mor',kopya(P1,K.u(.12,.16))]);
  gokEkle(K,kat,'gece');
  const sus=[],gk=kat.length-1;if(P1.peaks.length&&K.c(.6))sus.push(susYer('kaktus',1,1,P1.peaks[0]));
  gokSus(K,sus,gk,['ay','yildiz','yildiz'],K.p(d>.2?[2,3]:[1,2]));
  return {katman:kat,sus,ortam:'gece',minor:true};},
 kumFirtinasi(K,d,g){const P0=profil(K,K.p(['tepe','ikiTepe','egim']),K.u(.16,.22)),W=profil(K,'dalga',Math.max(P0.max+.08,K.u(.36,.44)));
  const kat=[[K.p(['kumul','colKumu']),P0.f],[K.p(['acikSari','kum']),W.f],[K.p(['turuncu','kumul']),kopya(W,K.u(.14,.18))]],sus=[];gokEkle(K,kat,'aksam');
  if(K.c(.5))sus.push(susYer('kaktus',0,1,P0.peaks.length?P0.peaks[0]:K.u(.3,.7)));
  return {katman:kat,sus,ortam:'ruzgar',ruzgar:{g:+K.u(1.4,1.8+d*2).toFixed(2),p:+K.u(5,7).toFixed(1)}};},
 piramit(K,d,g){const h0=K.u(.14,.2),c1=K.u(.32,.5),h1=K.u(.5,.6),k1=K.u(1.2,1.4),two=K.c(.7),c2=c1<.45?K.u(.72,.82):K.u(.18,.26),h2=h1-K.u(.12,.18);
  const f=two?mx(flat(h0),tri(c1,h1,k1),tri(c2,h2,k1)):mx(flat(h0),tri(c1,h1,k1));
  const kat=[[K.p(['kumul','colKumu']),flat(h0-K.u(.04,.07))],['islakKum',f,{islak:true}]],sus=[];gokEkle(K,kat,K.c(.6)?'sari':'gun');
  if(K.c(.7)){const u=two?(c1+c2)/2:(c1<.5?K.u(.75,.85):K.u(.15,.25));sus.push(susYer('deve',1,1,u));}
  if(K.c(.6))gokSus(K,sus,kat.length-1,['gunes'],1);
  return {katman:kat,sus,ortam:'ruzgar'};},
 // ── Bahçe ve Çiçekler
 cicekTarlasi(K,d,g){const P0=profil(K,K.p(['duz','egim']),K.u(.12,.18)),W=profil(K,K.p(['dalga','duz','egim']),Math.max(P0.max+.08,K.u(.3,.36)));
  const ck=K.p(['lale','gul','pembe','sari','mor','kiraz']),kat=[[K.p(['toprak','koyuToprak']),P0.f],[K.p(['cimen','yaprak']),W.f],[ck,kopya(W,K.u(.08,.11))]];
  const P2=K.c(.5)?profil(K,K.p(['tepe','ikiTepe']),Math.max(W.max+.14,K.u(.5,.56))):null;if(P2)kat.push([K.p(['yaprak','cimen','bag']),P2.f]);
  const ck0=kat.length-1;gokEkle(K,kat,K.c(.3)?'aksam':'gun');
  const sus=[],gk=kat.length-1,n=K.p(d>.2?[2,3]:[1,2]),us=[];
  for(let i=0;i<n;i++){let u=K.u(.18,.82),tt=0;while(!uzak(us,u,.22)&&tt++<8)u=K.u(.18,.82);if(!uzak(us,u,.22))break;us.push(u);sus.push(susYer(K.p(['lale','aycicegi','lale']),ck0,1,u));}
  if(K.c(.6))gokSus(K,sus,gk,['kelebek','ari'],1);
  return {katman:kat,sus,ortam:'ruzgar'};},
 bahceTepe(K,d,g){const P0=profil(K,K.p(['duz','egim']),K.u(.12,.16)),P=profil(K,K.w([['tepe',1.3],['ikiTepe',1]]),Math.max(P0.max+.08,K.u(.3,.38)));
  const kat=[[K.p(['koyuToprak','toprak']),P0.f],[K.p(['cimen','yaprak']),P.f]];
  if(K.c(.5))kat.push([K.p(['yaprak','bag']),kopya(P,K.u(.1,.14))]);else kat.push([K.p(['gul','lale','sari']),u=>P.f(u)+.07,{ince:1}]);
  const tk=kat.length-1;gokEkle(K,kat,K.c(.25)?'aksam':'gun');const sus=[];sus.push(susYer(K.p(['kirazAgaci','agac']),1,1,P.peaks[0]));
  if(P.peaks.length>1&&K.c(.6))sus.push(susYer(K.p(['agac','aycicegi']),1,1,P.peaks[1]));
  if(K.c(.5)&&uzak(sus.map(q=>q.u),P.low,.22))sus.push(susYer('mantar',1,1,clamp01(P.low)));
  if(K.c(.5))gokSus(K,sus,kat.length-1,['kelebek','gunes'],1);
  return {katman:kat,sus,ortam:'ruzgar'};},
 gokkusagi(K,d,g){const seri=['kizil','turuncu','sari','cimen','deniz','mor'],n=K.p(d>.25?[5,6]:[4,5]),kat=[[K.p(['cimen','yaprak']),flat(K.u(.12,.16))]];
  let h=K.u(.18,.22);const a=K.u(.12,.18),st=K.u(.06,.075);
  for(let i=0;i<n;i++){const hb=h;kat.push([seri[i],u=>hb+a*Math.sin(Math.PI*u)]);h+=st;}
  gokEkle(K,kat,'gun');const sus=[];if(K.c(.5))gokSus(K,sus,kat.length-1,['gunes','ari'],1);
  return {katman:kat,sus,ortam:'ruzgar'};},
 cicekUc(K,d,g){const h0=K.u(.16,.2),n=K.p([2,3]),cs=[];for(let i=0;i<n;i++)cs.push((i+.5)/n+K.u(-.04,.04));
  const ck=K.p(['lale','gul','sari','mor']);
  const kat=[[K.p(['toprak','koyuToprak']),flat(h0-.06)],['cimen',flat(h0)],[ck,mx(flat(h0+.05),...cs.map(c=>tri(c,h0+K.u(.2,.26),.48)))],[K.p(['yaprak','cimen']),flat(K.u(.44,.5))]];gokEkle(K,kat,'gun');
  const sus=[];if(K.c(.6))gokSus(K,sus,kat.length-1,['kelebek','ari'],1);
  return {katman:kat,sus,ortam:'ruzgar',uc:true};},
 ikiBahce(K,d,g){const h0=K.u(.16,.22),hl=K.u(.48,.56),hr=K.u(.48,.56),cl=K.p(['lale','gul']),cr=K.p(['sari','mor']);
  const kat=[[K.p(['toprak','koyuToprak']),flat(h0)],['cimen',flat(h0+.07)],[cl,u=>u<.5?hl:0],[cr,u=>u>=.5?hr:0]];gokEkle(K,kat,'gun');
  const sus=[susYer('lale',2,.5,K.u(.18,.32)),susYer('aycicegi',3,.5,K.u(.68,.82))];
  return {katman:kat,sus,ortam:'ruzgar',kart:{u:.5,katman:4}};}, // kart iki çiçek bittikten sonra kalkar
 // ── Tatlı Kavanozları (gökyüzü yok, en üstte krema)
 katmanli(K,d,g){const tur=K.p(['duz','dalga','egim']),n=K.p(d>.3?[4,5]:[3,4]),seri=K.p([['biskuvi','krema','cilek','krema','cilek'],['biskuvi','limon','krema','limon','krema'],['cikolata','krema','cilek','krema','yabanMersini'],['biskuvi','yabanMersini','krema','yabanMersini','krema']]);
  const kat=[];let h=K.u(.14,.18);const st=(.8-h)/n,f=K.p([1,1.5]),a=K.u(.025,.04),ph=K.r();
  for(let i=0;i<n;i++){const hb=h,ii=i;kat.push([seri[i],tur==='dalga'&&i>0?(u=>hb+a*Math.sin(6.2832*(f*u+ph+ii*.13))):tur==='egim'&&i>0?lin(hb+.04,hb-.04):flat(hb)]);h+=st*K.u(.9,1.1);}
  kat.push(['krema',flat(1)]);const sus=[],m=K.p(['cilekMeyve','kirazMeyve','nane','limonDilim']);
  const k1=kat.findIndex(q=>q[0]==='krema');if(k1>=0&&k1<kat.length-1)sus.push(susYer(m,k1,.6,K.u(.25,.75)));
  sus.push(susYer(K.p(['cilekMeyve','kirazMeyve','nane']),kat.length-1,.55,K.u(.3,.7)));
  return {katman:kat,sus,ortam:'deniz'};},
 cikolatali(K,d,g){const W=profil(K,'dalga',K.u(.3,.36)),kat=[['biskuvi',flat(K.u(.12,.16))],['cikolata',W.f],['sutluCik',kopya(W,K.u(.15,.19))]];
  if(g>=ACIL.gecis&&K.c(.5))kat.push(['karamel',kopya(W,K.u(.3,.34)),{gecis:'sutluCik'}]);else kat.push(['karamel',kopya(W,K.u(.3,.34))]);
  kat.push(['krema',flat(1)]);const sus=[susYer(K.p(['kirazMeyve','cilekMeyve']),kat.length-1,.6,K.u(.35,.65))];
  if(K.c(.5))sus.push(susYer('nane',kat.length-1,.6,K.c(.5)?K.u(.15,.25):K.u(.75,.85)));
  return {katman:kat,sus,ortam:'deniz'};},
 dondurma(K,d,g){const seri=K.p([['nane','cikolata','cilek'],['limon','cilek','yabanMersini'],['cilek','krema','nane'],['karamel','krema','cikolata']]);
  const kat=[['biskuvi',flat(K.u(.12,.16))]];let h=K.u(.2,.24);const a=K.u(.1,.14);
  for(let i=0;i<3;i++){const hb=h;kat.push([seri[i],u=>hb+a*Math.sin(Math.PI*u)]);h+=K.u(.16,.19);}
  kat.push(['krema',flat(1)]);const sus=[susYer(K.p(['cilekMeyve','kirazMeyve','nane','limonDilim']),kat.length-1,.5,.5)];
  return {katman:kat,sus,ortam:'deniz'};},
 mermer(K,d,g){const kat=[['biskuvi',flat(K.u(.12,.15))],['cikolata',flat(K.u(.36,.42))],['krema',flat(K.u(.54,.6))],['sutluCik',flat(K.u(.72,.78))],['krema',flat(1)]],X={};
  const c=cubukEkle(K,kat,2,K.p([3,4]),null);if(!c)return null;X.cubuk=[c];
  return Object.assign({katman:kat,ortam:'deniz'},X);},
 ikiTat(K,d,g){const h0=K.u(.14,.18),hl=K.u(.52,.6),hr=K.u(.52,.6),pr=K.p([['cilek','cikolata'],['limon','yabanMersini'],['nane','cikolata'],['cilek','limon']]);
  const kat=[['biskuvi',flat(h0)],[pr[0],u=>u<.5?hl:0],[pr[1],u=>u>=.5?hr:0],['krema',flat(1)]];
  const sus=[susYer(K.p(['cilekMeyve','kirazMeyve']),3,.5,K.u(.3,.7))];
  return {katman:kat,sus,ortam:'deniz',kart:{u:.5,katman:3}};},
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
 if(L._gok&&GOKR.has(L.katman[L.katman.length-1][0])&&kal[kal.length-1]>.42)return 'gökyüzü çok';
 for(const s of L.sus||[]){if(s.oran<1)continue;const D=DEC[s.id];let top=0;for(let i=0;i<=s.katman;i++)top=Math.max(top,L.katman[i][1](s.u));if(top+D.h/1.96>.9)return 'süs taşar';}
 return null;}

function uret(tema,g,seed,zorla){const T=TEMA[tema],K=kit(seed),d=clamp01((g-1)/180);
 for(let tr=0;tr<12;tr++){const tid=zorla||K.w(Object.entries(T.tarif(g))),r=TARIF[tid](K,d,g);if(!r)continue;
  const L=Object.assign({_gok:!!T.gok,sekil:K.w(T.sekil),akis:Math.round(520+150*d+K.u(-10,10)),kok:K.p([57,58,59,60,62,63,64,65]),uretim:{tema,g,seed,tarif:tid}},r);
  if(L.salla&&!['kavanoz','silindir'].includes(L.sekil))L.sekil='kavanoz';
  if(!L.sus||!L.sus.length)delete L.sus;
  if(kontrol(L))continue;delete L._gok;
  if(L.kart&&!['kavanoz','silindir'].includes(L.sekil))L.sekil='kavanoz';
  let sf=K.p(SIFAT[tid]),is=K.p(ISIM[tid]);const kok=x=>x.toLocaleLowerCase('tr').split(' ').map(w=>w.slice(0,5));
  for(let t=0;t<6&&kok(sf[0]).some(a=>kok(is[0]).includes(a));t++){sf=K.p(SIFAT[tid]);is=K.p(ISIM[tid]);}L.ad=sf[0]+' '+is[0];EN[L.ad]=sf[1]+' '+is[1];
  const ip=IPUCU[tid],ek=L.ruzgar||L.uc||L.kart||L.katman.some(q=>q[2]&&q[2].islak)?null:L.cubuk?EK.cubuk:L.katman.some(q=>q[2]&&q[2].gecis)?EK.gecis:L.ufle?EK.ufle:L.sus?EK.sus:null;
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
// ayar için: bir tarifin denemelerde neden elendiğini söyler
function neden(tema,g,seed,tid){const K=kit(seed),d=clamp01((g-1)/180),out=[];
 for(let tr=0;tr<12;tr++){const r=TARIF[tid](K,d,g);if(!r){out.push('null');continue;}const L=Object.assign({_gok:!!TEMA[tema].gok,sekil:'kavanoz'},r);out.push(kontrol(L)||'ok');}return out;}
window.URET={uret,ekle,dogrula,neden,TEMA,ACIL};
})();

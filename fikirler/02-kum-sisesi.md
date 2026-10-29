# 01 · Kum Şişesi

> Yukarıdan durmadan renkli kum akıyor. Huniyi parmağınla sağa sola sürüyorsun;
> camın içinde katman katman, silik çizgilere göre bir manzara oluşuyor. Sonunda kapak kapanır, şişe rafına dizilir.

Prototip: `prototipler/01-kum-sisesi.html` (10 bölüm). Telefonda tarayıcıda açılarak oynanır.
**Uygulama adı: Sandful.** **Güncel sürüm 7 (TestFlight adayı):** son kontroller ve uygulama paketi (`uygulamalar/sandful/`). Sürüm 2-7 değişiklikleri en altta; üstteki bölümler sürüm 1'i anlatır.
Ozer ilk turda B'yi seçti ("başlayalım"). Açık sorulara cevap vermedi; kararları ben verdim, aşağıda gerekçeleriyle.

## Verilen kararlar

| Konu | Karar | Neden |
|---|---|---|
| Cam şekli | Dar boyunlu şişe yerine ağzı geniş camlar: kavanoz, kase, kadeh, vazo | Dar boyundan dökülen kum kenarlara ulaşmıyor. Hepsi yukarı doğru genişliyor, böylece camın her köşesine kum düşebiliyor |
| Ses | Tanıdık şarkı yerine her bölüme özel sakin, pentatonik bir melodi | Hedef rahatlatmak. Domino Chase'te beğenilen "şekilden sapınca şarkı durur" hissi korundu: kum doğru yere düştükçe melodi akar, saparsan susar |
| Ortam sesi | Deniz, rüzgâr, gece (cırcır böcekleri) | Rahatlamayı asıl ortam sesi taşır |
| Görsel | three.js yok; 2D tanecik ve ışık-gölge | Kumun dokusu tanecik tanecik görünmeli. Silindir gölgesi, cam parlaklığı, ağız elipsi ve raf gölgesiyle 3D hissi veriliyor |
| Dil | Sadece Türkçe | Prototip. Uygulamaya geçerken İngilizce eklenir (sürüm 7'de eklendi: oyun global) |

## Çekirdek döngü (bir bölüm 23-34 sn)

1. Camda silik, kesik çizgiler var: her katmanın üst sınırı. Şu an dökülen rengin bölgesi hafifçe parlar.
2. İlk dokunuşta kum akmaya başlar ve bölüm sonuna kadar durmaz.
3. Ekranın her yerinden sağa sola sürükle; huni parmağın hareketini izler, parmak camı kapatmaz.
4. Kum gerçek kum gibi yığılır: aynı yerde beklersen tepe olur, hızlı süpürürsen ince katman serilir.
5. Renkler alttan üste sırayla gelir. Üst şeritte bütün sıra ve miktarlar görünür; huninin içi kalan kumu gösterir, renk bitmeye yakın huninin üstünde sıradaki renk belirir.
6. Kum bitince kapak kapanır, ışık camın üstünden geçer, katmanlar alttan üste parlayıp birer nota çalar. Sonuç kartı açılır, şişe rafa eklenir.

## Kum fiziği

| Deneme | Sonuç |
|---|---|
| Klasik hücre otomatı (her karede 2 adım) | Kum geliş hızına yetişemedi, dökülen yerde sivri kuleler oluştu (eğim 5,6) |
| Tane yere değince aynı karede yuvarlanıp yerleşir, kural: aşağı ve çapraz | Eğim 45°. Fazla dik, yığınlar sivri |
| Ek kural: 3 yana 2 aşağı | **Eğim 34°, gerçek kum gibi.** Seçilen bu |

- Havadaki taneler parçacık olarak yerçekimiyle düşer. Yere değince ızgaraya girer ve saniyede 180 hücre hızla yokuştan aşağı yuvarlanır; yığılma görünür ama birikmez.
- Ağzın üstüne yığılan kum taşar ve kaybolur.
- Hedef şekillerin eğimi en fazla 0,5'tir (yaklaşık 29°), yani kumun durduğu açının altında; bütün şekiller dökerek kurulabiliyor.
- Telefonda maliyet: fizik adımı 0,12 ms. Yazılımsal çizimde bile ~59 FPS (DPR 3).

## Benzerlik puanı

İlk sürümde hücre hücre renk karşılaştırılıyordu. Botlar bunun yanlış olduğunu gösterdi: büyük, kolay gökyüzü katmanı şişenin yarısını kaplıyor ve hataları sulandırıyordu. Düşünmeden süpüren bot tepe bölümünde %94 alıyordu.

**Şimdiki puan:** Her sütunda, her katmanın üst çizgisi silik çizgiye kaç satır uzak?
2 satıra kadar tam puan, 18 satırda sıfır. Bütün çizgiler ve sütunlar eşit ağırlıkta.
Kum zaman sırasıyla yığıldığı için bir sütundaki renk sayıları çizgilerin yüksekliğini doğrudan veriyor.
Oyuncunun ekranda gördüğüyle aynı şeyi ölçüyor: "çizgiye ne kadar yakınım".

- Yüzde, katmanlar tamamlandıkça yükselir (üst şeritteki büyük çubuk).
- Bir katman bitince o katmanın çizgisi %90 ve üstüyse "Kusursuz katman!", %78 ve üstüyse "Güzel katman".
- Süsler bulundukları katmanın kumu gibi sayılır, böylece puanı bozmaz.

## Yıldız

- ★ %55, ★★ %75, ★★★ %90 ve bütün süsler halkanın içinde.
- Sonraki bölüm için 1 yıldız gerekir. Yıldızsız biten şişe de final gösterisini yapar ve rafa girer ("kaybettin" yok, "daha az güzel sonuç" var).

## Süsler

- Sıra bir süse gelince kum 2,6 sn durur. Süs huninin altında asılı kalır, huniyle birlikte gezer.
- Düşeceği yer kesikli çizgi ve kutuyla gösterilir; hedef halka ve süsün silik görüntüsü camın üstündedir.
- Dokununca bırakılır, dokunmazsan süre bitince kendi düşer.
- Katman sınırındaki süs (tekne, kaktüs, kuğu, ağaç) o katmanın üstüne oturur. Katmanın ortasındaki süs (güneş, ay, yıldız) dökülmekte olan kumun içine gömülür, gökyüzünde asılı görünür.
- Başarı: süsün merkezi hedefe yatayda 6, dikeyde 12 hücreden yakın. Dikey hata zaten katman yüzdesinde cezalanıyor, iki kez cezalandırmamak için geniş.

## Üfleme (8. bölümden itibaren, bölüm başına 3)

Çift dokunma ya da 💨 düğmesi. Huninin altındaki tepenin üstünü iki yana savurur (ortada 4-5 tane derinlik, kenarda sığ).
Yanlış yere yığılan kumu düzeltme şansı. Botlar kullanmıyor; etkisi ölçülmedi.

## Akış serisi ve müzik

- Kum doğru renk bölgesine düşüyorsa düştüğü yer altın renginde parlar ve melodi notası çalar (0,34 sn'de bir).
- 3 sn kesintisiz doğru dökünce "Akış ♪" (bas eklenir), 8 sn'de "Akış ♪♪" (yumuşak akor), 14 sn'de "Akış ♪♪♪" (yüksek parıltı notaları). Kumun düştüğü yerden notalar yükselir.
- 0,45 sn yanlış yere dökünce seri sıfırlanır; ceza yok, sadece müzik sadeleşir.

## Ses ve titreşim

| Katman | Ses | Titreşim |
|---|---|---|
| Mikro | Kum hışırtısı (seyrek tıkırtılar + filtreli gürültü, akarken açılır); doğru yerde melodi notası | Kum tanesi: 55-105 ms'de bir çok kısa atım (doğru yerde 7 ms, yanlışta 4 ms) |
| Orta | Renk değişiminde çan, katman bitince akor, süs yere değince tok "tump", tam yerindeyse arpej, üflemede "fff" | Orta atım (12-40 ms) |
| Makro | Kapak "pop" ve cam çınlaması, katmanlar parlarken akor notaları, yıldızlar birer nota | Kapakta güçlü (60 ms), yıldız başına orta |

- Uygulamada Capacitor Haptics, Android tarayıcıda `navigator.vibrate`.
- **iPhone tarayıcıda** `vibrate` yok. iOS 18'deki gizli "switch" hilesi denendi (dokunma ve sürükleme anında); deneysel, çalışmayabilir. Uygulamada kesin çalışır.
- Ses ve titreşim raf ekranından ayrı ayrı kapatılır.

## Bölümler

| # | Ad | Cam | Yeni olan | Akış (tane/sn) |
|---|---|---|---|---|
| 1 | Kumsal | Kavanoz | Düz katmanlar: süpürmeyi öğren | 520 |
| 2 | Tepe | Kavanoz | Sağda tepe: beklersen yığılır | 540 |
| 3 | Koy | Kase | Eğik kumsal, yuvarlak dip | 560 |
| 4 | Tekne | Kavanoz | İlk süs: tekne denizin üstüne | 560 |
| 5 | Dağlar | Vazo | İki zirve, kar sadece tepelerde | 600 |
| 6 | Vadi | Kavanoz | Ortada nehir, yeşil kenarlarda | 600 |
| 7 | Çöl | Kase | İki kumul, kaktüs kumulda, güneş gökte asılı | 620 |
| 8 | Gün batımı | Kadeh | 6 ince katman, üfleme | 640 |
| 9 | Göl | Kavanoz | Düz göl yüzeyi, kuğu ve ağaç | 640 |
| 10 | Gece | Kavanoz | Lacivert dağlar, yıldız ve ay gökte; minör melodi | 660 |

## Bot simülasyonu (bölüm başına 3 koşu: ortalama yüzde ve yıldız, süs sonucu)

| Profil | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Hiç dokunmayan (hep ortada) | 21 ★0 | 28 ★0 | 27 ★0 | 23 ★0 | 39 ★0 | 34 ★0 | 17 ★0 | 47 ★0 | 28 ★0 | 25 ★0 |
| Süpürücü (düşünmeden sağa sola) | 78 ★2 | 80 ★2 | 70 ★1 | 71 ★1 | 41 ★0 | 69 ★1 | 66 ★1 | 36 ★0 | 83 ★2 | 72 ★1 |
| Dağınık (büyük algı hatası) | 74 ★1,3 | 72 ★1 | 74 ★1,3 | 74 ★1,3 | 74 ★1,7 | 72 ★1 | 74 ★1,3 | 78 ★2 | 76 ★1,7 | 67 ★1 |
| İnsan (geç tepki, küçük hata) | 88 ★2,3 | 82 ★2 | 88 ★2,3 | 92 ★2,7 | 82 ★2 | 85 ★2 | 84 ★2 | 82 ★2 | 89 ★2,3 | 82 ★2 |
| Kusursuz | 99 ★3 | 96 ★3 | 94 ★3 | 96 ★3 | 97 ★3 | 93 ★3 | 95 ★3 | 96 ★3 | 92 ★3 | 94 ★3 |

- Akıllı botlar süpürür ama eksik olan yerde yavaşlar (gerçek bir oyuncunun yaptığı gibi). İnsan botu 0,15 sn geç algılar, eksikleri ±3 satır hatayla görür.
- Strateji fark yaratıyor: süpürücü ile insan arasındaki fark dağlarda ve gün batımında 40 puanın üstünde.
- İnsan botu her bölümde süsleri tutturuyor; dağınık bot yarısını kaçırıyor.

## Bilinen eksikler ve dürüst notlar

- **Zorluk eğrisi botlarda düz.** İnsan botu bütün bölümlerde %82-92 alıyor. Gerçek oyuncu için ileri bölümler muhtemelen daha zor (ince katmanlar, süs zamanlaması), ama bunu Ozer'in denemesi gösterecek.
- **Bot hızları tahmin.** İnsan botu saniyede 95 hücre süpürüyor (telefonda ~200 px/sn). Gerçek oyuncu daha hızlı ya da yavaş olabilir.
- 2D kesitte kum en fazla 34° yığılıyor; dik, sivri dağlar yapılamıyor. Manzaralar yumuşak tepeler, kumullar, koylar.
- Yeni bölüm açmak için 1 yıldız yetiyor ve düşünmeden süpüren bile çoğu bölümde 1 yıldız alıyor. Rahatlatma hedefi için bilerek böyle; istenirse eşik yükseltilir.
- Telefonun eğilmesi (eğ aracı) ve dar/geniş musluk bu sürümde yok.

## Ozer'e sorular (oynadıktan sonra)

1. Kum dökmek rahatlatıyor mu? Yoksa kum hiç durmadığı için acele hissi mi veriyor?
2. Silik çizgiler ve parlayan bölge yeterince anlaşılır mı, neyi nereye dökeceğini biliyor musun?
3. Titreşim (Android ya da uygulama) tane tane hissediliyor mu, fazla mı?
4. Melodi hoş mu, yoksa sadece kum sesi ve ortam sesi mi kalsın?
5. Süs bırakmak (tekne, kaktüs, ay) keyifli mi? Daha çok süs mü olmalı?

## Sürüm 2: 3D grafik ve yeni kum fiziği

Geri bildirim: "Oyun mantığı güzel. Grafikler hoşuma gitmedi, çok daha kaliteli olmalı. Aynı yere çok kum gidince ya da köşeye gelince bazı tanelerin aşağı kayması gerekiyor, orada eksikler var."

### Fizik

Sürüm 1'de tane yere değince birkaç karede yuvarlanıp duruyor, sonra bir daha hiç kontrol edilmiyordu. Akış yoğunken taneler birbirini beklerken durdu, dik yerler ve köşeler öyle kaldı.

| Kural | Nasıl çalışır |
|---|---|
| Hız ve ivme | Her tanenin yatay ve dikey hızı var. Düşen tane ivmelenir (saniyede en fazla 330 hücre). |
| Çarpma saçılması | Çarpan tanenin düşme hızının bir kısmı yana savrulmaya döner. Akışın altında koni yayılarak büyür. |
| Çığ | Yamaçtan kayan tane hız kazanır ve aynı karede 4 hücreye kadar akar. Döküş durunca kum ~1 sn içinde durur. |
| Uyanma | Yerinden oynayan tane üstündeki ve yanındaki taneleri uyandırır; altı boşalan tane mutlaka düşer. |
| Yüzey hiç uyumaz | Yüzeydeki taneler her karede yeniden denenir; 34°'den dik bir yer kalamaz. Testlerde takılı tane: 0. |
| 34° yığılma | 3 yana 2 aşağı yol açıksa tane yana yürür (artık adım adım, ışınlanmadan). |
| Cam kenarı | Cam üstünde sürtünme daha az: kum ~27°'den dik cam yamaçta kayar (kase dibinde ortaya akar). |
| Akış sıkışması | İlk denemede akışın düştüğü sütunda taneler birbirinin üstüne konup havada 60 hücrelik bir kule oluşturdu. Çarpan tane artık aynı anda saçılıp kayıyor; kule yok. |

Izgara 150×200'den **210×280**'e çıktı (taneler %30 daha küçük). Fizik adım başına 3 geçiş; fizik ve sahne güncellemesi kare başına ~2,3 ms (test tarayıcısında, çizim hariç).

### Grafik (three.js r128)

- **Gerçek 3D sahne:** Ahşap masada cam kavanoz, sıcak arka plan, yumuşak temas gölgesi ve ışığın uzattığı gölge.
- **Cam:** Kenarlara doğru güçlenen yansıma (fresnel), solda pencere yansıması, ince ışık parlaması, kalın dip ve yuvarlak ağız kenarı. Arka duvar da görünür.
- **Kum:** Fizik 2D kesitte çalışır, kesit kavanozun iç duvarına sarılır. Taneler kare ızgarada değil; düzensiz dağılmış (hücresel gürültü), her tane kendi tonunda, ortası ışık alır, kenarı gölgede, bazıları ışıltılı.
- **Kumun üst yüzeyi:** Sütun yüksekliklerinden 3D yüzey; tepeler içeride biraz kabarır, sırt yerine yuvarlak tümsek görünür.
- **Pirinç huni:** İçindeki kum azaldıkça seviyesi düşer.
- **Düşen kum** tane tane 3D noktalar. Düştüğü yerde hafif toz kalkar, doğru yere dökerken ışık parlar.
- **Süsler:** Huninin altında 3D voksel olarak asılı durur. Düşeceği yere kesik çizgi, etrafında geri sayım halkası var. Düşünce camın önündeki kuma gömülür.
- **Final:** Ahşap kapak kapanır, kamera kavanozun çevresinde hafifçe döner ve yaklaşır, ışık camın üstünden geçer, katmanlar alttan üste parlar, konfeti çıkar.
- **Raf:** Şişenin küçük resmi artık 3D görüntüden alınıyor.
- **Arayüz:** Buzlu cam bilgi şeritleri, Nunito yazı tipi, kumlu sıra çubuğu.
- **Renk:** ACES ton eşleme kum renklerini soldurup zeytin yeşiline çeviriyordu; kapatıldı, ışıklar buna göre ayarlandı.
- **Ortam yansıması:** three.js PMREM test tarayıcısında bütün malzemeleri siyah yaptı. Her cihazda çalışsın diye 6 tuvalden küp harita kullanılıyor.

### Puan ve zorluk

- Yeni fizikte kum daha gerçekçi yayıldığı için hiç dokunmayan bot bile 8. bölümde %79 (2 yıldız) aldı.
- Puan aralığı daraltıldı: çizgiye 3 satıra kadar tam puan, 16 satırda sıfır (önce 25).
- Saçılma biraz azaltıldı, kum daha kontrollü.
- Yıldız eşikleri: ★ %58, ★★ %74, ★★★ %86 ve bütün süsler halkada.
- **8. bölüm (Gün batımı):** Dar dipli kadehte ortaya dökmek kendiliğinden düz katman verdiği için katmanlar ortası çukur yaylar oldu ("kenarlara daha çok dök").

### Bot simülasyonu (sürüm 2; bölüm başına 3 koşu: ortalama yüzde ve yıldız)

| Profil | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Hiç dokunmayan | 33 ★0 | 35 ★0 | 32 ★0 | 32 ★0 | 52 ★0 | 37 ★0 | 25 ★0 | 51 ★0 | 26 ★0 | 34 ★0 |
| Süpürücü | 76 ★2 | 61 ★1 | 67 ★1 | 63 ★1 | 54 ★0 | 65 ★1 | 62 ★1 | 74 ★1 | 71 ★1 | 54 ★0 |
| Dağınık | 79 ★2 | 55 ★0,3 | 73 ★1,7 | 63 ★0,7 | 74 ★1,3 | 60 ★0,7 | 72 ★1,7 | 81 ★2 | 61 ★0,7 | 60 ★0,7 |
| İnsan | 86 ★2,3 | 70 ★1,3 | 83 ★2 | 85 ★2,3 | 77 ★2 | 76 ★1,7 | 74 ★1,3 | 79 ★2 | 79 ★1,7 | 70 ★1,3 |
| Kusursuz | 97 ★3 | 91 ★3 | 90 ★3 | 94 ★3 | 89 ★3 | 89 ★3 | 87 ★3 | 95 ★3 | 87 ★3 | 89 ★3 |

- Hiç dokunmayan her bölümde yıldızsız; kusursuz her bölümde 3 yıldız alabiliyor.
- Sürüm 1'e göre daha zor: insan botu ortalama 2-2,7 yerine 1,3-2,3 yıldız alıyor. Süsleri her bölümde tutturuyor.

### Bilinen eksikler ve dürüst notlar

- **Gerçek telefonda ölçülmedi.** Test tarayıcısı yazılımsal çizimle çalışıyor (saniyede birkaç kare); hız ölçümü sadece hesap tarafı için (~2,3 ms). Görüntü telefonda takılırsa ilk düşürülecek şey tane gölgelendiricisi ve fizik geçiş sayısı.
- Kum fiziği 2D kesit. 3D yüzey derinlik boyunca aynı yüksekliği gösteriyor; tepeler sadece görsel olarak yuvarlatıldı.
- İnternetsiz açılırsa (three.js gelmezse) "Bu cihazda 3D grafik açılamadı" yazar. Uygulamaya geçerken three.js pakete gömülecek (Domino Chase'teki gibi).
- Zorluk sürüm 1'den yüksek. Gerçek oyuncu için fazla zor gelirse ilk ayar eşikler (58/74/86).

### Ozer'e sorular (sürüm 2)

1. Grafik istediğin seviyeye geldi mi? Cam, kum tanesi, ışık, masa: en çok hangisi eksik?
2. Kumun kayması, yığılması, cam kenarından akması gerçekçi mi?
3. Telefonda akıcı mı, takılma var mı?
4. Zorluk: 2 yıldız almak zor mu geliyor?

## Sürüm 3: basılı tut, yumuşak kum, yeni sahne

Geri bildirim: "Bardak çok parlıyor, gerçekçi durmuyor. Kullanıcı elini çekince akış dursa mantıklı olur mu? Taneler daha gerçekçi ama taneler, dökülme hissi ve rahatlama hissi istediğim gibi değil. 2 yıldız almak çok kolay değil. Grafiklerde hâlâ çok gerideyiz."

### Basılı tut = dök

- Ozer'in sorusuna cevap: evet. Basılı tutunca kum akar, bırakınca durur. Baskıyı kaldırır, oyuncu durup bakabilir; rahatlatma hedefine uygun.
  "Girdiyi durdurma" kuralıyla çelişmez, durduran oyuncunun kendisi.
- Akış 0,08 sn içinde yumuşakça açılıp kapanır. Havadaki kum düşmeye devam eder, akışın kuyruğu kopar.
- Süs huninin altında asılı gelir; sürükleyip parmağını kaldırınca düşer. Geri sayım yok.
- Üfleme sadece 💨 düğmesiyle (çift dokunma basılı tutmayla karıştığı için kalktı).

### Fizik: sütun tabanlı yumuşak kum

Sürüm 2'nin hücre tabanlı fiziğinde taneler hücreden hücreye zıplıyordu; hareket titrek, yüzey pürüzlü, görüntü dijital kalıyordu.

| Deneme | Sonuç |
|---|---|
| Sütunlar arası komşu dengeleme (her karede 3 tarama) | Fazlalık uzağa çok yavaş taşındı: düşen yerde iğne (eğim 5,3), oturması 170 sn |
| Önceki sonucu kullanan ileri-geri taramalar | Daha iyi ama yine yavaş (oturma 40 sn) |
| **Düşen pay yokuştan yuvarlanıp sığdığı ilk yerde kalır** | **Yüzey hiçbir an 34°'yi aşmaz, kalıntı akış yok, kare başına 0,02 ms.** Seçilen bu |

- 256 sütun; her sütun alttan üste renkli katmanlardan bir yığın, yükseklikler kesirli. Katman sınırları yumuşak eğriler olur (kum sanatı görünümü).
- Her payın durma eğimi %±7 değişir, yamaç doğal biraz pürüzlü.
- Akış artık dilimlerden oluşur: huniden çıkan her dilim yerçekimiyle düşer, çarptığı yere kum bırakır. Huni hareket edince akış kıvrılır, çarptığı nokta gecikir (gerçekteki gibi).
- Kayma görüntüsü: payın yuvarlandığı yol boyunca yamaçtan aşağı kayan taneler çizilir. Çarptığı yerde küçük sıçrama ve çok hafif toz.
- Üfleme ve süs sonrası dikleşen yerler tam dengelemeyle düzeltilir.

### Grafik

| Konu | Sürüm 2 | Sürüm 3 |
|---|---|---|
| Cam | Bütün yüzeye sıcak yansıma, uzun parlak şeritler: lamba gibi ışıyordu | Neredeyse görünmez: yansıma sadece kenarlara doğru, tek yumuşak pencere yansıması, ince kenar çizgisi; arka yüz ve dip çok az yansıtır |
| Kum | Kare ızgara tane, sert benekler | Sütun dokusundan yumuşak renkler, katman sınırında hafif bastırılmış çizgi, üstünde çok ince tane, hafif benek ve katman boyunca damarlar, nadir ışıltı |
| Akış | Tek tek noktalar | Kenarları yumuşak, içinde aşağı akan tane dokusu olan şerit; çevresinde tek tük savrulan taneler |
| Sahne | Düz bej duvar | Güneş vuran sıva duvar ve bulanık yaprak gölgeleri, masada güneş lekesi, camın uzun gölgesi ve camdan geçen ışık lekesi, ekran kenarında hafif karartma |
| Süsler | Piksel sanat vokseller | Vektör çizimler (her platformda aynı), cama yaslı; hedef halkasında silik hayaleti |
| Üst yüzey | Sütun sütun keskin sırtlar | Yumuşatılmış, tepeler içeride kabarık tümsek |

Kum tepelerinde beyaz lekeler (biriken toz ve nota simgeleri) çıkıyordu; toz çok hafifletildi, nota simgeleri kaldırıldı (müzik kaldı).

### Ses

Döküş sesi üç katman: akış (yumuşak pembe gürültü, 1,5 kHz altı), çarpma (seyrek tıkırtılar, düşme hızına göre) ve yamaçtan kayma (daha pes tıkırtılar, kayan kum kadar).
Açılırken hızlı (50 ms), kapanırken yavaş (180 ms) değişir.

### Puan ve zorluk

- Puan aralığı 20 (çizgiye 3 satıra kadar tam, 23 satırda sıfır). Eşikler: ★ %72, ★★ %79, ★★★ %86.
- Süsler puanda tarafsız: kapladığı yükseklik, hedefte o yükseklikte hangi katman varsa ona sayılır. Önce kuğu gölün üstünde "yeşil" sayılıp 9. bölümü haksız yere zorlaştırıyordu.
- Süsler %40 büyüdü.

| Profil | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Hiç dokunmayan (ortada basılı tutar) | 52 ★0 | 56 ★0 | 50 ★0 | 48 ★0 | 71 ★0 | 56 ★0 | 51 ★0 | 65 ★0 | 38 ★0 | 56 ★0 |
| Süpürücü (hep döker) | 90 ★3 | 77 ★1 | 71 ★0 | 58 ★0 | 73 ★1 | 60 ★0 | 70 ★0 | 85 ★2 | 67 ★0 | 66 ★0 |
| Dağınık | 84 ★2,3 | 74 ★1 | 63 ★0 | 75 ★0,7 | 79 ★1,3 | 68 ★0,3 | 74 ★0,7 | 80 ★1,7 | 68 ★0 | 76 ★1,3 |
| İnsan (eksik gördüğü yerde döker) | 94 ★3 | 83 ★2 | 84 ★2,3 | 88 ★3 | 86 ★2,7 | 81 ★2 | 80 ★1,7 | 89 ★3 | 79 ★1,7 | 81 ★2 |
| Kusursuz | 98 ★3 | 96 ★3 | 98 ★3 | 95 ★3 | 95 ★3 | 90 ★3 | 89 ★3 | 94 ★3 | 91 ★3 | 92 ★3 |

- İnsan botu artık çoğu bölümde 2 yıldız ve üstü alıyor (sürüm 2'de 1,3-2,3).
- Düşünmeden süpüren 1. bölümde 3 yıldız alıyor: düz katmanlı ilk bölüm zaten süpürmeyi öğretiyor. 8. bölümün yayları da süpürmenin dönüş noktalarında kendiliğinden oluşuyor (2 yıldız).

### Bilinen eksikler

- Hâlâ gerçek telefonda ölçülmedi; hesap tarafı kare başına ~1,2 ms (test tarayıcısında, çizim hariç).
- Kum fiziği 2D kesit; 3D üst yüzey bu kesitten türetiliyor.
- Duvar ve masa dokuları her açılışta rastgele çiziliyor (yaprak gölgeleri her seferinde biraz farklı).

## Sürüm 4: tane tane kum, kırılan cam, yeni kum sesi

Geri bildirim: "Kumun dolduğu bardakta hâlâ sorun var, katmanın olduğu çizgi bile karışıyor. Grafikleri daha da üst düzey yapalım.
Kum dökülürken çıkan ses çok boğuk ve rahatsız edici. Dökülme hâlâ tam rahatlatmıyor, bir şeyler eksik; ses net olarak etkiliyor ama grafikler de istenen düzeyde değil.
Telefona alınca, canlıya alınca titreşimi de unutmayalım."

### Katman çizgisi neden karışıyordu

Sürüm 3'te kum duvarı 256 × 384 hücrelik bir renk dokusundan çiziliyordu ve renkler hücreler arasında karıştırılıyordu (doğrusal süzme).
İnce bir katman (örneğin dağların kenarına düşen kar) bir hücreden ince kalınca sınırda iki renk beneklenerek birbirine geçiyordu; katman sınırları bulanık ve kirli görünüyordu.

Şimdi:
- Renk yerine **katman numarası** 1024 satırlık bir dokuda tutuluyor ve hiç karıştırılmıyor.
- Ekrandaki her piksel bir kum tanesine düşüyor; o tanenin merkezi hangi katmandaysa tane o renkte. Sınır tane tane keskin, ince katmanlar serpinti gibi görünüyor.
- Kum duvarının üst kenarı artık doku kesmesi değil, geometri: her karede kumun üst çizgisine oturuyor, kenar yumuşak.

### Hedef çizgisi

- Şimdi dökülen katmanın hedef çizgisi kumun üstünde de görünür (ince beyaz kesik çizgi). Kum çizgiye yetiştiği yerde çizgi o noktada altın rengi ve kesintisiz olur.
- Biten katmanların çizgileri kumun içinde kaybolur; resim kirlenmez.
- Hedef bölgesinin renkli tülü yarıya indi; üst yüzeyi bulanıklaştırıyordu.

### Grafik

| Konu | Sürüm 3 | Sürüm 4 |
|---|---|---|
| Kum | Düz renk üstüne gürültü | Tane dokusu: 512 piksellik Voronoi taneler, her tanenin kendi tonu ve gölgesi; seyrek koyu ve beyaz mineral taneleri, nadir ışıltı. Katman içinde, alttaki katmanın şeklini izleyen çok hafif ince tabakalar |
| Üst yüzey | Plastik gibi düz renk, kenarda kesik | Aynı tane malzemesi; yandan bakınca dokusunu kaybetmesin diye süzülmüş (anizotropik) doku. Tepeler biraz aydınlık, çukurlar gölgeli. İnce kum tabana serpinti gibi biter |
| Cam | Yarı saydam yüzey, kenarda yuvarlak beyaz parlamalar | İki geçişli çizim: sahne önce dokuya çizilir, cam onu kenarlara doğru hafifçe kırar; kalın kenarda yeşilimsi gri soğurma, yansıma sadece kenarlarda (fresnel), siluetin içinde ince parlak hat. Nokta parlama yok |
| Akış | Düz renkli şerit | Kenarı tane tane dağılan, içinde hareketten uzamış tane izi olan şerit; çevresinde ışık alan küçük taneler |
| Taneler | Düz noktalar | Işık alan küçük küreler (sıçrayan, yamaçtan kayan, akışın çevresindeki) |

Eski cihazlarda (WebGL1) iki geçiş yerine yarı saydam cam çizilir; oyun aynı.

### Ses

Eski döküş sesi yumuşatılmış pembe gürültüydü; ölçünce enerjinin %59'u 500 Hz altında çıktı. Boğukluk buradan geliyordu.
Yeni kum sesi binlerce minik tane çarpmasından oluşan, önceden hesaplanmış üç "tane bulutu":

| Ses | Ne zaman | Merkez frekans | 500 Hz altı | 1,5-6 kHz | 8 kHz üstü |
|---|---|---|---|---|---|
| Eski pembe gürültü | Döküşte | 587 Hz | %59 | %6 | %0 |
| Kum kuma | Kum yığının üstüne düşerken | 3,1 kHz | %1,5 | %77 | %2,3 |
| Kum cama | Kum boş cam tabana düşerken (her bölümün ilk saniyeleri) | 4,8 kHz | %0,1 | %76 | %7,8 |
| Kayma | Kum yamaçtan kayarken, kümeli | 2,1 kHz | %3,4 | %60 | %1 |

- Ses düştüğü yere göre sağdan ya da soldan gelir, düşme hızına göre biraz parlaklaşır.
- Müzik ve kum hafif bir oda yankısından geçer. Melodi notaları kalimbaya benzer (yumuşak gövde, kısa metalik dil sesi).
- Arkada çok alçak, 7,5 saniyede bir akor değiştiren yumuşak bir ped var. Deniz sesi de boğuk değil, yavaş dalgalanan bir hışırtı.
- Tane bulutları sayfa açılınca karelere bölünerek hesaplanır (karede 8 ms), ilk dokunuşu bekletmez.

### Titreşim haritası (uygulamaya geçerken)

| Katman | Ne zaman | Uygulama (Capacitor Haptics) | Android tarayıcı | iPhone tarayıcı |
|---|---|---|---|---|
| Mikro: kum tanesi | Kum düşerken; düşen kum arttıkça sıklaşır (55-165 ms'de bir) | `selectionChanged` (en hafif tık); basınca `selectionStart`, bırakınca `selectionEnd` | `vibrate(5-7 ms)` | iOS 18 "switch" hilesi, sürüklerken (deneysel) |
| Orta | Akış serisi, renk değişimi, katman bitti, süs yere değdi, üfleme | `impact` LIGHT/MEDIUM | `vibrate(12-40 ms)` | aynı hile, tek tık |
| Makro | Kapak, yıldızlar | `impact` HEAVY ve dizi | `vibrate(60 ms)`, desen | aynı hile |

- Uygulama paketi `uygulamalar/kum-sisesi/` altında Domino Chase'teki `uygulama/` yapısıyla kurulacak; `@capacitor/haptics` eklentisi o pakete girecek.
  Prototip kodu eklentiyi zaten tanıyor (`window.Capacitor.Plugins.Haptics`); pakete girince ek iş gerekmez.
- iPhone'da tarayıcıdan gerçek titreşim yok; asıl his uygulamada gelecek.

### Puan ve zorluk

Fizik ve puan değişmedi; sürüm 3'ün bot tablosu geçerli. Kontrol için yeniden koşuldu: insan 1. bölüm %94, 5. bölüm %86; hiç dokunmayan 1. bölüm %52; kusursuz 9. bölüm %91 (sürüm 3 ile aynı).

### Bilinen eksikler

- Gerçek telefonda ölçülmedi. Hesap tarafı kare başına ~1,6 ms (test tarayıcısında, çizim hariç); iki geçişli çizim ekran kartına ek yük getirir, eski telefonlarda yavaşlarsa piksel oranını düşürmek gerekebilir.
- Kum fiziği hâlâ 2D kesit; ön ve arka arasında yığın şekli aynı (tepeler ortada biraz kabarık çiziliyor).
- Sesi kulakla dinleyemedim; frekans ölçümüne ve tasarıma güvendim. Telefonda dinleyip söylemen gerekiyor.

### Ozer'e sorular (sürüm 4)

1. Katman sınırları artık temiz mi? Kum dokusu (tanelerin iriliği, koyu-beyaz benekler) hoşuna gidiyor mu?
2. Yeni kum sesi rahatlatıyor mu? Kum cama düşerken çıkan tıngırtı ve arkadaki ped hoş mu, fazla mı?
3. Hâlâ "bir şeyler eksik" diyorsan en çok neyi hissediyorsun: akışın kendisi mi, sonuç anı mı, müzik mi?

## Sürüm 5: huniden akış, kum sesi seçimi, renk ayarı

Geri bildirim: "Ses konusunda bence hâlâ sıkıntı var. Kumun döküldüğü küçük şeyden dökülme efekti iyi değil, orayı daha gerçekçi yapalım. Grafiklerde gelişme var ama daha iyisini yapabiliriz."

### Huniden akış ve çarpma

Sürüm 4'te akış örgülü bir ip gibi görünüyordu (sabit kalınlık, yavaş kayan doku) ve kuma saplanmış bir çubuk gibi bitiyordu; çarpmada sıçrama, yamaçta akan tane yoktu.

| Konu | Sürüm 5 |
|---|---|
| Şekil | Yuvarlak kum sütunu: ışık soldan, sol yanı aydınlık, sağı gölgede. Huniden çıkınca biraz daralır, aşağı indikçe açılır |
| Doku | İki kat tane izi, düşüşle aynı hızda aşağı akar (hareketten uzamış); nadir ışıltı. Huniden uzaklaştıkça kenar tane tane dağılır |
| Uçlar | Kalınlık döküş hızına bağlı: basınca ince başlar, bırakınca kuyruk incelerek huniden kopar. Daha kuma değmemiş baş yuvarlak |
| Eğri | Huni hareket edince akış kıvrılır; noktalar arası eğriyle doldurulur, kalınlık hep akışa dik (kırık çizgi yok) |
| Kopan taneler | Akışın çevresinde tek tük taneler, aşağıda çoğalır |
| Çarpma | Vurduğu yerden küçük bir taç gibi her yöne sıçrayan taneler; yamaçtan tepeden dışa yayılarak akan, biraz parlak taneler (kumla aynı renkte olunca görünmüyorlardı) |
| Cam ağzı | Ön cam çiziminde camın iç yüzü de çiziliyordu; akış eğikken ağızda kırılmış görünüyordu. Artık sadece dış yüz |

### Ses

Ozer neyin rahatsız ettiğini söylemedi; o yüzden seçenek koydum ve olası sebepleri birlikte düzelttim:
- **Kum sesi rafta seçilir:** Yumuşak (yeni varsayılan), Parlak (sürüm 4), Çıtır. Değiştirince 1,5 saniyelik bir örnek çalar.

| Kum sesi | Merkez frekans | 500 Hz altı | Tepe / ortalama | Karakter |
|---|---|---|---|---|
| Yumuşak | 2,1 kHz | %4,4 | 6,8 | Sıcak hışırtı, altında seyrek taneler, hafif dalgalanır |
| Parlak | 3,1 kHz | %0,9 | 9,4 | Sürüm 4'teki yoğun tane sesi |
| Çıtır | 3,1 kHz | %0,5 | 17,6 | Seyrek ama belirgin taneler (ASMR gibi) |

- Döngü tekrarı: her ses tek bir 2,2 sn'lik döngüydü; kulak tekrarı yakalayabilir. Artık 3,3-4,4 sn'lik tampon, iki çalardan farklı yer ve hızda çalınıyor; tekrar duyulmuyor.
- Cama düşüş tıngırtısı daha pes ve sessiz (üst sınır 9,5 → 7 kHz), kayma sesi sürekli tam açık kalıyordu, artık kayan kum kadar.
- Melodi daha seyrek (notalar 0,34 → 0,5 sn arayla) ve daha sessiz; ped de biraz kısıldı. Kumdaki yankı azaldı.
- **Müzik rafta ayrıca kapatılabilir** (melodi, ped ve notalar); kum ve ortam sesleri kalır. Böylece rahatsız eden şeyin müzik mi kum mu olduğu ayrılabilir.

### Grafik

- Renk ayarı: orta tonlarda hafif kontrast (S eğrisi), biraz doygunluk, hafif sıcaklık. Cam da aynı ayardan geçer.
- Kum duvarında ışık daha yönlü (sol aydınlık, sağ gölgede), ortam ışığı azaldı: kavanoz daha hacimli.
- Duvar ve masa bir ton koyu ve sıcak; açık renkli kavanoz öne çıkıyor.
- Konfeti plastik boncuk gibiydi; artık dönen, takla atan ve havada süzülen kâğıt parçaları.
- Bitişteki çapraz parlama şeridi inceldi ve hafifledi.

### Puan ve zorluk

Fizik değişmedi. Kontrol: insan 1. bölüm %94, 5. bölüm %86; hiç dokunmayan %52; kusursuz 9. bölüm %91 (sürüm 3-4 ile aynı).

### Bilinen eksikler

- Gerçek telefonda ölçülmedi; hesap tarafı kare başına ~1,7 ms (test tarayıcısında, çizim hariç).
- Sesi kulakla dinleyemedim; seçenekleri frekans ölçümüyle hazırladım.
- Akış ve taneler hareket hâlinde değerlendirilmeli; test görüntüleri tek kare.

### Ozer'e sorular (sürüm 5)

1. Raftaki üç kum sesinden hangisi en rahatlatıcı? Müziği kapatınca rahatsızlık geçiyor mu?
2. Huniden akış ve çarpma artık gerçekçi mi?
3. Grafikte bir sonraki adım için en çok neyi istersin: arka plan ve ışık, cam, kum dokusu, final gösterisi?

## Sürüm 6: tıksız kum sesi, kum kayıyor

Geri bildirim: "Kum sesi hâlâ cızırtılı geliyor. Grafik ve akış konusu çok daha iyi, ama sence daha da gerçekçi hâle getirebilir miyiz?"

### Cızırtının nedeni ve yeni ses

Sürüm 4 ve 5'teki bütün kum sesleri aynı yöntemle yapılmıştı: her tane gürültüyle tetiklenen kısa bir "tık". Frekansı ne olursa olsun binlerce tık bir arada cızırtı gibi duyuluyor.
Ayrıca ikinci çaların döngü dikişinde birkaç saniyede bir çıt sesi vardı.

Yeni sesler tıksız:
- Taneler yumuşak zarflı kısa sinüsler (başı ve sonu sıfırdan başlar, tık yapmaz). Altında 4. dereceden süzülmüş, dar bantlı bir hışırtı.
- 4 kHz üstü yok denecek kadar az; ikinci çalar artık tamponun tamamını biraz farklı hızda çalıyor (dikiş yok).
- Deniz ve rüzgâr ortam sesleri de daha sıcak (geniş bantlı hışırtı yerine alçak geçiren süzgeç).

| Ses | Merkez frekans | 4 kHz üstü | Karakter |
|---|---|---|---|
| Sürüm 5 Yumuşak | 2,1 kHz | %9 | gürültü + tık |
| Sürüm 5 Parlak | 3,1 kHz | %24 | yoğun tık |
| **Tıpırtı** (yeni varsayılan) | 1,2 kHz | ~%0 | yumuşak sinüs taneleri + hışırtı, yağmur çubuğu gibi |
| Kadife | 1,2 kHz | ~%0 | sadece yumuşak hışırtı, hafif dalgalanır |
| İnce | 1,6 kHz | ~%0 | çok ince, sık taneler |
| Cam | 2,8 kHz | düşük | boş cama düşen kum: seyrek, yumuşak başlayıp sönen çınlamalar |
| Kayma | 0,9 kHz | ~%0 | pes, dalgalanan hışırtı |

Rafta "Kum sesi" düğmesiyle üçü arasında geçilir (örnek çalar); "Müzik" ayrı kapatılır.

### Daha gerçekçi kum: tutun-kay

Gerçek bir kum yığınında yamaç yavaş yavaş dikleşir, kritik açıyı geçince ince bir tabaka çığ gibi kayar, yamaç biraz yatar ve yeniden dikleşir.
Önceki fizikte kum her an anında 34°'de yerine oturuyordu, kayma hiç yoktu.

- Düşen pay 34-39° arası bir eğimde durabilir. Bir yerde eğim 38°'yi geçince oradan bir kayma başlar.
- Kayan bölge canlı izlenir: içinde eğim ~31,5°'ye iner, kum aktıkça alt uç aşağı uzar, üstteki yamaç da kritik açıya yakınsa kayma yukarı genişler (basamak kalmaz).
- Bir kayma ~0,5 sn sürer; sürekli dökerken saniyede birkaç küçük kayma olur. Kayan tabaka renkli katmanlarıyla birlikte kayar (gerçek kum sanatındaki ince eğik tabakalar böyle oluşur).
- Kayma anında yamaçtan parlak taneler akar, kayma sesi kabarır, hafif bir titreşim tıkı gelir.
- Kütle korunuyor; adım başına ~0,04 ms.

### Süs alanı düzeltmesi

Süsler (tekne, kuğu, ağaç, kaktüs, güneş, ay, yıldız) camda yer kaplıyor ama dökülecek kum miktarından düşülmüyordu; kavanoz hedef çizgisinin üstüne taşıyordu.
9. bölümde (iki büyük süs) bu ~8 hücre taşma demekti ve kusursuz bot bile bazen 3 yıldızı kaçırıyordu. Artık süs alanı sonraki kumdan düşülüyor.
Bu düzeltme 7. bölümü düşünmeden süpürene 2 yıldız verecek kadar kolaylaştırdı; kumullar biraz yükseltildi ve içeri alındı.

### Bot tablosu (sürüm 6; bölüm başına 3 koşu, ortalama yüzde ve yıldız)

| Profil | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Hiç dokunmayan | 46 ★0 | 51 ★0 | 45 ★0 | 43 ★0 | 66 ★0 | 51 ★0 | 51 ★0 | 62 ★0 | 37 ★0 | 50 ★0 |
| Süpürücü | 89 ★3 | 77 ★1 | 71 ★0 | 62 ★0 | 71 ★0 | 58 ★0 | 72 ★0 | 85 ★2 | 67 ★0 | 68 ★0 |
| Dağınık | 77 ★1,3 | 76 ★1,3 | 77 ★1 | 67 ★0,3 | 72 ★0,3 | 75 ★1 | 76 ★1,3 | 80 ★1,7 | 70 ★0,3 | 71 ★0,7 |
| İnsan | 95 ★3 | 84 ★2 | 85 ★2,3 | 91 ★3 | 85 ★2,3 | 81 ★1,7 | 79 ★1,3 | 89 ★3 | 80 ★1,7 | 81 ★1,7 |
| Kusursuz | 98 ★3 | 97 ★3 | 98 ★3 | 98 ★3 | 96 ★3 | 90 ★3 | 94 ★3 | 94 ★3 | 95 ★3 | 94 ★3 |

### Sıradaki büyük adım önerisi: gerçek 3D kum (ertelendi)

Kalan en büyük gerçekçilik açığı: kum fiziği hâlâ camın ön kesitinde 2D hesaplanıyor; yığın önden arkaya aynı şekilde uzanıyor (koni değil, sırt gibi).
Gerçek 3D kumda (genişlik × derinlik ızgarası) yığın koni olur, kum her yöne yayılır, ön camda görünen katmanlar camın kendisindeki kesittir.

Ama oyunu değiştirir:
- Ortaya dökülen kum ön cama 0,6 birim (kavanoz boyunun %28'i) daha alçak ulaşır. Gerçek kum sanatçıları bu yüzden camın dibine döker; huni ön cam boyunca, camın kıvrımını izleyerek gezmeli.
- Kum arkaya da yayıldığı için katmanlar daha yavaş yükselir; dökülecek miktar, bölümler ve botlar baştan ayarlanmalı.
- Hesap yükü artar (128 × 64 sütun), telefonda ölçmek gerekir.

**Karar (Ozer):** "Şu anki 3D güzel kalsın, sonra düzeltiriz." TestFlight mevcut 2D kesit fiziğiyle çıkar; gerçek 3D kum, TestFlight geri bildiriminden sonra yeniden ele alınır.

## Sürüm 7: son kontroller ve TestFlight hazırlığı

İstek: "Son kontrolleri yapar mısın, hem mantık hem kod hem ses, bütün her şeyi; TestFlight'a alayım."

### Uygulama paketi

`uygulamalar/kum-sisesi/` (Capacitor 8, Domino Chase ile aynı yapı). Kurulum ve TestFlight adımları: `uygulamalar/kum-sisesi/TESTFLIGHT.md`.
- Paket kimliği `com.investateknoloji.kumsisesi`, ad "Kum Şişesi", sadece iPhone, dikey, Türkçe.
- three.js pakete gömülü, dış bağlantı yok (derleme dış adres kalırsa durur).
- Ses oturumu "ambient": kullanıcının müziği kesilmez; telefon sessizdeyse oyun sesi çıkmaz.
- Kayıt hem tarayıcı deposuna hem uygulama tercihlerine (Preferences) yazılır; açılışta ikisinden her bölüm için en iyisi alınır.
- Arka plana geçince (App eklentisi) döküş durur, ses askıya alınır.
- Bulut derleme: kökteki `codemagic.yaml` (iOS → TestFlight, Android test APK).

### Bağımsız kod incelemesinde bulunan ve düzeltilenler

| Bulgu | Etkisi | Düzeltme |
|---|---|---|
| Çoklu dokunma | İkinci parmak huniyi zıplatıyor, parmaklardan biri kalkınca döküş duruyor | Sadece ilk parmak izlenir |
| Ekrandaki yüzde yuvarlanıyor, yıldız ham değerden | "%72" yazarken 0 yıldız, sonraki bölüm kilitli | Yıldızlar ekrandaki yuvarlanmış yüzdeden |
| Ses üretim parçaları uzun | Açılışta 50-125 ms takılmalar | Parçalar en fazla ~5-7 ms; dökerken karede 4 ms, beklerken 10 ms |
| Sistem hareketi dokunmayı iptal edince | Tutulan süs yanlış yere düşüyor | İptal sadece akışı durdurur, süs düşmez |
| Kayıt birleştirme ve kum sesi açılış sırası | Eski kopya yeni ilerlemeyi ezebilir; seçili kum sesi çalmayabilir | Her bölüm için en iyi sonuç; kum sesi kayıt okunduktan sonra üretilir |
| Hızlı "Tekrar" | Yıldız sesleri yeni bölümde çalıyor | Zamanlayıcılar iptal edilir |
| Kum cam ağzını aşabiliyordu | Kapak kumun içine giriyor | Tavan: kum ağızdan 1 hücre aşağıda durur; kapak en yüksek noktanın üstüne oturur |
| Bırakınca düşmeye devam eden kumun titreşimi kayboluyordu | Kuyruk tıkları hissedilmiyor | Seçim titreşimi gerektiğinde başlar, 0,6 sn boşta kalınca biter |
| Üretilen ses tekrar sıraya girebiliyordu | Gereksiz işlem | Sıra kontrolü |
| Bölüm başına bellek sızıntısı (kapak geometrileri, süs malzemeleri) | Uzun oturumda bellek artışı | Bölüm değişince temizlenir |
| Ekran belleği (iki çoklu örneklemeli tampon, piksel oranı 2,5) | Eski iPhone'larda bellek riski | Kenar yumuşatma sadece ara dokuda, piksel oranı en fazla 2 |

### Uçtan uca test (`testler/sandful-e2e.js`): 29/29

İlk açılış; 10 bölüm baştan sona (süreler 21-35 sn); kayıt ve küçük resimler; ikinci turda bellek büyümüyor; yeniden açılışta raf;
döküşte, süs tutarken ve finalde raf aç/kapat; süs tutarken yeniden başlat; sonuç ekranında dokunma; dokunma iptali; üfleme sınırı; arka plana geçiş;
3D açılamazsa oyun yine oynanır; uygulama içi (sahte Capacitor) titreşim, kayıt ve duraklatma;
dil (İngilizce ve Almanca telefonda İngilizce, Türkçe harf kalmıyor; Türkçe telefonda Türkçe; raftan değişir, kalır). Aynı takım uygulama derlemesi (`www/index.html`) üzerinde de geçti.

### Bot tablosu (sürüm 7; tavan ve yuvarlama sonrası)

| Profil | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Hiç dokunmayan | 44 ★0 | 49 ★0 | 44 ★0 | 42 ★0 | 65 ★0 | 49 ★0 | 39 ★0 | 61 ★0 | 35 ★0 | 48 ★0 |
| Süpürücü | 89 ★3 | 77 ★1 | 71 ★0 | 62 ★0 | 71 ★0 | 58 ★0 | 72 ★1 | 85 ★2 | 68 ★0 | 68 ★0 |
| İnsan | 95 ★3 | 84 ★2 | 85 ★2,3 | 91 ★3 | 85 ★2,3 | 81 ★1,7 | 79 ★1,7 | 90 ★3 | 80 ★1,3 | 81 ★1,7 |
| Kusursuz | 98 ★3 | 97 ★3 | 98 ★3 | 98 ★3 | 96 ★3 | 90 ★3 | 94 ★3 | 94 ★3 | 95 ★3 | 94 ★3 |

### TestFlight yüklemeleri

| Sürüm (derleme) | Tarih | Not |
|---|---|---|
| 1.0 (1) | 13 Ekim 2026 | İlk yükleme, Ozer Mac'te Xcode ile (Distribute App). Ozer iPhone'da denedi: "Her şey güzel şu anda." Aynı gün App Store incelemesine gönderildi (elle yayın). 29 Ekim 2026'da onaylandı (yaklaşık 16 gün "Waiting for Review"; Ekim 2026'da Apple'da genel yığılma vardı) |

App Store hazırlığı: mağaza metinleri (`uygulamalar/sandful/magaza/app-store-metinleri.md`), iki dilde 6'şar ekran görüntüsü (1206×2622, başlıklı; App Store Connect 1290×2796'yı kabul etmedi),
gizlilik ve destek sayfaları (`magaza/site/`). Para kazanma önerisi ayrı dosyada: `fikirler/03-sandful-gelir.md` (Ozer'in onayına).

### Bilinen eksikler

- Gerçek iPhone'da denenmedi; ilk TestFlight derlemesi performans ve ses için ilk gerçek ölçüm olacak.
- iOS kenar hareketleri (ana ekran çubuğu) oyunda ertelenmiyor; süs düşmüyor ama döküş durur.

## Uygulama adı: Sandful

Ozer TestFlight'tan önce "uygulamaya güzel bir isim bulalım" dedi; seçeneklerden **Sandful**'u seçti.

- Anlamı: sand + mindful (bilinçli, sakin) ve handful (avuç dolusu). Kısa, akılda kalıcı, oyunun "rahatlatan" vaadini taşıyor.
- App Store başlığı: ~~"Sandful: Kum Sanatı"~~ → "Sandful: Relaxing Sand Art" (aşağıda: oyun global); telefonda ikonun altında "Sandful".
- Paket kimliği: `com.investateknoloji.sandful`. Uygulama klasörü `uygulamalar/sandful/`. Prototip dosyası `prototipler/01-kum-sisesi.html` olarak kaldı.
- Araştırma: "Sand Bottles", "Sand Pour", "Sand Sort" gibi düz adlar App Store'da kalabalık; Steam'de benzer konulu "Sandkeeper" (2026 sonu) var.
  Sandful, Jarscape ve Grain & Glass adıyla uygulama bulunamadı. Diğer adaylar: Jarscape (kavanozda manzara), Grain & Glass.
- ~~Oyun şimdilik sadece Türkçe.~~ Yerine aşağıdaki karar geçti.

### Oyun global (İngilizce + Türkçe)

Ozer: "sadece Türkiye için olmasın, oyun Domino gibi global olsun. İsim vs de ona göre olsun. Sandful: Kum Sanatı yaparsak sadece TR olur."

- **Mağaza:** birincil dil İngilizce (ABD), başlık **"Sandful: Relaxing Sand Art"** (alınmışsa "Sandful: Calm Sand Art").
  Türkçe yerelleştirmede ad aynı kalır (marka); alt başlık EN "Pour sand, build calm scenes", TR "Kum dök, sakin manzaralar kur".
- **Oyun içi dil:** telefon Türkçeyse Türkçe, değilse İngilizce. Raftaki "Dil / Language" düğmesiyle değişir, seçim kaydedilir.
  Bölüm adları (Beach, Hill, Cove, Boat, Mountains, Valley, Desert, Sunset, Lake, Night), ipuçları, sonuç mesajları, raf ve ayarlar çevrildi.
  Yüzde gösterimi dile göre: TR "%92", EN "92%".
- **iOS:** `CFBundleDevelopmentRegion` en, `CFBundleLocalizations` [en, tr]. Telefonda ikonun altında her dilde "Sandful".
- Mağaza metinleri iki dilde: `uygulamalar/sandful/magaza/testflight-metinleri.md`.

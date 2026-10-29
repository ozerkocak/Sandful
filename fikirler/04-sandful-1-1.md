# 04 · Sandful 1.1: daha güzel ses, yeni bölümler, saran yenilikler (öneri, Ozer'in onayına)

> Ozer (1.0 onaylandıktan sonra): "Hemen sonraki güncellemeyi düşünelim, oyunu daha güzel hale getirelim. Ses hâlâ kötü.
> Daha fazla bölüm ekleyebiliriz. Oynayınca insanı saran daha değişik şeyler ekleyebiliriz ilerleyen bölümlerde."

## 1. Ses: sentez yerine gerçek kayıt

Kum sesini üç kez sentezle yeniden yaptık (boğuk → cızırtılı → tıksız) ve hâlâ beğenilmiyor. Sentezle gerçek kum sesine yaklaşmak zor.
Öneri: **gerçek kum kaydı**. Bu, `TASARIM-ILKELERI.md`'deki "ses sentezlenir, dosya yok" kuralını değiştirir; birkaç saniyelik kayıt uygulamaya ~100-300 KB ekler.

- **Kaynak (önerilen):** Ozer telefonla kaydeder. Sessiz oda, iPhone Ses Kayıtları "Kayıpsız" ayarında, mikrofon 10-15 cm uzakta.
  Cam kavanoza kum (yoksa şeker, tuz, pirinç) dök: ince akış, kalın akış, cam dibine düşüş, yığının üstüne düşüş; her biri 10-20 sn, 2-3 deneme.
  Kesme, döngü yapma, gürültü temizleme ve ses seviyesi bende. Telif sorunu olmaz, ses bize ait olur.
- **Yedek:** CC0 (serbest) lisanslı hazır kayıtlar ya da satın alınmış bir ses paketi. Lisansı kontrol edilmeli.
- Oyunda: kayıt parçaları döküşe göre karışır (akış hızı → kalın/ince kayıt, düşme yeri → cam/kum), sağ-sol konumu ve yankı korunur.
- **Müzik:** Sentez kalimba yerine gerçek enstrüman örnekleri (birkaç notalık kalimba, piyano, çelesta kaydı). Melodi yine oyuncunun akışına bağlı kalır.

## 2. Yeni bölümler: iki yeni dünya (10 → 30 bölüm)

| Dünya | Bölümler | Sahneler |
|---|---|---|
| 1 · Kıyı ve kara (var) | 1-10 | Kumsal, tepe, koy, tekne, dağlar, vadi, çöl, gün batımı, göl, gece |
| 2 · Okyanus | 11-20 | Mercan, deniz feneri, balina, ada, denizde gün doğumu, fırtına, deniz kabuğu, yelken yarışı, buzdağı, ışıldayan gece denizi |
| 3 · Dört mevsim | 21-30 | Kiraz çiçeği, lale tarlası, yaz tarlası, bağ, sonbahar ormanı, yağmur, ilk kar, karlı köy, kuzey ışıkları, kar tanesi |

Her dünyanın kendi cam şekilleri, masa ışığı ve ortam sesi (dalga, rüzgâr, yağmur) olur. İlk bölümler kolay, zorluk dünyanın sonuna doğru açılır.

## 3. Saran yenilikler (her biri ayrı bölümde tanıtılır)

| Yenilik | Ne | Neden sarar | Açıldığı yer |
|---|---|---|---|
| **Canlanan final** | Kapak kapanınca manzara birkaç saniye canlanır: dalga parlar, yıldız kırpar, güneş batar, tekne sallanır | Her bölüm sonu küçük bir sürpriz; emeğin karşılığı (haz üçlüsü: büyük final) | Bütün bölümler |
| **Çubukla çizme** | Kum sanatçılarının gerçek tekniği: ince çubuğu camın önünden aşağı sürükle, üst kum alttakine batar; ağaç, dalga, ışın, sivri dağ çıkar | Kararın kendisi resmi belirler; gerçek ve yeni bir his | 11 |
| **Geçişli kum** | Huni rengi döküş sırasında yavaşça başka renge geçer (gökyüzü gradyanı); geçişin nereye düşeceğini oyuncunun zamanlaması belirler | Kısa, akan karar; çok güzel görünen sonuç | 14 |
| **Sallanan kavanoz** | Fırtına bölümlerinde kavanoz hafifçe sağa sola yatar; yüzey eğime göre akar, katmanlar eğik oluşur, oyuncu zamanlamayı kollar | Dinamik akış, girdi hiç durmaz | 16 |
| **Işıldayan kum** | Bazı kumlar karanlıkta parlar; finalde ışık söner, desen parlar (gece denizi, kuzey ışıkları) | Görsel ödül, dünya finali | 20, 29 |
| **Geri al** | Son dökülen rengi bir kez geri alma | Hata cezalandırmaz, rahatlatır (ileride ödüllü reklamla ek hak) | Her bölüm |
| **Atölye (serbest mod)** | 10. bölümden sonra açılır: istediğin renklerle, hedef olmadan dök, rafına koy | Bitmeyen sakin mod; paylaşılabilir eser | 10 sonrası |

Reddedilmiş yönlere girmiyor: süre baskısı, durduran sınır, uzun düşündüren bulmaca yok.

## Kapsam önerisi

- **1.1:** Gerçek kum sesi + müzik örnekleri, canlanan final, geri al, Okyanus dünyası (11-20) ile çubukla çizme, geçişli kum, sallanan kavanoz, ışıldayan kum.
- **1.2:** Dört mevsim dünyası (21-30), atölye, para kazanma (`03-sandful-gelir.md`).
- Her adımda bot simülasyonu (zorluk), uçtan uca test ve telefonda TestFlight denemesi.

## Ozer'e sorular

1. Ses: Kötü olan kum sesi mi, müzik mi, ikisi de mi? Telefonla kum dökme kaydı yapabilir misin?
2. Yenilikler: Listeden çıkarmak ya da öne almak istediğin var mı?
3. Kapsam: 1.1 / 1.2 bölmesi uygun mu? Para kazanma 1.2'de mi kalsın?

## Ozer'in kararı

"Ses ikisi de (kum sesi ve müzik). Söylediğin görselleri deneyelim. 1.1 / 1.2 bölmesi uygun, 1.1 ile başlayalım."
Kum sesi için Ozer'den telefonla kum dökme kaydı istendi (kesme, döngü, temizlik bende). Müzik için CC0 lisanslı VSCO-2 Community Edition marimba ve glockenspiel kayıtları.

## Geliştirme durumu

**1. parça (yapıldı):** Canlanan final (su kumu parıldar, gece kumunda yıldız kırpışır, tekne/kuğu/yelkenli sallanır, güneş döner, ay ve fener nabız gibi parlar).
Işıldayan kum (finalde sahne kararır, ışıldayan taneler parlar). Geri al (bölüm başına 1; son başlamış rengi baştan döktürür, havadaki kum ve kaymalar da geri gelir).
WebGL1 yedeğinde renk kodlaması yorum satırında kalmıştı, düzeltildi.

**2-3. parça (yapıldı):**
- Çubukla çizme: sağa sola sürükle, aşağı çek (iz kilitlenir), bırak. Üstteki renk alttakine V gibi batar. Hedef izler kesik V çizgileri, tutunca altın rengi.
  İtilen kum puanda tarafsız (64+renk kodu); izler üçüncü yıldızı belirler (süsler gibi).
- Geçişli kum: katman `{gecis:'renk'}`. Döküldükçe renk 6 adımda geçer; ara adımlar iki rengin tanelerinin karışımı (gölgelendiricide tane başına seçim).
- Sallanan kavanoz: yerçekimi kavanoza göre eğilir (etkin yükseklik `topY − tan(açı)·x`); kum yere paralel yatar, kavanoz düzelince katmanlar eğik kalır.
  Kamera kavanozla döner, akış ekranda dik düşer. Süs tutulup düşerken kavanoz durulur.
- Okyanus dünyası (11-20): Mercan, Deniz feneri, Balina, Ada, Gün doğumu, Fırtına, Deniz kabuğu, Yelken yarışı, Buzdağı, Işıldayan deniz.
  Yeni süsler: deniz feneri, balina, martı, palmiye, deniz kabuğu, deniz yıldızı, yelkenli. Yeni cam şekilleri: lale, silindir. Fırtına ortam sesi.
- Raf dünyalara ayrıldı (başlık ve dünya yıldız sayısı). Süsün kapladığı alan o yükseklikteki hedef katmanın rengini alır (palmiyenin arkasında kutu görünmüyordu).

### Bot tablosu (Okyanus; bölüm başına 3 koşu, ortalama yüzde ve yıldız)

| Bölüm | Kusursuz | İnsan | Dağınık | Süpürücü | Dokunmayan |
|---|---|---|---|---|---|
| 11 Mercan | 97 ★3 | 89 ★3 | 69 ★1,3 | 88 ★2 | 45 ★0 |
| 12 Deniz feneri | 96 ★3 | 88 ★2,3 | 76 ★1 | 67 ★0 | 29 ★0 |
| 13 Balina | 96 ★3 | 86 ★2,7 | 79 ★1,7 | 61 ★0 | 49 ★0 |
| 14 Ada | 96 ★3 | 82 ★2 | 78 ★1,3 | 72 ★1 | 58 ★0 |
| 15 Gün doğumu | 99 ★3 | 87 ★2,7 | 84 ★2,3 | 84 ★2 | 70 ★0 |
| 16 Fırtına | 93 ★3 | 83 ★2,3 | 77 ★1,3 | 75 ★1 | 57 ★0 |
| 17 Deniz kabuğu | 98 ★3 | 88 ★3 | 81 ★1,7 | 71 ★0,3 | 53 ★0 |
| 18 Yelken yarışı | 96 ★3 | 83 ★2,3 | 71 ★0,7 | 76 ★1 | 54 ★0 |
| 19 Buzdağı | 97 ★3 | 79 ★1,7 | 70 ★0,3 | 69 ★0 | 64 ★0 |
| 20 Işıldayan deniz | 98 ★3 | 84 ★2,3 | 81 ★1,7 | 91 ★2 | 38 ★0 |

Düzeltilenler: Buzdağı tepesi kumun durabileceğinden dikti (eğim ≤ 0,5); Ada ortadaydı, hiç oynamayan bot 1 yıldız alıyordu (sola alındı);
Yelken yarışında süs düşerken kavanoz sallandığı için kayıyordu.

**4. parça (müzik yapıldı, kum sesi bekliyor):**
- Müzik gerçek enstrüman kayıtlarıyla: melodi, akor ve bas marimba; parıltılar (renk değişimi, süs, yıldız, kapak) glockenspiel.
  Kaynak: VSCO-2 Community Edition (Versilian Studios), CC0 (kamu malı). Marimba 8 nota (MIDI 48-89), glockenspiel 3 nota (91-103);
  mono 32 kHz, 48 kbps MP3, dosyaya gömülü (~165 KB). En yakın kaydın hızı değiştirilerek çalınır. Not: dosya adları bir oktav aşağıyı gösteriyordu, perdeler ölçülerek eşlendi.
  Kayıtlar çözülene kadar eski sentez çalar. Ses seviyesi eski sentezle eşitlendi (tepe/RMS ölçümü).
- Kum sesi: Ozer "sesi sen yapamaz mısın?" dedi; kayıt yerine yeni bir sentez modeli: **Doğal** (varsayılan).
  Önceki üç deneme: düz gürültü (boğuk), perdeli tane "bip"leri (cızırtılı/tıpırtılı). Gerçek kum dökülürken sesi binlerce tanenin
  kuma çarpmasıdır: perdesiz, çok kısa sürtünme patlamaları. Model: ince taneler 4200/sn (0,4-1,5 ms), iri taneler 320/sn (1-2,5 ms),
  genlik lognormal (σ 0,3; sivri çıtırtı yok), yavaş akış dalgalanması; 300 Hz yüksek geçiren (2 kat), 4,6/5,2 kHz alçak geçiren, 1,9 kHz +2 dB.
  Ölçüm: merkez 2,4 kHz, 500 Hz altı %2,7, 6 kHz üstü %1,7, tepe/RMS ~10 (eski çıtırtılı modelde 30+). Cam (boş cama düşüş) ve kayma da aynı tane modeliyle.
  Rafta seçenekler: Doğal, Tıpırtı, Kadife (İnce kaldırıldı). Tercih yeni anahtarla (kum7) sıfırlandı, herkes Doğal'dan başlar.
  Gerçek kum kaydı gelirse aynı yere konabilir.

### Kum sesi: "zıtırtı" ve pürüzsüz adaylar

Ozer "Doğal" sesi dinledi: "Çok zıtırtı gibi geliyor." Ölçünce sebebi çıktı: **basıklık** (kurtosis) 6,2. Pürüzsüz bir hışırtıda bu sayı ~3'tür;
büyüdükçe seste sivri tıkırtılar duyulur (zıtırtı, cızırtı). Kısa ve sert başlayan taneler bunu yapıyordu. Önceki "cızırtılı" geri bildirimleri de büyük ihtimalle aynı sebepten.
Yeni adaylar (hepsi basıklık 3,0-3,7), rafta Kum sesi düğmesiyle seçilir:

| Ses | Karakter | Merkez | Basıklık |
|---|---|---|---|
| Kumsal (varsayılan) | Sıcak, yumuşak hışırtı (450-3200 Hz, 1,6 kHz +3 dB) | 1,8 kHz | 3,0 |
| İpek | İnce kum gibi parlak ama pürüzsüz "sss" (900-5000 Hz) | 3,0 kHz | 3,0 |
| Yağmur çubuğu | Yumuşak (Hann zarflı) tanelerle hafif dokulu akış | 3,2 kHz | 3,7 |

Kayma sesi pürüzsüz hışırtıya döndü (3,5), boş cama düşüş daha sık ve uzun çınlamalarla yumuşadı (10,1 → 4,5). Kum sesi biraz kısıldı, müzik önde.
Ders (TASARIM-ILKELERI'ne): sürekli seslerde basıklığı ölç, ~3-4 tut; 5'in üstü kulağa zıtırtı gelir.

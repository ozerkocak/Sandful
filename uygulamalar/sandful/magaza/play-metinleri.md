# Google Play mağaza sayfası (sürüm 1.2)

App Store'da yayında olan 1.2'nin karşılığı. Metinlerin kaynağı `app-store-metinleri.md`; burada sadece Play'in alanlarına göre düzenlendi.
Görseller `play/` klasöründe. Adımlar `../ANDROID.md`.

## Ana mağaza girişi (Büyüme → Mağaza varlığı → Ana mağaza girişi)

Varsayılan dil **İngilizce (ABD) – en-US**; **Türkçe – tr-TR** çeviri olarak eklenir.

| Alan (sınır) | İngilizce (en-US) | Türkçe (tr-TR) |
|---|---|---|
| Uygulama adı (30) | `Sandful: Relaxing Sand Art` | `Sandful: Relaxing Sand Art` |
| Kısa açıklama (80) | `Pour colored sand into a jar and watch calm scenes appear. No timers, no rush.` (78) | `Renkli kumu kavanoza dök, sakin manzaralar ortaya çıksın. Süre yok, acele yok.` (78) |
| Tam açıklama (4000) | aşağıda (1511) | aşağıda (1394) |

**Tam açıklama · İngilizce**

```
Sandful is a calm, hands-on sand art game.

Hold your finger on the screen and colored sand flows from a little funnel. Move the funnel left and right, follow the faint lines on the glass, and a scene slowly appears inside the jar: a beach, a lighthouse, a desert oasis, a tulip garden, a city skyline at night, a snowy mountain peak.

The sand behaves like the real thing. It piles up where you wait, spreads thin when you sweep, and slides down the slope when it gets too steep. Every grain whispers as it lands, and your phone ticks softly in your hand.

• 130 scenes in eight worlds: Coast & Land, Ocean, Four Seasons, Desert and Oasis, Garden and Flowers, Dessert Jars, City Skylines and Mountains
• Realistic sand that piles, spreads and slides
• New ways to pour: wind that carries the sand, thin and wide spouts, wet sand that stands steep, a card that splits the jar in two
• Draw waves, rain and marble swirls with a stick, the way sand artists do
• Sand that fades from one color to another, and sand that glows in the dark
• Things to place: lighthouses, whales, cherry trees, camels, and city buildings with glowing windows
• Every finished jar comes alive for a moment before it joins your shelf
• A real recorded sand sound, soft marimba music and gentle haptics
• No timers, no pressure: play at your own pace
• Plays offline, no account needed
• English and Turkish

Free to play with occasional ads between levels, never while you pour. A one-time purchase removes them.

Pour, breathe, relax.
```

**Tam açıklama · Türkçe**

```
Sandful sakin, elle oynanan bir kum sanatı oyunu.

Parmağını ekranda tut, küçük bir huniden renkli kum aksın. Huniyi sağa sola gezdir, camdaki silik çizgileri izle; kavanozun içinde yavaş yavaş bir manzara belirsin: kumsal, deniz feneri, çölde bir vaha, lale bahçesi, gece ışıldayan bir şehir, karlı bir dağ zirvesi.

Kum gerçek kum gibi davranır. Beklediğin yerde yığılır, hızlı gezdirince ince serilir, yamaç dikleşince aşağı kayar. Her tane düşerken hışırdar, telefonun avucunda hafifçe tıklar.

• Sekiz dünyada 130 sahne: Kıyı ve Kara, Okyanus, Dört Mevsim, Çöl ve Vaha, Bahçe ve Çiçekler, Tatlı Kavanozları, Şehir Silüetleri, Dağlar
• Yığılan, serilen ve kayan gerçekçi kum
• Yeni döküş yolları: kumu savuran rüzgâr, ince ve geniş uç, dik duran ıslak kum, kavanozu ikiye bölen kart
• Kum sanatçıları gibi çubukla dalga, yağmur ve mermer deseni çiz
• Döktükçe bir renkten ötekine geçen kum, karanlıkta ışıldayan kum
• Yerine bırakılan süsler: deniz fenerleri, balinalar, kiraz ağaçları, develer, pencereleri ışıklı şehir binaları
• Biten her şişe rafına girmeden önce bir an canlanır
• Gerçek kum kaydı, yumuşak marimba müziği ve hafif titreşim
• Süre yok, baskı yok: kendi temponda oyna
• İnternetsiz çalışır, hesap gerekmez
• Türkçe ve İngilizce

Ücretsiz oynanır; bölümler arasında seyrek reklam çıkar, dökerken asla. Tek seferlik satın almayla reklamlar kalkar.

Dök, nefes al, rahatla.
```

## Görseller

| Alan | Dosya |
|---|---|
| Uygulama simgesi (512×512 PNG) | `play/simge-512.png` |
| Öne çıkan görsel (1024×500) | `play/one-cikan-1024x500.png` (iki dilde aynı) |
| Telefon ekran görüntüleri (en az 2, en çok 8) | `play/ekran-goruntuleri/en/01–08.jpg` ve `tr/01–08.jpg` (1080×1920; App Store'daki sekiz karenin aynısı, aynı sırayla) |
| 7 ve 10 inç tablet görüntüleri | Boş bırakılabilir (oyun telefon için; tablette de çalışır) |
| Video | Boş |

Üretim: `HEDEF=play node scripts/ekran-kare.js` (kareler) ve `node scripts/play-gorsel.js` (simge, öne çıkan görsel).
Play, ekran görüntüsünde en fazla 2:1 oran kabul eder; App Store kareleri (1206×2622) bu yüzden doğrudan yüklenemez.

## Mağaza ayarları (Büyüme → Mağaza varlığı → Mağaza ayarları)

| Alan | Değer |
|---|---|
| Uygulama mı oyun mu | Oyun |
| Kategori | Basit (Casual) |
| Etiketler | Play'in önerdiklerinden oyuna uyanlar (Basit, Rahatlatıcı, Tek oyunculu, Çevrimdışı) |
| E-posta | `develop@investa.com.tr` |
| Web sitesi | `https://www.investa.com.tr/sandful/` |
| Telefon | Boş bırakılabilir |

## Uygulama içi ürün (Para kazanma → Ürünler → Uygulama içi ürünler)

| Alan | Değer |
|---|---|
| Ürün kimliği | `com.investateknoloji.sandful.reklamsiz` (App Store ile aynı; sonradan değiştirilemez) |
| Ad (EN) | `Play Without Ads` |
| Açıklama (EN) | `Removes all ads between levels. One-time purchase.` |
| Ad (TR) | `Reklamsız Oyna` |
| Açıklama (TR) | `Bölümler arasındaki reklamları kaldırır. Tek seferlik satın alma.` |
| Fiyat | 3,99 ABD doları; Türkiye ₺199,99 (App Store ile aynı). Diğer ülkeler Play'in önerdiği karşılıklar |

## Uygulama içeriği beyanları (Politika → Uygulama içeriği)

App Store'daki beyanların karşılığı. Ekranlar sırayla gelince birlikte doldurulur; aşağısı hedef cevaplar.

| Beyan | Cevap |
|---|---|
| Gizlilik politikası | `https://www.investa.com.tr/sandful/privacy.html` |
| Uygulama erişimi | Bütün işlevler özel erişim olmadan kullanılabilir (giriş yok) |
| Reklamlar | Evet, uygulamam reklam içeriyor |
| İçerik derecelendirmesi | E-posta `develop@investa.com.tr`, kategori Oyun. Şiddet, korku, cinsellik, kumar, küfür, uyuşturucu, kullanıcılar arası iletişim, konum paylaşımı: Hayır. Dijital ürün satın alma: **Evet** (Reklamsız) |
| Hedef kitle | 13–15, 16–17 ve 18+ (13 yaş altı seçilmez; seçilirse Aileler politikası ve çocuklara uygun reklam ayarı gerekir) |
| Veri güvenliği | Aşağıdaki tablo |
| Reklam kimliği | Evet, uygulama reklam kimliği kullanıyor; amaç: Reklamcılık veya pazarlama, Analiz |
| Devlet uygulaması, finans özellikleri, sağlık | Hayır / yok |

### Veri güvenliği (25 Kasım 2026'da girildi; App Store gizlilik tablosunun karşılığı)

Veri toplanıyor: **Evet**. Aktarımda şifreli: **Evet**. Hesap oluşturma: **yok**; uygulama dışı hesapla giriş: **Hayır**. Silme talebi yöntemi: **Hayır**. Ek rozetler: boş.

| Play'deki veri türü | Toplanıyor | Paylaşılıyor | Geçici işleme | Zorunlu | Amaç (toplama ve paylaşma) |
|---|---|---|---|---|---|
| Finansal bilgiler → İşlem geçmişi | Evet | Hayır | Hayır | Zorunlu | Analiz |
| Konum → Yaklaşık konum | Evet | Evet | Hayır | Zorunlu | Analiz, Reklam veya pazarlama |
| Uygulama bilgileri ve performansı → Kilitlenme günlükleri | Evet | Evet | Hayır | Zorunlu | Analiz, Reklam veya pazarlama |
| Uygulama bilgileri ve performansı → Teşhisler | Evet | Evet | Hayır | Zorunlu | Analiz, Reklam veya pazarlama |
| Uygulama etkinliği → Uygulama işlemleri | Evet | Evet | Hayır | Zorunlu | Analiz, Reklam veya pazarlama |
| Cihaz veya diğer kimlikler | Evet | Evet | Hayır | Zorunlu | Analiz, Reklam veya pazarlama |

Gerekçe: satın alma bilgisi yalnız kendi ölçümümüze (Firebase, hizmet sağlayıcı) gider, paylaşım sayılmaz. Diğer beşi Google'ın reklam ağına da gittiği için Play bunu paylaşım sayar.
App Store'da "takip: hayır" denmişti; Play'de karşılığı reklam kimliği beyanı (Evet; Reklam veya pazarlama + Analiz).
İçerik derecelendirmesi sonucu: ESRB Everyone, PEGI 3, USK 0, IARC 3+, Brezilya 14 (uygulama içi satın alma yüzünden).

## Sürüm notu (Dahili test / Üretim → Sürüm notları)

```
<en-US>
First release on Google Play: 130 calm sand art scenes in eight worlds.
</en-US>
<tr-TR>
Google Play'de ilk sürüm: sekiz dünyada 130 sakin kum sanatı sahnesi.
</tr-TR>
```

## Fiyat ve ülkeler

Ücretsiz. Ülkeler App Store'dakiyle aynı (bütün ülkeler).

# 06 · Sandful: ölçüm, "oyun tutuyor mu?" ve pazarlama (öneri, Ozer'in onayına)

> Ozer (1.1 incelemeye gönderildikten sonra, 3 Kasım 2026): "Reklam, analytics, oyun tutuyor mu tutmuyor mu, neler yapılabilir gibi konularda ilerleyelim beraber.
> Artık reklam, pazarlama metrikleri inceleme gibi konulara geçebiliriz."

## Bugün elimizde ne var

- Oyun hiç veri toplamıyor (App Privacy: "Data Not Collected"). Oyun içinde ne olduğunu bilmiyoruz.
- **App Store Connect > Analytics** kodsuz hazır veri verir. Mart 2026'da yenilendi (100'den fazla yeni ölçüm, kohortlar, benzer uygulamalarla karşılaştırma):
  gösterim, ürün sayfası görüntülenmesi, indirmeye dönüşme oranı, indirme kaynağı (arama, göz atma, web, başka uygulama), oturum, aktif cihaz, çökme,
  1/7/28. gün geri dönüş ve benzer oyunlara göre yüzdelik dilim (25., 50., 75.).
  Kısıt: sadece "geliştiriciyle paylaş" izni veren kullanıcıları sayar, 1-2 gün gecikmeli gelir, oyun içinde hangi bölümde bırakıldığını göstermez.
- Uygulama 2 Kasım'dan beri 175 ülkede. Anlamlı veri için 1-2 hafta gerekir.

## "Oyun tutuyor mu?" sorusunu cevaplayan ölçümler

| Ölçüm | Ne söyler | Kaynak | Kabaca hedef |
|---|---|---|---|
| 1. gün geri dönüş (D1) | İlk izlenim, oyun sardı mı | App Store Connect, sonra oyun içi ölçüm | GameAnalytics 2025: medyan ~%22, en iyi %10 ~%40. Sakin bulmaca/casual oyunlar için %30+ iyi |
| 7. gün (D7) | Alışkanlık oldu mu | aynı | medyan ~%4, en iyi çeyrek %6-7; casual bulmacada %10+ çok iyi |
| 30. gün (D30) | Uzun ömür | aynı | medyan ~%0,7, en iyi %10 ~%4 |
| Bölüm hunisi | Oyuncuların yüzde kaçı 5., 10., 20., 30. bölüme geliyor, nerede bırakıyor | **Sadece oyun içi ölçüm** | Ani düşüş olan bölüm = zorluk ya da sıkıcılık sorunu |
| Günde oynanan bölüm, oturum süresi | Rahatlatıcı oyunda "bir tane daha" isteği | oyun içi | |
| Ürün sayfası → indirme oranı | Ekran görüntüleri ve metin ikna ediyor mu | App Store Connect | Benzer oyunların medyanının üstü |
| Reklam sonrası: günlük kullanıcı başına gelir (ARPDAU), kullanıcı ömür boyu geliri (LTV) | Para kazanıyor mu, reklama para harcamaya değer mi | AdMob + oyun içi | LTV > yükleme maliyeti (CPI) olmadan ücretli tanıtım kârlı olmaz |

Benchmark rakamları yaklaşık; kaynakların ölçüm yöntemleri farklı. Asıl karşılaştırma App Store Connect'in kendi benzer uygulama dilimleriyle yapılır.

## Öneri

### 1. Hemen (kodsuz, ücretsiz)

- **Öne çıkarılma başvurusu:** App Store Connect > Featuring > **Nominations**. 1.1'i "30 sahne, üç dünya, yeni mekanikler" diye Apple'ın editör ekibine bildir.
  Ücretsiz, 10 dakika. Seçilirse en büyük ücretsiz tanıtım bu.
- **Uygulama önizleme videosu:** ürün sayfasında 3 video yeri boş ("0 of 3 App Previews"). 15-30 sn, dikey 886×1920.
  Kum dökülmesi tam "izlemesi keyifli" (satisfying/ASMR) türü, sessiz oynayan videoyla bile dönüşümü artırır. Videoyu oyundan ben üretirim.
- **Kısa sosyal medya videoları:** aynı çekimlerden TikTok, Instagram Reels, YouTube Shorts için 5-10 video (kum sesiyle). Paylaşmak Ozer'de.
- **Analytics ekranına ilk bakış:** bir hafta sonra Analytics > Overview ve Acquisition ekranlarının görüntüleri; birlikte okuruz.

### 2. 1.2'de: oyun içi ölçüm

Önerim **Firebase Analytics** (Google). Ücretsiz, oyunlarda standart, ileride AdMob ile aynı hesapta birleşir (reklam geliri kullanıcı ve bölüm bazında görünür),
Remote Config ile güncelleme göndermeden ayar denenebilir (zorluk, reklam sıklığı). Capacitor eklentisi var.

Ölçülecek olaylar (kişisel veri yok; ad, e-posta, konum toplanmaz):
- `level_start` (bölüm, dünya/tema, el yapımı mı üretilmiş mi), `level_end` (yüzde, yıldız, süre, geri al/üfleme kullanıldı mı), `level_quit` (kaçta bırakıldı), `level_retry`
- ilk açılış adımları: ilk döküş, el ipucu
- ayarlar: ses/müzik kapatma, kum sesi seçimi, dil
- ana ekran: "Oyna" ile mi raftan mı başlandı

Bunun bedeli:
- App Store gizlilik beyanı "Data Not Collected"tan çıkar ("Kullanım verisi, tanılama; size bağlanmayan veri" olur), gizlilik sayfası güncellenir.
- AB/İngiltere için onay penceresi gerekebilir; reklamla birlikte zaten gelecek (Google'ın onay aracı, UMP).

Alternatif: **TelemetryDeck** (gizlilik odaklı, kişisel kimlik tutmaz, onay penceresi gerektirmediğini söylüyor). Reklam hiç eklenmeyecekse daha sade;
reklam eklenecekse Firebase/AdMob ikilisi daha az iş.

### 3. 1.2'de: puan isteme

5. bölümü 3 yıldızla bitiren oyuncuya Apple'ın kendi puan penceresi (yılda en fazla 3 kez, Apple sınırlar). Puan ve yorum sayısı mağazada sıralamayı ve güveni etkiler.

### 4. 1.3'te: reklam (önce ölçüm, sonra reklam)

Ölçüm 1.2 ile reklamsız bir dönem toplanır. Reklam (ödüllü + seyrek geçiş, `03-sandful-gelir.md`) 1.3'te gelir ve D1/D7'yi düşürüp düşürmediği bu tabanla karşılaştırılır.

### 5. Sonra: küçük ücretli deneme

Ölçüm oturduktan sonra Apple Ads'te küçük bir bütçeyle (ör. 100-200 $) yükleme maliyeti (CPI) ve bu kullanıcıların geri dönüşü ölçülür.
LTV, CPI'nin üstündeyse tanıtıma para harcamak mantıklı olur; değilse oyun ve mağaza sayfası iyileştirilir.

## Ozer'e sorular

1. Sıra uygun mu: şimdi öne çıkarılma başvurusu + videolar, 1.2'de Firebase ölçüm + puan isteme + 200 bölüm, 1.3'te reklam?
2. Firebase mi, TelemetryDeck mi?
3. Firebase için şirketin Google hesabıyla bir Firebase projesi açılması gerekiyor (AdMob da aynı hesapta olacak). Uygun mu?

Kaynaklar: Apple App Store Connect Analytics yardım sayfaları (peer group benchmarks, 2026 güncellemesi), GameAnalytics 2025/2026 mobil oyun benchmark raporları, Apple Featuring Nominations yardım sayfası.

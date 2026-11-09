# 08 · Sandful 1.2: çok bölüm, çeşitlilik ve gelir modeli (öneri, Ozer'in onayına)

> Ozer (4 Kasım 2026): "Şimdilik paylaşım tarafını yapmayalım, üçüncü aşamada olabilir belki. İkinci aşamada bölüm sayısını çok artıralım.
> Ama sürekli aynı şeyler olmasa daha iyi olur; kumu dolduruyorsun, içine bir şey atıyorsun, sonra çubukla dokunuyorsun… Daha güzel şeyler de ekleyelim.
> İkinci aşamadan sonra oyunu reklamlamaya başlayacağız; o yüzden oyun içi gelir modelini de bu aşamada yapalım."

## Kararlar

- Paylaşım ve topluluk (`07-sandful-atolye-paylasim.md`) şimdilik yok; belki 3. aşamada.
- 1.2 = çok bölüm + yeni mekanikler + ölçüm (Firebase) + gelir modeli. 1.2'den sonra tanıtım (reklam kampanyası) başlar.

## 1. Hata: süsün üstünde kum kulesi (Ozer'in gördüğü, 1.1'de var)

"Kum içine obje atıp devamını kumla doldurunca objenin üstünde farklı renk kum oluyor, daha fazla kum dökünce düzeliyor; bazen objenin bir kısmı kayboluyor."
Sebep: süsün düz tepesine düşen kum kaymıyor, tepede dar bir kule olarak birikiyordu (tekne yelkeninin, ağacın, balinanın üstünde); kule ve süsün üstüne
örtülen kum süsün bir kısmını kapatıyordu. Düzeltme: süsün üstüne düşen kum en yakın kenardan aşağı kayar; çevredeki kum süsün tepesine ulaşınca süsü örter,
üstünde kalan boşluk yandan akan kumla dolar. Bot tablosu değişmedi (kusursuz 3 yıldız, dokunmayan 0). Derleme 1.1 (3) olarak hazır.

## 2. Çeşitlilik: yeni mekanikler

Her yeni mekanik bir el yapımı bölümle tanıtılır, sonra üretilen bölümlerde ara ara çıkar. Hepsi tasarım ilkelerine uyuyor: akış hiç durmuyor,
kararlar birkaç saniyelik ve oyuncunun yaptığı şey resmin kendisini belirliyor.

| Mekanik | Nasıl oynanır | Neden güzel | İş |
|---|---|---|---|
| **Ayırıcı kart** | Kavanozun içinde ince bir kart var. Solu bir renkle, sağı başka renkle doldurursun; sonunda kart çekilir | Gerçek kum sanatı tekniği; kart çekilince iki yarının buluştuğu keskin çizgi büyük bir "ortaya çıkma" anı | Orta |
| **Rüzgâr** | Esintiler akan kumu yana savurur; yapraklar ve kar taneleri yönü gösterir, huniyi karşı tarafa tutarsın | Dinamik, el hiç boşta kalmıyor; fırtına, sonbahar, kış bölümlerine çok uyuyor | Az |
| **Islak kum / kum kalesi** | Su damlatınca kum koyulaşır ve dik durur; kule, kale, sivri kaya yaparsın | Normal kum 34°'de kayar, ıslak kum dik durur: yeni şekiller, yeni his | Orta |
| **İnce ve geniş uç** | Bir dokunuşla huni ucunu değiştirirsin: geniş uç hızlı doldurur, ince uç ince çizgi ve sivri tepe yapar | Kısa ve sürekli bir karar: ne zaman hız, ne zaman ayrıntı | Az |
| **İki renkli huni / ritim** | Huni iki rengi sırayla döker, ritimle değiştirirsin; çizgili desenler (zebra, gökkuşağı) çıkar | Müziğe bağlı, haz üçlüsünün ses ayağı | Orta |
| **Kavanozu sen eğ** | İkinci parmakla (ya da düğmeyle) kavanozu kendin eğersin; çapraz katmanları sen kurarsın | Sallanan kavanozun oyuncunun elinde olanı | Orta |
| **Kayalar ve raflar** | Kavanozun içinde baştan duran taş ya da dal; kum üstünden kayıp şelale gibi akar | Akış görsel olarak zenginleşir, mağara ve çıkıntılar oluşur | Orta |
| **Kum saati (özel bölüm)** | İki odalı cam: üste döktüğün kum boyundan alta akar, altta tersine katmanlar oluşur | Hiç görülmemiş, büyüleyici; dünya finali için | Çok |

Mekanik dışında çeşitlilik:
- **Yeni temalar, yeni görünüm:** her temanın kendi masası ve ışığı (sabah penceresi, akşam ışığı, gece lambası), cam rengi (amber, yeşil, buzlu), kapağı (mantar, metal) ve finali
  (balık yüzer, kar yağar, yaprak düşer, havai fişek). Örnek yeni temalar: Çöl ve Vaha, Dağlar, Gece Gökyüzü, Bahçe ve Çiçekler, Şehir Silüetleri, **Tatlı Kavanozları**
  (katmanlı tatlı bardakları: krema, çikolata, çilek; meyve süsleri; aynı oyun, bambaşka bir dünya).
- **10'luk düzen:** her 10 bölümde 6 normal, 2 o temanın mekaniği, 1 kısa ve rahat bölüm, 1 özel bölüm (büyük kavanoz ya da çift kavanoz, uzun final).
- **Üretici kuralları:** art arda aynı mekanik ve aynı tarif yok; her temada bütün kalıplar görünür; gökyüzü kavanozun en fazla %40'ı (ilk denemede fazlaydı).

## 3. Bölüm sayısı

Hedef ~200 bölüm (10 tema). Mevcut 30 el yapımı bölüm omurga olarak kalır, yeni el yapımı imza sahneler her 5. bölümde, aradakiler üreticiden.
Ana ekran uzun yola göre değişir: bitmiş temalar katlanır, açık tema ve sıradaki bölüm öne çıkar.

## 4. Gelir modeli

Kural (`03-sandful-gelir.md`): rahatlatmayı bozmaz. Döküş sırasında reklam yok, banner yok, yıldız satılmaz, bölüm zorlaştırılıp "geç" satılmaz, ilk bölümlerde reklam yok.

| Kaynak | Ne | Ne zaman |
|---|---|---|
| **Ödüllü reklam** (oyuncu ister) | +1 geri alma (ilk hak bedava), +1 üfleme, bölümü atla (takılan için, yıldızsız), sonuç ekranında "kusursuz şişeyi duvar kâğıdı olarak kaydet" | Oyuncu düğmeye basınca |
| **Geçiş reklamı** | Tam ekran, kapatılabilir | 6. bölümden sonra, sadece bölüm bitince "Sonraki"ye basınca; en az 3 dakika arayla, en fazla iki bölümde bir |
| **Reklamları kaldır** | Tek seferlik satın alma (yaklaşık 3,99 $) | Ayarlarda ve birkaç geçiş reklamından sonra küçük bir teklif |
| **Sandful+** (isteğe bağlı) | Reklamsız + özel cam şekilleri, kapaklar, masa temaları + yeni temalara erken erişim | Tek seferlik (yaklaşık 6,99 $); abonelik yok |
| **Kozmetikler** | Kapak, masa, huni, cam rengi; bir kısmı bölümle, bir kısmı ödüllü reklamla ya da satın alarak açılır | Rafta "Koleksiyon" |

Kaba hesap (ülkeye göre çok değişir): 2026 kaynaklarında ABD iOS ödüllü reklam bin gösterimde ~10-25 $, geçiş reklamı ~5-15 $; Türkiye'de birkaç kat düşük.
Günlük oyuncu başına 2-3 geçiş + 1 ödüllü reklam gösterimi ABD'de oyuncu başına günde birkaç sent eder. Tanıtıma para harcamanın kârlı olup olmadığını
oyuncunun ömür boyu getirdiği gelir (LTV) ile bir yükleme maliyetinin (CPI) karşılaştırması söyler; bunu 1.2'deki ölçümle göreceğiz (`06-sandful-olcum-pazarlama.md`).

Teknik ve hesap işleri:

| İş | Kim | Not |
|---|---|---|
| Google AdMob hesabı, uygulamayı ekleme | Ozer (şirketin Google hesabı) | Reklam birimlerini ben tarif ederim |
| `app-ads.txt` dosyasını `investa.com.tr`'ye yükleme | Ozer (cPanel), içeriği ben hazırlarım | AdMob reklam göstermek için bunu ister |
| App Store Connect > Business > **Paid Apps Agreement**, banka ve vergi formları | Ozer | Satın alma için şart; onayı birkaç gün sürebilir, erken başlanmalı |
| Satın alma ürünlerini App Store Connect'te açma | Ozer, ürün kimliklerini ben veririm | "Reklamları kaldır", varsa "Sandful+" |
| Firebase projesi (ölçüm, reklam geliri, uzaktan ayar) | Ozer | AdMob ile aynı Google hesabı |
| AdMob + Firebase + satın alma eklentileri, onay penceresi (AB: Google UMP), iPhone takip izni (ATT), "Satın alımları geri yükle" | Ben | ATT: kişiselleştirilmiş reklam daha çok kazandırır ama her oyuncuya bir izin penceresi çıkar; karar Ozer'in |
| Gizlilik sayfası, App Privacy beyanı, yaş anketi ("reklam var") | Ben metin, Ozer yayın | Derece 4+ kalır |

## 5. Sıra

1. Hata düzeltmesi (yapıldı; 1.1 (3) hazır).
2. Yeni mekanikler ve imza sahneleri (Ozer'in seçtikleri).
3. Üretici iyileştirmesi ve yeni temalar → ~200 bölüm; uzun yol için ana ekran.
4. Ölçüm (Firebase) ve puan isteme.
5. Gelir modeli: reklamlar, satın alma, onay ve gizlilik.
6. Botlar, uçtan uca test, mağaza metinleri ve ekran görüntüleri, TestFlight.

## Ozer'e sorular

1. Hangi mekanikler? Önerim ilk tur için: **ayırıcı kart, rüzgâr, ıslak kum, ince/geniş uç** (kum saati sonra).
2. Yeni temalardan hangileri? (Çöl ve Vaha, Dağlar, Gece Gökyüzü, Bahçe ve Çiçekler, Şehir Silüetleri, Tatlı Kavanozları, ya da senin önerdiklerin)
3. Gelir: tablo uygun mu? Sandful+ olsun mu? Takip izni (ATT) penceresi gösterelim mi?
4. 1.1 (3): incelemedeki 1.1'i çekip düzeltilmiş derlemeyi koyalım mı, yoksa düzeltme 1.2 ile mi gelsin?
5. Hesap işlerine (AdMob, Paid Apps Agreement, Firebase) şimdi başlayabilir misin? Apple'ın sözleşme onayı birkaç gün sürebiliyor.

## Hesap işleri: ilerleme

- **5 Kasım 2026:** Paid Apps Agreement için banka hesabı eklendi (Garanti BBVA, TRY, durum "Processing"), vergi formları gönderildi:
  - U.S. Certificate of Foreign Status of Beneficial Owner: Corporation; ABD'de çalışan ve varlık yok beyanı.
  - U.S. Substitute Form W-8BEN-E: Corporation, Türkiye vergi numarası, ABD vergi numarası yok; Türkiye mukimi, ownership and base erosion test,
    Madde 12(2)(b), %10, "Income from the sale of applications". İmzalayan: Özer Koçak, Vice Chairman of the Board.
  - Not: Apple'ın adres doğrulaması Türkiye adresini tanımadı, adres olduğu gibi onaylandı (kritik değil).
- **5 Kasım 2026, aynı gün:** Paid Apps Agreement, banka hesabı ve iki vergi formu **Active**. Satın alma ürünleri açılabilir.
- Sırada: AdMob hesabı, Firebase projesi; satın alma ürünleri 1.2 geliştirilirken açılacak (kimlikleri ben veririm).
- **5 Kasım 2026:** AdMob'a uygulama eklendi (iOS, App Store'daki Sandful). Yayıncı kimliği `pub-2387022770405877`.
  Doğrulama için `app-ads.txt` (`uygulamalar/sandful/magaza/site/app-ads.txt`) sitenin **kökünde** olmalı: `https://www.investa.com.tr/app-ads.txt`
  (sandful klasöründe değil). AdMob iOS'ta dosyayı App Store sayfasındaki **Marketing URL**'nin alan adında arıyor; Marketing URL boştu,
  `https://www.investa.com.tr` olarak girilecek (sürüm bilgisi; düzenlenebilir bir sürümde: 1.1 (3) değişikliği ya da 1.2). Doğrulama bir haftaya kadar sürebilir.
- **9 Kasım 2026:** `app-ads.txt` sitenin kökünde yayında (Ozer tarayıcıda doğruladı). Kalan: Marketing URL (`https://www.investa.com.tr`), AdMob ödeme profili, sonra AdMob'da "Check for updates".
- **9 Kasım 2026:** 1.1.1 (4) incelemeye gönderildi (süs düzeltmesi + Marketing URL).

### AdMob kurulumu (Ozer'in yapacakları, sırayla)

| Adım | Nerede | Ne |
|---|---|---|
| 1. Ödeme profili | Üstteki kırmızı uyarı > "Sorunu giderin" (ya da Ödemeler) | İşletme hesabı, Investa Teknoloji A.Ş., adres, iletişim. ABD vergi bilgisi sorulursa: ABD'de faaliyet yok |
| 2. Reklam birimleri | Uygulamalar > Sandful > Reklam birimleri > Reklam birimi ekle | **Geçiş** (Interstitial): `Sandful Bolum Sonu`; **Ödüllü** (Rewarded): `Sandful Odullu`, ödül 1 / `hak`. Banner ve uygulama açılış reklamı yok |
| 3. Avrupa onay mesajı | Gizlilik ve mesajlaşma > Avrupa düzenlemeleri | Sandful için mesaj oluştur; diller İngilizce + Türkçe; gizlilik politikası `https://www.investa.com.tr/sandful/privacy.html`; yayınla |
| 4. Reklam içeriği | Engelleme kontrolleri > İçerik / Hassas kategoriler | En yüksek reklam içerik derecesi **G** (uygulama 4+; Apple reklamların yaş derecesine uygun olmasını istiyor); kumar, flört, alkol gibi hassas kategoriler engelli |
| 5. Kimlikleri gönder | Uygulama ayarları ve reklam birimleri | Uygulama kimliği (`ca-app-pub-…~…`) ve iki reklam biriminin kimliği (`ca-app-pub-…/…`) Claude'a |

Uygulama çocuklara yönelik olarak işaretlenmez (Kids kategorisinde değil). iPhone takip izni (ATT) kararı açık; onay mesajında "IDFA açıklama mesajı" ATT gösterilecekse eklenir.


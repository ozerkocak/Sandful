# Sandful · Android (Google Play) rehberi

iPhone rehberi `TESTFLIGHT.md`; bu dosya aynı uygulamanın Android yolu. Kararlar ve nedenleri `fikirler/10-sandful-android.md`'de.
Oyunun kaynağı tek: `prototipler/01-kum-sisesi.html`. `npm run build` onu `www/` altına kopyalar, `npx cap sync android` Android projesine taşır.

| Ayar | Değer |
|---|---|
| Uygulama adı | Sandful |
| Paket kimliği (applicationId) | `com.investateknoloji.sandful` (iPhone ile aynı) |
| Sürüm | `versionName` **1.2**, `versionCode` **7** (`android/app/build.gradle`). Her Play yüklemesinden önce `versionCode` 1 artar |
| En düşük Android | 7.0 (API 24); hedef API 36 |
| Ekran | Sadece dikey, durum çubuğu gizli |
| Reklam | AdMob, Android uygulaması `ca-app-pub-2387022770405877~1080974226`; geçiş `…/8576320865`, ödüllü `…/2010912519` (25 Kasım). Deneme APK'sı hep deneme reklamı ister; gerçek birimler sadece Play'den kurulan sürümde |
| Ölçüm | Firebase Analytics (proje `sandful-47489`, Android uygulaması 25 Kasım'da eklendi); reklam kimliği toplamaz |
| Satın alma | Google Play Faturalandırma, ürün `com.investateknoloji.sandful.reklamsiz` (tek seferlik) |

## Durum (25 Kasım 2026)

- [x] Oyun kodu Android'e hazır (geri tuşu, bekleyen ödeme, deneme reklamı, durum çubuğu); testler geçiyor.
- [x] Deneme APK'sı bulut ortamında derleniyor (hata ayıklama imzalı; sadece deneme reklamı gösterir).
- [ ] Gerçek telefonda ilk deneme (aşağıdaki liste).
- [x] Google Play Console hesabı var (Ozer, 25 Kasım).
- [x] Play Console'da uygulama oluşturuldu (25 Kasım; `Sandful: Relaxing Sand Art`, paket `com.investateknoloji.sandful`, Oyun, Ücretsiz).
- [x] Uygulama içeriği beyanları tamamlandı (25 Kasım): gizlilik politikası, oturum açma (kısıtlı bölüm yok), reklam (var), içerik derecelendirmesi (ESRB Everyone, PEGI 3, USK 0, IARC 3+, Brezilya 14), hedef kitle 13+, veri güvenliği, reklam kimliği (Reklam + Analiz), resmi kurum/finans/sağlık (yok), tüccar durumu (satıcı; hizmet şartları adresi boş).
- [x] Firebase Android uygulaması eklendi (25 Kasım): `resources/firebase/google-services.json`. Ölçüm reklam kimliği toplamaz (iPhone'daki ayarın karşılığı).
- [x] AdMob Android uygulaması ve iki reklam birimi açıldı (25 Kasım): `admob.json`, oyun dosyasındaki `BIRIM`, manifest.
- [x] Mac'te Android Studio kuruldu, yükleme anahtarı üretildi (`~/Anahtarlar/sandful-yukleme.jks`, alias `sandful`; depoda değil), imzalı AAB üretildi (26 Kasım).
- [x] Dahili test: `7 (1.2)` 26 Kasım 14:45'te test kullanıcılarına sunuldu (liste: `Sandful Test`).
- [x] Satıcı (ödeme) profili açıldı; Reklamsız ürünü oluşturuldu ve etkinleştirildi (satın alma seçeneği `satin-al`, 3,99 USD, Türkiye ₺199,99).
- [x] Lisans testi: `Sandful Test` listesi eklendi (Hesabı yönetme → Google Play uygulama ayarları → Lisans testi).
- [x] **İncelemeye gönderildi (26 Kasım 2026, 15:49):** üretim sürümü `7 (1.2)` (dahili testteki paket, kitaplıktan eklendi), 177 ülke + dünyanın geri kalanı, mağaza girişleri, beyanlar. **Yönetilen yayınlama açık:** onay gelince kendiliğinden yayınlanmaz, Yayın özeti'nden elle yayınlanır.
- [ ] Telefonda deneme (inceleme sürerken): dahili test bağlantısı ilk gün "uygulama bulunamadı" verdi (yeni uygulamada mağaza kaydının yayılması bekleniyor); beklerken deneme APK'sı ile 1–7. maddeler.
- [ ] Telefonda satın alma ve geri yükleme denemesi (Play'den kurulan sürümle).
- [ ] Onaydan sonra: Yayın özeti → yayınla; AdMob'da Android uygulamasını mağaza kaydına bağla.
- [x] Mağaza metinleri ve görselleri hazır (`magaza/play-metinleri.md`, `magaza/play/`); mağaza girişi EN ve TR olarak Play Console'a girildi (25 Kasım).
- [ ] Gizlilik ve destek sayfalarını siteye yeniden yükleme.
- [ ] Mağaza sayfasını ve beyan formlarını doldurma, incelemeye gönderme.

## 1 · Deneme APK'sını telefona kurmak

Deneme APK'sı mağazadan bağımsızdır; bir Android telefona doğrudan kurulur.

1. APK dosyasını Android telefona indir (sohbetten ya da e-postayla kendine gönder).
2. Dosyaya dokun. Telefon "bilinmeyen kaynaktan yükleme" izni isterse sadece o uygulama için (Dosyalar ya da Chrome) izin ver.
3. Play Protect uyarırsa "Yine de yükle". Uygulama hata ayıklama imzalı olduğu için bu uyarı olağandır.

Bakılacaklar:

| # | Ne | Beklenen |
|---|---|---|
| 1 | Açılış | Çökmeden 1. bölüm açılır. Birkaç bölüm oynadıktan sonra Firebase → Realtime'da Android kullanıcısı görünür |
| 2 | Üst ve alt boşluk | Durum çubuğu görünmez; çentik ya da kamera deliği düğmelerin üstüne binmez; alttaki hareket çubuğu düğmeleri kapatmaz |
| 3 | Ses | İlk dokunuşta kum sesi ve müzik gelir |
| 4 | Titreşim | Kum akarken hafif tıklar, kapakta güçlü vuruş |
| 5 | Geri tuşu / geri hareketi | Bölümde: rafa döner. Ayarlar açıkken: ayarları kapatır. Raftayken: uygulama arka plana gider (kapanmaz) |
| 6 | Kayıt | Bir bölüm bitir, uygulamayı kapat-aç: yıldız duruyor |
| 7 | Dil | Telefon Türkçeyse Türkçe; Ayarlar > Dil ile değişiyor |
| 8 | Tanı ekranı | Ayarlar'da sürüm yazısına 5 kez dokun: ilk satırda "uygulama: android" ve dört eklentide ✓, ikinci satırda "reklam: test · ortam Sandbox", altta "Deneme reklamı: açık (otomatik)" düğmesi |
| 9 | Deneme reklamı | Geri al hakkın bitince çıkan karttan reklam izle: üstünde "Test Ad" yazan Google reklamı gelir, bitince hak verilir. Geçiş reklamı 10. bölümden sonra bölüm aralarında seyrek çıkar |
| 10 | Satın alma | Bu APK'da çalışmaz (Play'den kurulmadığı için "ürün bulunamadı" der); 5. adımda denenir |

Bir şey beklenenden farklıysa ekran görüntüsünü gönder.

## 2 · Google Play Console hesabı

- Adres: play.google.com/console. Kayıt ücreti tek seferlik 25 $.
- Hesap türü **Kuruluş** (İnvesta Teknoloji). Google kuruluş hesabında D-U-N-S numarası ve kuruluş doğrulaması ister; Apple geliştirici hesabı için alınan D-U-N-S burada da geçer.
- Kişisel hesap açma: yeni kişisel hesaplarda yayından önce en az 12 kişiyle 14 gün kapalı test şartı var.
- Doğrulama birkaç gün sürebilir; beklerken 3. ve 4. adımlar yapılabilir.

## 3 · Firebase'e Android uygulaması eklemek

1. console.firebase.google.com → **sandful-47489** → Proje ayarları (dişli) → **Uygulama ekle** → Android.
2. Android paket adı: `com.investateknoloji.sandful`. Takma ad: `Sandful Android`. SHA-1 boş kalabilir.
3. **google-services.json** dosyasını indir ve buraya gönder. Sihirbazın "SDK ekle" adımlarını geç (proje zaten hazır).

Dosya gizli değildir (iPhone'daki `GoogleService-Info.plist` gibi uygulamaya gömülür). `resources/firebase/google-services.json` olarak depoya girer;
`python3 scripts/configure-native.py` onu `android/app/` altına kopyalar.

## 4 · AdMob'da Android uygulaması ve reklam birimleri

1. admob.google.com → Uygulamalar → **Uygulama ekle** → Platform: Android → "Uygulama desteklenen bir mağazada listeleniyor mu?" **Hayır** → ad: `Sandful`.
2. Reklam birimi ekle → **Geçiş reklamı** → ad: `Bölüm sonu geçiş`.
3. Reklam birimi ekle → **Ödüllü** → ad: `Ödüllü` (ödül miktarı 1, öğe "ödül"; oyun ödülü kendi belirler).
4. Üç kimliği gönder: uygulama kimliği (`ca-app-pub-…~…`) ve iki birim kimliği (`ca-app-pub-…/…`).
5. Uygulama Play'de yayınlanınca AdMob'da uygulamayı mağaza kaydına bağla; `app-ads.txt` iPhone için zaten yayında, aynı dosya Android için de geçer.

Kimlikler 25 Kasım'da geldi ve yazıldı: `admob.json` → `android`, oyun dosyasında `BIRIM` (Android satırı), manifest (`scripts/configure-native.py`).
Yeni birimlerin reklam göstermeye başlaması bir saat kadar sürebilir; uygulama Play'de yayınlanıp AdMob'da mağazaya bağlanana kadar reklam sunumu sınırlı kalır (iPhone'da da böyle olmuştu).

## Mac'teki durum (26 Kasım 2026)

- Depo Mac'te `~/Documents/GitHub/Sandful/Sandful` altında (iCloud'la eşitlenen Belgeler klasörü; Android Studio "Project in Protected Folder" uyarısı verir, derleme çalışıyor). İzin sorunu çıkarsa `~/Developer/Sandful`'a taşınır.
- Android Studio Gradle için JVM 25 önerir; proje **JVM 21** ile derlenir ("Use JVM 21").
- İmzalı paket: Build → Generate App Bundles or APKs → Generate Signed App Bundle or APK… → Android App Bundle → anahtar → listede **release** satırına tıkla → Create.
  Çıktı: `android/app/release/app-release.aab`.
- Play Console'da ürün sayfası: sol menüyü genişlet → Google Play ile para kazanın → Ürünler → Tek seferlik ürünler (dar menüde simgeye basmak tanıtım sayfasına götürür).

## 5 · Mac'te imzalı paket (AAB) ve Play'e yükleme

Bir kerelik kurulum:

1. developer.android.com/studio adresinden **Android Studio**'yu indir, kur, ilk açılışta önerilen bileşenleri (SDK) yüklet.

Her yüklemede:

1. GitHub Desktop → Sandful → dalı çek (Fetch / Pull).
2. Terminal: `cd ~/Developer/Sandful/uygulamalar/sandful && sh scripts/android-hazirla.sh` (oyunu kopyalar, Android Studio'yu açar).
3. Android Studio alt çubukta "Gradle sync" bitene kadar bekle.
4. Menü: **Build → Generate Signed App Bundle or APK… → Android App Bundle → Next**.
5. İlk seferde **Create new…**: anahtar dosyasını deponun **dışına** kaydet (örn. `~/Documents/Anahtarlar/sandful-yukleme.jks`), iki şifre belirle, alias `sandful`, geçerlilik 25 yıl, ad ve kuruluş bilgisi.
   Dosyayı ve şifreleri güvenli bir yere yedekle. Sonraki seferlerde **Choose existing…** ile aynı dosya seçilir.
6. **release** seç → **Create**. Çıktı: `android/app/release/app-release.aab`.
7. Play Console → uygulama → **Test → Dahili test → Yeni sürüm oluştur** → AAB'yi yükle. İlk yüklemede "Google Play uygulama imzalaması"nı kabul et.
8. Test kullanıcıları listesine kendi Google hesabını ekle; verilen bağlantıdan telefona kur.

Anahtar ve şifreler depoya girmez (`android/.gitignore`: `*.jks`, `*.keystore`, `keystore.properties`).
Yükleme anahtarı kaybolursa Play Console'dan sıfırlanabilir (uygulama imzalaması açık olduğu sürece).

## 6 · Reklamsız ürünü ve satın alma denemesi

Ürün ancak faturalandırma izni olan bir sürüm yüklendikten sonra açılabilir (5. adım).

1. Play Console → **Para kazanma → Ürünler → Uygulama içi ürünler → Ürün oluştur**.
2. Ürün kimliği: `com.investateknoloji.sandful.reklamsiz` (sonradan değiştirilemez). Ad ve açıklama `magaza/app-store-metinleri.md`'deki Reklamsız metinleri.
3. Fiyat: 3,99 ABD doları; Türkiye ₺199,99. **Etkinleştir**.
4. Play Console → **Ayarlar → Lisans testi**: kendi Google hesabını ekle (bu hesapla yapılan satın almalar ücretsiz deneme kartıyla geçer).
5. Dahili test bağlantısından kurulan uygulamada: Ayarlar → Reklamsız oyna → "Test kartı, her zaman onaylanır" ile satın al → reklamlar kalkar.
6. Uygulamayı silip yeniden kur → Ayarlar → Satın alımları geri yükle → ✓.
7. "Test kartı, her zaman reddedilir" ile dene: satın alma olmaz, oyun hata vermez.

Dahili testte reklamlar: Play'den kurulan sürüm kendini mağaza sürümü sayar. Reklam birimleri girildikten sonra dahili testte
tanı ekranından **Deneme reklamı**nı aç ve telefonu AdMob → Ayarlar → Test cihazları'na ekle; kendi gerçek reklamına dokunma.

## 7 · Mağaza sayfası ve beyanlar

Bütün metinler, görsellerin yerleri ve beyan cevapları `magaza/play-metinleri.md`'de (App Store'da yayında olan 1.2'nin karşılığı):

- Ana mağaza girişi: ad, kısa açıklama, tam açıklama (EN ana dil, TR çeviri).
- Görseller: `magaza/play/simge-512.png`, `magaza/play/one-cikan-1024x500.png`, `magaza/play/ekran-goruntuleri/en|tr/01–08.jpg` (1080×1920).
- Uygulama içeriği: gizlilik politikası, reklam, içerik derecelendirmesi, hedef kitle (13+), veri güvenliği, reklam kimliği.
- Gizlilik ve destek sayfaları Android'i de kapsayacak şekilde güncellendi (`magaza/site/privacy.html`, `index.html`); siteye yeniden yüklenmeleri gerekir.

Üretime göndermeden önce: dahili testte 1. bölümdeki liste ve 6. bölümdeki satın alma denemesi tamamlanmış olmalı.

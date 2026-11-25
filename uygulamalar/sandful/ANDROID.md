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
| Reklam | AdMob. Android kimlikleri girilene kadar Google'ın örnek uygulama kimliği ve hep deneme reklamı |
| Ölçüm | Firebase Analytics; `google-services.json` gelene kadar ölçüm gönderilmez |
| Satın alma | Google Play Faturalandırma, ürün `com.investateknoloji.sandful.reklamsiz` (tek seferlik) |

## Durum (25 Kasım 2026)

- [x] Oyun kodu Android'e hazır (geri tuşu, bekleyen ödeme, deneme reklamı, durum çubuğu); testler geçiyor.
- [x] Deneme APK'sı bulut ortamında derleniyor (hata ayıklama imzalı; sadece deneme reklamı gösterir).
- [ ] Gerçek telefonda ilk deneme (aşağıdaki liste).
- [ ] Google Play Console hesabı ve uygulama kaydı.
- [ ] Firebase Android uygulaması → `resources/firebase/google-services.json`.
- [ ] AdMob Android uygulaması ve iki reklam birimi → `admob.json` ve oyun dosyasındaki `BIRIM`.
- [ ] Mac'te Android Studio, yükleme anahtarı, imzalı AAB.
- [ ] İç test, Reklamsız ürünü, satın alma denemesi.
- [ ] Mağaza sayfası, beyan formları, incelemeye gönderme.

## 1 · Deneme APK'sını telefona kurmak

Deneme APK'sı mağazadan bağımsızdır; bir Android telefona doğrudan kurulur.

1. APK dosyasını Android telefona indir (sohbetten ya da e-postayla kendine gönder).
2. Dosyaya dokun. Telefon "bilinmeyen kaynaktan yükleme" izni isterse sadece o uygulama için (Dosyalar ya da Chrome) izin ver.
3. Play Protect uyarırsa "Yine de yükle". Uygulama hata ayıklama imzalı olduğu için bu uyarı olağandır.

Bakılacaklar:

| # | Ne | Beklenen |
|---|---|---|
| 1 | Açılış | Çökmeden 1. bölüm açılır (Firebase ayar dosyası henüz yok; ölçüm gitmez ama oyun çalışır) |
| 2 | Üst ve alt boşluk | Durum çubuğu görünmez; çentik ya da kamera deliği düğmelerin üstüne binmez; alttaki hareket çubuğu düğmeleri kapatmaz |
| 3 | Ses | İlk dokunuşta kum sesi ve müzik gelir |
| 4 | Titreşim | Kum akarken hafif tıklar, kapakta güçlü vuruş |
| 5 | Geri tuşu / geri hareketi | Bölümde: rafa döner. Ayarlar açıkken: ayarları kapatır. Raftayken: uygulama arka plana gider (kapanmaz) |
| 6 | Kayıt | Bir bölüm bitir, uygulamayı kapat-aç: yıldız duruyor |
| 7 | Dil | Telefon Türkçeyse Türkçe; Ayarlar > Dil ile değişiyor |
| 8 | Tanı ekranı | Ayarlar'da sürüm yazısına 5 kez dokun: ilk satırda "uygulama: android" ve dört eklentide ✓, ikinci satırda "reklam: test", altta "Deneme reklamı: açık (birim yok)" düğmesi |
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

Kimlikler gelince: `admob.json` → `android`, oyun dosyasında `BIRIM` (Android satırı), `python3 scripts/configure-native.py` (manifest), `npm run build && npx cap sync android`.

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

| Bölüm | Ne girilecek |
|---|---|
| Uygulama adı (30) | `Sandful: Relaxing Sand Art` |
| Kısa açıklama (80) | hazırlanacak (EN, TR) |
| Tam açıklama | App Store açıklaması uyarlanır (`magaza/app-store-metinleri.md`) |
| Görseller | Simge 512×512, öne çıkan görsel 1024×500, en az 2 telefon ekran görüntüsü (iPhone görüntülerinden üretilecek) |
| Gizlilik politikası | `https://www.investa.com.tr/sandful/privacy.html` (Android satırları eklenecek) |
| Uygulama içeriği → Reklamlar | Evet, reklam içerir |
| Uygulama içeriği → Veri güvenliği | App Store gizlilik tablosunun karşılığı: yaklaşık konum, cihaz kimliği, satın alma geçmişi, uygulama etkileşimi, tanılama; reklam ve analiz amaçlı; aktarımda şifreli |
| Uygulama içeriği → Reklam kimliği | Evet (AdMob); amaç: reklam ve analiz |
| İçerik derecelendirmesi | Anket: şiddet, kumar, kullanıcı içeriği yok → herkes |
| Hedef kitle | 13 yaş ve üzeri (çocuklara yönelik değil; AdMob ayarlarıyla uyumlu) |
| Kategori | Oyun → Bulmaca (ya da Basit) |
| Ülkeler | App Store'dakiyle aynı |

Metinler ve görseller hazırlandıkça `magaza/` altına eklenir.

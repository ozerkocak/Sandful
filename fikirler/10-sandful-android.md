# 10 · Sandful Android

> Ozer (25 Kasım 2026): "Şimdi Sandful oyununu Android için de eklemek istiyorum."

Yeni bir oyun ya da mekanik değil: iPhone'da yayında olan 1.2'nin (130 bölüm, 8 dünya, seyrek reklam, Reklamsız satın alma, ölçüm) aynısı Google Play'e çıkar.
Oyunun kaynağı tek (`prototipler/01-kum-sisesi.html`); iki platform aynı dosyadan paketlenir. Android projesi baştan beri depoda duruyordu (`uygulamalar/sandful/android`), sadece güncel değildi.

## Değişmeyenler

- Bölümler, tohumlar, zorluk, yıldız kuralları iPhone ile birebir aynı. Yayınlanmış bölümlere dokunulmadı.
- Reklam kuralları aynı (`09-sandful-reklam-olcum.md`): ilk 10 bölümde reklam yok, banner yok, döküş sırasında hiçbir şey çıkmaz.
- Reklamsız: tek seferlik, aynı ürün kimliği (`com.investateknoloji.sandful.reklamsiz`), aynı fiyat hedefi (~3,99 $).
- Ölçüm aynı Firebase projesine (`sandful-47489`) gider; Android ayrı bir "akış" olarak görünür, olay adları ve parametreler aynıdır.
- Paket kimliği iPhone ile aynı: `com.investateknoloji.sandful`.

## Android'e özel kararlar (25 Kasım 2026)

| Konu | Karar | Neden |
|---|---|---|
| Geri tuşu / geri hareketi | Açık kartı kapatır → ayarları kapatır → bölümdeyken rafa döner → raftayken uygulamayı arka plana alır. Reklam ya da açılış animasyonu sırasında bir şey yapmaz | Android'de geri tuşu her uygulamada çalışmalı; varsayılan davranış oyunu bölümün ortasında kapatıyordu |
| Durum çubuğu | iPhone'daki gibi gizli; alttaki hareket çubuğu görünür kalır | Oyun tam ekran sakin bir sahne; hareket çubuğunu gizlemek geri hareketini zorlaştırır |
| Çentik ve kenar boşlukları | Capacitor'ın kendi çözümü (yeni WebView'da `env(safe-area-inset-*)`, eskisinde pencere dolgusu) | Oyun zaten `--safeT/--safeB` ile yerleşiyor; ek kod gerekmedi |
| Reklam birimleri | Android için AdMob'da ayrı uygulama ve iki ayrı birim açılır. Kimlikler girilene kadar oyun Android'de **hep deneme reklamı** ister (`BIRIM` boş → `REK.oto`) | iPhone birimleriyle Android'de reklam istemek AdMob kurallarına aykırı; boşken yanlışlıkla gerçek reklam isteği çıkamaz |
| Deneme ortamı | Hata ayıklama imzalı APK "sandbox" işareti yazar (`MainActivity`), oyun deneme reklamı ister. Play'den kurulan sürüm (iç test dahil) "magaza" yazar | Android'de iç test ile yayını ayırt eden güvenilir bir işaret yok (ikisi de Play'den kurulur). İç testte deneyen kişi tanı ekranından "Deneme reklamı"nı açar; ayrıca telefonlar AdMob'a test cihazı olarak eklenir |
| Bekleyen ödeme | Google Play'de ödeme "beklemede" kalabilir (nakit, banka onayı). Bekleyen satın alma reklamları **kaldırmaz**; ödeme tamamlanınca bir sonraki açılışta tanınır ve onaylanır | Onaylanmayan satın almayı Google 3 gün sonra iade eder; parası gelmemiş satın almaya da hak verilmez |
| Takip izni | iPhone'daki gibi sorulmaz; Android'de böyle bir pencere zaten yok. AB/İngiltere'de Google'ın onay penceresi (UMP) aynı şekilde çıkar | — |
| İmzalama | Yükleme anahtarını Ozer Mac'te Android Studio'da üretir; depoya girmez (`android/.gitignore`). Google Play uygulama imzalaması açık kalır | Anahtar kaybolursa Google'dan yenisi istenebilir; depoda anahtar durmaz |
| Sürüm | Android `versionName` 1.2, `versionCode` 7'den başlar; her Play yüklemesinden önce `versionCode` 1 artar | iPhone'daki derleme numarası kuralının aynısı |
| Mağaza fiyatı | Reklamsız 3,99 $; ülke fiyatları Play'in önerdiği karşılıklarla. Türkiye için App Store'daki ₺199,99 hedefi | İki mağazada aynı fiyat |

## Yapılanlar

- Oyun: `ANDROID` ayrımı, platforma göre reklam birimleri, bekleyen/onaysız satın alma, geri tuşu, durum çubuğu (hepsi `window.Capacitor.getPlatform()==='android'` arkasında; iPhone davranışı değişmedi).
- Android projesi: yedi eklenti senkron (AdMob, Firebase Analytics, Reklamsız, değerlendirme, uygulama, titreşim, tercihler); `MainActivity` deneme işaretini yazar.
- `scripts/configure-native.py`: Android için AdMob uygulama kimliğini `admob.json`'dan yazar, `resources/firebase/google-services.json` varsa uygulamaya kopyalar.
- `scripts/android-hazirla.sh`: Mac'te oyunu kopyalar ve Android Studio'yu açar (iOS'taki `ios-hazirla.sh`'ın karşılığı).
- Testler: `testler/sandful-para.js`'e Android bölümü (6b) eklendi; para 63/63, uçtan uca 32/32 (prototip ve uygulama paketi).
- Bulut ortamında deneme APK'sı ve imzasız mağaza paketi (AAB) derlenebiliyor (iPhone'un aksine).

## Sınanamayanlar (gerçek telefonda bakılacak)

Bulut ortamında Android öykünücüsü çalışmıyor; aşağıdakiler ancak telefonda görülür. Liste ve adımlar `uygulamalar/sandful/ANDROID.md`'de.

- Açılış (Firebase ayar dosyası yokken çökmemeli), ses ve titreşim, çentikli ekranda üst/alt boşluk, durum çubuğunun gizlenmesi, geri tuşu.
- Deneme reklamlarının gelmesi, AB onay penceresi.
- Satın alma: ancak Play Console'da ürün açılıp iç test sürümü yüklenince denenebilir.

## Ozer'den gerekenler

1. Google Play Console hesabı (kuruluş hesabı; yeni kişisel hesaplarda yayın öncesi 12 kişiyle 14 günlük kapalı test şartı var, kuruluş hesabında yok).
2. Firebase'de aynı projeye Android uygulaması ekleyip `google-services.json` dosyasını göndermek.
3. AdMob'da Android uygulaması ve iki reklam birimi (geçiş, ödüllü) açıp kimlikleri göndermek.
4. Mac'e Android Studio kurmak; imzalı paketi (AAB) üretip Play Console'a yüklemek.
5. Play Console'da Reklamsız ürününü, mağaza sayfasını ve beyan formlarını (veri güvenliği, içerik derecelendirmesi, reklam, hedef kitle) doldurmak; metinler ve görseller buradan hazırlanır.

## Sonra bakılacaklar

- Android ekran görüntüleri ve 1024×500 öne çıkan görsel (iPhone görüntülerinden üretilecek).
- Play mağaza metinleri (başlık 30, kısa açıklama 80 karakter) `magaza/` altına.
- Yayın sonrası: Android ve iPhone'u Firebase'de platforma göre ayrı izlemek.

## 25 Kasım 2026 (devam)

> Ozer: "Play Console var, Android telefon da buluruz. App Store'da canlıda olduğu şekilde olsun her şey Android tarafında da."

- Karar: Android, App Store'daki 1.2'nin birebir karşılığı olarak çıkar (aynı ad, açıklama, sekiz ekran görüntüsü, fiyat, beyanlar).
- Hazırlananlar: `magaza/play-metinleri.md` (ad, kısa ve tam açıklama, ürün metinleri, beyan cevapları, veri güvenliği tablosu),
  `magaza/play/` (512 simge, 1024×500 öne çıkan görsel, 1080×1920 ekran görüntüleri EN/TR).
- Gizlilik politikası ve destek sayfası Android'i de kapsar: satın alma "indirdiğiniz mağaza (App Store ya da Google Play)" tarafından işlenir. Sayfalar siteye yeniden yüklenecek.
- Play Console'da satıcı (tacir) beyanı: "Bu bir satıcı hesabı" (şirket, gelir elde ediyor). Mağaza sayfasında şirket iletişim bilgileri görünür.

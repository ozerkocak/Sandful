# Sandful · TestFlight'a çıkış rehberi

Bu klasör oyunun iOS ve Android uygulama paketidir (Capacitor 8, Domino Chase'teki `uygulama/` ile aynı yapı).
Oyunun tek kaynağı `prototipler/01-kum-sisesi.html`; `npm run build` onu `www/` altına kopyalar ve three.js'i pakete gömer.
Uygulama internetsiz çalışır.

## Uygulamada neler var

| Konu | Durum |
|---|---|
| İlk açılış | Doğrudan 1. bölüm; elle sürükleme ipucu ve "Basılı tut: kum akar" yazısı |
| Sonraki açılışlar | Raf (bölümler, yıldızlar, bitmiş şişelerin küçük resimleri); sıradaki bölümden devam |
| Bölümler | 10 bölüm; bir bölümü açmak için öncekinden en az 1 yıldız |
| Dil | Telefon Türkçeyse Türkçe, değilse İngilizce. Raftaki "Dil" düğmesiyle değişir |
| Ses | Sentezlenen kum sesi (rafta seçilir: Tıpırtı, Kadife, İnce), melodi ve ortam. Rafta "Ses" ve "Müzik" ayrı kapatılır |
| Sessiz anahtar | iPhone sessizdeyse oyun sesi çıkmaz (oyunlarda olağan davranış). Arkada çalan müzik kesilmez, oyunla karışır |
| Titreşim | iPhone titreşim motoru: kum düşerken en hafif "seçim" tıkları, kayma ve renk değişiminde hafif, kapakta ve yıldızlarda güçlü |
| Kayıt | Yıldızlar, en iyi yüzde, ayarlar cihazda saklanır (iOS'un silebileceği tarayıcı deposu yerine uygulama tercihleri) |
| Reklam, satın alma, hesap | Yok. Hiç veri toplanmaz |

Oyun Domino Chase gibi global: mağaza ve oyun adı İngilizce, arayüz İngilizce ve Türkçe.

Varsayılanlar:

| Ayar | Değer |
|---|---|
| Uygulama adı | Sandful (App Store başlığı: "Sandful: Relaxing Sand Art") |
| Paket kimliği (Bundle ID) | `com.investateknoloji.sandful` |
| Sürüm | 1.0, derleme 2 hazır (1 yüklendi; her yeni yüklemede Claude artırır) |
| Cihaz | Sadece iPhone, dikey, tam ekran |
| Ekip | İnvesta Teknoloji (`3ANJ967SS2`) |

## Senin yapacakların

Domino Chase'teki yol: GitHub Desktop'tan çek, Mac'te Xcode ile yükle. Apple Developer hesabı, Xcode ve Node.js Domino'dan hazır.

### 1. Bundle ID ✓

developer.apple.com > Certificates, Identifiers & Profiles > Identifiers > **+** > App IDs > App.
Açıklama: Sandful, Bundle ID: `com.investateknoloji.sandful` (Explicit). Ek yetenek seçmen gerekmez.

### 2. App Store Connect'te uygulama kaydı ✓

Uygulama açıldı: ad **Sandful: Relaxing Sand Art**, birincil dil İngilizce (ABD), SKU `sandful`, Apple Kimliği `6822243071`.
Uygulama Bilgileri'nde **Türkçe** yerelleştirmeyi ekle; ad her dilde aynı kalır, alt başlık ve açıklama çevrilir (`magaza/testflight-metinleri.md`).

### 3. Bir kerelik kurulum (Mac)

1. **GitHub Desktop**'ta File > Clone Repository > GitHub.com sekmesi > `ozerkocak/Sandful` > **Clone**
   (varsayılan klasör: `~/Documents/GitHub/Sandful`).
2. Üstteki **Current Branch** menüsünden `claude/clever-wright-10sbmw` dalını seç.

### 4. Her yeni sürümde

1. GitHub Desktop'ta **Fetch origin**, ardından **Pull origin**.
   Sol tarafta "Changes" listesinde dosya görünürse (Xcode bazen proje dosyasını değiştirir): sağ tık > **Discard All Changes**, sonra Pull.
2. Terminal'de:
   ```bash
   cd ~/Documents/GitHub/Sandful/uygulamalar/sandful
   sh scripts/ios-hazirla.sh
   ```
   Paketleri kurar, oyunu uygulamaya kopyalar ve Xcode'u açar.
3. Xcode'da cihaz menüsünden **Any iOS Device (arm64)** seç, **Product > Archive**, ardından **Distribute App > App Store Connect > Distribute**.
   İmzalamayı Xcode kendisi yapar (ekip `3ANJ967SS2` projede hazır). Build numarası projede hazır gelir (her sürümde Claude artırır), elle değiştirme.
4. 10-30 dakika sonra TestFlight'ta görünür.

### 5. TestFlight

1. App Store Connect > Sandful > **TestFlight**. Yeni derleme birkaç dakika "işleniyor" görünür.
2. Şifreleme sorusu çıkmaz (uygulama ayarlarında "standart dışı şifreleme yok" işaretli).
3. **İç test**: ekibindeki App Store Connect kullanıcılarını ekle; inceleme beklemeden dener.
4. **Dış test**: bir grup oluştur, derlemeyi ekle, `magaza/testflight-metinleri.md`'deki metinleri gir.
   İlk dış derleme kısa bir Apple incelemesinden geçer (genelde 1 gün). Sonra herkese açık bağlantı oluşturup paylaşabilirsin.

## Yedek yol: Codemagic (Mac gerekmez)

Mac'e erişemediğin zamanlar için kökteki `codemagic.yaml` hazır (Apple Kimliği işli). Kullanmak istersen:
App Store Connect API anahtarı oluştur, codemagic.io'ya `ozerkocak/Sandful`'ı ekle, anahtarı **DominoChase** adıyla
Integrations > App Store Connect'e bağla, Code signing identities'ten dağıtım sertifikası ve `com.investateknoloji.sandful` App Store profilini al,
sonra **Sandful · iOS → TestFlight** iş akışını başlat. Bu yolda derleme numarası otomatik artar.

## Mağazaya çıkarken (TestFlight'tan sonra)

Bütün alanların değerleri: `magaza/app-store-metinleri.md` (ad, alt başlık, açıklama, anahtar kelimeler, kategori, yaş anketi, gizlilik beyanı, inceleme notu).

1. **Gizlilik ve destek sayfası:** `magaza/site/` klasöründeki iki dosya şirket sitesinde `sandful` klasörüne yüklenir:
   destek `https://www.investa.com.tr/sandful/`, gizlilik `https://www.investa.com.tr/sandful/privacy.html`. Bu adresler App Store Connect'te Support URL ve Privacy Policy URL alanlarına girilir; Apple göndermeden önce açılıp açılmadığına bakar.
2. **Ekran görüntüleri:** `magaza/ekran-goruntuleri/en/` ve `tr/` (6'şar, 1206×2622). "iPhone with Dynamic Island (medium display)" kutusuna 01 → 06 sırasıyla sürüklenir.
3. **Metinler** İngilizce ve Türkçe sayfaya girilir, **Build** olarak TestFlight'taki derleme seçilir.
4. **App Privacy:** "Data Not Collected". **Age Rating:** bütün cevaplar "None/No" → 4+.
5. **Business:** AB'de yayın için "trader" (DSA) bilgisi girilmiş olmalı (hesap düzeyinde, bir kez).
6. **Add for Review** → **Submit**. İnceleme genelde 1-2 gün; onaylanınca "Manually release" seçildiyse yayın düğmesine sen basarsın.

1.0, 13 Ekim 2026'da incelemeye gönderildi. App Store Connect'te karşılaşılanlar (sonraki oyunlar için):
- Dil menüsünden başka dile geçmeden önce **Save**; kaydedilmeyen metinler siliniyor.
- Birden çok ekran görüntüsü birlikte bırakılınca sıra ters dizilebiliyor; küçük resimler sürüklenerek düzeltilir.
- Ekran görüntüsü kutusu "iPhone with Dynamic Island (medium display)": 1206×2622 ya da 1179×2556 istiyor.
- Sürüm sayfasında **Sign-in required** ve **Game Center** işaretli gelebiliyor; ikisi de kaldırılır.
- App Privacy cevapları **Publish** edilmeden inceleme başlamıyor. AB için DSA "trader" beyanı Business sayfasında, bir kez.
- **Pricing and Availability'de fiyat ile ülke ayrı ayrı kurulur.** Fiyat 175 ülke için girilmişti ama **App Availability > Set Up Availability** yapılmamıştı:
  uygulama 29 Ekim'de onaylandı, "Ready for Distribution" göründü ama hiçbir ülkede yayına çıkmadı ("ülkenizde kullanılamıyor"). 2 Kasım'da kuruldu: "175 Available".

## Android deneyiciler için

Codemagic'te **Sandful · Android test APK** iş akışını çalıştır. Çıkan `.apk`, Google Play hesabı olmadan
"bilinmeyen kaynaklardan yükleme" izniyle Android telefonlara kurulabilir.

## Geliştirici notları

```bash
cd uygulamalar/sandful
npm ci
npm run build      # prototipler/01-kum-sisesi.html → www/index.html (three.js gömülü, dış adres yok)
npx cap sync       # www/ → ios ve android projelerine
npm run native     # ios/ ve android/ projelerini sıfırdan üretir, iOS ayarlarını ve ikonları uygular
```

- iOS projesi Swift Package Manager kullanır (CocoaPods yok). Mac'te `npx cap open ios` ile Xcode'da açılır.
- Oyunda değişiklik yapınca sadece `prototipler/01-kum-sisesi.html` düzenlenir; `ios-hazirla.sh` (ya da Codemagic) her derlemede `www/`'yi yeniden üretir.
- Yeni sürüm yüklemeden önce `ios/App/App.xcodeproj/project.pbxproj` içindeki `CURRENT_PROJECT_VERSION` 1 artırılır (App Store aynı numarayı iki kez kabul etmez).
- İkon ve açılış ekranı `scripts/make-icon.py` ile çizilir (`resources/`), `npm run assets` bütün boyutları üretir.
- App Store ekran görüntüleri: `scripts/ekran-ham.js en-US` ve `tr-TR` (oyundan çeker), ardından `scripts/ekran-kare.js` (başlık ve telefon çerçevesi ekler, 1206×2622). Oyun görünümü değişince yeniden üretilir.

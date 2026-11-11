# Sandful · TestFlight'a çıkış rehberi

Bu klasör oyunun iOS ve Android uygulama paketidir (Capacitor 8, Domino Chase'teki `uygulama/` ile aynı yapı).
Oyunun tek kaynağı `prototipler/01-kum-sisesi.html`; `npm run build` onu `www/` altına kopyalar ve three.js'i pakete gömer.
Uygulama internetsiz çalışır.

## Uygulamada neler var

| Konu | Durum |
|---|---|
| İlk açılış | Doğrudan 1. bölüm; elle sürükleme ipucu ve "Basılı tut: kum akar" yazısı |
| Sonraki açılışlar | Ana ekran: Sıradaki kartı ("Oyna"), dünya kartları, raflarda bölümler, yıldızlar ve bitmiş şişelerin küçük resimleri |
| Bölümler | 1.2: 130 bölüm, 8 dünya (ilk 30 el yapımı, sonrası üretilmiş; `fikirler/08`). Bir bölümü açmak için öncekinden en az 1 yıldız ya da "Bölümü geç" |
| Dil | Telefon Türkçeyse Türkçe, değilse İngilizce. Ayarlar'daki (dişli) "Dil" ile değişir |
| Ses | Gerçek kum kaydı (Pixabay), marimba ve glockenspiel müziği (VSCO-2, CC0). Ayarlar'da Ses, Müzik ve Kum sesi (Gerçek kum, Yumuşak, Kapalı) |
| Sessiz anahtar | iPhone sessizdeyse oyun sesi çıkmaz (oyunlarda olağan davranış). Arkada çalan müzik kesilmez, oyunla karışır |
| Titreşim | iPhone titreşim motoru: kum düşerken en hafif "seçim" tıkları, kayma ve renk değişiminde hafif, kapakta ve yıldızlarda güçlü |
| Kayıt | Yıldızlar, en iyi yüzde, ayarlar cihazda saklanır (iOS'un silebileceği tarayıcı deposu yerine uygulama tercihleri) |
| Reklam, satın alma, ölçüm | 1.2: Google AdMob (seyrek geçiş reklamı, isteğe bağlı ödüllü reklam), tek seferlik "Reklamsız" satın alma, Firebase Analytics. Kurallar: `fikirler/09-sandful-reklam-olcum.md`. Hesap yok |

Oyun Domino Chase gibi global: mağaza ve oyun adı İngilizce, arayüz İngilizce ve Türkçe.

Varsayılanlar:

| Ayar | Değer |
|---|---|
| Uygulama adı | Sandful (App Store başlığı: "Sandful: Relaxing Sand Art") |
| Paket kimliği (Bundle ID) | `com.investateknoloji.sandful` |
| Sürüm | 1.1.1 (4) yayında. Projede **1.2 (5)** hazırlanıyor (henüz yüklenmedi) |
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

1. **GitHub Desktop**'ta File > Clone Repository > GitHub.com sekmesi > `ozerkocak/Sandful`.
   **Local Path** olarak iCloud'a eşitlenmeyen bir klasör seç: ev klasöründe `Developer` (`~/Developer/Sandful`). > **Clone**
   (Varsayılan `~/Documents/GitHub` iCloud'un "Masaüstü ve Belgeler" eşitlemesi açıksa sorun çıkarır: aşağıdaki "Sorunlar" bölümü.)
2. Üstteki **Current Branch** menüsünden `claude/clever-wright-10sbmw` dalını seç.

### 4. Her yeni sürümde

1. GitHub Desktop'ta **Fetch origin**, ardından **Pull origin**.
   Sol tarafta "Changes" listesinde dosya görünürse (Xcode bazen proje dosyasını değiştirir): sağ tık > **Discard All Changes**, sonra Pull.
2. Terminal'de:
   ```bash
   cd ~/Developer/Sandful/uygulamalar/sandful
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

### 6. Güncelleme yayınlama (1.1 gibi)

1. Yukarıdaki 4. adımla yeni derlemeyi yükle; TestFlight'ta görünür, telefonda dene.
2. App Store Connect > Sandful > Distribution: sol menüde **iOS App** başlığının yanındaki **+** (ya da "+ Version or Platform") > **iOS** > sürüm numarası **1.1** > Create.
3. 1.1 sayfasında: **What's New in This Version** (İngilizce ve Türkçe), tanıtım metni, açıklama, ekran görüntüleri: `magaza/app-store-metinleri.md`.
   Dil değiştirmeden önce **Save**.
4. **Build** bölümünde **+** > TestFlight'taki 1.1 (2) derlemesini seç.
5. App Information > **Content Rights**: "Yes, it contains, shows, or accesses third-party content, and I have the necessary rights" (ses kayıtları).
6. **Version Release**: "Manually release" ya da "Automatically release". **Add for Review** > **Submit for Review**.
   Fiyat, ülkeler, gizlilik beyanı ve yaş derecesi 1.0'dan aynen kalır; yeniden girmen gerekmez.

### 7. 1.2: reklam, satın alma ve ölçüm (ilk kez)

1.2 dört yeni eklenti getiriyor (AdMob, Firebase Analytics, satın alma, puan isteme). Bunlar bulut ortamında derlenemedi; ilk derleme Mac'te yapılacak, o yüzden adımları sırayla izle ve takıldığın yerde ekran görüntüsü gönder.

**Yüklemeden önce (App Store Connect)**

1. **Satın alma ürünü:** Sandful > Monetization > **In-App Purchases** > **+** > **Non-Consumable**.
   Reference Name: `Reklamsiz`, Product ID: **`com.investateknoloji.sandful.reklamsiz`** (harfi harfine; sonradan değişmez). Fiyat: 3,99 $ kademesi.
   Yerelleştirme ve inceleme bilgileri: `magaza/app-store-metinleri.md` > "1.2 · Satın alma ürünü". Durumu "Ready to Submit" olmalı.
2. **Gizlilik sayfası:** `magaza/site/privacy.html`'i sitede `sandful/privacy.html` üzerine yükle (reklam, ölçüm ve satın alma anlatıldı). İstersen önce hukuk danışmanına göster.

**Mac'te**

3. Xcode **16.3 ya da daha yeni** olmalı (Xcode > About Xcode). Daha eskiyse App Store'dan güncelle.
4. Her zamanki gibi: Pull, `sh scripts/ios-hazirla.sh`. Xcode açılınca paketleri indirir (Google Mobile Ads ve Firebase büyük; ilk sefer 5-10 dakika sürebilir, alttaki "Resolving/Fetching packages" bitene kadar bekle).
   `Missing package product` hatası çıkarsa: File > Packages > **Reset Package Caches**, sonra Product > **Clean Build Folder**.
5. Product > Archive > Distribute App. Derleme numarası projede 5.

**TestFlight'ta dene** (gerçek reklam çıkmaz: oyun TestFlight'ı tanır ve Google'ın "Test Ad" yazan deneme reklamlarını gösterir; satın alma TestFlight'ta ücretsizdir)

6. Ana ekran > dişli > en alttaki **Sandful 1.2** yazısına 5 kez dokun: tanı satırları açılır. Ekran görüntüsünü gönder. Beklenen:
   `eklenti: AdMo✓ Fire✓ Nati✓ AppR✓`, `reklam: test · ortam Sandbox · izin ✓`, `ürün: … 3,99 $` (ürün görünmüyorsa 1. adımdaki ürün hazır değildir).
7. 11. bölümü bitirip **Sonraki**'ye bas: tam ekran deneme reklamı çıkmalı, kapatınca 12. bölüm başlamalı. Sonraki iki bölümde çıkmamalı.
8. Bir bölümde geri almayı kullan, tekrar dök: ↶ düğmesi **+1 ▸** olur. Bas > **İzle**: deneme reklamı, sonra geri alma.
9. Ayarlar > **Reklamsız oyna** > satın al (ücretsiz): satır ✓ olur, reklam çıkmaz. Oyunu silip yeniden kur: açılışta kendiliğinden ✓ olmalı (ya da "Satın alımları geri yükle").
10. Firebase konsolu > Analytics > **Realtime**: birkaç dakika içinde `level_start`, `level_end` olayları görünmeli.

**Mağazaya gönderirken** (ayrıntılar `magaza/app-store-metinleri.md` > 1.2)

11. Sürüm sayfasında **In-App Purchases and Subscriptions** bölümünden `Reklamsiz` ürününü seç (ilk satın alma ürünü sürümle birlikte incelenir).
12. **App Privacy**'yi güncelle ("Data Not Collected" artık doğru değil) ve **Age Rating** anketinde reklam sorusunu "Yes" yap.
13. App Review notuna reklam ve satın alma açıklamasını yapıştır.

### Sorunlar

- **Xcode'da `Missing package product 'app_CapacitorApp'`** (9 Kasım 2026, depo yeni klasöre klonlandıktan sonra): File > Packages > **Reset Package Caches**, "Resolving packages" bitince Product > **Clean Build Folder**, sonra Archive. Olmazsa Xcode kapalıyken `rm -rf ~/Library/Developer/Xcode/DerivedData/App-*` ve `sh scripts/ios-hazirla.sh`.
- **Yüklenen derleme numarası projedekinden büyük çıkabilir:** Distribute App'teki "Manage Version and Build Number" açıkken Xcode numarayı kendisi artırır (1.1.1'de 3 yerine 4). Sonraki sürümde projedeki numara yüklenenin üstüne çıkarılır.

- **Pull sırasında `fatal: mmap failed: Operation canceled`** (3 Kasım 2026): depo iCloud'a eşitlenen `~/Documents` içindeydi;
  iCloud yer açmak için bazı dosyaları buluta taşıyınca git onları okuyamıyor ve güncelleme yarıda kalıyor (Changes listesinde değiştirilmiş dosyalar görünür).
  Çözüm: GitHub Desktop'ta Repository > **Remove…** ("Also move this repository to Trash" işaretli; her şey GitHub'da olduğu için bir şey kaybolmaz),
  sonra depoyu `~/Developer` gibi iCloud dışı bir klasöre yeniden klonla ve `claude/clever-wright-10sbmw` dalını seç.
  iCloud dışı klasör `npm ci`'nin kurduğu binlerce paket dosyasının buluta yüklenmesini de önler.
- **Changes listesinde `.DS_Store`**: Mac Finder'ın kendi dosyası; artık `.gitignore`'da, görünmez.

## Yedek yol: Codemagic (Mac gerekmez)

Mac'e erişemediğin zamanlar için kökteki `codemagic.yaml` hazır (Apple Kimliği işli). Kullanmak istersen:
App Store Connect API anahtarı oluştur, codemagic.io'ya `ozerkocak/Sandful`'ı ekle, anahtarı **DominoChase** adıyla
Integrations > App Store Connect'e bağla, Code signing identities'ten dağıtım sertifikası ve `com.investateknoloji.sandful` App Store profilini al,
sonra **Sandful · iOS → TestFlight** iş akışını başlat. Bu yolda derleme numarası otomatik artar.

## Mağazaya çıkarken (TestFlight'tan sonra)

Bütün alanların değerleri: `magaza/app-store-metinleri.md` (ad, alt başlık, açıklama, anahtar kelimeler, kategori, yaş anketi, gizlilik beyanı, inceleme notu).

1. **Gizlilik ve destek sayfası:** `magaza/site/` klasöründeki iki dosya şirket sitesinde `sandful` klasörüne yüklenir:
   destek `https://www.investa.com.tr/sandful/`, gizlilik `https://www.investa.com.tr/sandful/privacy.html`. Bu adresler App Store Connect'te Support URL ve Privacy Policy URL alanlarına girilir; Apple göndermeden önce açılıp açılmadığına bakar.
2. **Ekran görüntüleri:** `magaza/ekran-goruntuleri/en/` ve `tr/` (1.1'de 7'şer, 1206×2622). "iPhone with Dynamic Island (medium display)" kutusuna 01 → 07 sırasıyla sürüklenir.
3. **Metinler** İngilizce ve Türkçe sayfaya girilir, **Build** olarak TestFlight'taki derleme seçilir.
4. **App Privacy:** 1.1.1'e kadar "Data Not Collected"; 1.2'de reklam ve ölçüm verileri beyan edilir (`magaza/app-store-metinleri.md` > 1.2). **Age Rating:** 4+ (1.2'de reklam sorusu "Yes").
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

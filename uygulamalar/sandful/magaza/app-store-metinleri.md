# App Store sayfası (sürüm 1.1)

App Store Connect > Sandful > Distribution > **iOS App Version 1.1** ve **App Information** alanları.
1.0 yayında (2 Kasım 2026'dan beri 175 ülkede). 1.1'de değişen alanlar: **What's New**, tanıtım metni, açıklama, ekran görüntüleri (7 adet), inceleme notu ve **Content Rights** (aşağıda işaretli).
Birincil dil İngilizce (ABD); Türkçe yerelleştirmede (sağ üstteki dil menüsü > Türkçe) Türkçe sütun girilir.
Karakter sınırları kontrol edildi.

## 1.2: 130 bölüm, reklam ve Reklamsız (hazırlanıyor)

### Bu sürümde yenilikler (What's New)

**İngilizce**

```
100 new levels in five new worlds: Desert and Oasis, Garden and Flowers, Dessert Jars, City Skylines and Mountains.

• New ways to pour: wind that carries the sand, thin and wide spouts, wet sand that stands steep, and a divider card
• Build city skylines with glowing windows and sharp mountain peaks
• Decorations now nestle into the sand
• A new home screen for the longer journey

This version adds occasional ads between levels (never while you pour, and none in the first 10 levels) and a one-time "Play without ads" purchase.
```

**Türkçe**

```
Beş yeni dünyada 100 yeni bölüm: Çöl ve Vaha, Bahçe ve Çiçekler, Tatlı Kavanozları, Şehir Silüetleri ve Dağlar.

• Yeni döküş yolları: kumu savuran rüzgâr, ince ve geniş uç, dik duran ıslak kum ve ayırıcı kart
• Pencereleri ışıldayan şehir silüetleri ve sivri dağ zirveleri
• Süsler artık kumun içine yerleşiyor
• Uzun yol için yeni ana ekran

Bu sürümle bölümler arasına seyrek reklam (dökerken asla, ilk 10 bölümde hiç) ve tek seferlik "Reklamsız oyna" satın alması eklendi.
```

### Satın alma ürünü (Monetization > In-App Purchases)

| Alan | Değer |
|---|---|
| Type | Non-Consumable |
| Reference Name | `Reklamsiz` |
| Product ID | `com.investateknoloji.sandful.reklamsiz` |
| Price | 3,99 $ kademesi (Türkiye fiyatını Apple kademeden hesaplar; istersen elle ayarlanır) |
| Display Name (EN) | `Play Without Ads` |
| Description (EN) | `Removes the ads between levels. Extra undos, puffs and level skips no longer need an ad.` |
| Display Name (TR) | `Reklamsız Oyna` |
| Description (TR) | `Bölümler arasındaki reklamları kaldırır. Ek geri alma, üfleme ve bölüm geçme reklamsız olur.` |
| Review Screenshot | Ayarlar ekranı ("Reklamsız oyna" satırı görünen); Claude 1.2 ekran görüntüleriyle birlikte hazırlar |
| Review Notes | `Non-consumable purchase that removes interstitial ads. Open the home screen, tap the gear icon, then "Play without ads". "Restore purchases" is in the same sheet.` |

### Uygulama gizliliği (App Privacy) · 1.2

"Data Not Collected" kaldırılır. Hepsi için: **kimliğe bağlı değil** (Not Linked to You), **takip için kullanılmıyor** (Tracking: No; takip izni istenmiyor).

| Veri türü | Amaç | Kaynak |
|---|---|---|
| Location > Coarse Location | Third-Party Advertising, Analytics | Google reklamları IP adresinden yaklaşık konum çıkarır |
| Identifiers > Device ID | Third-Party Advertising, Analytics | Uygulamaya özel tanımlayıcı (AdMob, Firebase) |
| Usage Data > Product Interaction | Analytics | Bölüm ve ayar olayları (Firebase) |
| Usage Data > Advertising Data | Third-Party Advertising, Analytics | Reklam gösterimi ve etkileşimi (AdMob) |
| Purchases > Purchase History | Analytics | "Reklamsız alındı" olayı (ödeme bilgisi yok) |
| Diagnostics > Performance Data, Other Diagnostic Data | Analytics, App Functionality | Reklam ve ölçüm SDK'larının tanı verileri |

Google'ın güncel beyan rehberleri (göndermeden önce karşılaştır): AdMob "Apple App Store data disclosure", Firebase "Prepare for Apple's App Store data disclosure requirements".

### Yaş derecelendirmesi · 1.2

Anketteki reklam sorusu (Advertising / "Does your app contain ads?"): **Yes**. Diğer cevaplar aynı (None/No). Sonuç 4+ kalır. AdMob'da en yüksek reklam içerik derecesi **G**, hassas kategoriler kapalı.

### App Review notu · 1.2 (öncekine eklenir)

```
Version 1.2 adds ads (Google AdMob) and one non-consumable in-app purchase.
- Interstitial ads appear only after a level ends and the player taps "Next", never in the first 10 levels, and at most once every 3 levels.
- Rewarded ads are optional: after the free undo is used, the undo button shows "+1"; a confirmation card appears before the ad.
- In-app purchase "Play Without Ads" (com.investateknoloji.sandful.reklamsiz): home screen > gear icon > "Play without ads". "Restore purchases" is in the same sheet.
- The app does not request tracking permission (no ATT); ads are non-personalized. In the EEA/UK a Google consent form is shown before ads are requested.
- Usage statistics are collected with Google Analytics for Firebase without the advertising identifier.
```

### Yapılacaklar · 1.2

- Ekran görüntüleri (şehir, dağlar, tatlı, çöl; yeni ana ekran) ve gerekirse açıklama metni: bölümler onaylanınca Claude hazırlar.
- Tanıtım metni (Promotional Text) önerisi: `130 calm levels across eight worlds. Pour colored sand, shape dunes, cities and mountains.`

## 1.1.1: düzeltme sürümü (9 Kasım 2026)

1.1 yayında (9 Kasım'da "Ready for Distribution"). 1.1.1'de sadece iki şey değişiyor: süsün üstünde kum kulesi hatası düzeltildi ve **Marketing URL** eklendi
(AdMob, `app-ads.txt` dosyasını bu adresin alan adında arıyor). Metinler, ekran görüntüleri, anahtar kelimeler 1.1'den kopyalanır.

| Alan | İngilizce | Türkçe |
|---|---|---|
| What's New | `Sand no longer piles up on top of decorations: it slides off, and the decorations stay fully visible while you pour.` | `Kum artık süslerin üstünde birikmiyor: kenardan kayıyor, döküş sırasında süsler tamamen görünüyor.` |
| Marketing URL | `https://www.investa.com.tr` | `https://www.investa.com.tr` |
| Build | 1.1.1 (3) | |

## 1.1: Bu sürümde yenilikler (What's New, 4000)

### İngilizce

```
• 20 new scenes in two new worlds: Ocean and Four Seasons (30 in total)
• New ways to pour: draw with a stick, color-fading sand, rocking jars and sand that glows in the dark
• Finished jars come alive for a moment
• Undo your last color once per jar
• A new home screen with your shelf, your worlds and what to play next
• A real recorded sand sound and marimba music
```

### Türkçe

```
• İki yeni dünyada 20 yeni sahne: Okyanus ve Dört Mevsim (toplam 30)
• Yeni döküş yolları: çubukla çizme, renk değiştiren kum, sallanan kavanoz ve karanlıkta ışıldayan kum
• Biten şişeler bir an canlanıyor
• Her şişede son rengi bir kez geri alma
• Rafın, dünyaların ve sıradaki bölümün olduğu yeni ana ekran
• Gerçek kum kaydı ve marimba müziği
```

## Ad, alt başlık, tanıtım metni, anahtar kelimeler

| Alan (sınır) | İngilizce (ana) | Türkçe |
|---|---|---|
| Name (30) | Sandful: Relaxing Sand Art | Sandful: Relaxing Sand Art |
| Subtitle (30) | Pour sand, build calm scenes | Kum dök, sakin manzaralar kur |
| Promotional Text (170) | Now with 30 handcrafted scenes in three worlds. Hold to pour colored sand into a glass jar and watch a calm landscape appear, layer by layer. | Artık üç dünyada 30 el yapımı sahne. Basılı tut, renkli kum cam kavanoza aksın; sakin bir manzara katman katman ortaya çıksın. |
| Keywords (100) | `asmr,zen,jar,bottle,layers,landscape,antistress,satisfying,cozy,chill,meditation,mindful,color,glass` | `asmr,zen,şişe,kavanoz,katman,rahatlatıcı,stres,huzur,renkli,tatmin,meditasyon,sanat,boyama,cam` |

Tanıtım metni sürüm göndermeden de değiştirilebilir; ad, alt başlık ve anahtar kelimeler 1.1'de aynı kalıyor.
Anahtar kelimelerde addaki ve alt başlıktaki kelimeler tekrar edilmedi (Apple onları zaten arar); virgülden sonra boşluk yok.

## Açıklama (Description)

### İngilizce

```
Sandful is a calm, hands-on sand art game.

Hold your finger on the screen and colored sand flows from a little funnel. Move the funnel left and right, follow the faint lines on the glass, and a landscape slowly appears inside the jar: a beach, a lighthouse, a whale, a tulip field, a snowy village, the northern lights.

The sand behaves like the real thing. It piles up where you wait, spreads thin when you sweep, and slides down the slope when it gets too steep. Every grain whispers as it lands, and your phone ticks softly in your hand.

• 30 handcrafted scenes in three worlds: Coast & Land, Ocean and Four Seasons
• Realistic sand that piles, spreads and slides
• Draw waves, rain and bunches of grapes with a stick, the way sand artists do
• Sand that fades from one color to another as you pour
• Rocking jars in stormy scenes, and sand that glows in the dark
• Little details to place: a lighthouse, a whale, a cherry tree, a snowman
• Every finished jar comes alive for a moment before it joins your shelf
• A real recorded sand sound, soft marimba music and gentle haptics
• Undo your last color once per jar
• No timers, no pressure: play at your own pace
• Plays offline, no account needed
• English and Turkish

Pour, breathe, relax.
```

### Türkçe

```
Sandful sakin, elle oynanan bir kum sanatı oyunu.

Parmağını ekranda tut, küçük bir huniden renkli kum aksın. Huniyi sağa sola gezdir, camdaki silik çizgileri izle; kavanozun içinde yavaş yavaş bir manzara belirsin: kumsal, deniz feneri, balina, lale tarlası, karlı bir köy, kuzey ışıkları.

Kum gerçek kum gibi davranır. Beklediğin yerde yığılır, hızlı gezdirince ince serilir, yamaç dikleşince aşağı kayar. Her tane düşerken hışırdar, telefonun avucunda hafifçe tıklar.

• Üç dünyada 30 el yapımı sahne: Kıyı ve Kara, Okyanus, Dört Mevsim
• Yığılan, serilen ve kayan gerçekçi kum
• Kum sanatçıları gibi çubukla dalga, yağmur ve üzüm salkımı çiz
• Döktükçe bir renkten ötekine geçen kum
• Fırtınada sallanan kavanozlar, karanlıkta ışıldayan kum
• Yerine bırakılan küçük süsler: deniz feneri, balina, kiraz ağacı, kardan adam
• Biten her şişe rafına girmeden önce bir an canlanır
• Gerçek kum kaydı, yumuşak marimba müziği ve hafif titreşim
• Her şişede son rengi bir kez geri alma
• Süre yok, baskı yok: kendi temponda oyna
• İnternetsiz çalışır, hesap gerekmez
• Türkçe ve İngilizce

Dök, nefes al, rahatla.
```

## Ekran görüntüleri

`ekran-goruntuleri/en/` (İngilizce sayfa) ve `ekran-goruntuleri/tr/` (Türkçe sayfa): 1.1 için 7'şer adet, 1206×2622 (6.3" iPhone).
Sıra: 01 ana ekran, 02 kuzey ışıkları, 03 gün batımı, 04 yağmur (çubuk), 05 ilk kar (sallanan kavanoz), 06 lale tarlası (renk geçişi), 07 karlı köy (süs).
App Store Connect'te 1.1 sayfasında **iPhone with Dynamic Island (medium display)** kutusundaki eski 6 görüntüyü sil (üstüne gelince çıkan ×), yenileri tek tek 01 → 07 sırasıyla sürükle; Apple diğer iPhone'lar için kendisi ölçekler.
(Ekim 2026: bu kutu 1179×2556 ya da 1206×2622 kabul ediyor; 1290×2796 "File dimensions are invalid" hatası verdi.)
Uygulama sadece iPhone için olduğundan iPad ekran görüntüsü istenmez.

## Diğer alanlar

| Alan | Değer |
|---|---|
| Category | Primary: **Games**, alt kategoriler **Casual** ve **Puzzle**. Secondary (isteğe bağlı): Entertainment |
| Copyright | `2026 Investa Teknoloji A.Ş.` |
| Price | Free (ücretsiz) |
| Availability | Bütün ülkeler (oyun internetsiz, veri toplamıyor). Domino'daki gibi sınırlamak istersen Türkiye, ABD ve Avrupa |
| Support URL | `https://www.investa.com.tr/sandful/` (yayında, 13 Ekim 2026) |
| Privacy Policy URL | `https://www.investa.com.tr/sandful/privacy.html` (yayında, 13 Ekim 2026) |
| Marketing URL | Boş bırakılabilir |
| Content Rights | **1.1'de değişir:** "Yes, it contains, shows, or accesses third-party content, and I have the necessary rights". Kum sesi Pixabay kaydı (Pixabay İçerik Lisansı), müzik VSCO-2 Community Edition örnekleri (CC0); ikisi de ticari kullanıma açık. (1.0'da "Does not contain…" idi; o sürümde ses tamamen sentezdi.) |
| Version / Build | 1.1 / TestFlight'taki 2 numaralı derleme (1.0'da 1) |
| Sign-in required | Hayır |

## Yaş derecelendirmesi (Age Rating)

Bütün sorulara **None / No**: şiddet, korku, cinsellik, küfür, alkol-sigara-uyuşturucu, kumar ve şans oyunu, sağlık konuları,
kullanıcı içeriği, mesajlaşma, sınırsız web erişimi, reklam (1.0'da yok), ebeveyn denetimi ve yaş doğrulama yok. Sonuç: **4+**.
Kids (çocuk) kategorisi seçilmez.

## Uygulama gizliliği (App Privacy)

"Do you or your third-party partners collect data from this app?" → **No, we do not collect data from this app**.
Sonuç: "Data Not Collected". (1.1'de reklam eklenirse güncellenir: `fikirler/03-sandful-gelir.md`.)

## App Review bilgileri

| Alan | Değer |
|---|---|
| Sign-in required | Kapalı |
| Contact | Senin adın, telefonun, e-postan (sadece Apple görür) |
| Notes | Aşağıdaki metin |

```
Sandful is fully offline and needs no account.
Hold your finger anywhere on the screen to pour sand; drag left and right to move the funnel. Lift your finger to stop.
In some levels a decoration (boat, lighthouse, tree) appears under the funnel: drag it over the dashed ring and lift your finger.
In stick levels, drag down along the dashed V lines to draw with the stick.
The home screen shows all levels; the gear icon opens the settings (sound, music, sand sound, haptics, language). In a level, the button at the top left returns to the home screen.
Sound credits: sand recording "Pouring Sand onto Sand" from Pixabay (Pixabay Content License); marimba and glockenspiel samples from VSCO-2 Community Edition (CC0).
```

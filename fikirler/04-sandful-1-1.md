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

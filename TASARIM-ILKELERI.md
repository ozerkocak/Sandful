# Tasarım ilkeleri

Bu dosya bütün oyunlar için ortak kuralları toplar. Kaynağı Domino Chase'in 14 prototipi ve Ozer'in her birine verdiği geri bildirim
(ayrıntı: `Domino-Game-` reposunda `TASARIM-NOTLARI.md`). Yeni bir oyun ya da geri bildirim geldikçe güncellenir.

## Hedef his

> Oynarken rahatlıyorsun ama beynin boşta kalmıyor. Ekranda hep bir şey akıyor, sen küçük kararlarla o akışı yönlendiriyorsun.
> Her hamle kulağa ve ele güzel geliyor; bölüm sonunda emeğin büyük bir gösteriyle ortaya çıkıyor.

## Değişmeyen şartlar

1. **Dinamik akış.** Ekranda hep bir şey oluyor, el hiç boşta kalmıyor. Tek dokunuşla biten ya da durup bekleyen yapı olmaz.
2. **Gerçek ama kısa düşünme.** Birkaç saniyelik kararlar. Durup uzun uzun düşündüren bulmaca olmaz (Domino 02).
3. **Oyuncunun girdisini asla durdurma.** Gerilim engelle değil, kovalayan ya da akan bir şeyle yaratılır (Domino Chase sürüm 3).
4. **Yorma, cezalandırma.** Hata birikir ama her hata oyunu bitirmez. Kötü oyun "kaybettin" değil, "daha az güzel sonuç" demek.
5. **Kararın kendisi sonucu belirler.** Bulmacayı ana mekaniğin üstüne eklenmiş kural (renk kapısı, makas) gibi kurma;
   oyuncunun yaptığı şey ortaya çıkan desenin, resmin, melodinin şeklini belirlesin.
6. **Haz üçlüsü:** ses ve ritim, desen ortaya çıkması, büyük final. Her oyunda üçü de olmalı.
7. **Görsel stil:** 3D ya da 3D hissi veren, ışık ve gölgeli sahneler (Domino 07'den itibaren beğenilen stil).
8. **Kopya değil.** Trend oyunlardan hissi al, yapıyı alma. Özellikle Pixel Flow üçlüsü (resim temizleme + çevrede dönen pist + renkli birimleri gönderme) birlikte olmaz.
9. **Bilinen bir türün kaplaması olmaz** (Tetris, Puyo, blok bulmaca, 3'lü eşleştirme).
10. **Kısa bölüm:** 20-45 sn. İlk 3 bölüm herkes için kolay; zorluk sonra açılır ve strateji fark yaratır.
11. **Global oyun.** Domino Chase gibi her oyun dünyaya çıkar: uygulama adı ve mağaza başlığı İngilizce, Türkiye'ye özel ad ya da alt başlık olmaz (Sandful).
    Arayüz İngilizce ve Türkçe; telefonun diliyle açılır, oyun içinden değişir. Metinleri baştan `t()` ile yaz, oyunu kelime okutmadan anlaşılır kur.

## Domino'dan çıkan dersler

| Ne işe yaradı | Nerede |
|---|---|
| Akan bir şeyi parmakla kendin sürmek rahatlatıyor | Domino 05, 14 |
| Ekranın her yerinden sürükleme; parmağın 72 px altında tutma halkası, böylece parmak çizgiyi kapatmıyor | Domino Chase |
| Arkadan kovalayan bir şey: durursan yetişir, ama hiçbir zaman seni durdurmaz | Domino Chase sürüm 3 |
| Silik bir şekli izlemek ve hattın kendisinin desene dönüşmesi | Domino 14 |
| Her doğru hamlenin bir nota çalması, tanıdık melodiler, seriyle müziğe katman eklenmesi | Domino Chase sürüm 2 ve 4 |
| Büyüme ve sonda büyük yıkım | Domino 08 |
| Kıl payı kurtulmada kısa ağır çekim, yıldızların tek tek patlaması, şok dalgası, konfeti | Domino Chase |
| Risk-ödül sapmaları (3. yıldız için riskli bloklar, kenar tarlası) | Domino Chase |

## Prototiplerden çıkan dersler

| Ders | Nerede |
|---|---|
| Benzerlik puanını oyuncunun ekranda gördüğü şeye göre ölç. Büyük ve kolay bir bölge hücre sayımında hataları sulandırır, düşünmeden oynayan da yüksek puan alır | Kum Şişesi: gökyüzü katmanı yüzünden süpüren bot %94 alıyordu; çizgi uzaklığına geçince %70'e indi |
| Zorluk ayarında önce "hiç dokunmayan" ve "düşünmeden oynayan" botun yıldız alamadığını, kusursuz botun her bölümde tam puan alabildiğini doğrula | Kum Şişesi |
| 2D'de ışık-gölge taklidi yetmiyor; Ozer gerçek 3D sahne istiyor (cam, masa, ışık, yansıma). "3D hissi" yerine baştan 3D kur | Kum Şişesi sürüm 1 → 2 |
| Tanecik fiziğinde üç şart: hareket eden tane komşularını uyandırır, yüzeydeki taneler hiç uyumaz, düşen tane çarptığı anda saçılır. Biri eksikse dik yerler takılı kalır ya da akışın altında havada kule oluşur | Kum Şişesi sürüm 2 |
| Fizik değişince zorluk da değişir: daha gerçekçi yayılan kum, hiç dokunmayan oyuncuya bile yıldız kazandırdı. Fizik her değiştiğinde bot tablosunu yeniden çalıştır | Kum Şişesi sürüm 2 |
| Cam gerçekte neredeyse görünmez: yansıma sadece kenarlarda, bir-iki ince ışık çizgisi. Bütün yüzeye yansıma eklemek camı "lamba" yapar | Kum Şişesi sürüm 2 → 3 |
| Rahatlatan oyunda akışı oyuncu yönetsin (basılı tut = dök, bırak = dur). Baskıyı kaldırır, durup düşünmeye izin verir | Kum Şişesi sürüm 3 |
| Hücreden hücreye zıplayan tanecikler "dijital" görünür. Kum sanatı hissi için yumuşak, kesirli yükseklikli bir model ve ince doku daha iyi | Kum Şişesi sürüm 3 |
| Süs gibi eklemeler başarı puanını bozmamalı; kendi ölçütüyle (halka) ayrıca değerlendirilir | Kum Şişesi sürüm 3 |
| Katman sınırları tane ölçeğinde keskin olmalı. Renkleri karıştırarak (doğrusal süzme) çizmek sınırı kirli ve bulanık gösterir; her pikselde tane merkezinin hangi katmanda olduğuna bak | Kum Şişesi sürüm 3 → 4 |
| Boğuk ses = enerjinin çoğu 500 Hz altında. Kum ve tane sesi 1,5-6 kHz'de toplanmalı: binlerce kısa rezonans, hafif yankı. Sesi duyamıyorsan spektrumunu ölç | Kum Şişesi sürüm 3 → 4 |
| Camı gerçekçi gösteren yansıma değil kırılma: arkadaki görüntü kenarlara doğru hafifçe bükülür ve kalın yerde biraz kararır. Kırılmayı abartma, kenardaki kum uzayıp halka halka görünür | Kum Şişesi sürüm 4 |
| Akan ince bir şeyi (kum, su) sabit kalınlıkta düz şerit çizme: yuvarlak gölgele, dokusu düşüşle aynı hızda aksın, uçları akış hızıyla incelsin, kıvrılınca eğriyle doldur, çevresinden tane koparsın | Kum Şişesi sürüm 4 → 5 |
| Yüzeyde kayan taneler yüzeyle aynı renkteyse görünmez; bir ton açık yap. Çarpmayı küçük bir sıçrama tacıyla göster | Kum Şişesi sürüm 5 |
| Ses geri bildirimi belirsizse tahminle değiştirmeye devam etme: oyunun içine seçenek koy (rafta kum sesi, müzik ayrı kapatılır), Ozer hangisini seçtiğini söylesin | Kum Şişesi sürüm 5 |
| Sürekli çalan döngü sesin tekrarı duyulur; uzun tampon ve iki çalarla (farklı yer, farklı hız) tekrarı kır | Kum Şişesi sürüm 5 |
| "Cızırtı" = binlerce tık. Gürültüyle tetiklenen kısa tanelerle yapılan ses frekansı ne olursa olsun cızırdar. Sürekli sesleri tıksız yap: yumuşak zarflı sinüs taneleri, dar bantlı süzülmüş hışırtı, 4 kHz üstünü kes. Döngü dikişinde çıt olmasın | Kum Şişesi sürüm 5 → 6 |
| Zıtırtının ölçüsü basıklıktır (kurtosis): pürüzsüz hışırtıda ~3, 5'in üstü kulağa zıtırtı gelir. Kısa ve sert başlayan taneler basıklığı yükseltir. Sürekli sesleri yumuşak zarflı ya da süzülmüş gürültüyle yap, basıklığı ölç | Sandful 1.1 (Ozer: "çok zıtırtı gibi") |
| Gerçekçilik için davranış da gerekir, sadece görüntü değil: kum yamacı dikleşip küçük kaymalarla yatmalı (tutun-kay) | Kum Şişesi sürüm 6 |
| Oyuncunun yerleştirdiği nesneler (süs) hacim kaplıyorsa malzeme miktarından düş; yoksa sonuç hedefin üstüne taşar ve kusursuz oyun bile cezalanır | Kum Şişesi sürüm 6 |
| Uygulamaya çıkmadan önce: ikinci parmak ve dokunma iptali (sistem hareketleri) ayrı ele alınır, ekranda yazan sayı ile ödülü belirleyen sayı aynı yuvarlanır, kayıt iki kopya tutulur ve birleştirilirken en iyisi alınır, ağır hesap küçük parçalara bölünür, bölüm değişince grafik kaynakları temizlenir | Kum Şişesi sürüm 7 (bağımsız kod incelemesi) |

## Reddedilmiş yönler

| Yön | Neden |
|---|---|
| Önü açık parçaları dokunarak kaldırma (tap-away) | Dinamik değil (Domino 06) |
| Birleştir + bekle (merge/idle) | Beğenilmedi (Domino 10) |
| Düşen parçaları eşleştirme | Tetris'e döndü, ana haz kayboldu (Domino 13) |
| Akanları makaslarla doğru yere yönlendirme | Dinamik ama sıkıcı (Domino 07) |
| Sınırlı hamleyle gizli resmi açma | Fazla bulmaca, durup düşündürüyor (Domino 02) |
| Konveyörde dönen renkli birimlerle resmi temizleme | Pixel Flow'a çok benziyor (Domino 01, 11, 12) |
| Girdiyi durduran sınır ("Bekle") | Akışı kesiyor, kafa karıştırıyor (Domino Chase sürüm 2-3) |

## Ses ve titreşim rehberi

Telefonda "güzel his" üç katmanda verilir. Her oyun tasarımında bu tablo doldurulur.

| Katman | Sıklık | Ses | Titreşim |
|---|---|---|---|
| **Mikro** | Her hamle (saniyede birkaç kez) | Kısa, yumuşak, tonlu (nota, tık, tane) | Çok hafif (LIGHT), saniyede en fazla ~15-20 |
| **Orta** | Birkaç saniyede bir (seri, bölge tamamlama) | Akor, yükselen arpej, yeni müzik katmanı | Orta (MEDIUM), tek atım |
| **Makro** | Bölüm sonu, final | Melodinin tamamı, büyük çökme ya da açılma sesi | Güçlü (HEAVY) ve desenli dizi |

- Ses Web Audio ile çalınır. Sentez yetmediğinde gerçek kayıt kullanılır: Sandful 1.1'de müzik CC0 marimba/glockenspiel kayıtlarıyla, kum sesi gerçek kum kaydıyla (sentezle üç denemede beğenilmedi). Kayıtlar küçük tutulur (mono, düşük örnekleme, MP3) ve dosyaya gömülür; lisansı CC0 ya da kendi kaydımız olmalı.
  Pentatonik ya da tanıdık telifsiz melodiler; yanlış hamle sert bir ses değil, sadece "sessizlik" ya da kuru bir tık.
- Ortam sesi (rüzgâr, gece böcekleri, yağmur) çok düşük seviyede sürekli çalar; rahatlamayı o taşır.
- Sürekli sesler (akış, hışırtı) boğuk olmasın: alçak frekansı kes, parlak ama yumuşak tut (sert tiz de yorar). Müzik ve efektler hafif bir oda yankısından geçerse daha sakin duyulur.
- Titreşim seviyeleri: hafif < 14 ms, orta 14-50 ms, güçlü ≥ 50 ms (Domino Chase'teki `vib()` eşlemesi). Uygulamada Capacitor Haptics `impact` kullanılır.
- Titreşimi abartma: sürekli titreşim yorucu. Mikro katmanı sesle eşle, ama hızlı akışta seyrelt.
- Ayarlarda ses ve titreşim ayrı ayrı kapatılabilir.
- iPhone ses kilidi: ilk dokunuşta sessiz WAV + her dokunma aşamasında `AudioContext.resume()`.

# 09 · Sandful 1.2: reklam, Reklamsız satın alma ve ölçüm (uygulanan kurallar)

> Ozer (11 Kasım 2026): "130 bölümle devam edelim, Firebase ve reklama geç. Reklamlar insanları bunaltmasın ama."

Önceki kararlar (`08-sandful-1-2.md`): takip izni (ATT) penceresi yok, reklamlar kişiselleştirilmemiş; satın alma sadece **Reklamsız** (tek seferlik, ~3,99 $).
Değişmeyen kural (`03-sandful-gelir.md`): para kazanma rahatlamayı bozmaz. Banner yok, döküş sırasında hiçbir şey çıkmaz, yıldız satılmaz.

## Geçiş reklamı (tam ekran): seyrek ve sadece bölüm arasında

| Kural | Değer | Neden |
|---|---|---|
| İlk reklamsız bölümler | **İlk 10 bölümde hiç yok** (ilk dünya) | Oyuncu önce oyunu sever. Önceki plan 6. bölümdü; "bunaltmasın" için 10'a çekildi |
| Ne zaman | Sadece bölüm bitip **Sonraki**'ye basılınca | "Tekrar"da, açılışta, rafa dönerken, bölüm içinde asla |
| Sıklık | **3 bölümde bir**; iki reklam arasında en az **90 saniye** | Art arda iki bölümde reklam çıkmaz; ödüllü reklam izleyen oyuncuya hemen geçiş reklamı gelmez |
| Günlük sınır | **En fazla 12** | Uzun oynayan oyuncu yorulmaz |
| Hazır değilse | Hiç gösterilmez | Reklam yüklensin diye bekletme, dönen simge yok |
| Reklamsız alındıysa | Hiç yok | |

Bir bölüm 30-40 saniye sürdüğü için bu yaklaşık 2 dakikada bir reklam demek; 15 dakikalık oturumda 6-7 (türdeki oyunların çoğu her bölümde ya da 30-45 saniyede bir gösteriyor).
Sayılar oyun dosyasında tek satırda (`REKLAM`); ölçüm sonuçlarına göre değiştirilebilir.

> **Ozer (11 Kasım 2026, ilk sürümden sonra):** "Geri alma bence bu oyunda gitmez… Belki 2-3 bölümde bir reklam çıkabilir. Geri almalık bir durum olmayabilir burada."
> İlk ayar 4 dakika ve 3 bölümdü (pratikte 5 bölümde bir), günlük 8. Ozer haklı: bu oyunda hata tek bir hamle değil, yüzde düşüyor; ücretsiz geri alma çoğu durumu karşılıyor,
> ödüllü geri almayı az kişi ister. Gelirin asıl kaynağı geçiş reklamı olacağı için sıklık **3 bölümde bir**e çekildi (4 dakika şartı kalktı, 90 saniye taban kaldı), günlük sınır 12 oldu.
> İlk 10 bölüm yine reklamsız. Ödüllü haklar duruyor (kimseyi rahatsız etmiyor, kaç kişinin istediği ölçümde görünecek); gelir beklentisi onlardan değil.
> 2 bölümde bire inmek tek sayı değişikliği; önce 3 ile geri dönüş (D1/D7) ve bölüm hunisi ölçülecek.

## Ödüllü reklam: sadece oyuncu isterse

| Hak | Ne zaman | Sınır |
|---|---|---|
| **+1 geri alma** | Bölümdeki ücretsiz geri alma kullanıldıktan sonra ↶ düğmesi "+1" olur | Bölüm başına 3 |
| **+1 üfleme** | Üflemeli bölümde haklar bitince 💨 düğmesi "+1" olur | Bölüm başına 2 |
| **Bölümü geç** | Bölüm 0 yıldızla bittiğinde (sonraki bölüm açılmıyor) sonuç ekranında | Yıldız vermez, sadece sonraki bölümü açar |

- Düğmeye basınca önce küçük bir onay kartı çıkar ("Kısa bir reklam izle, +1 geri alma kazan" · İzle / Vazgeç): reklam yanlışlıkla başlamaz.
- Reklam hazır değilse ya da yüklenemezse hak **yine verilir** ("Reklam yok, bu seferlik bizden"). Oyuncu bizim sorunumuz yüzünden cezalanmaz.
- Reklam yarıda kapatılırsa hak verilmez.
- Reklamsız alan oyuncu bu hakları reklamsız, aynı sınırlarla alır.

## Reklamsız (tek seferlik satın alma)

- Ürün kimliği: `com.investateknoloji.sandful.reklamsiz` (Non-Consumable). Ad ve fiyat mağazadan okunur, oyunda sabit fiyat yazmaz.
- Yeri: Ayarlar > **Reklamsız oyna** ve **Satın alımları geri yükle**. Üçüncü geçiş reklamından sonra bir kez kısa bir hatırlatma ("Reklamları Ayarlar'dan kaldırabilirsin").
- Açılışta mağazadaki satın alma kontrol edilir; telefon değişince ya da oyun silinip kurulunca kendiliğinden geri gelir.

## Avrupa onayı (Google UMP) ve gizlilik

- Onay penceresi açılışta değil, reklamların başlamasına yakın (8 bölüm bitince) ve sakin bir anda (ana ekranda) gösterilir. Onay verilmeden reklam istenmez.
- Onay gereken bölgelerde Ayarlar'da **Gizlilik seçenekleri** satırı çıkar (seçimi değiştirme). Herkes için **Gizlilik politikası** bağlantısı var.
- Firebase ölçümü reklam kimliği (IDFA) olmadan kurulur.

## Ölçüm (Firebase Analytics)

Kişisel veri yok: ad, e-posta, konum toplanmaz. Olaylar:

| Olay | Ne zaman | Bilgi |
|---|---|---|
| `level_start` | Bölümde ilk dokunuş | bölüm, dünya, mekanikler |
| `level_end` | Bölüm bitince | bölüm, dünya, yüzde, yıldız, süre, geri alma ve üfleme sayısı |
| `level_retry`, `level_quit` | Tekrar başlatma; bölüm ortasında rafa dönme | bölüm, ne kadarı dökülmüştü |
| `level_skip` | Bölüm geçilince | bölüm |
| `mechanic_intro` | "Yeni" kartı görülünce | mekanik |
| `ad_interstitial`, `ad_offer`, `ad_rewarded`, `ad_free` | Geçiş reklamı; ödül kartı açıldı; ödül kazanıldı; reklam yokken verildi | bölüm, hangi hak |
| `noads_buy`, `noads_restore` | Satın alma ve geri yükleme | sonuç |
| `setting_change` | Ses, müzik, kum sesi, titreşim, dil | ayar, değer |

Bununla cevaplanacak sorular: oyuncular hangi bölümde bırakıyor, hangi bölüm çok tekrar ediliyor, reklam geri dönüşü düşürüyor mu, kaç kişi ödüllü hakları kullanıyor.

## Puan isteme

Apple'ın kendi penceresi; ilk kez 12. bölümden sonra üç yıldızlı bir bitişte, reklam gösterilmeyen bir anda. Apple yılda en fazla üç kez gösterir.

## Deneme

- TestFlight'ta ve Apple incelemesinde Google'ın **test reklamları** çıkar; gerçek reklam sadece App Store sürümünde. Oyun deneme ortamını iki kaynaktan anlar, biri "deneme" derse deneme sayar:
  uygulamanın açılışta yazdığı işaret (`AppDelegate.swift`: mağaza makbuzunun adı `sandboxReceipt` ise deneme; oyun `sandful_ortam` anahtarından okur) ve StoreKit'in uygulama kaydı.
  İlk yüklemede (1.2 (5)) sadece StoreKit kaydına bakılıyordu; TestFlight'ta okunamadı ve oyun **gerçek** reklam istedi. İşaret 1.2 (6) ile geldi.
- Ayarlar'da sürüm yazısına 5 kez dokununca tanı satırları açılır (eklentiler, deneme ortamı, onay durumu, reklam hazır mı, ürün fiyatı, mağaza ülkesi); sorun olursa ekran görüntüsü yeter.
  Altında iki deneme düğmesi çıkar (oyuncu görmez): **Deneme reklamı** (ortam anlaşılamazsa reklamları elle deneme moduna alır, telefonda kalıcı) ve
  **Satın almayı yok say** (sadece o oturumda; TestFlight'ta yapılan satın alma geri alınamadığı için, satın aldıktan sonra da reklamları deneyebilmek için).
- Tarayıcı önizlemesinde gerçek reklam yok; yerine 2 saniyelik "Reklam (önizleme)" kartı çıkar, sıklığı böyle denenebilir.

## İlk sayılar (yayından sonra)

- **24 Kasım 2026, AdMob (1.2'nin ilk dört günü, uygulama toplamı):** 28 istek, eşleşme %100, 6 gösterim (gösterim oranı %21), 0 tıklama, tahmini kazanç 6,90 TL, gözlemlenen eBGBM 1.149 TL (6 gösterimle anlamlı değil).
  12 etkin kullanıcı, 6'sı reklam gördü; günlük ortalama 5 etkin kullanıcı, günlük kullanıcı başına 0,26 gösterim ve 0,26 TL.
  Okuma: reklamlar gerçek oyuncuda çalışıyor ve her istek karşılanıyor. Sayı karar verdirmez. İki not: (1) günlük kullanıcı başına gösterim çok düşük; oyuncuların çoğu henüz reklamsız ilk 10 bölümde olabilir, bölüm hunisine bakılacak.
  (2) Gösterim oranı düşük, çünkü oyun ödüllü reklamı her açılışta önceden yüklüyor ama çok az kişi istiyor; 1.3'te ödüllü reklam ancak "+1" düğmesi göründüğünde yüklenmeli (boşa istek azalır).
- **24 Kasım 2026, Firebase (17-23 Kasım; TestFlight denemeleri ve Apple incelemesi de içinde):** 20 kullanıcı (ABD 11, Türkiye 4, Rusya 2, Almanya, Birleşik Krallık, Singapur 1'er), günde 4-6 etkin kullanıcı, 31 oturum.
  `level_start` 174, `level_end` 149 (%86'sı bitiyor), `level_retry` 34, `level_quit` 8; etkin gün başına ~6 bölüm ve ~5 dakika. `ad_interstitial` 4, `ad_impression` 6, `ad_offer` 21, `ad_free` 10, `ad_rewarded` 2;
  `noads_buy` 6 ve `noads_restore` 5 (gerçek satın alma yok, gelir 0: denemeler ve inceleme). Çökme yok. Ertesi gün geri dönüş grafiği ~%10 gösteriyor ama 20 kişilik, içinde incelemeciler olan bir grup için okunamaz.
  Okuma: oynayan kişi oturumda kalıyor (başlanan bölümlerin çoğu bitiyor). Hangi bölümde bırakıldığı görünmüyor, çünkü olay parametreleri (level, world, stars, reward...) Firebase'de özel boyut olarak kayıtlı değil;
  kayıt geriye dönük işlemediği için hemen yapılmalı.
- **25 Kasım 2026, Firebase özel tanımları:** olay kapsamlı boyutlar `level`, `world`, `stars`, `reward`, `result`, `where`, `mech`; ölçüler `pct`, `sec` (Standard). Kayıt bu tarihten sonraki veriye işler.
  (`world` ilk girişte `word` parametresine bağlanmıştı; aynı gün düzeltildi.) Sırada: ABD'de Apple arama reklamlarıyla ~140 dolarlık deneme (Ozer onayladı).

## İlk ücretli deneme: Apple arama reklamları, ABD (25 Kasım - 2 Aralık 2026)

Amaç kazanmak değil, bir Amerikalı oyuncunun kaça geldiğini ve oyunda ne yaptığını görmek. Ozer'in kararı: "140 dolar riske edebiliriz."

- Hesap: Apple Ads Advanced, para birimi USD, saat dilimi Europe/Istanbul. Kampanya `US Search Test`: Search Results, sadece ABD, günlük bütçe 20 $, 25 Kasım 13:00 - 2 Aralık 13:00 (7 gün, ~140 $), teklifler elle (Manage Bids).
- Reklam grubu `Sand keywords`: varsayılan en yüksek dokunuş teklifi 1,00 $ (Apple'ın önerisi 1,65 $; bilerek altında başlandı), Search Match açık, kitle "Reach All Eligible Users", reklam varsayılan mağaza sayfası (ilk üç ekran görüntüsü).
- 18 anahtar kelime. Broad, 1,50 $: sand art, sand art game, sand painting, colored sand. Exact, 1,50 $: sand game, sand games. Exact, 1,00 $: sand, sand fill, sand block, relaxing games, calming games, calm games,
  satisfying games, asmr games, zen games, cozy games, stress relief games, anti stress games. Eklenmeyenler: sandbox (başka tür), sand sort, sand loop, sandcastles, disk clash, oyunun kendi adı (adıyla arayan zaten buluyor).
- Bakılacaklar: iki gün sonra harcama (günde 10 $'ın altındaysa teklif yükseltilir), arama terimleri raporu (ilgisiz terimler negatif kelime yapılır); sonunda indirme başına maliyet,
  Firebase'de bu oyuncuların bölüm hunisi, ertesi gün geri dönüşü ve oyuncu başına reklam geliri.
- 25 Kasım 2026: kampanya oluşturuldu, Apple'ın kontrolünden geçti ve aynı gün "Running" oldu. İlk bakış 27 Kasım'da (harcama ve Search Terms).
- **26 Kasım 2026, ilk bakış (yaklaşık bir gün; rapor saat dilimi UTC, üç saate kadar gecikmeli):** harcama **1,49 $**, **70 gösterim, 1 dokunuş, 0 indirme**.
  Gösterimlerin tamamı üç broad kelimeden: `sand art` 64 (1 dokunuş, 1,49 $), `sand art game` 5, `colored sand` 1. **On dört exact kelimenin hepsi ve Search Match 0 gösterim.**
  Okuma: günlük 20 $ bütçenin %7'si harcandı; teklifler açık artırmayı kazanamıyor (tek dokunuş 1,49 $'a, yani 1,50 $'lık tavanın dibinde geldi). Bu hızla deneme hiçbir şey öğretmez.
  Öneri (Ozer'e verildi): kum kelimeleri 2,50 $, genel rahatlama kelimeleri 2,00 $, reklam grubu varsayılanı (Search Match) 1,50 $; ertesi gün harcama ve arama terimlerine yeniden bakılır.

## Android (25 Kasım 2026)

Kurallar aynı; sadece kimlikler ayrı. AdMob'da Android uygulaması ve iki birim (`uygulamalar/sandful/admob.json`), Firebase'de aynı projede Android uygulaması.
Android'e özel kararlar (bekleyen ödeme, deneme ortamı, geri tuşu): `10-sandful-android.md`.

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

- TestFlight'ta ve Apple incelemesinde Google'ın **test reklamları** çıkar (oyun mağaza ortamını okuyup kendisi anlar); gerçek reklam sadece App Store sürümünde.
- Ayarlar'da sürüm yazısına 5 kez dokununca tanı satırları açılır (eklentiler, onay durumu, reklam hazır mı, ürün fiyatı); sorun olursa ekran görüntüsü yeter.
- Tarayıcı önizlemesinde gerçek reklam yok; yerine 2 saniyelik "Reklam (önizleme)" kartı çıkar, sıklığı böyle denenebilir.

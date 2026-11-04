# 07 · Sandful: serbest atölye, paylaşım ve topluluk (öneri, Ozer'in onayına)

> Ozer (3 Kasım 2026): "Burada serbest sen tasarla bölümü olsa, insanlar serbest kumda bir şeyler tasarlasalar ve bunları paylaşsalar,
> böyle bir sosyal ortam oluşturabilir miyiz?"

## Kısa cevap

Evet, ve oyunun yapısı buna çok uygun. Ama üç ayrı parça var ve maliyetleri çok farklı. Önerim aşama aşama gitmek:
önce sunucusuz atölye ve dışarıya paylaşım, kullanılıyorsa sonra oyun içi topluluk.

## Neden uygun

- **Bir kavanoz çok küçük bir veri.** Katmanların renkleri ve yüzey çizgileri, süslerin yeri, çubuk izleri: 1-3 KB. Resim ya da video saklamaya gerek yok;
  kavanoz her telefonda bu tariften yeniden çizilir (döküşü baştan oynatarak bile).
- **Oyun zaten tarayıcıda çalışıyor.** Paylaşılan bir kavanoz bir web sayfasında 3D olarak açılabilir, uygulaması olmayan da görür ve "Uygulamayı indir" düğmesine basar.
- **Kullanıcının kavanozu bölüm olabilir.** Oyunun özü hedef bir manzarayı dökmek. Birinin tasarladığı kavanoz başkası için hedef olur:
  "Bu kavanozu sen de dök." Bu, çok bölüm hedefine (`05-sandful-uzun-yol.md`) bedava içerik ekler.
- **Kötüye kullanım riski düşük.** Serbest yazı yok, fotoğraf yok; içerik sadece renkli kum katmanları ve hazır süsler. Ad da hazır kelimelerden seçilir.

Dikkat: Serbest kum oyuncakları zaten var (ör. "DIY Colorful Bottle Sand Art", `01-ilk-tur.md`), ama hedefleri ve kararları olmadığı için oyuncak kalıyorlar.
Atölye ana oyunun yerini almaz, yanında sakin bir mod olur. Fark yaratan şey paylaşım ve "başkasının kavanozunu dökme".

## Aşamalar

### Aşama 1: Atölye ve dışarıya paylaşım (sunucu yok, hesap yok)

- **Atölye:** 10. bölümden sonra açılır. Cam şeklini seç, açtığın renklerden ve süslerden seç, hedefsiz dök; çubuk, renk geçişi, üfleme serbest.
  Biten kavanoz ana ekranda **Eserlerim** rafına girer.
- **Video/resim paylaşımı:** "Paylaş" düğmesi döküşün kısa bir videosunu (ya da resmini) Sandful yazısıyla çıkarır, iPhone'un paylaşım menüsüyle
  Instagram, TikTok, WhatsApp'a gider. Her paylaşılan video ücretsiz bir reklam gibi çalışır ("satisfying/ASMR" türü bu platformlarda çok izleniyor).
- **Bağlantıyla paylaşım:** Kavanozun tarifi bağlantının içine sığar (`investa.com.tr/sandful/k/#...`). Bağlantı açılınca web sayfasında döküş 3D oynar,
  altında "Sen de dök" ve App Store düğmesi. Uygulaması olan için bağlantı doğrudan oyunda açılır ve kavanoz bölüm olarak oynanır (Universal Links;
  siteye küçük bir doğrulama dosyası yüklenir, Ozer cPanel'den yapar).
- App Store tarafında değişen bir şey yok: veri toplanmaz, hesap gerekmez, kullanıcı içeriği bizim sunucumuzda durmaz.

### Aşama 2: Oyun içi topluluk (sunucu gerekir)

- **Topluluk rafı:** Oyuncu kavanozunu yayınlar; diğerleri görür, kalp bırakır, "Sen de dök" ile bölüm olarak oynar. Oynanma ve kalp sayısı yaratıcının rafında görünür.
- **Haftanın teması:** Her hafta bir konu (gün batımı, kış, deniz feneri…). O hafta en çok kalp alanlar ana ekranda öne çıkar. Bu, serbest moda bir amaç ve geri dönme sebebi verir.
- **Teknik:** Firebase (ölçüm için zaten önerildi, `06-sandful-olcum-pazarlama.md`): kayıtsız anonim kimlik, kavanoz tarifleri veritabanında, küçük kullanımda ücretsiz.
- **Apple'ın kullanıcı içeriği kuralı (1.2):** uygunsuz içeriği süzme, şikâyet düğmesi ve makul sürede yanıt, kötüye kullananı engelleme, iletişim bilgisi şart.
  Bizde: serbest yazı yok, birkaç şikâyet alan kavanoz kendiliğinden gizlenir, Ozer'in (ya da bir yetkilinin) bakacağı küçük bir yönetim sayfası.
- **Değişenler:** gizlilik beyanı (kullanıcı içeriği, kimlik), gizlilik sayfası, yaş derecesi anketindeki "kullanıcı içeriği" cevabı (derece yükselebilir), AB/KVKK.
- **Risk:** Topluluk boşken ölü görünür. Başlangıçta raf bizim kavanozlarımız ve haftalık seçkiyle doldurulur; oyuncu sayısı artınca açık yayına geçilir.

### Aşama 3 (sonra): yaratıcıyı ödüllendirme

Kavanozu en çok oynanan oyunculara rozet, yeni cam ya da süs; "haftanın kavanozu" ana ekranda. Para kazanma ile bağı: atölyeye özel renk paletleri,
cam şekilleri, süs paketleri (`03-sandful-gelir.md`'deki "serbest atölye" fikri).

## Ne kadar iş

| Aşama | İş | Sunucu | Mağaza tarafı |
|---|---|---|---|
| 1 | Atölye modu, Eserlerim rafı, video/resim çıkarma ve paylaşım, bağlantı ve web görüntüleyici, Universal Links | Yok (web sayfası mevcut sitede) | Değişmez |
| 2 | Firebase, yayınla/kalp/şikâyet, topluluk rafı, haftanın teması, yönetim sayfası | Firebase | Gizlilik, yaş anketi, inceleme notu |
| 3 | Rozetler, ödüller, ürün paketleri | Firebase | Satın alma (varsa) |

Aşama 1 aşağı yukarı 1.1'deki Okyanus dünyası kadar iş. Aşama 2 bunun iki-üç katı, üstüne sürekli bakım (şikâyetler) ister.

## Önerim

1. Aşama 1'i yapalım; ölçüm (Firebase) ile birlikte atölyenin ve paylaşımın ne kadar kullanıldığını görelim.
2. İnsanlar gerçekten tasarlayıp paylaşıyorsa Aşama 2'ye geçelim. Topluluk hiç kullanılmazsa sunucu ve bakım yükü boşa gitmez.

## Ozer'e sorular

1. Aşamalı yol uygun mu (önce atölye + dışarıya paylaşım, sonra topluluk)?
2. Sıra: 1.2'de ne olsun? Seçenekler: (a) 200 bölüm + ölçüm, atölye 1.3'te; (b) atölye + paylaşım + ölçüm, 200 bölüm 1.3'te; (c) hepsi 1.2'de (daha geç çıkar).
3. Topluluk aşamasında şikâyetlere kim bakacak? (Haftada birkaç dakika; çoğunu otomatik gizleme halleder.)

## Ozer'in kararı (4 Kasım 2026)

"Şimdilik o paylaşım tarafını yapmayalım. Üçüncü aşamada olabilir belki." 1.2 çok bölüm, çeşitlilik ve gelir modeline ayrıldı (`08-sandful-1-2.md`).

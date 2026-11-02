# 05 · Sandful: çok daha fazla bölüm, tek parça bir yol (öneri, Ozer'in onayına)

> Ozer (1.1 hazırlandıktan sonra): "Bunu çok daha fazla bölüm yapsak, parça parça olmasa nasıl olur?"

## Neden mantıklı

- Şu an 30 bölüm var ve bir bölüm ortalama 31 saniye sürüyor (uçtan uca test, insan botu). **Bütün oyun yaklaşık 15 dakika.**
  İyi bir oyuncu ilk gün bitirip bir daha açmayabilir.
- Türün tutan oyunları (renk sıralama, yün, vida bulmacaları) yüzlerce, bazen binlerce bölümle geliyor. Oyuncu her gün birkaç bölüm oynuyor; reklamlı modelde gelir de bu oturumlardan geliyor (`03-sandful-gelir.md`).
- Dünyaları 10'ar 10'ar güncellemeyle eklemek yavaş: her 10 bölüm bir tur tasarım, bot ayarı ve Apple incelemesi.

## Öneri

### 1. Tek parça yol

Dünyalar artık kilitli kartlar değil, birbirine akan temalar. Ana ekranda tek uzun bir raf var. Tema değişince arka plan ve kum renkleri yavaşça değişiyor (kıyıdan okyanusa, okyanustan bahara…).
"20. bölümü bitirince açılır" gibi duvarlar yok; oyuncu sadece sıradaki kavanozu görüyor. Bitmiş temalar ana ekranda katlanıyor, açık olan bölümün çevresi gösteriliyor.

### 2. El yapımı ve üretilmiş bölüm karışımı

- **İmza sahneler (el yapımı):** Her 5. bölüm şimdiki gibi elle tasarlanmış, adı olan bir sahne: tekne, deniz feneri, kuzey ışıkları.
  Yeni bir şey öğreten (çubuk, renk geçişi, sallanan kavanoz) ya da büyük finali olan bölümler bunlar.
- **Ara bölümler (üretici):** Aradakileri bir bölüm üreticisi kuruyor. Temanın renk paleti, bir şekil kalıbı (düz, tepe, iki tepe, vadi, dalga, yay, eğik katman), bir cam şekli, en fazla bir mekanik ve temaya uygun süslerden seçiyor.
  Bölümler sabit bir tohumla üretiliyor; herkes aynı 57. bölümü oynuyor ve bölümler dosyada tutulmuyor, açılışta hesaplanıyor.
- **Adlar:** Tema ve sıfat listelerinden, iki dilde hazır çiftler: "Pembe Kumullar / Pink Dunes", "Sessiz Koy / Quiet Bay".

### 3. Botlar eleme yapar

Elimizdeki beş bot profili her üretilen bölümü oynar. Bölüm şu kurallardan geçemezse atılır, yerine yenisi üretilir:
- Kusursuz bot 3 yıldız, hiç dokunmayan 0 yıldız alır.
- İnsan botunun yıldızı bölümün sırasına göre hedef aralıktadır: ilk 20 bölümde 2,5-3, 100'den sonra 1,7-2,3.
- Art arda iki bölüm aynı şekil kalıbını ya da aynı mekaniği kullanmaz; her temada bütün kalıplar görünür.

Senin için bir önizleme sayfası da yapılır: bütün bölümlerin küçük kavanoz resimleri yan yana. Beğenmediğini işaretlersin, üretici onu değiştirir.

### 4. Hedef

1.2'de **200 bölüm** (10 tema × 20 bölüm; 40 imza sahne + 160 üretilmiş), oyun süresi 2 saatin üstüne çıkar.
Sonra yeni temalar güncellemeyle eklenir; istenirse üretici sonu olmayan bir "sonsuz yol" da verebilir.

## Riskler ve çözümler

| Risk | Çözüm |
|---|---|
| Üretilen sahneler anlamsız katman yığını gibi durabilir | Rastgele değil, temaya göre kalıplar: gökyüzü hep üstte, deniz kumun üstünde, süs temaya uygun yerde (tekne suda, ağaç tepede) |
| Bölümler birbirine benzer | Çeşitlilik kuralları (yukarıda) ve önizleme sayfasında elle eleme |
| 200 küçük resim telefonun tarayıcı deposuna sığmaz (bugün her biri birkaç KB, toplam birkaç MB) | Uygulamada küçük resimler dosyaya yazılır (Capacitor Filesystem); depoda sadece yıldız ve yüzde kalır |
| 200 bölümlük ana ekran yavaşlar | Sadece ekrandaki raflar çizilir, bitmiş temalar katlanır |
| Para kazanma modelindeki "sahne paketi satışı" tek parça yola uymaz | Gelir ödüllü reklam, seyrek geçiş reklamı ve "reklamları kaldır" ile gelir (`03-sandful-gelir.md`'deki diğer kalemler aynen) |

## İş miktarı

Üretici, bot elemesi, önizleme sayfası ve tek parça ana ekran yaklaşık 1.1 kadar iş. Mevcut 30 bölüm imza sahne olarak kalır.

## 1.1 ne olacak

- **A (önerim):** 1.1'i şimdi yükle. Hazır ve test edildi, Apple incelemesi 1-2 hafta sürebiliyor. Çok bölümlü yol 1.2 olur.
- **B:** 1.1'i beklet, 200 bölümle tek seferde çıkar.

## Ozer'e sorular

1. El yapımı + üretilmiş karışım uygun mu, yoksa bütün bölümler el yapımı mı olsun? (El yapımı 200 bölüm aylar sürer.)
2. Hedef kaç bölüm: 200 mü, daha çok mu, yoksa sonsuz yol mu?
3. 1.1 şimdi mi gitsin (A), yoksa beklesin mi (B)?

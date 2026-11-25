# Firebase (Sandful)

`GoogleService-Info.plist`: Firebase projesi `sandful-47489`, uygulama `com.investateknoloji.sandful` (9 Kasım 2026, Ozer indirdi).
Bu dosya uygulamanın içine gömülür ve gizli değildir (Firebase'in istemci yapılandırması). Yine de içindeki API anahtarı
Google Cloud Console > APIs & Services > Credentials'ta sadece bu iOS paket kimliğiyle kullanılacak şekilde kısıtlı olmalı.

`scripts/configure-native.py` bu dosyayı `ios/App/App/` içine kopyalar ve Xcode projesine kaynak olarak ekler (1.2, ölçüm için Firebase Analytics; eklenti açılışta `FirebaseApp.configure()` çağırır).
Dosyadaki `IS_ANALYTICS_ENABLED` / `IS_ADS_ENABLED` anahtarları eski SDK'lardan kalma; ölçümün açık olup olmadığını Firebase konsolundaki
Proje ayarları > Entegrasyonlar > Google Analytics belirler.

## Android

`google-services.json` (Firebase'de aynı projeye eklenen Android uygulaması, paket `com.investateknoloji.sandful`) bu klasöre konur.
`scripts/configure-native.py` onu `android/app/` altına kopyalar; `android/app/build.gradle` dosya varsa Google hizmetleri eklentisini kendisi açar.
Dosya 25 Kasım 2026'da eklendi (Ozer indirdi). iPhone'daki dosya gibi gizli değildir; API anahtarı Google Cloud Console'da bu Android paket adıyla kısıtlanabilir.

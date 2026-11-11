# Firebase (Sandful iOS)

`GoogleService-Info.plist`: Firebase projesi `sandful-47489`, uygulama `com.investateknoloji.sandful` (9 Kasım 2026, Ozer indirdi).
Bu dosya uygulamanın içine gömülür ve gizli değildir (Firebase'in istemci yapılandırması). Yine de içindeki API anahtarı
Google Cloud Console > APIs & Services > Credentials'ta sadece bu iOS paket kimliğiyle kullanılacak şekilde kısıtlı olmalı.

`scripts/configure-native.py` bu dosyayı `ios/App/App/` içine kopyalar ve Xcode projesine kaynak olarak ekler (1.2, ölçüm için Firebase Analytics; eklenti açılışta `FirebaseApp.configure()` çağırır).
Dosyadaki `IS_ANALYTICS_ENABLED` / `IS_ADS_ENABLED` anahtarları eski SDK'lardan kalma; ölçümün açık olup olmadığını Firebase konsolundaki
Proje ayarları > Entegrasyonlar > Google Analytics belirler.

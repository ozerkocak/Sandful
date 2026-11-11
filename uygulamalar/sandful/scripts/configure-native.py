# npx cap add ios sonrası iOS projesine bizim ayarlarımızı uygular (tekrar çalıştırılabilir).
# Sadece dikey, sadece iPhone, tam ekran, durum çubuğu gizli, şifreleme sorusu "hayır", diller İngilizce (ana) ve Türkçe.
# Ses oturumu "ambient": kullanıcının çaldığı müzik kesilmez, sessiz anahtarına uyar.
import plistlib,re,os,json,shutil
root=os.path.join(os.path.dirname(__file__),'..','ios','App')
p=os.path.join(root,'App','Info.plist');d=plistlib.load(open(p,'rb'))
d['CFBundleDevelopmentRegion']='en'
d['CFBundleLocalizations']=['en','tr']
d['CFBundleDisplayName']='Sandful'
d['UISupportedInterfaceOrientations']=['UIInterfaceOrientationPortrait']
d.pop('UISupportedInterfaceOrientations~ipad',None)
d['UIStatusBarHidden']=True
d['UIViewControllerBasedStatusBarAppearance']=False
d['UIRequiresFullScreen']=True
d['ITSAppUsesNonExemptEncryption']=False
# 1.2: reklam (AdMob). Uygulama kimliği admob.json'dan; reklam ağı kimlikleri (SKAdNetwork) Apple'ın reklam ölçümü için.
# Takip izni (ATT) istenmediği için NSUserTrackingUsageDescription yok; reklamlar kişiselleştirilmemiş gider.
adm=json.load(open(os.path.join(os.path.dirname(__file__),'..','admob.json'),encoding='utf-8'))
d['GADApplicationIdentifier']=adm['ios']['uygulama']
# İlki Google'ın kendi kimliği; diğerleri Google'ın AdMob iOS rehberindeki üçüncü taraf alıcılar listesi
# (developers.google.com/admob/ios/quick-start). Liste zamanla değişir; yanlış ya da eksik bir kimlik uygulamayı bozmaz.
SKAN='''cstr6suwn9 4fzdc2evr5 2fnua5tdw4 ydx93a7ass p78axxw29g v72qych5uu ludvb6z3bs cp8zw746q7 3sh42y64q3 c6k4g5qg8m s39g8k73mm 3qy4746246
f38h382jlk hs6bdukanm mlmmfzh3r3 v4nxqhlyqp wzmmz9fp6w su67r6k2v3 yclnxrl5pm t38b2kh725 7ug5zh24hu gta9lk7p23 vutu7akeur y5ghdn5j9k
v9wttpbfk9 n38lu8286q 47vhws6wlr kbd757ywx3 9t245vhmpl a2p9lx4jpn 22mmun2rn5 44jx6755aq k674qkevps 4468km3ulz 2u9pt9hc89 8s468mfl3y
klf5c3l5u5 ppxm28t8ap kbmxgpxpgc uw77j35x4d 578prtvx9j 4dzt52r2t5 tl55sbb4fm c3frkrj4fj e5fvkxwrpn 8c4e2ghe7u 3rd42ekr43 97r2b46745 3qcr597p9d'''.split()
d['SKAdNetworkItems']=[{'SKAdNetworkIdentifier':x+'.skadnetwork'} for x in SKAN]
plistlib.dump(d,open(p,'wb'))
pb=os.path.join(root,'App.xcodeproj','project.pbxproj');s=open(pb).read()
s=re.sub(r'TARGETED_DEVICE_FAMILY = "?[0-9,]+"?;','TARGETED_DEVICE_FAMILY = 1;',s)
# İnvesta Teknoloji Anonim Şirketi ekip kimliği (Xcode imzalamayı otomatik bu ekiple yapar)
if 'DEVELOPMENT_TEAM' not in s:s=s.replace('CODE_SIGN_STYLE = Automatic;','CODE_SIGN_STYLE = Automatic;\n\t\t\t\tDEVELOPMENT_TEAM = 3ANJ967SS2;')
open(pb,'w').write(s)
ad=os.path.join(root,'App','AppDelegate.swift');a=open(ad).read()
if 'AVFoundation' not in a:
    a=a.replace('import Capacitor\n','import Capacitor\nimport AVFoundation\n',1)
    a=a.replace('        // Override point for customization after application launch.\n',
                '        // Oyun sesi kullanıcının müziğiyle karışsın (kesmesin) ve sessiz anahtarına uysun.\n        try? AVAudioSession.sharedInstance().setCategory(.ambient, mode: .default)\n',1)
    assert 'AVAudioSession' in a,'AppDelegate beklenen yapıda değil'
    open(ad,'w').write(a)
# 1.2: ölçüm (Firebase Analytics). Ayar dosyasını uygulamaya kopyala ve Xcode projesine kaynak olarak ekle (yoksa Firebase açılışta çöker).
gs=os.path.join(os.path.dirname(__file__),'..','resources','firebase','GoogleService-Info.plist')
shutil.copyfile(gs,os.path.join(root,'App','GoogleService-Info.plist'))
s=open(pb).read()
if 'GoogleService-Info.plist' not in s:
    FR,BF='5A4D0001F1EBA5E000000001','5A4D0002F1EBA5E000000001'
    s=s.replace('/* End PBXBuildFile section */','\t\t'+BF+' /* GoogleService-Info.plist in Resources */ = {isa = PBXBuildFile; fileRef = '+FR+' /* GoogleService-Info.plist */; };\n/* End PBXBuildFile section */',1)
    s=s.replace('/* End PBXFileReference section */','\t\t'+FR+' /* GoogleService-Info.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; path = "GoogleService-Info.plist"; sourceTree = "<group>"; };\n/* End PBXFileReference section */',1)
    k='\t\t\t\t2FAD9762203C412B000D30F8 /* config.xml */,\n';assert s.count(k)==1,'App grubu beklenen yapıda değil'
    s=s.replace(k,k+'\t\t\t\t'+FR+' /* GoogleService-Info.plist */,\n',1)
    k='\t\t\t\t2FAD9763203C412B000D30F8 /* config.xml in Resources */,\n';assert s.count(k)==1,'Resources adımı beklenen yapıda değil'
    s=s.replace(k,k+'\t\t\t\t'+BF+' /* GoogleService-Info.plist in Resources */,\n',1)
    open(pb,'w').write(s)
print('iOS ayarları uygulandı')
# Android: sadece dikey
am=os.path.join(os.path.dirname(__file__),'..','android','app','src','main','AndroidManifest.xml')
if os.path.exists(am):
    m=open(am).read()
    # AdMob Android'de uygulama kimliği olmadan açılışta çöker. Android için AdMob uygulaması henüz açılmadı: Google'ın örnek kimliği duruyor,
    # Android yayınından önce gerçek kimlikle değiştirilecek.
    if 'com.google.android.gms.ads.APPLICATION_ID' not in m:
        m=m.replace('</application>','    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="ca-app-pub-3940256099942544~3347511713" />\n    </application>',1)
        open(am,'w').write(m)
    if 'screenOrientation' not in m:
        m=m.replace('android:name=".MainActivity"','android:name=".MainActivity"\n            android:screenOrientation="portrait"',1)
        open(am,'w').write(m)
    print('Android ayarları uygulandı')

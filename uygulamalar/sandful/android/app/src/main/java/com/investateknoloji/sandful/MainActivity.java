package com.investateknoloji.sandful;

import android.content.pm.ApplicationInfo;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Deneme derlemesi (hata ayıklama imzalı test APK'sı) "sandbox" işaretini yazar; oyun bunu Preferences'tan
        // ("sandful_ortam") okur ve gerçek reklam yerine Google'ın deneme reklamlarını ister. iOS'ta aynı işi AppDelegate yapar.
        // Mağazadan (iç test dahil) kurulan sürüm "magaza" yazar: deneyen kişi tanı ekranındaki "Deneme reklamı" düğmesini açar.
        boolean deneme = (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        getSharedPreferences("CapacitorStorage", MODE_PRIVATE).edit().putString("sandful_ortam", deneme ? "sandbox" : "magaza").apply();
        super.onCreate(savedInstanceState);
    }
}

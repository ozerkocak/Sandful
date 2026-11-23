#!/bin/sh
# Telefon ekran kaydından dikey tanıtım videosu (1080x1920, 30 kare/sn): dökme kısmı hızlandırılır, kapak ve konfeti olağan hızda kalır,
# başa başlık, sona "Sandful" yazısı biner. Yazı katmanları yazi.js ile üretilir (Nunito; NUNITO=<@fontsource/nunito/files>).
# Kayıt iki parça geldiyse (yükleme sınırı 30 MB) ikisi de verilir; tek parçaysa B yerine yine A yazılır ve B_BAS=A_SON olur.
# Kullanım: A=a.mov B=b.mov A_BAS=0.75 A_SON=14.985 B_BAS=0.435 B_DOK=8.4 B_SON=11.0 HIZ=1.5 sh kur.sh baslik.png son.png cikti.mp4
#   A_BAS: akışın başladığı an; A_SON/B_BAS: iki parçanın birleştiği an (üst üste binen kareler karşılaştırılarak bulunur);
#   B_DOK: kapağın kapanmaya başladığı an; B_SON: sonuç kartı çıkmadan hemen önce. Yan boşluklar bulanık arka planla dolar; üstte durum çubuğu kırpılır.
set -e
: "${HIZ:=1.5}"
POUR=$(python3 -c "print(round((($A_SON-$A_BAS)+($B_DOK-$B_BAS))/$HIZ,3))")
FIN=$(python3 -c "print(round($B_SON-$B_DOK,3))")
TOT=$(python3 -c "print(round($POUR+$FIN+0.9,3))")
ES=$(python3 -c "print(round($TOT-3.3,3))")
FO=$(python3 -c "print(round($TOT-0.5,3))")
ffmpeg -v error -y -i "$A" -i "$B" -loop 1 -t $TOT -i "$1" -loop 1 -t $TOT -i "$2" -filter_complex "
[0:v]trim=start=$A_BAS:end=$A_SON,setpts=PTS-STARTPTS[va];
[1:v]trim=start=$B_BAS:end=$B_DOK,setpts=PTS-STARTPTS[vb];
[va][vb]concat=n=2:v=1:a=0,setpts=PTS/$HIZ[vp];
[1:v]trim=start=$B_DOK:end=$B_SON,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.9[vf];
[vp][vf]concat=n=2:v=1:a=0,fps=30,split[m1][m2];
[m1]scale=1080:-2,crop=1080:1920:0:(ih-1920)/2,boxblur=24:2[bg];
[m2]crop=884:1732:0:100,scale=980:1920:flags=lanczos[fg];
[bg][fg]overlay=50:0[base];
[2:v]format=rgba,fade=t=in:st=0.15:d=0.3:alpha=1,fade=t=out:st=2.9:d=0.45:alpha=1[t1];
[3:v]format=rgba,fade=t=in:st=$ES:d=0.4:alpha=1[t2];
[base][t1]overlay=0:0:eof_action=pass[b1];
[b1][t2]overlay=0:0:eof_action=pass,format=yuv420p[v];
[0:a]atrim=start=$A_BAS:end=$A_SON,asetpts=PTS-STARTPTS[aa];
[1:a]atrim=start=$B_BAS:end=$B_DOK,asetpts=PTS-STARTPTS[ab];
[aa][ab]concat=n=2:v=0:a=1,atempo=$HIZ[ap];
[1:a]atrim=start=$B_DOK:end=$(python3 -c "print($B_SON+0.9)"),asetpts=PTS-STARTPTS[af];
[ap][af]concat=n=2:v=0:a=1,afade=t=out:st=$FO:d=0.5[a]" \
 -map "[v]" -map "[a]" -t $TOT -c:v libx264 -preset slow -crf 19 -maxrate 10M -bufsize 20M -profile:v high -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart "$3"
echo "toplam $TOT sn (dökme $POUR sn, $HIZ kat hızlı)"

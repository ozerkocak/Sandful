// Videonun üstüne binecek saydam yazı katmanları (1080x1920): node yazi.js <çıktı.png> <html>
const {chromium}=require('playwright');const F=process.env.NUNITO+'/';
const font=[700,800,900].map(w=>['latin','latin-ext'].map(s=>`@font-face{font-family:'Nunito';font-weight:${w};src:url(file://${F}nunito-${s}-${w}-normal.woff2) format('woff2');}`).join('')).join('');
(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await (await b.newContext({viewport:{width:1080,height:1920},deviceScaleFactor:1})).newPage();
 const fs=require('fs');const html=`<!doctype html><meta charset="utf-8"><style>${font}html,body{margin:0;background:transparent;width:1080px;height:1920px;overflow:hidden;font-family:'Nunito',sans-serif;color:#fff;text-align:center}
 .t{position:absolute;left:0;right:0;font-weight:900;line-height:1.08;letter-spacing:-.5px;text-shadow:0 4px 18px rgba(60,30,5,.55),0 2px 4px rgba(60,30,5,.45)}
 .s{position:absolute;left:0;right:0;font-weight:800;text-shadow:0 3px 12px rgba(60,30,5,.6),0 1px 3px rgba(60,30,5,.5)}</style>${process.argv[3]}`;
 fs.writeFileSync('_yazi.html',html);await p.goto('file://'+process.cwd()+'/_yazi.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
 await p.screenshot({path:process.argv[2],omitBackground:true});await b.close();})();

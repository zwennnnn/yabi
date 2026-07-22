---
name: yabi-ui-tester
description: Landing page veya komple web sitesini Playwright ile otomatik olarak tüm önemli route ve ekran boyutlarında gezen, scroll adımlı screenshot alan, konsol/network hatalarını, kırık medyayı, axe-core erişilebilirlik ihlallerini, yatay overflow'u, üst üste binen metin adaylarını ve yabi anayasasına aykırı UI patternlerini raporlayan test ajanı. Kullanıcı "/yabi-ui-tester", "yabi test", "siteyi test et", "kırık var mı bak", "screenshot al kontrol et", "ui testi yap", "Playwright ile kontrol et", "route'ları tara" veya "tasarım denetimi yap" dediğinde devreye gir. Bu skill varsayılan olarak kod yazmaz; gerçek tarayıcı kanıtı toplar, sınıflandırır ve düzeltme önceliği çıkarır.
---

# YABI-UI-TESTER

Bu skill YABI'nin kalite mahkemesidir. Tahmin etmez; gerçek Chromium
oturumunda gezer, screenshot alır, JSON kanıt üretir, sonra bulguları YABI
anayasasına göre sınıflandırır.

## Dil ve Referans Yükleme

Kullanıcı Türkçe çalışıyorsa `references/tr/` dosyalarını oku. İngilizce
çalışıyorsa `references/en/` dosyalarını oku.

Her test işinde oku:
- `references/tr/audit-protocol.md` veya `references/en/audit-protocol.md`
- `references/tr/failure-taxonomy.md` veya `references/en/failure-taxonomy.md`
- `references/tr/reporting.md` veya `references/en/reporting.md`

YABI ile birlikte çalışıyorsan ayrıca `../yabi/references/*/audit-rubric.md`
dosyasını oku.

## Ön Koşul

Bu skill klasöründe bağımlılıkları kur:

```bash
npm install
npx playwright install chromium
```

Hedef URL belirtilmediyse kullanıcıdan iste. Yerel dev server ise ayakta
olduğunu doğrula.

## Scriptler

- `scripts/yabi-ui-audit.js`: URL veya URL listesi için viewport, scroll,
  console, network, media, axe, overflow, overlap ve forbidden-pattern raporu
  üretir.
- `scripts/yabi-route-crawl.js`: aynı origin içindeki linkleri gezer ve route
  listesi çıkarır.
- `scripts/yabi-report-summary.js`: son veya belirtilen test klasöründen
  okunabilir markdown raporu üretir.
- `scripts/yabi-compare-runs.js`: iki test koşusunu karşılaştırıp regresyon
  özeti çıkarır.

## Temel Kullanım

Tek URL denetimi:

```bash
npm run audit -- http://localhost:3000
```

Çok sayfalı site denetimi:

```bash
npm run crawl -- http://localhost:3000 yabi-test-results/routes.json
npm run audit -- --routes yabi-test-results/routes.json
npm run summarize
```

İki koşuyu karşılaştırma:

```bash
npm run compare -- yabi-test-results/run-a yabi-test-results/run-b
```

## Çalışma Disiplini

Önce kanıt topla, sonra yorum yap. Screenshot'lara bakmadan sadece JSON ile
rapor yazma. JSON temiz olsa bile görsel kırık olabilir; görsel iyi görünse
bile console, network veya axe kırığı kritik sayılır.

Bu skill varsayılan olarak düzeltme yapmaz. Rapor üretir, kanıt verir,
öncelik çıkarır. Kullanıcı açıkça isterse düzeltme işi YABI akışına devredilir.

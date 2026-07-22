# Audit Protokolü

## Hazırlık

Önce hedefi netleştir:
- Tek route mu, komple site mi?
- Dev server mı, canlı URL mi?
- Login veya özel state gerekiyor mu?
- Test mobil performans için gerçekçi mi?

Komple siteyse önce route listesi çıkar:

```bash
npm run crawl -- http://localhost:3000 yabi-test-results/routes.json
```

Sonra route listesini audit'e ver:

```bash
npm run audit -- --routes yabi-test-results/routes.json
```

## Viewport Matrisi

En az:
- Desktop: 1920x1080
- Laptop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844

Desktop ana vitrin, mobile gerçek dayanıklılık testidir. İkisini de ayrı
değerlendir.

## Screenshot Okuma

Her route için sadece ilk ekranı değil scroll adımlarını oku:
- Giriş karesi.
- Section ortası.
- Geçiş ortası.
- CTA ve form çevresi.
- Footer ve kapanış.

ScrollTrigger/pin kullanan sitelerde en çok kırık geçiş ortasında çıkar.

## Kanıt Sırası

1. `summary.json` ile kaba riskleri gör.
2. Her route/viewport klasöründeki `axe-report.json`, `network-errors.json`,
   `broken-media.json`, `dom-signals.json` dosyalarını oku.
3. Screenshot'ları gözle incele.
4. Raporu kritik, orta, düşük diye yaz.

JSON bulgusunu ekran görüntüsüyle doğrulamaya çalış. Yanlış pozitifleri açıkça
"aday bulgu" diye işaretle.

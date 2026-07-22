# YABI Denetim Rubriği

Her teslimden önce bu rubriği uygula. Bulgu yazmak yetmez; kritik ve orta
bulguları düzeltmeden teslim etme.

## Kritik

Şunlardan biri varsa iş bitmemiştir:
- Okunamayan başlık, CTA, form etiketi veya navigasyon.
- Mobilde taşan, üst üste binen veya kaybolan temel içerik.
- Console error, broken route, 404 asset, kırık video/görsel.
- Focus state olmayan temel interaktif öğe.
- Route geçişinde veya scroll animasyonunda donma/jank.
- Form gönderiminde başarısızlık veya belirsiz durum.

## Orta

Şunlar kaliteyi düşürür:
- Kart grid, generic feature list, numaralı süreç.
- Aynı hero varyasyonunun tüm route'lara kopyalanması.
- Aynı transition veya reveal davranışının tekrar etmesi.
- Görsel dünya ile copy tonunun çelişmesi.
- İç sayfaların homepage'e göre belirgin biçimde ucuz kalması.
- CTA'nın bağlamdan doğmaması.

## Düşük

Şunlar ince ayardır:
- Timing iyileştirmesi.
- Daha iyi crop.
- Daha net hover/focus mikro animasyonu.
- Section yoğunluğunu azaltma.
- Footer ve legal sayfaları daha tutarlı hale getirme.

## Puanlama

Her eksene 0-5 ver:
- Okunabilirlik
- Görsel dünya
- Site mimarisi
- Motion sistemi
- Responsive kalite
- Teknik temizlik
- Özgünlük

Herhangi bir eksen 3 altındaysa teslim yapma. Ortalama 4 üstü değilse YABI
seviyesi sayma.

## Denetim Sırası

Önce otomatik kanıt topla: `yabi-ui-tester` varsa çalıştır. Sonra ekran
görüntülerini oku. En son kodu tara. Göz, tarayıcı ve kaynak kod aynı hikayeyi
söylemelidir.

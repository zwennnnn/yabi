# Raporlama

Rapor kısa, kanıtlı ve düzeltmeye dönük olmalıdır.

## Format

```markdown
# YABI-UI-TESTER Raporu

## Özet
- URL/route sayısı:
- Viewport sayısı:
- Screenshot sayısı:
- Kritik:
- Orta:
- Düşük:

## Kritik
- [route] [viewport] [kanıt dosyası] Sorun.
  Düzeltme yönü:

## Orta
- ...

## Düşük
- ...

## Otomatik Kanıt
- axe:
- console:
- network:
- media:
- overflow:
- forbidden-pattern:
```

## Dil

Yorum yaparken belirsiz konuşma:
- "Metin okunmuyor" de, "biraz düşük gibi" deme.
- "390x844 mobile, 006-scroll-812.png" diye kanıt ver.
- "CTA kayboluyor" de, "tasarım zayıf" deme.

## YABI'ye Geri Besleme

Aynı sorun iki farklı projede tekrar ederse `yabi` kuralı adayıdır. Üç farklı
sektörde tekrar ederse anayasa maddesine dönüşebilir.

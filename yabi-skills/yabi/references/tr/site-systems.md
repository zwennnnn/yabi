# Site Sistemleri

## Rota Haritası

Komple site üretiminde önce route'ları belirle:
- `home`: dünyanın kapısı, ana iddia ve ilk güven.
- `work` veya `projects`: kanıt ve derinlik.
- `product` veya `services`: teklifin net anatomisi.
- `about`: karakter, ekip, köken, yöntem.
- `contact` veya `booking`: dönüşüm.
- `legal`, `privacy`, `terms`: sessiz ama tasarım sistemine dahil sayfalar.
- `404`: markanın tonu bozulmadan hata deneyimi.

Her route için tek cümlelik dramatik görev yaz. Görevi olmayan route'u ekleme.

## Bilgi Mimarisi

Siteyi bölüm sayısıyla değil, karar akışıyla kur:
- Kullanıcı önce neye çarpacak?
- Hangi şüphe ikinci ekranda çözülmeli?
- Kanıt nerede görünmeli?
- Detay ne zaman açılmalı?
- Dönüşüm nerede doğal hale gelmeli?

Kullanıcıyı sonsuz scroll içinde sürükleme. Çok sayfalı deneyimde route'lar
nefes almalı; homepage bütün cevapları vermek zorunda değildir.

## Component Mimarisi

Önerilen yapı:

```text
src/
  app/ veya pages/
  components/
    layout/
    navigation/
    sections/
    primitives/
  hooks/
    motion/
  lib/
    content/
    animation/
  styles/
    tokens.css
    globals.css
```

Kurallar:
- Section component'i sahneyi taşır.
- Primitive component stil atomudur, dramaturji taşımaz.
- Motion hook'u timeline ve ScrollTrigger yönetir.
- İçerik verisi component içine gömülmez; mümkünse data/content katmanında
  tutulur.
- Her shared component responsive ve focus state ile birlikte tamamlanır.

## Layout Sistemi

Tek bir container genişliğiyle bütün siteyi yönetme. Her route için farklı
kompozisyon ritmi olabilir; ama grid mantığı tutarlı kalır.

Kullan:
- `clamp()` ile ölçülü ama kontrollü spacing.
- CSS custom properties ile renk, type scale ve motion süreleri.
- Route seviyesinde layout varyantları.
- Sabit aspect-ratio ile görsel alanların zıplamasını önleme.

Kaçın:
- Her section'ı ortalı başlık + alt metin + grid dizmekten.
- Desktop fikrini mobilde sadece alt alta yığmaktan.
- Footer'ı sonradan yapıştırılmış bağlantı listesine çevirmekten.

## Çok Sayfalı Devamlılık

Homepage'deki görsel dünya iç sayfalarda inceltilerek sürmelidir:
- Aynı ışık kaynağı.
- Aynı materyal davranışı.
- Aynı motion fiziği.
- Daha sakin ama akraba tipografik kararlar.
- Navigation geçişlerinde dünyayı bozmayan route transition'ları.

İç sayfa daha sessiz olabilir; daha ucuz olamaz.

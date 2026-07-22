# Motion ve Etkileşim

Motion dekor değil, sitenin fizik motorudur. Her hareket aynı dünyanın
yerçekimine uymalıdır.

## Motion Fiziği

Önce tek bir davranış seç:
- Ağır: lüks, zanaat, fiziksel ürün, güven.
- Keskin: teknoloji, performans, rekabet, karar.
- Akışkan: restoran, wellness, kültür, organik deneyim.
- Mekanik: SaaS, operasyon, ölçüm, mühendislik.
- Patlayıcı: lansman, müzik, etkinlik, kampanya.

Tüm easing, duration, stagger ve scroll davranışları bu fiziğe bağlanır.

## Geçiş Aileleri

Her route veya büyük section geçişi farklı ama akraba olmalıdır:
- Clip-path slash: keskin dünya.
- Through-object zoom: ürün veya materyal merkezli dünya.
- Split panel reveal: editorial veya kurumsal dünya.
- Text mask reveal: tipografi omurgalı dünya.
- Scroll-tied parallax: mekan ve derinlik dünyası.
- Hard cut + silence: premium ve güven odaklı dünya.

Aynı geçiş tekniğini arka arkaya tekrar etme. Tekrara düşüyorsan motion
sistemi değil preset kullanıyorsun demektir.

## GSAP Kuralları

- `gsap.context()` kullan.
- React'te `useLayoutEffect` içinde kur, cleanup'ta `ctx.revert()` çağır.
- ScrollTrigger kullanıyorsan `pin`, `scrub`, `start`, `end` değerlerini
  bilinçli ver.
- Timeline'ı component render'ına değil hook'a koy.
- `prefers-reduced-motion` için düşük hareketli alternatif sağla.
- `will-change` sadece gerçekten animasyonlanan öğelerde kullanılır.

## Mikro Etkileşim

Hover ve focus durumları sadece renk değiştirme değildir:
- CTA imleci çağırmalı.
- Link hareketi markanın fiziğine uymalı.
- Form alanları hata, başarı, loading ve disabled durumlarını taşımalı.
- Menü açılışı route dünyasını bozmayacak bir sahne geçişi gibi çalışmalı.

## Performans Sınırı

YABI ağır görünebilir ama ağır çalışamaz. Motion jank görürsen önce şunları
kontrol et:
- Layout thrash yaratan animasyon var mı?
- `top/left/width/height` yerine `transform/opacity` kullanılabilir mi?
- Büyük görsel/video lazy ve responsive mi?
- Mobilde katman sayısı azaltılmış mı?

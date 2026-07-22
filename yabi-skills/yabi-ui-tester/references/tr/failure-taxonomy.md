# Kırık Taksonomisi

## Kritik Kırık

Şunlar kritik sayılır:
- Okunamayan başlık, CTA, navigasyon veya form etiketi.
- 404 dönen asset, kırık medya, console error.
- Mobile/tablet yatay overflow.
- Temel content'in viewport dışına taşması.
- Route'un yüklenmemesi.
- Focus state yokluğu.
- Motion sırasında kullanıcıyı kilitleyen pin/scrub hatası.

Kritik bulgu varsa site teslim edilemez.

## Orta Kırık

Şunlar kaliteyi düşürür:
- YABI yasaklı pattern adayları: card grid, gradient, step copy, generic icon.
- Metin overlap adayı.
- Aynı animasyon davranışının tekrar etmesi.
- İç sayfaların görsel kalite olarak düşmesi.
- CTA'nın bağlamdan kopması.

Orta bulgu varsa düzeltme planı gereklidir.

## Düşük Bulgu

Şunlar ince ayardır:
- Daha iyi crop.
- Daha iyi screenshot anı.
- Daha temiz hover.
- Daha iyi focus kontrastı.
- Daha az yoğun section.

## False Positive Yönetimi

Script DOM sinyallerini aday olarak üretir. Özellikle overlap ve card-class
tespitleri insan gözüyle doğrulanmalıdır. Kasıtlı taşma metni kapatmıyorsa ve
YABI dünyasına hizmet ediyorsa kırık değildir.

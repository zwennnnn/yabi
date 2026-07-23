# React Landing Base Protokolü

Bu dosya YABI'nin React landing page ve section refactor işlerinde vazgeçilmez
base yapısıdır. Koda geçmeden önce okunur, üretim boyunca uygulanır, final
denetimde tekrar kontrol edilir.

## 1. Prompt: Skill Araştırma ve React Mimari Planlama

### Skill Araştırması

Projede kurulu `find-skills`/`findskills` skiliyle ya da `npx skills find`
komutuyla ödül kazanacak React landing page için gereken skilleri üç
kategoride araştır:

**A) Creative / Tasarım**
- Kompozisyon, storytelling, sinematik sahne kurgusu.
- Scroll storytelling, reveal animasyonları, kinetic typography,
  micro-interaction.
- Editoryal okunabilirlik, kontrast, rhythm, density.
- Deneysel layout ve alışılmadık etkileşim yaklaşımları.

**B) Teknik / Görsel Yapısal**
- Frontend mühendisliği, spacing sistemi, grid, responsive breakpoint.
- WCAG, performans, asset optimizasyonu.
- React'e özgü GSAP entegrasyonu: `useLayoutEffect`, `gsap.context()`,
  ScrollTrigger cleanup.

**C) Mimari / Kod Kalitesi**
- React component ayrıştırma, custom hook tasarımı, dosya organizasyonu.
- State yönetimi: local state, context, event bus veya store kararları.
- Kod okunabilirliği, isimlendirme, sorumluluk sınırları.

Her skill için adını, kategorisini ve ne işe yaradığını açıkla. İlgili
skill'i projeye kur, sonra `SKILL.md`/`README` dosyasını oku. Okunmamış
skill'e dayanarak karar verme.

### React Mimari Planı

Koda geçmeden kullanıcıya şu planı özetle:

1. Dosya yapısı:

```text
src/
  components/
    sections/
      SectionName/
        index.jsx
        SectionName.css
  hooks/
    useSectionScene.js
  lib/
    gsap.js
  styles/
    tokens.css
```

Her section kendi klasöründe ve kendi sorumluluğunda kalır.

2. Motion mantığı:
- `/src/hooks/` altında custom hook'larda yaşar.
- GSAP context hook içinde açılır.
- `useLayoutEffect` return'ünde `ctx.revert()` ile cleanup yapılır.
- Component içine tekrar eden timeline kodu gömülmez.

3. GSAP merkezi:
- `/src/lib/gsap.js` plugin registration için tek yerdir.
- `ScrollTrigger` ve diğer plugin'ler burada bir kez register edilir.

4. Veri paylaşımı:
- Local state yeterliyse local state kullan.
- Global scroll progress veya route-wide cursor state gerekiyorsa Context
  kullan; sadece gerçekten gerekiyorsa.
- Bir animasyon için component state'ini başka component'e sızdırma.

5. Design token:
- Renk, spacing, tipografi ve motion değerleri CSS custom properties veya
  Tailwind config içinde yaşar.
- Inline stil ve component içine sabit hex gömme yasaktır.

Bu fazda landing page oluşturma. Kullanıcı özellikle planlama istediyse
skilleri bul, kur, oku, React mimari planını çıkar ve onay iste.

## 2. Prompt: React Landing Page Oluşturma

Önceki mimari plana kesin sadık kal:
- Her section kendi component dosyasında kalır.
- Motion mantığı custom hook'larda yaşar.
- GSAP context'leri `useLayoutEffect` + cleanup ile temizlenir.
- Component sınırları veya state akışı efekt uğruna bozulmaz.

### Girdi Alanları

Kullanıcıdan veya brief'ten şunları al:
- Renk/ton tercihi: açık/koyu/özel ton/vurgu rengi.
- Landing page konusu.
- Hedef kitle ve dönüşüm hedefi.
- Kullanılması gereken copy veya korunacak içerik.

### Çıta

Çıta Awwwards Site of the Day / FWA seviyesidir. "Güzel" yeterli değildir.
Çıktı, sıradan AI landing page kalıplarını açıkça kırmalıdır.

### Olağandışılık Zorunluluğu

Listeden projenin ruhuna en uygun 2-3 direktifi seç ve mükemmelleştir:

1. Beklenen yerleşimi kır: navigasyon kompozisyona gömülebilir, scroll'la
   belirebilir veya alışılmadık bir yerde yaşayabilir.
2. Hero'da görsel beklentisini kır: gerekirse sadece cesur tipografi, boşluk
   ve tek hassas hareketle giriş kur.
3. Sahte bitiş: deneyim bitmiş gibi sakinleşsin, sonra gerçek kapanış sahnesi
   gelsin.
4. Özel cursor: section'a göre şekil/davranış değiştiren marka parçası gibi
   davransın.
5. Bilinçli sessizlik anı: hareketli akış içinde bir section'da tüm motion
   dursun ve duraklama vurgu olsun.
6. Çerçeveyi delme: en az bir eleman viewport/section sınırını görünür şekilde
   aşsın.
7. Sıra dışı scroll hissi: tek güçlü anda yatay kayma veya nefes gibi fiziksel
   scroll karşılığı kur.

Seçim dekorasyon değil omurga kararıdır. Seçtiğin direktifleri gerekçelendir.

### Sahne Mantığı ve Sick Transitions

Sayfayı sahneler dizisi olarak kur. Section geçişleri düz scroll/fade olmaz.
Her sınırda farklı bir teknik kullan:
- Whip-pan clip-path wipe.
- Speed-ramp scroll zoom.
- Morph cut.
- Split/shatter.
- 150-250ms glitch/RGB split reveal.

ScrollTrigger geçişlerinde `pin: true` ve `scrub: 1` kullan; kullanıcı scroll
hızına duyarlı kontrollü deneyim kur.

### Altın Kural: Okunabilirlik

Olağandışılık okunabilirliği feda edemez. Her metin her koşulda okunur.
Gerekirse düz, sabit opaklıkta kontrast overlay kullan. WCAG AA 4.5:1 hedefle.

### Kesin Yasaklar

- Kart tabanlı layout.
- Numaralı "1. 2. 3." süreç anlatımı.
- Gradient arka plan/buton.
- Stok ikon.
- Dekoratif geometrik/blob şekiller.
- Simetrik "hero + features grid + testimonials + CTA" iskeleti.
- Aynı geçiş tekniğini birden fazla sınırda tekrar etmek.
- Kullanıcı istemedikçe 3D/WebGL; etki 2D görsel + CSS/GSAP ile kurulur.

### Görsel Tedarik

Görsel gerekiyorsa Pexels/Unsplash'ten uygun asset bul:

```bash
curl -o /dev/null -s -w "%{http_code}\n" [URL]
curl -L [URL] -o [dosya_adi]
```

Sadece 200 dönen URL indir. Dosya adı, kaynak, section ve kullanım gerekçesini
raporla.

### Masaüstü ve Responsive

Masaüstünde kompozisyon ve motion tam kapasitede yaşar. Mobil sadeleşebilir
ama okunabilirlik ve motion kalitesi düşmez.

## 3. Prompt: Denetim ve İnceltme

Landing page'i eleştirel gözle yeniden denetle. Bulgu listelemekle kalma;
kritik ve orta sorunları düzelt.

### Eksen 0: Okunabilirlik
- Her metin bloğu her koşulda okunabilir mi?
- Kontrast/overlay eksikse ekle.
- Hareketli metin en hızlı anda bile okunuyor mu?

### Eksen 1: Olağandışılık Testi
- Seçilen 2-3 direktif güçlü ve fark edilir mi?
- Sayfa hâlâ tanıdık şablonun süslenmiş hali mi?
- Olağandışılık kullanılabilirliği bozuyor mu?

### Eksen 2: AI Tell Avı
- Kart, numaralı adım, gradient, stok ikon, blob/geometrik süs var mı?
- Tekrar eden transition tekniği var mı?

### Eksen 3: React Mimari Sadakati
- Component sınırları korunmuş mu?
- GSAP context cleanup doğru mu?
- Dosya yapısı plana uygun mu?
- State ve function'lar doğru katmanda mı?

### Eksen 4: Teknik Kalite
- Responsive, WCAG, performans ihlali var mı?
- Animasyon jank veya timing tutarsızlığı var mı?

## Refactor Modu

Mevcut React landing page sıkıcı veya "AI yapmış" gibi duruyorsa önce kapsamı
netleştir:
- Tüm site.
- Sadece şu section: `[section adı]`.

### İçerik Koruma

- Mevcut metin, başlık ve copy'lere dokunma.
- Tek kelime bile değiştirme.
- İçerik hiyerarşisi ve bilgi akışı aynı kalır.
- Sadece section seçildiyse yalnızca o component dosyasına gir.

### Mimari Sadakat

- Mevcut component/dosya yapısını bozma.
- Yeni motion gerekiyorsa mevcut dile uygun custom hook'ta yaşat.
- GSAP cleanup sıfır toleransla korunur.
- Değişiklik sonrası kod daha temiz olmalıdır.

### Refactor Olağandışılığı

Tüm site için 2-3 direktif, tek section için 1 direktif seç:
- Beklenen yerleşimi kır.
- Görsel beklentisini kır.
- Sahte bitiş.
- Özel cursor.
- Bilinçli sessizlik.
- Çerçeveyi delme.
- Sıra dışı scroll hissi.

Seçime teşhisle başla: "Bunu seçtim çünkü şu anki [X] kısmı bu sorunu
yaşıyor." Sonra uygula.

Bitirdiğinde seçilen direktifleri, mimariye nasıl sadık kaldığını ve final
denetimde kapatılan sorunları özetle.

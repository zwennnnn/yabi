# React Landing Base Protokolü

Bu dosya YABI'nin React landing page üretiminde ve mevcut React landing
refactor işlerinde bağlayıcı base yapısıdır. Özet değildir. Ajan bu dosyayı
okuduğunda üç promptu sırayla, eksiksiz ve kaçışsız uygular:

1. Skill araştırması ve React mimari planlama.
2. React landing page oluşturma.
3. Denetim, inceltme ve düzeltme.

Kullanıcı sadece ilk promptu istediyse üretim yapılmaz. Kullanıcı tam üretim
istediyse birinci promptun planını kısa raporlar, sonra ikinci ve üçüncü
promptu uygular.

## Sıfırıncı Kırmızı Çizgiler

### İsim Disiplini

Uygulama, ürün, marka, repo, package veya ekranda görünen başlık için salak
saçma, rastgele, jenerik startup ismi üretme.

Yasak isim üretim kalıpları:
- `Nexa`, `Nova`, `Lumina`, `Vibe`, `Pulse`, `Flow`, `Quantum`, `Hyper`,
  `Aether`, `Orbit`, `Vertex`, `Synergy`, `Catalyst`, `Elevate`, `Prism`
  gibi brief'ten doğmayan süslü kelimeler.
- Sektörle ilgisiz iki kelimeyi birleştirip marka uydurma.
- Kullanıcının verdiği gerçek adı "daha havalı" diye değiştirme.
- Package name ile görünen marka adını karıştırma.

Doğru davranış:
- Kullanıcı marka/app adı verdiyse birebir kullan.
- Kullanıcı ad vermediyse plan fazında sor.
- Kullanıcı "sen seç" derse ismi işin somut kategorisinden çıkar:
  `barber-booking`, `istanbul-chef-table`, `legal-consulting-site` gibi
  açıklayıcı ve düşük egolu geçici ad kullan.
- Ekrandaki ana H1 gerçek marka/ürün yoksa literal kategori veya teklif olur;
  uydurma marka olmaz.

### Her Section Full Animasyon Zorunluluğu

Her section hareket sistemine dahil edilir. "Sadece hero animasyonlu, geri
kalanı statik" YABI seviyesinde başarısızlıktır.

Her section için şu dört katmandan en az üçü tanımlanır:
- Giriş hareketi: section viewport'a girerken nasıl açılır?
- İç hareket: section içindeyken scroll, cursor, hover, parallax, text mask,
  clip, media pan veya layout shift nasıl davranır?
- Çıkış/geçiş: sonraki section'a nasıl bağlanır?
- Mikro etkileşim: CTA, link, form, medya veya cursor nasıl tepki verir?

Bilinçli sessizlik section'ı istisna değildir. O section'da motion durur ama
bu duruş önceki/sonraki hareketle kontrast kuran tasarlanmış bir olaydır.

Her section'ın motion imzası farklı olur. Aynı `fade-in + slide-up` tekrarları
yasaktır.

## 1. Prompt: Skill Araştırma ve React Mimari Planlama

### Amaç

Koda başlamadan önce proje için gereken creative, teknik ve mimari skilleri
bul, kur, oku ve React mimari planını çıkar. Bu aşamada landing page oluşturma.

### Zorunlu Skill Araştırması

Projede kurulu `find-skills` veya `findskills` varsa onu kullan. Yoksa
`npx skills find` ile ara. Aramayı üç kategoriye böl.

#### A) Creative / Tasarım Skilleri

Şunları kapsayan skill ara:
- Kompozisyon.
- Storytelling.
- Sinematik sahne kurgusu.
- Scroll storytelling.
- Reveal animasyonları.
- Kinetic typography.
- Micro-interaction.
- Editoryal okunabilirlik.
- Kontrast ve density kararları.
- Deneysel layout.
- Alışılmadık navigasyon ve interaction yaklaşımı.

Örnek aramalar:

```bash
npx skills find composition design
npx skills find storytelling motion
npx skills find scroll experience
npx skills find kinetic typography
npx skills find frontend design accessibility
```

#### B) Teknik / Görsel Yapısal Skilleri

Şunları kapsayan skill ara:
- Frontend mühendisliği.
- Spacing sistemi.
- Grid sistemi.
- Responsive breakpoint mantığı.
- WCAG.
- Performans.
- Asset optimizasyonu.
- React + GSAP entegrasyonu.
- ScrollTrigger cleanup.

Örnek aramalar:

```bash
npx skills find react animation
npx skills find gsap scrolltrigger
npx skills find frontend performance
npx skills find accessibility wcag
npx skills find responsive design system
```

#### C) Mimari / Kod Kalitesi Skilleri

Şunları kapsayan skill ara:
- React component ayrıştırma.
- Custom hook tasarımı.
- Dosya organizasyonu.
- State management.
- Local state ve Context kararları.
- Kod okunabilirliği.
- İsimlendirme standartları.

Örnek aramalar:

```bash
npx skills find react architecture
npx skills find component design
npx skills find custom hooks
npx skills find code quality naming
```

### Her Skill İçin Yapılacaklar

Her bulunan ve işe yarayan skill için şu formatta raporla:

```markdown
- Skill: [skill adı]
  Kategori: [A/B/C]
  Kaynak: [owner/repo veya local]
  Ne işe yarar: [tek net cümle]
  Bu projede neden gerekli: [somut gerekçe]
  Kurulum: [çalıştırılan komut]
  Okunan dosyalar: [SKILL.md/README path]
  Bağlayıcılık: [ilham / zorunlu teknik kural / mimari kural]
```

Skill kurulduktan sonra `SKILL.md` veya `README` okunur. Sadece arama
sonucuna bakarak karar verilmez. Okumadan "bu skill bunu sağlar" deme.

### React Mimari Planı

Skill araştırması bitince kullanıcıya şu planı özetle. Bu plan onaylanmadan
koda geçilmez.

#### 1. Dosya Yapısı

Zorunlu temel:

```text
src/
  components/
    layout/
      PageShell/
        index.jsx
        PageShell.css
    navigation/
      SiteNav/
        index.jsx
        SiteNav.css
    sections/
      HeroScene/
        index.jsx
        HeroScene.css
      [SectionName]/
        index.jsx
        [SectionName].css
  hooks/
    motion/
      useHeroScene.js
      useSectionScene.js
      useScrollProgress.js
      useMagneticCursor.js
  lib/
    gsap.js
    motionConfig.js
  styles/
    tokens.css
    globals.css
  data/
    landingContent.js
```

Kurallar:
- Her section kendi klasöründe yaşar.
- Her section'ın kendi stil dosyası olur.
- Section component'i sahne sorumluluğu taşır, global motion orchestration
  taşımaz.
- Shared layout ve navigation ayrı kalır.
- İçerik component içine dağılmaz; mümkünse `data/landingContent.js` içinde
  yaşar.

#### 2. Motion Hook Planı

Motion component içine gömülmez. Hook planı şöyle açıklanır:

```text
useHeroScene(ref, options)
useSectionScene(ref, sceneId, options)
useScrollProgress()
useMagneticCursor(targets, options)
```

GSAP standardı:

```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // timeline + ScrollTrigger burada
  }, rootRef);

  return () => ctx.revert();
}, []);
```

Kurallar:
- `ctx.revert()` olmayan GSAP kodu kabul edilmez.
- ScrollTrigger kill/cleanup belirsiz bırakılamaz.
- Hook, kendi section ref'i dışında DOM'a rastgele saldırmaz.
- Timeline isimleri sahneye göre net olur: `heroRevealTl`, `menuDriftTl`,
  `closingFakeOutTl`.

#### 3. `/src/lib/gsap.js`

Plugin registration tek dosyada yapılır:

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

Başka dosyada tekrar `registerPlugin` yapılmaz.

#### 4. State Yönetimi

Plan şu kararı açıklar:
- Section içi hover, open/close, küçük UI state: local state.
- Global cursor modu, global scroll progress, route-level theme shift:
  Context.
- Basit landing page'de Zustand/Redux gibi store kullanılmaz.
- Bir component'in state'i başka section'ın animasyonunu kontrol ediyorsa
  önce mimari yeniden düşünülür.

#### 5. Design Token Planı

Tokenlar tek yerde yaşar:

```css
:root {
  --color-ink: ...;
  --color-paper: ...;
  --color-accent: ...;
  --space-1: ...;
  --font-display: ...;
  --motion-fast: ...;
}
```

Kurallar:
- Component içinde hardcoded hex yasak.
- Inline style ile tasarım kararı gömülemez.
- `clamp()` ile responsive tipografi/spacing planlanır.
- Motion duration/ease değerleri token veya `motionConfig.js` içinden gelir.

#### 6. İsim Planı

Plan şu satırı içermek zorundadır:

```markdown
İsim kararı: [kullanıcı verdi / kullanıcıdan istenecek / geçici literal ad]
```

Uydurma isim yoksa sorun yok; uydurma isim varsa plan başarısızdır.

#### 7. Section Motion Matrisi

Koda geçmeden her section için tablo çıkar:

```markdown
| Section | Rol | Giriş | İç hareket | Çıkış/geçiş | Mikro etkileşim | Cleanup hook |
|---|---|---|---|---|---|---|
| HeroScene | İlk darbe | ... | ... | ... | ... | useHeroScene |
```

Boş hücre yasaktır. Her section full animasyon alır.

### Planlama Fazı Çıkışı

Kullanıcıya şunları ver:
- Kurulan/okunan skill listesi.
- React mimari planı.
- İsim kararı.
- Section motion matrisi.
- Riskler ve varsayımlar.
- "Onay verirsen üretime geçeceğim" cümlesi.

## 2. Prompt: React Landing Page Oluşturma

### Başlama Şartı

Önceki React mimari planı onaylanmadan üretime geçme. Kullanıcı baştan "direkt
yap" dediyse planı kısa raporla ve aynı turda üretime geçebilirsin; ama planı
içinden atlama.

### Girdi Alanları

Şunları netleştir:

```text
RENK/TON TERCİHİ:
[açık/koyu/özel ton/vurgu rengi]

LANDING PAGE KONUSU:
[ürün/hizmet/marka/kampanya]

MARKA/APP ADI:
[kullanıcı verdi mi? verilmediyse sor veya literal geçici ad kullan]

HEDEF:
[booking/satış/demo formu/newsletter/başvuru/portföy inceleme]

KORUNACAK COPY:
[varsa dokunulmaz metinler]
```

Marka/app adı boşsa "Nexa tarzı" isim uydurma. Adı olmayan işte H1 literal
olabilir: "Independent Barber Booking", "Chef's Table Reservation", "Crisis
Strategy Advisory" gibi.

### Mimariye Mutlak Sadakat

Üretim boyunca şunları bozma:
- Her section kendi component klasöründe kalır.
- Her section'ın CSS'i kendi dosyasındadır.
- Motion hook'ta yaşar.
- `src/lib/gsap.js` dışında plugin registration yapılmaz.
- `ctx.revert()` cleanup olmadan GSAP yazılmaz.
- State component sınırlarından sızmaz.
- Token dışı renk, spacing, font, duration kullanılmaz.

### Çıta

Çıta Awwwards Site of the Day / FWA seviyesidir. "Temiz", "modern", "şık",
"premium" gibi sıfatlar hedef değildir. Hedef, Locomotive, Resn, Active
Theory, Obys, Ueno kalitesinde sahnelenmiş web deneyimidir.

### Dünya Planı

Üretime geçmeden önce içinden şu 7 kararı ver:
- Premis: Bu site hangi somut mekan/an/ritüel/sistem gibi hissettiriyor?
- Işık: ışık nereden geliyor ve nasıl davranıyor?
- Malzeme: yüzeyler neye benziyor?
- Renk: renkler neden bu renk?
- Hareket fiziği: ağır, keskin, akışkan, mekanik veya patlayıcı mı?
- Tipografi: display ve text font nasıl konuşuyor?
- Section eşleşmesi: her section bu dünyanın hangi anı?

### Olağandışılık Seçimi

Listeden 2-3 tanesini seç. Seçtiğin her direktif için şu formatı yaz:

```markdown
Direktif: [adı]
Bunu seçtim çünkü: [brief'teki somut ihtiyaç]
Nerede uygulanacak: [section/transition]
Teknik karşılık: [CSS/GSAP/ScrollTrigger/hook]
Okunabilirlik önlemi: [overlay/safe zone/contrast]
```

Direktifler:
- Beklenen yerleşimi kır.
- Hero'da görsel beklentisini kır.
- Sahte bitiş.
- Özel cursor davranışı.
- Bilinçli sessizlik anı.
- Çerçeveyi delme.
- Sıra dışı scroll hissi.

### Her Section İçin Full Animasyon

Her section'a ayrı motion imzası ver. Minimum set:

```markdown
HeroScene:
- Entrance: ...
- Scroll-linked internal motion: ...
- Exit transition: ...
- Micro-interaction: ...
- Reduced-motion fallback: ...

[NextSection]:
- Entrance: ...
- Scroll-linked internal motion: ...
- Exit transition: ...
- Micro-interaction: ...
- Reduced-motion fallback: ...
```

Kabul edilmeyenler:
- "Bu section statik kalsın."
- Her section'a aynı fade/slide vermek.
- Sadece CSS transition ile geçişi geçiş saymak.
- Motion'u text okunmaz hale getirmek.
- Mobilde tüm motion hissini öldürmek.

### Sick Transitions

Section sınırları düz scroll veya fade olamaz. Her sınırda farklı teknik
kullan:
- Whip-pan clip-path wipe.
- Speed-ramp scroll zoom.
- Morph cut.
- Split/shatter.
- 150-250ms glitch/RGB split reveal.
- Text mask carry-over.
- Media crop reveal.

ScrollTrigger kullanılan büyük geçişlerde:
- `pin: true`.
- `scrub: 1`.
- Net `start` ve `end`.
- Cleanup.
- Reduced-motion alternatifi.

Aynı teknik iki sınırda tekrar ederse üretim başarısızdır.

### Okunabilirlik

Her metin için:
- WCAG AA 4.5:1 hedefle.
- Yoğun görsel üstünde safe zone veya solid overlay kullan.
- `mix-blend-mode` ana metinde tek başına yeterli değildir.
- Kinetic typography en hızlı anda bile okunur.
- CTA her viewport'ta görünür ve tıklanabilir kalır.

### Yasaklar

Üretimde şunları kullanma:
- Card layout.
- Numaralı süreç.
- Generic feature grid.
- Gradient arka plan/buton.
- Stok ikon.
- Dekoratif blob/geometrik şekil.
- Aynı hero şablonu.
- Aynı transition tekrarı.
- Kullanıcı istemedikçe 3D/WebGL.
- Uydurma marka/app adı.

### Görsel Tedarik

Görsel gerekiyorsa Pexels/Unsplash üzerinden gerçek asset bul. URL'i kontrol
etmeden indirme:

```bash
curl -o /dev/null -s -w "%{http_code}\n" [URL]
curl -L [URL] -o [dosya_adi]
```

Sadece 200 dönen dosya kullan. Rapor:

```markdown
- Dosya: ...
  Kaynak: ...
  Kullanım: ...
  Neden bu dünyanın parçası: ...
```

### Responsive

Desktop ana sahnedir. Mobilde sadece kırpma değil yeniden kompozisyon yapılır:
- Layer sayısı azaltılabilir.
- Motion mesafesi kısalabilir.
- Pin süreleri sadeleşebilir.
- Okunabilirlik, CTA erişimi ve motion hissi düşemez.

### Üretim Sonu

Üretim bitince otomatik olarak üçüncü prompta geç.

## 3. Prompt: Denetim ve İnceltme

### Amaç

Landing page'i kendi işin gibi savunma. Jüri ve QA gibi kır. Bulduğun kritik
ve orta sorunları düzeltmeden teslim etme.

### Rapor Formatı

Önce raporla:

```markdown
## Okunabilirlik Bulguları
- ...

## Olağandışılık Zayıflıkları
- ...

## AI Tell Bulguları
- ...

## React Mimari Bulguları
- ...

## Teknik Bulgular
- ...

## Yapılacak Düzeltmeler
- ...
```

Sonra düzelt. Sadece rapor yazıp bırakma.

### Eksen 0: Okunabilirlik

Kontrol:
- Her başlık okunuyor mu?
- CTA okunuyor mu?
- Mobilde text taşmıyor mu?
- Video/foto üstünde metin güvenli bölgede mi?
- Overlay gerekiyorsa solid ve sabit opaklıkta mı?
- Kinetic text okunamayacak kadar hızlı mı?

Eksik varsa düzelt.

### Eksen 1: Olağandışılık

Kontrol:
- Seçilen 2-3 direktif gerçekten görünür mü?
- Direktifler sadece dekor mu yoksa sayfanın omurgası mı?
- Kullanıcı "bunu daha önce görmedim" der mi?
- Beklenen hero/features/testimonial/CTA şablonu hâlâ hissediliyor mu?
- Olağandışılık kullanılabilirliği bozuyor mu?

Zayıfsa güçlendir.

### Eksen 2: Her Section Full Animasyon

Her section için tabloyu yeniden doldur:

```markdown
| Section | Entrance | Internal motion | Exit transition | Micro-interaction | Durum |
|---|---|---|---|---|---|
```

Herhangi bir section'da entrance/internal/exit tamamen boşsa düzelt.
Herhangi iki section aynı motion imzasını taşıyorsa farklılaştır.

### Eksen 3: AI Tell Avı

Ara ve temizle:
- Card.
- Feature grid.
- Numbered steps.
- Generic icon.
- Gradient.
- Blob/geometric ornament.
- Ortalı sıradan section.
- Aynı transition tekrarı.
- Uydurma marka/app adı.

### Eksen 4: React Mimari Sadakati

Kontrol:
- `/src/components/sections/[SectionName]/index.jsx` yapısı korunuyor mu?
- CSS dosyaları section yanında mı?
- Motion hook'ta mı?
- `src/lib/gsap.js` tek registration noktası mı?
- Her GSAP context cleanup yapıyor mu?
- State doğru yerde mi?
- Token dışı renk/spacing/font var mı?

Bozuksa düzelt.

### Eksen 5: Teknik Kalite

Kontrol:
- Responsive.
- WCAG.
- Performance.
- Asset boyutu.
- Console error.
- Broken media.
- Focus state.
- Reduced motion.
- Animation jank.

Mümkünse `yabi-ui-tester` ile gerçek tarayıcı kanıtı al.

### Final Çıkışı

Finalde şunları kısa özetle:
- Seçilen olağandışılık direktifleri ve nedenleri.
- Her section'ın motion imzası.
- İsim disiplininin nasıl korunduğu.
- Mimariye nasıl sadık kalındığı.
- Denetimde bulunan ve kapatılan sorunlar.

## Opsiyonel Refactor Modu

Mevcut React landing page sıkıcı, standart veya AI yapmış gibi görünüyorsa
bu mod uygulanır.

### Önce Kapsamı Netleştir

Kullanıcıdan biri alınır:

```text
Tüm site
Sadece şu section: [section adı]
```

Belirsizse sor.

### İçerik Koruma

- Mevcut metinlere dokunma.
- Başlıkları değiştirme.
- Copy'yi kısaltma veya uzatma.
- İçerik hiyerarşisini koru.
- Tek section seçildiyse diğer dosyalara dokunma.

### Refactor Teşhisi

Önce teşhis yaz:

```markdown
Bunu seçtim çünkü şu anki [section/site] şu sorunu yaşıyor:
- [standart layout]
- [zayıf motion]
- [AI tell]
- [okunabilirlik riski]
```

### Refactor Olağandışılığı

Tüm site için 2-3 direktif, tek section için 1 direktif seç:
- Beklenen yerleşimi kır.
- Görsel beklentisini kır.
- Sahte bitiş.
- Özel cursor.
- Bilinçli sessizlik.
- Çerçeveyi delme.
- Sıra dışı scroll hissi.

### Refactor Motion Kuralı

Değiştirilen her section full animasyon alır:
- Entrance.
- Internal motion.
- Exit/neighbor transition.
- Micro-interaction.
- Reduced-motion fallback.

### Refactor Teslimi

Bitirdiğinde özetle:
- Hangi direktif seçildi?
- Neden seçildi?
- Hangi dosyalar değişti?
- Copy korundu mu?
- Component sınırları korundu mu?
- Motion hook cleanup var mı?
- Hangi AI tell'ler temizlendi?

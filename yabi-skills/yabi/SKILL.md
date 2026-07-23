---
name: yabi
description: Awwwards/FWA seviyesini aşan komple web sitesi, landing page, çok sayfalı marketing site, ürün sitesi, SaaS sitesi, portfolio, restoran/venue sitesi, e-commerce deneyimi, homepage, iç sayfa, tema, UI redesign ve mevcut siteleri arşa çıkarma/refactor işleri için zorunlu tasarım, mimari, motion, içerik hiyerarşisi ve denetim anayasası. Kullanıcı "site", "web sitesi", "landing", "sayfa", "tasarım", "tema", "UI", "homepage", "product page", "portfolio", "kurumsal site", "redesign", "refactor" veya "yabi" dediğinde devreye gir; bu skill olmadan üretilen web deneyimi kabul edilebilir kalite sayılmaz.
---

# YABI

YABI tek bir landing page süsleme kılavuzu değildir. YABI; komple web
deneyimi kuran, rotaları, bilgi mimarisini, görsel dünyayı, motion sistemini,
component sınırlarını ve son kalite denetimini birlikte yöneten tasarım
anayasasıdır.

Hedef "iyi görünen site" değildir. Hedef, aynı brief'i alan sıradan AI
çıktılarının yanına koyulduğunda bütün düzeni küçük gösteren, gerçek tarayıcıda
çalışan, okunabilir, hızlı, tutarlı ve unutulmaz bir web deneyimidir.

## Dil ve Referans Yükleme

Kullanıcının dili Türkçe ise `references/tr/` dosyalarını oku. Kullanıcı
İngilizce çalışıyorsa `references/en/` dosyalarını oku. Kullanıcı iki dilli
çıktı, prompt veya dokümantasyon isterse iki dili de yükle.

Her YABI işinde en az şunları oku:
- `references/tr/constitution.md` veya `references/en/constitution.md`
- `references/tr/site-systems.md` veya `references/en/site-systems.md`
- `references/tr/visual-world.md` veya `references/en/visual-world.md`
- `references/tr/audit-rubric.md` veya `references/en/audit-rubric.md`
- React landing page, homepage veya section refactor işi varsa:
  `references/tr/react-landing-base.md` veya `references/en/react-landing-base.md`

Duruma göre ek oku:
- Motion ağırsa: `references/*/motion-and-interaction.md`
- Sektör belirginse: `references/*/sector-playbooks.md`
- Kullanıcı prompt/brief sistemi istiyorsa: `references/*/prompt-pack.md`

## Zorunlu Fazlar

### Faz -1: Skill Araştırması ve React Mimari Planı

React landing page, homepage, single-page campaign, hero/section redesign veya
mevcut landing refactor görevlerinde koda geçmeden önce bu faz zorunludur.

Projede `find-skills`/`findskills` skili varsa kullan. Yoksa `npx skills find`
ile araştır. Üç kategori tara:
- Creative / tasarım: kompozisyon, storytelling, sinematik sahne, motion
  design, kinetic typography, editorial readability, deneysel layout.
- Teknik / görsel yapısal: frontend mühendisliği, spacing/grid/breakpoint,
  WCAG, performans, React + GSAP + ScrollTrigger cleanup.
- Mimari / kod kalitesi: React component ayrıştırma, custom hook, dosya
  organizasyonu, state management, isimlendirme.

Her bulunan ilgili skill için adını, kategorisini ve işe yaradığı alanı özetle;
projeye kur; sonra `SKILL.md`/`README` dosyalarını oku. Skill okumadan kod
yazma.

Bu fazın sonunda kullanıcıya React mimari planını özetle ve onay iste. Kullanıcı
açıkça "planlama", "1. prompt" veya "henüz oluşturma" diyorsa burada dur.
Kullanıcı baştan tam üretim istemişse, planı özetledikten sonra devam et.

### Faz 0: Kapsamı Kilitle

Site tipini netleştir: tek sayfa mı, çok sayfalı site mi, ürün sitesi mi,
SaaS marketing + dashboard kabuğu mu, portfolio mu, restoran/venue mu,
e-commerce mi, mevcut site refactor'ü mü?

Kullanıcı eksik bilgi verdiyse momentum bozmayacak varsayım yap; ama marka
tonu, hedef kitle, zorunlu sayfalar veya renk/ton tercihi kritikse kısa sor.
Kullanıcı "sen seç" diyorsa seçimi gerekçelendir ve devam et.

### Faz 1: Site Mimarisi + Dünya Planı

Koda geçmeden önce kısa ama somut plan çıkar:
- Rota haritası: homepage, kritik iç sayfalar, dönüşüm sayfaları, hata/boş
  durum sayfaları.
- Section sistemi: her route hangi sahnelerden oluşacak, tekrar eden bloklar
  hangi component ailesine dönüşecek.
- İçerik omurgası: kullanıcının önce neye inanması, sonra neyi anlaması, en
  sonda ne yapması gerekiyor.
- Görsel dünya: ışık, malzeme, renk, tipografi, fotoğraf/video dili, motion
  fiziği.
- Teknik mimari: component sınırları, token sistemi, asset stratejisi, motion
  hook'ları, responsive davranış.
- React landing mimarisi gerekiyorsa `references/*/react-landing-base.md`
  dosyasındaki dosya yapısı, `/src/lib/gsap.js`, `/src/hooks/` motion hook'ları,
  token sistemi ve state paylaşımı kararlarına birebir uy.

Plan soyut sıfatlardan oluşamaz. Her karar "bu projede neden böyle" sorusuna
cevap vermeli.

### Faz 2: İnşa

Siteyi gerçek ürün gibi inşa et:
- İlk ekran landing gibi değil, sitenin dünyasına giriş gibi davranır.
- İç sayfalar homepage'in kopyası olmaz; aynı evrenin farklı odaları gibi
  hissettirir.
- Navigation, footer, CTA, form, modal, listeler, detay sayfaları ve empty
  state'ler aynı tasarım sisteminden gelir.
- Motion component içine dağılmaz; hook/util katmanında yaşar.
- Görsel asset kullan; dekoratif blob, ucuz gradient ve kart grid refleksiyle
  işi kapatma.
- React landing page inşa ediyorsan önceki mimari plana kesin sadık kal:
  section component sınırlarını koru, motion'u custom hook'lara koy,
  GSAP context cleanup'ı `ctx.revert()` ile yap, inline stil ve sabit hex
  gömme.

### Faz 3: Kırma ve Sertleştirme

Kendi işini jüri gibi değil, üretim öncesi son savunma hattı gibi denetle.
Okunabilirlik, responsive, route bütünlüğü, broken asset, console error,
yasaklı pattern, motion jank, component sızıntısı ve content hierarchy tek tek
kapatılmadan bitirme.

`yabi-ui-tester` kuruluyse veya kullanıcı doğrulama isterse onu çağır; raporu
YABI audit rubric'e geri besle ve çıkan kritik sorunları düzelt.

React landing page ve refactor işlerinde `references/*/react-landing-base.md`
içindeki üç eksenli base prompt yapısını uygula: önce skill araştırması +
mimari plan, sonra olağandışılık zorunlu üretim, sonra denetim ve inceltme.

## Asla İhlal Etme

- Okunabilirlik tüm estetik kararların üstündedir.
- Kart grid, numaralı süreç, generic icon set, dekoratif blob ve ucuz gradient
  varsayılan AI kokusudur; gerçek gerekçe yoksa sökülür.
- Çok sayfalı sitede her route aynı hero kalıbının klonu olamaz.
- Component sınırları bozulamaz; motion kodu render mantığını kirletemez.
- Masaüstü ana sahnedir, mobil sonradan sıkıştırılmış versiyon değildir.
- Her tasarım kararının dünyada karşılığı vardır: ışık, malzeme, hareket,
  ton ve içerik aynı evrene ait olmalıdır.
- React landing işlerinde base protokol pazarlık konusu değildir: skill
  araştırması, React mimari planı, olağandışılık seçimi, sick transitions,
  görsel tedarik, okunabilirlik denetimi ve refactor içerik koruması her
  zaman uygulanır.

## Yardımcı Scriptler

Bu skill birkaç deterministik yardımcı script içerir:

- `scripts/yabi-brief.js`: yeni proje için site brief şablonu üretir.
- `scripts/yabi-static-audit.js`: kaynak kodda yasaklı pattern ve zayıf UI
  izlerini tarar.
- `scripts/yabi-reference-index.js`: skill referanslarını ve frontmatter
  sağlığını hızlı kontrol eder.

Scriptleri `yabi` klasöründen `node scripts/<script>.js` ile çalıştır.

## Kapanış Sorusu

Her teslimden önce kendine şunu sor:

Bu site gerçek bir marka tarafından yayınlansa, rakipleri aynı hafta kendi
sitelerine utanarak bakar mı?

Cevap belirsizse Faz 3'e dön.

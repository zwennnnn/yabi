---
name: yabi-ui-tester
description: Bir landing page/web sitesini Playwright ile otomatik olarak tüm ekran boyutlarında gezip, her section ve geçişte ekran görüntüsü alan, konsol/network hatalarını yakalayan ve yabi.md'deki tasarım anayasasına göre "kırık" (bug, okunmayan metin, üst üste binen eleman, takılan animasyon, yasaklı pattern) tespit eden test ajanı. KULLANICI "/yabi-ui-tester" yazdığında, "yabi ui testeri çağır" dediğinde, "yabi test", "siteyi test et", "kırık var mı bak", "screenshot al kontrol et", "ui testi yap" dediğinde MUTLAKA bu skili kullan — açıkça skil adını söylemese bile bir sitenin/landing page'in görsel/teknik doğrulamasını istiyorsa devreye gir. Bu skil kod YAZMAZ, sadece TEST EDER ve RAPORLAR.
---

# YABİ-UI-TESTER — Ekranı Tarayan, Kırığı Bulan Ajan

Bu skil `yabi.md` ile birlikte çalışır. `yabi.md` inşa eder, bu skil
**doğrular**. Faz 3'teki (Denetim/Jüri Turu) göz-ile-bakma değerlendirmesine
somut, ekran görüntüsüne ve gerçek tarayıcı verisine dayalı kanıt sağlar —
"bence okunaklı" değil, "şu viewport'ta şu kontrast oranı bu, şu section'da
şu eleman şu elemanın üzerine biniyor" der.

Bu bir tasarım/kod yazma ajanı DEĞİLDİR. Görevi: siteyi gez, kanıt topla,
kırığı listele, önceliklendir, düzeltme öner — düzeltmeyi kendisi yapmaz,
bunu ya kullanıcıya ya da `yabi.md` akışına devreder.

---

## 0. TETİKLENME

Şu ifadelerin herhangi biri geldiğinde devreye gir:
- `/yabi-ui-tester`
- "yabi ui testeri çağır" / "yabi testeri çağır"
- "siteyi test et", "kırık var mı bak", "screenshot al kontrol et"
- "ui testi yap", "playwright ile kontrol et"
- Bir landing page inşası/refactor'ü bittiğinde ve kullanıcı doğrulama
  istediğinde (yabi.md Faz 3'ün bir parçası olarak da tetiklenebilir)

---

## 1. ÖN KOŞUL KONTROLÜ

Çalışmaya başlamadan önce Playwright kurulu mu kontrol et:

```bash
npx playwright --version || npm install -D playwright && npx playwright install chromium
```

Erişilebilirlik/kontrast taraması için axe-core da gerekli:

```bash
npm list @axe-core/playwright || npm install -D @axe-core/playwright
```

Kurulu değilse kur, kullanıcıya haber ver. Bu adımı atlama — kurulu
olduğunu varsayıp direkt script çalıştırmaya kalkma, hata alırsın.

**Hedef URL'i netleştir:** Kullanıcı belirtmediyse sor — dev server mı
(örn. `http://localhost:3000`), yoksa canlı bir URL mi test edilecek?
Dev server ise önce ayakta olduğundan emin ol.

---

## 2. TEST PROTOKOLÜ

### 2.1 Viewport Matrisi
yabi.md'nin "masaüstü öncelikli ama mobilde eşit kalite" kuralına uygun
olarak EN AZ şu dört viewport'ta test et:

| Ad       | Genişlik x Yükseklik | Neden                          |
|----------|----------------------|---------------------------------|
| Desktop  | 1920 x 1080          | Ana vitrin deneyimi, en kritik  |
| Laptop   | 1440 x 900           | Yaygın gerçek kullanım boyutu   |
| Tablet   | 768 x 1024           | Kırılma noktası testi           |
| Mobile   | 390 x 844            | iPhone standardı, motion testi  |

### 2.2 Scroll-Adımlı Tarama (kritik — pin/scrub animasyonlar için)
yabi.md'deki sahneler `ScrollTrigger` + `pin: true` + `scrub: 1` ile
çalışıyor, yani statik bir sayfa değil, scroll pozisyonuna bağlı bir
zaman çizelgesi. Tek bir "sayfanın tamamını görüntüle" screenshot'ı
YETERSİZ. Bunun yerine:

1. Sayfanın toplam scroll yüksekliğini ölç
2. Bu yüksekliği 20-30 eşit adıma böl
3. Her adımda: scroll pozisyonuna git → kısa bekleme (animasyonun
   yetişmesi için ~300-500ms) → ekran görüntüsü al
4. Her section'ın giriş, orta (pin anı) ve çıkış (geçiş anı) karelerini
   özellikle yakalamaya çalış — geçişlerin ortasında donma/kırık/
   flash var mı görmek için

### 2.3 Etkileşim Testleri
- Her interaktif elemente (buton, link, kart yerine geçen özel öğeler)
  hover yap, ekran görüntüsü al
- Özel cursor davranışı varsa (yabi.md Bölüm 3, madde 4) fareyi farklı
  section'larda hareket ettirip cursor'ın değiştiğini doğrula
- Klavye navigasyonu: Tab ile gezinip odak (focus) durumunun görünür
  olduğunu kontrol et (erişilebilirlik)

### 2.4 Konsol ve Ağ İzleme
Her sayfa yüklemesinde şunları dinle ve logla:
- `page.on('console')` → warning/error seviyesindeki tüm mesajlar
- `page.on('pageerror')` → yakalanmamış JS hataları
- `page.on('response')` → 400/404/500 dönen tüm istekler (kırık görsel/
  video/font/script)
- GSAP'a özgü konsol uyarıları (`GSAP target not found`, `ScrollTrigger`
  hataları) özellikle işaretlensin

### 2.5 Otomatik Erişilebilirlik/Kontrast Taraması
Her viewport'ta axe-core çalıştır, WCAG AA ihlallerini (özellikle
`color-contrast` kuralı) topla — bu, yabi.md'nin "Altın Kural:
Okunabilirlik" maddesinin OTOMATİK doğrulamasıdır, göz kararı değil.

### 2.6 Screenshot Organizasyonu
```
/yabi-test-results/
  {tarih-saat}/
    desktop/
      001-scroll-0.png
      002-scroll-5.png
      ...
      hover-{eleman-adı}.png
    laptop/
    tablet/
    mobile/
    console-log.json
    network-errors.json
    axe-report.json
```

---

## 3. HAZIR PLAYWRIGHT SCRIPT İSKELETİ

Aşağıdaki script'i `scripts/yabi-ui-audit.js` olarak projeye kaydet,
URL'i ve section sayısını projeye göre uyarla, sonra
`node scripts/yabi-ui-audit.js <URL>` ile çalıştır:

```javascript
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = process.argv[2] || 'http://localhost:3000';
const OUT_DIR = path.join('yabi-test-results', new Date().toISOString().replace(/[:.]/g, '-'));

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const SCROLL_STEPS = 24;

async function auditViewport(browser, viewport) {
  const dir = path.join(OUT_DIR, viewport.name);
  fs.mkdirSync(dir, { recursive: true });

  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();

  const consoleLogs = [];
  const networkErrors = [];

  page.on('console', (msg) => {
    if (['warning', 'error'].includes(msg.type())) {
      consoleLogs.push({ type: msg.type(), text: msg.text() });
    }
  });
  page.on('pageerror', (err) => {
    consoleLogs.push({ type: 'pageerror', text: err.message });
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      networkErrors.push({ url: res.url(), status: res.status() });
    }
  });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // giriş animasyonlarının oturması için

  const scrollHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  for (let i = 0; i <= SCROLL_STEPS; i++) {
    const scrollY = Math.round((scrollHeight * i) / SCROLL_STEPS);
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400); // scrub animasyonun yetişmesi için
    const fileName = `${String(i).padStart(3, '0')}-scroll-${scrollY}.png`;
    await page.screenshot({ path: path.join(dir, fileName) });
  }

  // Kırık görsel/video kontrolü
  const brokenMedia = await page.evaluate(() => {
    const broken = [];
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) broken.push({ tag: 'img', src: img.src });
    });
    document.querySelectorAll('video').forEach((v) => {
      if (v.readyState === 0) broken.push({ tag: 'video', src: v.currentSrc });
    });
    return broken;
  });

  // Axe-core erişilebilirlik/kontrast taraması
  let axeResults = null;
  try {
    axeResults = await new AxeBuilder({ page }).analyze();
  } catch (e) {
    axeResults = { error: e.message };
  }

  fs.writeFileSync(path.join(dir, 'console-log.json'), JSON.stringify(consoleLogs, null, 2));
  fs.writeFileSync(path.join(dir, 'network-errors.json'), JSON.stringify(networkErrors, null, 2));
  fs.writeFileSync(path.join(dir, 'broken-media.json'), JSON.stringify(brokenMedia, null, 2));
  fs.writeFileSync(path.join(dir, 'axe-report.json'), JSON.stringify(axeResults, null, 2));

  await context.close();

  return { viewport: viewport.name, consoleLogs, networkErrors, brokenMedia, axeViolations: axeResults?.violations?.length ?? 'n/a' };
}

(async () => {
  const browser = await chromium.launch();
  const summary = [];
  for (const vp of VIEWPORTS) {
    console.log(`Testing ${vp.name} (${vp.width}x${vp.height})...`);
    const result = await auditViewport(browser, vp);
    summary.push(result);
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`Bitti. Sonuçlar: ${OUT_DIR}`);
})();
```

Bu script bir iskelet — özel cursor testi, hover testleri, section-bazlı
isimlendirme gibi projeye özel detayları görev sırasında script'e ekle.

---

## 4. ANALİZ PROTOKOLÜ — SCREENSHOT'LARI YABİ.MD'YE KARŞI OKU

Script çalıştıktan sonra, ürettiği görselleri ve JSON raporlarını
gerçekten incele (view tool ile screenshot'lara bak). Her viewport için
şu "kırık" kategorilerini tek tek tara:

### 4.1 Okunabilirlik Kırıkları (yabi.md 2.1)
- axe-report.json'daki `color-contrast` ihlallerini listele
- Screenshot'larda metnin görsel/video arka planın yoğun kısmına denk
  geldiği anlar var mı? (özellikle geçiş ortası karelerde)
- mix-blend-mode kullanılan zorunlu metin (başlık/CTA) bir karede
  neredeyse görünmez hale geliyor mu?

### 4.2 Layout Kırıkları
- Elementler beklenmedik şekilde üst üste biniyor mu (bleed/kesişim
  KASTEN mi, yoksa kaza mı — yabi.md'nin "çerçeveyi delme" direktifiyle
  kasıtlı olanları kırık sayma, ama metni/butonu gizleyen kazara
  çakışmaları işaretle)
- Tablet/mobile'da elemanlar viewport dışına taşıp yatay scroll
  yaratıyor mu (istenmeyen overflow)
- Boş/kırık section var mı (içerik yüklenmemiş, animasyon hiç
  tetiklenmemiş)

### 4.3 Motion Kırıkları
- Scroll adımları arasında bir section'ın "takılı kaldığı" (aynı
  karede uzun süre donduğu) bir an var mı — pin'in release olmadığına işaret
- Geçiş ortası karelerde flash/pop (aniden görünme/kaybolma, ara kare
  eksikliği) var mı
- Bir eleman scroll bittiğinde başlangıç pozisyonuna "geri sıçrıyor" mu

### 4.4 Teknik Kırıklar
- `console-log.json`'da error seviyesinde herhangi bir kayıt var mı
- `network-errors.json`'da 404 dönen görsel/video/font var mı
- `broken-media.json` boş mu değil mi

### 4.5 Yasaklı Pattern Taraması (yabi.md 2.3)
Screenshot'lara bakarak (ve gerekirse DOM'u `page.evaluate` ile
inceleyerek) şunları ara:
- Çok sayıda aynı boyutlu, köşesi yuvarlatılmış, gölgeli kutu (kart
  pattern şüphesi)
- Görünür "1. 2. 3." numaralandırması
- CSS gradient (computed `background-image` içinde `gradient(` geçen
  elementleri tara)
- Tüm section'larda birbirinin aynısı görünen giriş animasyonu deseni

---

## 5. RAPOR FORMATI

Analiz bittiğinde, kullanıcıya şu formatta bir rapor sun (yabi.md Bölüm
11'deki eksen yapısıyla birebir uyumlu):

```markdown
# YABİ-UI-TESTER Raporu — [tarih]

## Özet
- Test edilen URL: ...
- Taranan viewport: 4 (desktop/laptop/tablet/mobile)
- Toplam ekran görüntüsü: N
- KRİTİK kırık sayısı: N
- ORTA kırık sayısı: N
- DÜŞÜK öncelikli bulgu: N

## KRİTİK (hemen düzeltilmeli)
1. [Viewport] [Section/an] — [sorun tanımı]
   Kanıt: yabi-test-results/.../XXX-scroll-YYY.png
   Öneri: ...

## ORTA (kaliteyi düşürüyor)
...

## DÜŞÜK (ince ayar)
...

## Otomatik Tarama Sonuçları
- axe-core kontrast ihlalleri: N (detay: axe-report.json)
- Konsol hataları: N
- Kırık network isteği: N
- Yasaklı pattern şüphesi: [varsa listele]
```

KRİTİK = okunabilirlik ihlali, kırık animasyon, konsol hatası, 404.
ORTA = yasaklı pattern şüphesi, tutarsızlık, zayıf olağandışılık.
DÜŞÜK = ince timing/estetik önerisi.

---

## 6. YABİ.MD İLE İLİŞKİ

Bu skil `yabi.md`'nin Faz 3'ünü (Denetim/Jüri Turu) GÖRSEL VE TEKNİK
KANITLA besler. Akış şöyle olmalı:

1. `yabi.md` ile site inşa edilir (Faz 0-2)
2. `yabi-ui-tester` çağrılır, siteyi tarar, rapor üretir
3. Bu raporla birlikte `yabi.md` Bölüm 11'deki eksenler tek tek
   kapatılır — artık "bence böyle" değil, ekran görüntüsü ve axe-core
   verisiyle desteklenmiş bir denetim olur
4. Düzeltmeler yapılır, gerekiyorsa `yabi-ui-tester` TEKRAR çağrılır
   (regresyon kontrolü — düzeltme yeni bir kırık yaratmadı mı?)

Bu skil düzeltmeyi kendisi yapmaz. Bulur, kanıtlar, raporlar — düzeltme
kararı ve uygulaması `yabi.md` akışına veya kullanıcıya aittir.

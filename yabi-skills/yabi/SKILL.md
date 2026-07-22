---
name: yabi
description: Awwwards / FWA seviyesinde, "daha önce görülmemiş" landing page ve site tasarımı için zorunlu iş akışı, tasarım anayasası ve denetim protokolü. Kullanıcı bir landing page, açılış sayfası, tanıtım sitesi, ürün lansmanı, tema veya mevcut bir sitenin "arşa çıkarılması/refactor edilmesi" istediğinde MUTLAKA bu skili kullan — kullanıcı "site", "sayfa", "tasarım", "landing", "tema" kelimelerinden herhangi birini geçse bile, açıkça "yabi skilini kullan" demese bile devreye gir. Bu skil olmadan üretilen hiçbir landing page kabul edilebilir kalitede sayılmaz.
---

# YABİ — En Kötü Adamı Bile Tanrısal Yapan Tasarım Skili

Bu dosya bir öneri listesi değil, bir anayasadır. Burada yazan hiçbir kural
"ilham" değildir — "zorunlu" yazan her şey pazarlık konusu değildir.
Amaç net: en kötü, en sıradan fikri bile alıp Awwwards/FWA seviyesinde,
kullanıcının kapattıktan sonra bile aklından çıkaramayacağı bir deneyime
dönüştürmek. "Güzel" bir çıktı burada BAŞARISIZLIKTIR. Hedef her zaman
"bunu daha önce hiç görmedim" dedirtmektir.

Bu skili tetikleyen her görevde, aşağıdaki fazları SIRAYLA uygula. Fazları
atlama, sıkıştırma, "zaten biliyorum" diyerek kısaltma.

---

## 0. SÜREÇ AKIŞI — 4 FAZ

```
FAZ 0: Skill Keşfi ve Kurulum
   ↓
FAZ 1: Mimari + Dünya Planlaması (koda geçmeden ÖNCE)
   ↓
FAZ 2: İnşa (landing page'i gerçekten kodlama)
   ↓
FAZ 3: Denetim / Jüri Turu (acımasız kalite kontrolü)
```

Mevcut bir siteyi yükseltiyorsan (kod yazmıyor, var olanı düzeltiyorsan),
bkz. **Bölüm 11 — Refactor Modu**, o zaman Faz 0-1-3 aynen geçerli, Faz 2
yerine refactor protokolü uygulanır.

---

## FAZ 0 — SKILL KEŞFİ VE KURULUM

Koda veya tasarıma başlamadan ÖNCE, projede kurulu findskills skilini
kullanarak üç kategoride skil araştır:

**A) Creative / Tasarım Skilleri:** kompozisyon ve storytelling, motion
design felsefesi (scroll storytelling, reveal, kinetic typography),
editoryal okunabilirlik prensipleri, deneysel/sıra dışı layout yaklaşımları.

**B) Teknik / Görsel Yapısal Skiller:** frontend mühendisliği (spacing,
grid, breakpoint mantığı), erişilebilirlik (WCAG), performans kuralları,
GSAP/ScrollTrigger entegrasyon pratikleri.

**C) Mimari / Kod Kalitesi Skilleri:** component ayrıştırma, custom hook
tasarımı, dosya organizasyonu, state management prensipleri.

Her bulduğun skil için: adını, kategorisini, ne işe yaradığını açıkla,
PROJEYE KUR, sonra SKILL.md/README dosyalarını satır satır oku. Atlama,
üstünkörü geçme.

Ayrım net olsun:
- B ve C kategorisi = UYULMASI ZORUNLU kurallar
- A kategorisi (creative) = İLHAM VE ÇERÇEVE, birebir şablon değil
- Bu dosyadaki (yabi.md) kurallar = HİÇBİR KOŞULDA İHLAL EDİLEMEZ,
  bulduğun hiçbir skil bu dosyanın kurallarını geçersiz kılamaz

---

## FAZ 1 — MİMARİ VE DÜNYA PLANLAMASI

Koda geçmeden önce, kısa ama net iki plan çıkar ve kullanıcıya özetle
(zorunlu değilse ayrı dosya olarak kaydetme, ama en azından sohbette
net biçimde yaz — proje zaten `/docs` kullanıyorsa oraya da yazabilirsin):

### 1.1 Mimari Plan
- Dosya/klasör yapısı: her section kendi component dosyasında
  (`/src/components/sections/[SectionName]/index.jsx` gibi)
- Motion mantığı nerede yaşayacak: custom hook'larda (`useSectionScene`
  gibi), component'in içine gömülü DEĞİL
- GSAP context yönetimi: `useLayoutEffect` içinde açılıp `return` içinde
  `ctx.revert()` ile kapatılacak — memory leak sıfır tolerans
- Tasarım token'ları (renk, spacing, tipografi) TEK bir yerden
  (CSS custom properties / theme dosyası) gelecek, inline stil veya
  sabit hex kod gömme YASAK
- Component'ler arası veri paylaşımı gerekiyorsa hangi mekanizmayla
  (Context, sadece gerçekten gerekiyorsa) yönetileceği

### 1.2 Dünya Planı (Premise)
"Ütopik", "havalı", "özgün" gibi soyut sıfatlarla ÇALIŞMA. Bunun yerine
bu projeye özel, SOMUT ve TEK bir kurgusal önerme kur:

1. **Premis:** Bu sayfa hangi somut yer/an/kuruma ait? Tek cümlelik net
   bir önerme ("Bu, [X]'in dijital vitrinidir" gibi — ama gerçek projeye
   özel, kopyala-yapıştır değil)
2. **Işık mantığı:** Bu dünyada ışık nereden geliyor, nasıl davranıyor?
3. **Malzeme/doku mantığı:** Yüzeyler neye benziyor — mat mı parlak mı,
   pürüzlü mü kusursuz mu? TEK ve tutarlı bir malzeme dili seç.
4. **Renk mantığı:** Renkler NEDEN bu renkler — kurgusal gerekçe kur.
5. **Hareket mantığı:** Nesneler nasıl hareket eder — ağır mı akışkan mı
   ani mi keskin mi? Bu, TÜM motion kararlarının referansı olacak.
6. **Tipografik kimlik:** Yazı karakteri bu dünyayla nasıl konuşuyor?
7. **Section-dünya eşleşmesi:** Planladığın her section, bu premise'in
   hangi parçasını/anını temsil ediyor? Her section için "çünkü bu
   dünyada..." diye tamamlanabilen bir cümle kurulabilmeli.

Bu adım tamamlanmadan Faz 2'ye geçme. Kullanıcıdan onay iste.

---

## BÖLÜM 2 — ALTIN KURALLAR (İHLAL EDİLEMEZ)

### 2.1 Okunabilirlik Her Şeyden Önce Gelir
Hiçbir estetik karar (katmanlama, üst üste binme, görsel üzerine metin,
mix-blend-mode, video arka plan) metnin HER EKRAN BOYUTUNDA VE HER ANDA
%100 okunabilir olmasını geçersiz kılamaz. Her metin bloğu için en az
birini uygula:
1. **Kontrast garantisi:** WCAG AA (en az 4.5:1) kontrast oranı. Gerekirse
   metnin arkasına düz, sabit opaklıkta bir kontrast katmanı (overlay) koy
   — bu bir gradient DEĞİLDİR, tek renkli sabit opaklıkta bir katmandır.
2. **Güvenli bölge:** Metni görselin en sade/tek tonlu kaldığı alana
   yerleştir, en yoğun/detaylı kısmının üzerine koyma.
3. **mix-blend-mode SADECE dekoratif/ikincil metinlerde.** Ana başlık,
   CTA, okunması ZORUNLU metin asla sadece blend-mode'a güvenmez —
   mutlaka ek bir kontrast katmanı da olur.

Test: "Bu metni farklı ekran parlaklığında, hızlıca gözden geçiren biri
net okuyabilir mi?" Cevap belirsizse kontrastı güçlendir.

### 2.2 Component Sınırları Kutsal
- Her component kendi dosyasında, kendi sorumluluğunda kalır.
- Bir animasyon "havalı duracak" diye component sınırlarını karman
  çorman etme, birinin state'ini/motion mantığını diğerine sızdırma.
- Motion kodu ayrı bir katmanda (hook/util) yaşar, component içine gömülü
  tekrar eden kod olmaz.
- Değişiklik/ekleme sonrası kod öncekinden DAHA TEMİZ olmalı, daha
  dağınık değil.

### 2.3 Kesinlikle Yasak Olan Şeyler
Bunlar "AI yaptı" izleridir, hiçbir gerekçeyle affedilmez:
- KART (card) tabanlı layout'lar — köşesi yuvarlatılmış kutucuklar içinde
  ikon + başlık + açıklama dizilimi
- Numaralı "1. 2. 3." veya "Adım 1 / Adım 2 / Adım 3" süreç anlatımı
- Gradient arka plan veya gradient buton (stok görsel/video içeriğinin
  kendi doğal renk geçişleri bu kurala dahil değil — o farklı bir şey)
- Simetrik, öngörülebilir "hero + features grid + testimonials + CTA"
  şablon iskeleti
- Stok ikon setleri (Font Awesome/Heroicons tarzı generic ikonlar) —
  özel tipografik çözüm veya gerçek görsel kullan
- Dekoratif geometrik/blob şekiller (üçgen, altıgen, dalga, damla, soyut
  süsleme objeleri)
- Ortalanmış, her section'da aynı hizada tekrar eden içerik blokları
- "Fade-in + slide-up" gibi standart, ucuz, her sitede görülen tek tip
  scroll animasyonu — her section kendi motion imzasına sahip olmalı
- Aynı geçiş tekniğinin birden fazla section sınırında tekrar etmesi
- Varsayılan olarak 3D/WebGL — tüm etki 2D görsel + CSS/GSAP ile
  yaratılır (kullanıcı açıkça gerçek WebGL istemedikçe)

---

## BÖLÜM 3 — OLAĞANDIŞILIK ZORUNLULUĞU

Standart "iyi tasarlanmış site" formülünü takip etmek YETERSİZDİR.
Aşağıdaki listeden projenin ruhuna en uygun **2-3 tanesini** seç ve
MÜKEMMELLEŞTİR — hepsini birden kullanma, azını çok iyi yapmak çoğunu
yarım yamalak yapmaktan iyidir. Seçtiklerini gerekçelendirerek uygula:

1. **Beklenen yerleşimi kır:** Navigasyon "sol üstte logo, sağda menü"
   formülünde olmak zorunda değil — kompozisyona gömülü, scroll'la
   beliren, ya da alışılmadık konumda yaşayan bir yerleşim dene.
2. **Görsel beklentisini kır:** En güçlü giriş bazen görselsizdir —
   sadece cesur tipografi + boşluk + tek hassas hareket. "Hero image"
   refleksini sorgula.
3. **Sahte bitiş (fake-out):** Sona yakın bir section'da deneyimin
   bittiği hissini ver (motion sakinleşsin, kompozisyon "son" gibi
   dursun), sonra beklenmedik gerçek bir kapanış sahnesiyle şaşırt.
4. **Özel cursor davranışı:** Fare imleci sıradan ok olmak zorunda
   değil — markanın parçası gibi davranan, section'a göre şekil/davranış
   değiştiren bir cursor tasarla.
5. **Bilinçli sessizlik anı:** Sayfanın geri kalanı hareketliyken bir
   section'da TÜM motion dursun — bu duraklama, kontrastıyla asıl
   vurguyu yapan an olsun.
6. **Çerçeveyi delme:** En az bir elemanın viewport/section sınırını
   görünür şekilde deldiği, taştığı bir an kur — sayfa "kutunun içinde"
   durmuyor hissi versin.
7. **Sıra dışı scroll hissi:** Bir section'da scroll'un normal
   yukarı-aşağı hissi yerine farklı bir fiziksel karşılık versin (yatay
   kayma, yavaşlayıp hızlanan bir "nefes" hissi) — TEK bir güçlü anda,
   abartıya kaçmadan.

Bu direktifler dekorasyon değil, "bunu daha önce hiç görmedim"
dedirtecek omurga kararlar olmalı. Seçimini şöyle gerekçelendir: "Bunu
seçtim çünkü [X] burada tam olarak bu ihtiyacı karşılıyor."

---

## BÖLÜM 4 — SICK TRANSITIONS (SAHNELER ARASI GEÇİŞLER)

Section geçişleri ASLA düz "scroll" veya "fade" olmayacak. Her section
sınırında farklı bir teknik kullan (aynısını iki kez tekrar etme):

- **Whip-pan clip-path wipe:** bir sonraki sahne, ekranı yüksek hızda
  tarayan keskin bir kesim çizgisiyle içeri girer
- **Speed-ramp scroll zoom:** ScrollTrigger + scrub ile bir öğeye doğru
  hızlanan zoom yapılır, zoom'un sonunda yeni sahne zaten oradaymış gibi
  ortaya çıkar (through-object transition)
- **Morph cut:** bir şeklin, tipografinin veya görselin formu GSAP ile
  bir sonraki sahnedeki karşılığına dönüşerek geçiş yapar
- **Split/shatter:** ekran 2-4 parçaya bölünüp her parça farklı yöne
  kayarak yeni sahneyi açığa çıkarır
- **Glitch/RGB split reveal:** çok kısa (150-250ms) bir dijital bozulma
  efektiyle sahne değişir — CSS filter + kısa transform jitter ile
  yapılır, uzun sürmez, rahatsız etmez

Her geçiş GSAP ScrollTrigger'a `pin: true` ve `scrub: 1` ile bağlı olur
— kullanıcının scroll hızına duyarlı, kontrollü bir deneyim. Otomatik
oynayan bir video gibi davranmaz.

---

## BÖLÜM 5 — SAHNE MANTIĞI VE SEKTÖRE ÖZEL KURGU

Sayfayı tek bir akış olarak değil, birbirinden ayrı, her biri kendi
kimliğine sahip SAHNELER dizisi olarak kurgula. Her section'ı planlarken
üç katman düşün:

1. **SAHNE:** Kullanıcının göreceği/hissedeceği şey — sinematik dilde
   tarif et, sektörün ruhuna gerçekten bağlı olsun (bir berber sitesi
   "ustura parıltısıyla ekranın yarılması" gibi bir açılış hak eder, bir
   pizza sitesi farklı bir metafor hak eder — jenerik "hero section"
   değil, o işe özel bir sahne)
2. **TEKNİK KARŞILIK:** Bu sahne hangi GERÇEK teknikle inşa edilecek —
   CSS clip-path, mix-blend-mode, GSAP+ScrollTrigger (pin/scrub/
   timeline), SVG path animasyonu (stroke-dasharray/dashoffset),
   parallax (çok katmanlı görsel + quickTo), manyetik hover, Ken Burns
   efekti (yavaş zoom/pan)
3. **SINIR:** Bunun web'de gerçekçi ve performanslı şekilde ne kadar
   abartılabileceği — WebGL gerekiyor mu yoksa CSS/GSAP yeterli mi

Her sahne fikri "havalı ama nasıl yapılacağı belirsiz bir hayal" olarak
KALMAMALI — mutlaka somut bir teknik karşılığı olmalı, yoksa koda dökecek
taraf elinde sadece şiir kalır, ürün çıkmaz.

---

## BÖLÜM 6 — GÖRSEL/VİDEO TEDARİK PROTOKOLÜ

3D/WebGL yerine gerçek stok görsel/video kullanılır. Süreç:

1. Pexels ve Unsplash'in ücretsiz/telifsiz arama sonuçlarından uygun
   içeriğin doğrudan indirilebilir URL'ini bul
2. Her URL için önce kontrol et:
   `curl -o /dev/null -s -w "%{http_code}\n" [URL]`
   — SADECE 200 dönen URL'leri kullan, tahmini/uydurma URL kullanma
3. 200 dönen içeriği indir:
   `curl -L [URL] -o [dosya_adı]`
   projenin assets klasörüne kaydet
4. Her asset için: dosya adı, kaynağı, hangi section'da kullanılacağı,
   varsa dünya planına (Faz 1.2) nasıl bağlandığı bilgisini raporla
5. Yüksek çözünürlük tercih et (en az 1920px genişlik) — hero ve tam
   ekran section'lar için görsel kalitesi kritiktir

---

## BÖLÜM 7 — TEKNİK ZORUNLULUKLAR

- **GSAP + ScrollTrigger** ana motion motoru; `pin: true`, `scrub: 1`,
  `containerAnimation` aktif olarak kullanılır
- Karmaşık animasyonlar `gsap.context()` içinde yazılır, component/
  React unmount olduğunda temizlenir (`ctx.revert()`) — memory leak
  sıfır tolerans
- React'te motion mantığı `useLayoutEffect` + custom hook üzerinden
  yönetilir, component'in render mantığına karışmaz
- Dışarıdan görsel çekerken `crossOrigin="anonymous"` kullan (Canvas/
  WebGL manipülasyonu varsa CORS hatası almamak için) — ama curl ile
  local'e indirilen asset'lerde bu zaten sorun değildir
- `will-change: transform` ile donanım hızlandırması garanti altına
  alınır
- Tasarım token'ları (renk, spacing, tipografi) TEK merkezi bir yerden
  gelir, inline/hardcoded değer YASAK

---

## BÖLÜM 8 — MASAÜSTÜ VE RESPONSIVE

- Masaüstü görünümüne ÖZEL önem ver — kompozisyonun tüm cesareti ve
  motion zenginliği orada tam hissedilmeli. Masaüstü "asıl gösteriş
  alanı"dır, mobilin büyütülmüş hali gibi ele alınmaz.
- Mobil/tablet'te kalite ve motion deneyimi düşmemeli; karmaşık
  katmanlar/parçacık sayısı/render kalitesi performans için
  sadeleştirilebilir ama okunabilirlik ve motion HİSSİ asla feda
  edilmez.
- Dünyanın kimliği (renk, ışık, hareket mantığı — Faz 1.2) ekran
  boyutundan bağımsız her zaman korunur.

---

## BÖLÜM 9 — RENK/TON PROTOKOLÜ

Renk/ton tercihi (açık mı koyu mu, hangi vurgu rengi) HER ZAMAN
kullanıcıdan alınır, varsayılan olarak tahmin edilmez. Görev
tanımlarında şu alan boş bırakılır ve kullanıcı doldurur:

```
■ RENK/TON TERCİHİ:
[Açık mı koyu mu, hangi ton, hangi vurgu rengi — kullanıcı yazacak]
```

Bu tercih Faz 1.2'deki "renk mantığı" ile tutarlı, kurgusal olarak
gerekçelendirilmiş şekilde uygulanır — rastgele "cesur renk" seçimi değil.

---

## BÖLÜM 10 — VAR OLAN SİTEYİ ARŞA ÇIKARMA (REFACTOR MODU)

Kullanıcı yeni bir site DEĞİL, mevcut bir siteyi/section'ı yükseltmek
istiyorsa:

### İçerik Koruma (dokunulmazlıklar)
- Mevcut metinlere, başlıklara, copy'lere KESİNLİKLE DOKUNMA. Tek
  kelime bile değiştirme, kısaltma, uzatma. İçerik hiyerarşisi ve bilgi
  akışı aynı kalır.
- Değişen SADECE bu metinleri taşıyan görsel iskelet, kompozisyon,
  layout, motion ve görsel dildir.
- Eğer sadece BELİRLİ bir section isteniyorsa, SADECE o section'ın
  dosyasının içine gir, sayfanın geri kalanına dokunma.

### Yıkım ve Yeniden İnşa
- Eski ortalanmış "container" yapıları, standart grid'ler, yuvarlak
  köşeli kartlar, numaralı adım anlatımları, gradient'ler, basit
  slider'lar TAMAMEN SÖKÜLÜR (Bölüm 2.3'teki yasak listesi burada da
  aynen geçerli)
- Bu dosyadaki TÜM bölümler (Faz 0-1, Altın Kurallar, Olağandışılık,
  Sick Transitions, Sahne Mantığı, Görsel Tedarik, Teknik Zorunluluklar,
  Responsive) refactor'da da aynen uygulanır — "refactor" sadece "sıfırdan
  değil, üzerine inşa ediyoruz" anlamına gelir, kural gevşemesi değil
- Değişiklik sonrası mimari öncekinden DAHA TEMİZ olmalı

---

## BÖLÜM 11 — DENETİM / JÜRİ TURU (FAZ 3, ZORUNLU SON ADIM)

İnşa bittiğinde, bunu bir onay turu gibi değil, Awwwards jüri üyesi
kendi işini acımasızca parçalıyormuş gibi denetle:

**Eksen 0 — Okunabilirlik (en öncelikli, önce bunu yap):**
- Her metin bloğu her koşulda okunabilir mi? Kontrast eksikse ekle.
- mix-blend-mode zorunlu metinde tek başına mı kalmış? Düzelt.
- Katmanlar birbirinin üzerine binip metni bastırıyor mu? z-index/
  yerleşimi düzelt.
- Kinetik/hareketli metin en hızlı anında bile okunabilir mi?
- Mobilde katmanlama metni bastırıyor mu?

**Eksen 1 — "AI Tell" Avı:**
- Kart, numaralı adım, gradient, geometrik/blob süs, stok ikon, tekrar
  eden animasyon/geçiş var mı? Tek tek bul ve kaldır.

**Eksen 2 — Olağandışılık Testi:**
- Seçilen 2-3 direktif gerçekten güçlü mü, yoksa "eklenmiş ama zayıf"
  mı? Güçlendir.
- Sayfa hâlâ tanıdık bir şablonun süslenmiş hali gibi mi duruyor?
  Dürüst ol.
- Olağandışılık okunabilirlik/kullanılabilirlikten ödün vermiş mi?
  Dengeyi düzelt.

**Eksen 3 — Mimari Sadakat:**
- Component sınırları bozulmuş mu? Motion mantığı sızmış mı? Ayır.
- GSAP context'leri düzgün temizleniyor mu? Memory leak riski var mı?
- Dosya yapısı Faz 1.1'deki plana uygun mu?

**Eksen 4 — Dünya Tutarlılığı:**
- Her section, Faz 1.2'deki premise'e geri bağlanabiliyor mu?
- Işık, malzeme, renk, hareket mantığı TÜM sayfada tutarlı mı, yoksa
  bir section farklı bir "kişilik" mi taşıyor?
- Geçiş teknikleri dünyanın hareket mantığına uygun mu (ağır/akışkan
  dünyada ani/sert geçiş gibi çelişkiler var mı)?

**Eksen 5 — Teknik Kalite:**
- Responsive, WCAG kontrast, performans kuralları ihlal edilmiş mi?
- Animasyon performansı: jank, tutarsız timing var mı?
- Görsel/video assetleri performansı düşürüyor mu (özellikle mobilde)?

Bulduğun HER sorunu maddeler halinde listele (okunabilirlik sorunlarını
en üstte, ayrı başlıkla), sonra hepsini tek tek düzelt. Onay turu değil,
gerçek bir düzeltme turu — sorun bulup listelemekle yetinme.

---

## 12. KAPANIŞ HATIRLATMASI

Bu skil her devreye girdiğinde kendine şunu sor:
**"Bu sayfayı gören biri, kapattıktan sonra bile aklından çıkaramaz mı?"**

Cevap "belki" ise, henüz bitmedi demektir. Faz 3'e geri dön.

En kötü fikri bile alıp bunu yapabilen adam ol.

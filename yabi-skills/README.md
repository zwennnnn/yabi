# yabi

[![skills.sh](https://skills.sh/b/zwennnnn/yabi)](https://skills.sh/zwennnnn/yabi)

`zwennnnn/yabi`, sıradan AI web çıktısını kırmak için hazırlanmış iki parçalı
bir Codex skill reposudur.

## İçerik

- `yabi`: Landing page ile sınırlı kalmaz; komple web sitesi, çok sayfalı
  marketing site, ürün sitesi, SaaS sitesi, portfolio, restoran/venue,
  e-commerce deneyimi, homepage, iç sayfa ve redesign/refactor işleri için
  tasarım anayasasıdır.
- `yabi-ui-tester`: Playwright ile siteyi route ve viewport bazında tarar;
  screenshot, console, network, kırık medya, axe-core, overflow, overlap ve
  yasaklı UI pattern kanıtı üretir.

## Kurulum

Repo içindeki skill listesini görmek için:

```bash
npx skills add zwennnnn/yabi --full-depth --list
```

İki skili birlikte kurmak için:

```bash
npx skills add zwennnnn/yabi --full-depth --skill yabi --skill yabi-ui-tester
```

Yerel klasörden test etmek için:

```bash
npx skills add . --list
npx skills add . --skill yabi --skill yabi-ui-tester
```

## yabi-ui-tester Bağımlılıkları

Playwright audit script'leri `yabi-ui-tester` klasöründe çalışır:

```bash
cd yabi-ui-tester
npm install
npx playwright install chromium
```

Tek URL denetimi:

```bash
npm run audit -- http://localhost:3000
```

Çok sayfalı denetim:

```bash
npm run crawl -- http://localhost:3000 yabi-test-results/routes.json
npm run audit -- --routes yabi-test-results/routes.json
npm run summarize
```

## TR / EN

Her iki skill de Türkçe ve İngilizce referanslarla gelir. Türkçe işlerde
`references/tr/`, İngilizce işlerde `references/en/` okunur. Kısa çağırma
prompt'ları için [PROMPTS_TR_EN.md](PROMPTS_TR_EN.md) dosyasına bak.

## Geliştirme

Skill'i büyütürken ana `SKILL.md` dosyalarını komuta merkezi olarak tut.
Detaylı kuralları ve örnekleri `references/` altına, deterministik işleri
`scripts/` altına koy. Uzun vadeli iyileştirme döngüsü için
[DEVELOPMENT.md](DEVELOPMENT.md) dosyasını kullan.

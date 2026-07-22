# DEVELOPMENT

Bu repo iki parçalı bir üretim döngüsü gibi yaşamalı: `yabi` web sitesini bir
dünya, mimari ve deneyim olarak kurar; `yabi-ui-tester` o dünyanın gerçek
tarayıcıda nereden kırıldığını kanıtlar.

İyileştirme malzemesi gerçek projelerden gelir. Bir berber sitesinde mobilde
başlık okunmuyorsa, bir restoran sitesinde menü geçişi CTA'yı eziyorsa, bir
danışmanlık sitesinde iç sayfalar homepage'e göre ucuz kalıyorsa bunu sadece o
projeye ait bug olarak bırakma. Önce `yabi-ui-tester` raporunu oku, ekran
görüntüsünü incele, sonra aynı hata sınıfı tekrar edebilecekse `yabi`
kurallarına geri besle.

Pratik döngü şu:

1. `yabi` ile gerçek bir site veya refactor yaptır.
2. `yabi-ui-tester` ile route ve viewport denetimi çalıştır.
3. Raporu üçe ayır: kritik kırık, kalite düşüren pattern, proje-özel tercih.
4. Kritik kırıkları düzeltme standardına dönüştür.
5. Tekrarlayan patternleri birkaç projede izledikten sonra kural yap.
6. Proje-özel tercihleri skill'e sokma.

`SKILL.md` yaklaşık 500 satırı geçtiğinde ana dosyayı büyütmeyi bırak.
`SKILL.md` sadece tetiklenme, iş akışı ve hangi durumda hangi referansın
okunacağını anlatmalı. Uzun içerikleri `references/` altına böl:

- `references/tr/constitution.md` ve `references/en/constitution.md`
- `references/tr/site-systems.md` ve `references/en/site-systems.md`
- `references/tr/visual-world.md` ve `references/en/visual-world.md`
- `references/tr/motion-and-interaction.md` ve İngilizce karşılığı
- `references/tr/sector-playbooks.md` ve İngilizce karşılığı
- `references/tr/audit-rubric.md` ve İngilizce karşılığı

Kural setinde önemli bir değişiklik yaptığında frontmatter'daki `name` alanına
dokunma. `name`, skill kimliğidir. Kapsam veya tetiklenme değişiyorsa
`description` alanını güncelle; çünkü `npx skills` ve Codex'in skill seçimi
bu alandan güçlü sinyal alır. Versiyon veya not tutacaksan bunu body içinde
kısa bir "Sürüm Notu" bölümüyle yap.

Yeni bir kuralı kalıcı kabul etmeden önce en az birkaç sektörde test et:
berber, restoran, danışmanlık, SaaS ve e-commerce iyi stres alanlarıdır. Bir
kural sadece berberde etkileyici olup danışmanlıkta güveni bozuyorsa anayasa
kuralı değildir; sektör playbook notudur. Kalıcı kural farklı bağlamlarda
tasarım kalitesini artırmalı, agent'ı boğmadan daha net karar almaya
zorlamalıdır.

Her büyük değişiklikten sonra regresyon turu yap:

```bash
cd yabi
npm run refs
npm run static-audit -- ../some-real-project

cd ../yabi-ui-tester
npm install
npx playwright install chromium
npm run crawl -- http://localhost:3000 yabi-test-results/routes.json
npm run audit -- --routes yabi-test-results/routes.json
npm run summarize
```

Hedef skill'i sadece büyütmek değil. Hedef, her yeni kuralın daha güçlü,
daha gerçek, daha okunabilir ve daha zor taklit edilen siteler üretmesini
sağlamak.

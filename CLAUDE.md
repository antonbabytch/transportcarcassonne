# Transport Carcassonne — инструкции для работы

Статический сайт на Astro 6: переезды и транспорт в Каркассоне и радиусе 50 км.
Продакшн — `https://transportcarcassonne.fr`, деплой Netlify из ветки `main`.

## Команды

```bash
npm ci                 # установка (Node >= 22.12)
npm run dev            # локальный сервер
npm run check          # Astro + TypeScript, должно быть 0 ошибок
npm run audit:seo      # build + проверка ссылок, метаданных, schema, сирот
npm run report:leads -- --self-test
```

Перед любым push: `npm run check` и `npm run audit:seo` должны пройти
без ошибок. Ровно это же гоняет GitHub Action `site-health`.

## Жёсткие правила контента

Сайт продаёт услуги реальной компании (EI Andriy KARPOV, SIRET в
`src/data/site.config.ts`). Выдуманные данные создают юридический риск.

**Никогда не выдумывать**: города, маршруты, отзывы, кейсы, свободные места
в групповых перевозках, цены, сроки, страховки.

Пустые массивы в `src/data/realisations.ts` и `src/data/groupedTrips.ts` —
это осознанное решение, а не недоделка. Страницы показывают честное пустое
состояние. Заполнять только реальными данными с согласием клиента.

Пока владелец не подтвердил, на сайте не должно быть слов «assuré», точных
SLA, «без повреждений», собственного склада, международного автопарка,
условий скидок и отмены. Список подтверждений — в `LAUNCH-CHECKLIST.md`.

## Источники данных

| Файл | Что содержит |
|------|--------------|
| `src/data/site.config.ts` | Реквизиты, телефон, адрес, SIRET |
| `src/data/services.ts` | Услуги и цены «от» → `/services/[service]/` |
| `src/data/cities.ts` | Реально обслуживаемые города → `/demenagement-[ville]/` |
| `src/data/movingRoutes.ts` | Дальние маршруты → `/demenagement-carcassonne-[destination]/` |
| `src/data/highIntentPages.ts` | Лендинги: предприятия, сеньоры, упаковка |
| `src/data/groupedTrips.ts` | Групповые перевозки (пусто) |
| `src/data/realisations.ts` | Кейсы (пусто, нужны согласия) |
| `src/data/reviews.config.ts` | Ссылка Google на отзывы (пусто) |
| `src/content/blog/*.md` | Статьи, схема в `src/content.config.ts` |

## Формы Netlify — критично

Netlify находит формы только по статическому файлу `public/__forms.html`.
Поля, которых там нет, **молча теряются при отправке**.

Две формы: `devis-transport` (9 полей) и `devis-intelligent` (62 поля,
компонент `src/components/QuoteWizard.astro`).

При изменении любого поля мастера обязательно синхронизировать
`public/__forms.html`. Проверка синхронизации:

```bash
node -e "const fs=require('fs');const b=fs.readFileSync('public/__forms.html','utf8').split(/<form\b/).slice(1).map(f=>f.split('</form>')[0]).find(x=>x.includes('devis-intelligent'));const c=new Set([...b.matchAll(/name=\"([^\"]+)\"/g)].map(m=>m[1]));const w=new Set([...fs.readFileSync('src/components/QuoteWizard.astro','utf8').matchAll(/name=\"([a-z0-9_-]+)\"/g)].map(m=>m[1]));console.log('нет в контракте:',[...w].filter(x=>!c.has(x)),'| лишние:',[...c].filter(x=>!w.has(x)))"
```

Форма не принимает файлы — это решение после аудита. Интеграции CRM, email,
SMS и оплаты требуют серверных секретов и никогда не попадают в публичный JS.

## Конверсионные правила

Коммерческие CTA ведут на `/devis/` с коротким параметром `source`.
`/contact/` — только общие координаты, не точка конверсии.

## Аналитика и приватность

GA4 `G-L13KXVLMMY` грузится только после согласия в cookie-баннере
(Consent Mode v2, всё denied по умолчанию). Не подключать скрипты,
стартующие до согласия.

## Ветки

Задача — отдельная ветка `feature/*`, `fix/*` или `content/*`, затем PR
в `main`. Прямой push в `main` не делать.

# 出演告知ジェネレーター

出演情報をもとに、SNS投稿用の告知テキストを生成するWebアプリです。

日付範囲を選択し、出力したい出演情報をチェックすると、投稿用テキストを生成できます。生成後のテキストは画面上で編集してコピーできます。

## Features

- 出演情報の一覧表示
- 日付範囲による出演情報の絞り込み
- 出力対象の選択
- 投稿見出しの選択
- 投稿用テキストの生成・編集・コピー
- 管理者向けの出演情報編集
  - ヘッダー: 投稿文の先頭に表示する見出し
  - レギュラー: 曜日ごとに繰り返し表示する出演情報
  - ゲスト・特番: 特定の日だけ表示する出演情報

## Output Example

```text
🎉今週の出演情報🎉

5/1(月)18:30〜19:00
サンプルテレビ「サンプル番組A」

5/2(火)24:45〜25:15
テスト放送「深夜のサンプル番組」

5/4(木)
動画配信「サンプル配信番組」

5/7(日)21:00〜21:54
テストテレビ「週末サンプルショー」（再放送）
```

## Tech Stack

- React
- TypeScript
- Vite
- Supabase
- pnpm

## Getting Started

```bash
pnpm install
```

```bash
pnpm dev
```

LAN内の別端末から確認する場合:

```bash
pnpm dev --host 0.0.0.0
```

## Environment Variables

`.env.example` を参考に `.env.local` を作成してください。

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_LOGIN_ID=admin
VITE_LOGIN_EMAIL=admin@example.com
```

## Scripts

```bash
pnpm lint
```

```bash
pnpm build
```

```bash
pnpm preview
```

## Supabase

DB定義は `supabase/migrations` に置いています。

ローカルSupabaseを起動する場合:

```bash
pnpm exec supabase start
```

ローカルSupabaseを停止する場合:

```bash
pnpm exec supabase stop
```

マイグレーションを適用する場合:

```bash
pnpm exec supabase migration up
```

ローカルDBをリセットする場合:

```bash
pnpm exec supabase db reset
```

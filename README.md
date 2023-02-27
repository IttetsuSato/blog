# ローカル DB

## 必要なもの

- Docker
- Git
- subabase CLI

### supabase CLI のインストール

<https://supabase.com/docs/guides/cli/local-development>

## ローカル DB の操作

supabase の起動

```sh
supabase start
```

ローカルの supabase Studio

<http://localhost:54323>

supabase 　 Studio の変更をマイグレーションファイルに反映する

```sh
supabase db diff
```

ローカル DB の migration と、seed の反映

```sh
supabase db reset
```

ローカル DB の変更を本番に反映

```sh
supabase db commit
supabase db push
```

DB の typescript 用の型を生成

```sh
supabase gen types typescript --local > lib/database.types.ts
```

本番の変更を migration に反映

```sh
supabase db remote commit
```

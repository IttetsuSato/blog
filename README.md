
# ローカルDBの構築

## 必要なもの

- Docker
- Git
- subabase CLI

### supabase CLIのインストール

<https://supabase.com/docs/guides/cli/local-development>

### supabaseの起動

```sh
npx supabase start
```

### ローカルのsupabase Studio

<http://localhost:54323>

supabase　Studioの変更をマイグレーションファイルに反映する

```sh
npx supabase db diff
```

ローカルデータベースへの変更の削除と、seedの反映

```sh
npx supabase db reset
```

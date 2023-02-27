
# ローカルDB

## 必要なもの

- Docker
- Git
- subabase CLI

### supabase CLIのインストール

<https://supabase.com/docs/guides/cli/local-development>


## ローカルDBの操作

supabaseの起動

```sh
supabase start
```

ローカルのsupabase Studio

<http://localhost:54323>

supabase　Studioの変更をマイグレーションファイルに反映する

```sh
supabase db diff
```

ローカルDBのmigrationと、seedの反映

```sh
supabase db reset
```

ローカルDBの変更を本番に反映

```sh
supabase db commit
supabase db push
```

本番の変更をmigrationに反映

```sh
supabase db remote commit
```

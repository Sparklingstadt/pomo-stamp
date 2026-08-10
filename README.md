# Pomo Stamp

Pomodoroの実績を登録・編集・削除できる、Next.js App RouterとPostgreSQLによるCRUDアプリです。

## 必要なもの

- Docker Desktop（推奨）
- またはNode.js 22とPostgreSQL 15

## Dockerで起動する

```bash
cp .env.example .env
docker compose up --build
```

PostgreSQLが接続可能になってからPrisma migrationが適用され、アプリが起動します。

- アプリ: <http://localhost:3000>
- ヘルスチェック: <http://localhost:3000/api/health>
- PostgreSQL: `127.0.0.1:5432`

`.env.example`の認証情報はローカル開発専用です。共有環境では`POSTGRES_USER`、`POSTGRES_PASSWORD`、`POSTGRES_DB`を変更してください。Composeはこれらの値からコンテナ内の`DATABASE_URL`を生成します。

終了時にデータを残す場合:

```bash
docker compose down
```

データを完全に削除して初期化する場合:

```bash
docker compose down --volumes
```

`--volumes`はPostgreSQLの全データを削除するため、必要なデータがないことを確認してから実行してください。

## ローカルで起動する

PostgreSQLを起動し、依存関係とDBを準備します。

```bash
npm ci
cp .env.example .env
```

`.env`の`DATABASE_URL`は、ローカルのPostgreSQLに合わせてください。標準構成では次の値です。

```dotenv
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb?schema=public
```

その後、migrationと開発サーバーを実行します。

```bash
npx prisma migrate deploy
npm run dev
```

## 品質チェック

```bash
npm test -- --runInBand
npm run lint
npm run build
npm audit --omit=dev
docker compose config
```

## Migrationに関する注意

`20250827121931_fix_scheme_name_into_pomodoros`は、旧`Pomodoro`テーブルを削除して`pomodoros`テーブルを作成する過去のmigrationです。途中のmigrationだけが適用されたDBに次のmigrationを適用すると、旧テーブル内のデータは失われます。

このmigrationは既に履歴として公開されているため、SQLを書き換えると適用済み環境でchecksum不一致になります。対象となる古いDBが存在する場合は、バックアップとデータ移行手順を個別に用意してから適用してください。

## 現在のコンテナ用途

Docker構成はローカル開発用で、Next.jsの開発サーバーを起動します。本番公開時は、multi-stage build、`next build` / `next start`、秘密情報管理、TLS、監視、バックアップを別途構成してください。

## 使用技術

- Next.js / App Router
- React
- Zod
- Prisma
- PostgreSQL
- Jest
- ESLint / Prettier
- Husky / Commitlint
- Tailwind CSS v3 / shadcn/ui
- SWR

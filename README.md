# Pomo Stamp

基本的なREST APIを実装したCRUDで動作するTodoアプリ

## 動かし方

1. `$ git clone git@github.com:Sparklingstadt/pomo-stamp.git`
2. `$ npm i &&npm run dev`
3. [http://localhost:3000](http://localhost:3000)

## 注意事項

- PostgreSQLが必要
- `.env`に`DATABASE_URL="postgresql://your_name:your_pass@localhost:5432/brew_pomo_stamp?schema=public"`の追記が必要

## 使用技術

- Next.js / App Router
- React
- Zod
- Prisma
- PostgreSQL
- ESLint
- Prettier
- Husky
- Commitlint
- Tailwind CSS v3
- shadcn/ui
- SWR

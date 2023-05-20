## Dependencies

- Postgres\Docker
- pnpm, dotenv-cli:

```
npm install -g pnpm dotenv-cli
```

## How to set up the app

1. Copy the context of `.env.example` to a new file called `.env.local` and modify the content to suit your needs.
2. The Database: If you have `docker` there is a docker-compose file otherwise you can user your own local `postgres` database..
   > Don't forget to edit the DATABASE_URL from the `.env.local` file.
3. Database migration

```
pnpm run prismaDev
```

## To run the App: `pnpm run dev`

hola 

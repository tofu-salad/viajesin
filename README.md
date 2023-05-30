# Viajesin
![image](https://github.com/zeroCalSoda/viajesin/assets/67925799/8b7c9ec9-f561-4bb5-9c36-1bbcbb4d148d)


Web application designed to capture and preserve your exciting travel adventures! With Viajesin, you can easily and elegantly record all the details of your trips. Your travel records will be protected and only accessible to you, ensuring that your memories remain safe and private.
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
pnpm prisma migrate dev
```

## To run the App: `pnpm dev`

# Viajesin
![image](https://github.com/zeroCalSoda/viajesin/assets/67925799/a7059de2-3ef4-415f-bc3a-a685a2ca7d6d)


Web application designed to capture and preserve your exciting travel adventures! With Viajesin, you can easily and elegantly record all the details of your trips. Your travel records will be protected and only accessible to you, ensuring that your memories remain safe and private.
## Dependencies

Im using Turso for the database but you can use a sqlite file if you want to host in a VPS
- Turso\Sqlite
- npm

## How to set up the app

0. ```npm install```
1. Copy the context of `.env.example` to a new file called `.env.local` and modify the content to suit your needs.
2. The Database: If you have `docker` there is a docker-compose file otherwise you can user your own local `postgres` database..
   > Don't forget to edit the DATABASE_URL from the `.env.local` file.
3. Database migration

```
npm run db:generate
npm run db:migrate
npm run db:push
```

## To run the App: `npm run dev`

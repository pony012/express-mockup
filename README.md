# express-mockup
Express + Sequelize example

# Run
Create MySQL database, for example:

```bash
docker run --name IMAGE-NAME -p HOST_PORT:3306 -e MYSQL_DATABASE=DB_NAME -e MYSQL_USER=DB_USER -e MYSQL_PASSWORD=PASSWORD -e MYSQL_ROOT_PASSWORD=PASSWORD -d mysql:5.7
```

Copy the `.env.example` to `.env` file and configure.

Go to ```./database``` and then

Run 
```bash 
npm run db:migrate
```
and 
```
bash npm run db:seed:all
```

Then run 
```bash
npm run start
```
or
```bash
nodemon start
```
# express-mockup
Express + Sequelize example

# Run
Create MySQL database, for example:

```bash
docker run --name IMAGE-NAME -p HOST_PORT:3306 -e MYSQL_DATABASE=DB_NAME -e MYSQL_USER=DB_USER -e MYSQL_PASSWORD=PASSWORD -e MYSQL_ROOT_PASSWORD=PASSWORD -d mysql:5.7

sudo docker run --name express-mockup-redis -p 6379:6379 -d redis
```

Copy the `.env.example` to `.env` file and configure.

Go to ```./database``` and then

Run 
```bash 
../node_modules/.bin/sequelize run db:migrate:undo
```

Run 
```bash 
../node_modules/.bin/sequelize run db:migrate
```
and 
```bash 
../node_modules/.bin/sequelize run db:seed:all
```

Then run 
```bash
npm run start
```
or
```bash
nodemon start
```
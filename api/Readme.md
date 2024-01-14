
# Digital Flake Backend APIs

Install Deps by runnning `npm install`

### Run Migrations and Seeding
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Create Environment variable file as `.env` and add below props
```
PORT=3001
db_username=your_db_username
db_password=your_db_password
db_host=localhost
db_port=3306
db_name=digitalflake
```

### Start Application
`npm start`
# Assessment

## Setting Up

- install node 10.15.\*

- install yarn globaly `npm install -g yarn`
- install sequelize cli globaly `npm install -g sequelize-cli`

- install dependencies `yarn`
- run migrations `sequelize db:migrate`
  `DB_USERNAME=dbusername DB_PASSWORD=dbpassword DB_NAME=databasename DB_HOST=dbhost DB_PORT=dbport PORT=applicationport`
- run app `yarn dev`

## DB changes and migrations

- run migrations `sequelize db:migrate`
- undo last migration `sequelize db:migrate:undo`
- create new migration `sequelize migration:create --name your_migration_name`
  ` on above command a file will be generated in ./db/migrations`
  `write your migration code in "up" and oposite in "down"`

```javascript
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {},

  down: (queryInterface, Sequelize) => {},
};
```

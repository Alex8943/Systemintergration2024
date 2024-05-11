# Guide for the migration process 

## - 1 Delete tables in the database

## - 2 Run: 

```bash
knex migrate:latest --env develupment
```

## - 3 Run: 

```bash
knex seed:run
```

## - 4 run: 

```bash
knex migrate:latest --env production
```


## - 5 run: 

```bash
node index.js
```





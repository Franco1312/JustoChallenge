// TO RUN MIGRATIONS
module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  synchronize: false,
  dropSchema: false,
  logging: true,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/migrations'
  }
}

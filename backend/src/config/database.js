module.exports = {
  host: 'db',
  username: 'root',
  password: 'root',
  database: 'todonode',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
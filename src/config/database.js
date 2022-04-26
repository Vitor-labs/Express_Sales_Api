module.exports = {
    dialect: "sqlite",
    storage: "../src/database/test.sqlite3",
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
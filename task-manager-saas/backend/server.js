const app = require("./app");
const sequelize = require("./config/db");
sequelize.sync({ alter: true })
const PORT = process.env.PORT || 5001;

sequelize.sync()
  .then(() => {
    console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });
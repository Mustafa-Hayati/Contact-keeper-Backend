const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

// Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

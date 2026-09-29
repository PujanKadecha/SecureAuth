require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/users");

const email = process.argv[2];

if (!email) {
  console.error("\nUsage: node scripts/make-superuser.js <email>\n");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email });

    if (!user) {
      console.error(`\nNo user found with email: ${email}\n`);
      process.exit(1);
    }

    if (user.isSuperUser && user.role === "superuser") {
      console.log(
        `\nUser "${user.name}" (${email}) is already the superuser.\n`,
      );
      process.exit(0);
    }
    const existingSuperuser = await User.findOne({
      isSuperUser: true,
      _id: { $ne: user._id },
    });

    if (existingSuperuser) {
      console.warn(
        `\nWARNING: Another superuser already exists: ${existingSuperuser.email}`,
      );
      console.warn(
        `    It is recommended to have only one superuser. Proceeding anyway...\n`,
      );
    }

    user.role = "superuser";
    user.isSuperUser = true;
    await user.save();

    console.log(
      `\nSuccess! "${user.name}" (${email}) is now the superuser.\n`,
    );
  } catch (err) {
    console.error("\nError:", err.message, "\n");
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();

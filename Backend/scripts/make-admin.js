/**
 * make-admin.js — CLI script to promote any user to admin by email
 *
 * Usage:
 *   node scripts/make-admin.js <email>
 *
 * Example:
 *   node scripts/make-admin.js pujannk@gmail.com
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/users");

const email = process.argv[2];

if (!email) {
  console.error("\n❌  Usage: node scripts/make-admin.js <email>\n");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅  Connected to MongoDB");

    const user = await User.findOne({ email });

    if (!user) {
      console.error(`\n❌  No user found with email: ${email}\n`);
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log(`\n⚠️   User "${user.name}" (${email}) is already an admin.\n`);
      process.exit(0);
    }

    user.role = "admin";
    await user.save();

    console.log(`\n🎉  Success! "${user.name}" (${email}) is now an admin.\n`);
  } catch (err) {
    console.error("\n❌  Error:", err.message, "\n");
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();

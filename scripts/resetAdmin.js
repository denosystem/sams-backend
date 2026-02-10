const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const MONGO_URI = process.env.MONGO_URI || "YOUR_MONGO_URI_HERE";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("Mongo connected");

  const email = "admin@school.com";
  const plainPassword = "admin123";

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  let user = await User.findOne({ email });

  if (!user) {
    // ⚠️ set your real school ObjectId here
    const schoolId = "PUT_SCHOOL_OBJECT_ID_HERE";

    user = await User.create({
      school: schoolId,
      role: "admin",
      fullName: "System Admin",
      email,
      passwordHash,
      isActive: true,
    });

    console.log("Admin created:", user.email);
  } else {
    user.passwordHash = passwordHash;
    await user.save();
    console.log("Admin password reset:", user.email);
  }

  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

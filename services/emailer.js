const Queue = require("bull");
const config = require("config");
const redisConfig = config.get("redisConfig");
const nodemailer = require("nodemailer");
const DB = require("../lib/dbOperations");
const User = require("../models/user.model");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mukutprasad1992@gmail.com",
    pass: "mukut@@123",
  },
});

module.exports.sendMail = async (payload = null) => {
  const emailQueue = new Queue("sendEmail", redisConfig);
  emailQueue.process(async function (job, done) {
    try {
      message = {
        from: "mukutprasad1992@gmail.com",
        to: job.data.toMail,
        subject: job.data.subject,
        text: job.data.content,
      };
      await transporter.sendMail(message, async function (err, info) {
        if (err) {
          await DB.UPDATE(User, payload.userId, {
            emailStatus: "FAILED",
          });
        } else {
          await DB.UPDATE(User, payload.userId, {
            emailStatus: "SENT",
          });
        }
      });
      done();
      done(new Error("some unexpected error"));
    } catch (error) {
      console.log("Err in catch::", error);
    }
  });
  return emailQueue.add(payload);
};

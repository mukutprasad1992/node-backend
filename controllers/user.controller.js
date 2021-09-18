const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { success, error } = require("../utils/responseApi");
const DB = require("../lib/dbOperations");
const httpStatusCode = require("../constants/httpsCode");
const resposeMessage = require("../constants/responseMessage");
const emailer = require("../services/emailer");

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.send(error(resposeMessage.FIELD_EMPTY, httpStatusCode.NOT_FOUND));
    }
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const usernameExists = await DB.FINDBYUSERNAME(User, req.body.username);
    if (usernameExists) {
      res.send(error(resposeMessage.USER_EXITS, httpStatusCode.CONFLICTS));
    }
    const getUser = await DB.CREATE(User, req.body);
    await emailer.sendMail({
      userId: getUser._id,
      toMail: getUser.username,
      subject: "Welcome",
      content: "Welcome in express passport",
    });
    res.send(
      success(resposeMessage.USER_CREATED, getUser, httpStatusCode.SUCCESS)
    );
  } catch (err) {
    res.send(error(err.message, httpStatusCode.INTERNAL_SERVER));
  }
};

exports.findAll = async (req, res) => {
  try {
    const getAllUsers = await DB.FINDALL(User);
    res.send(
      success(
        resposeMessage.ALL_USER_FETCH,
        getAllUsers,
        httpStatusCode.SUCCESS
      )
    );
  } catch (err) {
    res.send(error(err.message, httpStatusCode.INTERNAL_SERVER));
  }
};

exports.findById = async (req, res) => {
  try {
    const getUser = await DB.FINDBYID(User, req.params.userId);
    res.send(
      success(resposeMessage.USER_FETCH, getUser, httpStatusCode.SUCCESS)
    );
  } catch (err) {
    res.send(error(err.message, httpStatusCode.INTERNAL_SERVER));
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.send(error(resposeMessage.FIELD_EMPTY, httpStatusCode.NOT_FOUND));
    }
    const getUser = await DB.UPDATE(User, req.params.userId, req.body);
    res.send(
      success(resposeMessage.USER_UPDATED, getUser, httpStatusCode.SUCCESS)
    );
  } catch (err) {
    res.send(error(err.message, httpStatusCode.INTERNAL_SERVER));
  }
};

exports.delete = async (req, res) => {
  try {
    const getUser = await DB.DELETE(User, req.params.userId);
    res.send(
      success(resposeMessage.USER_DELETE, getUser, httpStatusCode.SUCCESS)
    );
  } catch (err) {
    res.send(error(err.message, httpStatusCode.INTERNAL_SERVER));
  }
};

const validate = (schema, property) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    const { error } = schema.validate(req.body);
    const valid = error === undefined;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };
};
module.exports = validate;

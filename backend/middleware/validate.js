const isEmpty = (value) =>
  value === undefined || value === null || value === "";

exports.validateCreateTest = (req, res, next) => {
  const {
    test_name,
    start_time,
    end_time,
  } = req.body;

  if (isEmpty(test_name)) {
    return res.status(400).json({ error: "test_name is required" });
  }

  if (isEmpty(start_time) || isEmpty(end_time)) {
    return res.status(400).json({ error: "start_time and end_time are required" });
  }

};

exports.validateTestCodeParam = (req, res, next) => {
  const { test_code } = req.params;

  if (isEmpty(test_code)) {
    return res.status(400).json({ error: "test_code is required" });
  }

  next();
};

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
  const start = new Date(start_time);
  const end = new Date(end_time);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ error: "Invalid date format" });
  }
  if (start >= end) {
    return res.status(400).json({ error: "start_time must be before end_time" });
  }
  next();
};

exports.validateTestCodeParam = (req, res, next) => {
  const { test_code } = req.params;
  if (isEmpty(test_code)) {
    return res.status(400).json({ error: "test_code is required" });
  }
  next();
};

exports.authRole = function authRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied: insufficient permissions" });
    }
    next();
  };
};
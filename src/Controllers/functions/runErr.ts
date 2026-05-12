const runErr = (res, errors, page = "/") => {
  const errorData =
    typeof errors.array === "function" ? errors.array() : [{ msg: errors }];

  res.status(400).render(`${page}`, {
    err: errorData,
  });
};

export default runErr;

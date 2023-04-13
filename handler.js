const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

const handleSuccess = (res, data, code = 200) => {
  res.writeHead(code, headers);
  res.write(JSON.stringify({ status: "success", ...data }));
  res.end();
};

const handleError = (
  res,
  errors = "",
  message = "欄位未填寫正確，或無此id",
  code = 400
) => {
  res.writeHead(code, headers);
  res.write(JSON.stringify({ status: "false", message, errors }));
  res.end();
};

module.exports = { handleSuccess, handleError };

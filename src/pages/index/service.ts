import http from "../../util/http";

export const getStatement = (param?) => {
  return http.get("/bill/statement", param);
};
export const getBillList = (param?) => {
  return http.get("/bill/list", param);
};

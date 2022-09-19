import http from "../../util/http";

export const getCategory = (param?) => {
  return http.get("/category", param);
};

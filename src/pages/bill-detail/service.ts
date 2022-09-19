import http from "../../util/http";

export const getBillDetail = (id) => {
  return http.get(`/bill/detail/${id}`);
};

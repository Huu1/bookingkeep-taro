import http from "../../util/http";

export const getBillDetail = (id) => {
  return http.get(`/bill/detail/${id}`);
};


export const deleteBill =(id)=>{
  return http.post(`/bill/delete`,{
    id
  });
}

export default {
  pages: ["pages/index/index", "pages/chart/index" ,"pages/record/index" ,"pages/bill-detail/index"],
  window: {
    backgroundTextStyle: "light",
    // navigationBarBackgroundColor: '#ffda44',
    navigationBarBackgroundColor: "#fae363",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    backgroundColor: "#f6f9fb",
  },
  tabBar: {
    custom:true,
    list: [
      {
        pagePath: "pages/index/index",
        text: "明细"
      },
      {
        pagePath: "pages/chart/index",
        text: "图表"
      },
    ]
  }
};

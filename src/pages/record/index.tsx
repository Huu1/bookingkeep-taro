
import Taro from "@tarojs/taro";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperItem, View } from "@tarojs/components";
import { useRequest } from "ahooks";
import dayjs from "dayjs";
import "./index.less";
import Keyboard from "../../components/KeyBoard";
import NavBar from "../../components/topbar";
import { getCategory } from "./service";
import { getNewArray } from "../../util";
import http from "../../util/http";

export enum CategoryType {
  "支出",
  "收入"
}



// const categoryList = [
//   [
//     {
//       name: "餐饮",
//       icon: "",
//       id: "1"
//     },
//     {
//       name: "餐饮",
//       icon: "",
//       id: "3"
//     },
//     {
//       name: "餐饮",
//       icon: "",
//       id: "4"
//     },
//     {
//       name: "餐饮",
//       icon: "",
//       id: "5"
//     },
//     {
//       name: "餐饮",
//       icon: "",
//       id: "6"
//     }
//   ]
// ];

export default function Index() {
  const [type, setType] = useState(CategoryType.支出);
  const [category, setCategory] = useState();

  const [originCategory, setOriginCategory] = useState<any>([]);


  const { loading } = useRequest(() => getCategory(), {
    onSuccess(data) {
      setOriginCategory(data);
    }
  });

  const categoryList = useMemo(() => {
    const array = originCategory.filter(i => i.type == type);
    if (array.length) {
      setCategory(array[0].id);
      return getNewArray(array, 8)
    } else {
      return [];
    }

  }, [type, originCategory])

  const onCategoryClick = v => {
    setCategory(v);
  };

  const handelSubmit = (param) => {
    const {
      amount,
      remark,
      date
    } = param;
    if (!amount) {
      Taro.showModal({
        title: '金额必须大于0',
      })
      return;
    }
    Taro.showLoading({
      title: '保存中...',
    })
    console.log();

    http.post('/bill/new', {
      type,
      remark,
      amount: Number(amount),
      payTime: dayjs(date).valueOf(),
      categoryId: category
    }).then((res:any) => {
        setTimeout(() => {
          Taro.hideLoading();
          Taro.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1000,
            complete() {
              setTimeout(() => {
                Taro.switchTab({ url: '/pages/index/index' })
              }, 1000);
            },
          })
        }, 1000);
    }).catch((e)=>{
      Taro.showToast({
        title: e.toString(),
      })
    })
  }

  return (
    <>
      <NavBar back title='记账' backgroundColorTop='#f6f9fb' extraHeight={46}>
        <View className='record-header flex items-center justify-center'>
          {[0, 1].map(i => (
            <View
              className={`${type === i ? "checked" : ""}`}
              onClick={() => setType(i)}
              key={i}
            >
              {i === 0 ? "支出" : "收入"}
            </View>
          ))}
        </View>
      </NavBar>

      <View className='record-page'>
        <View className='category'>
          <Swiper
            className='custom-swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            indicatorDots
            style={{
              height: Taro.getSystemInfoSync().windowWidth / 2 + 20
            }}
          >
            {categoryList.map((group, index) => {
              return (
                <SwiperItem className='category-page' key={index}>
                  {group.map((c, i) => {
                    return (
                      <View
                        onClick={() => onCategoryClick(c.id)}
                        className={`category-item flex flex-col items-center ${category === c.id ? "category-ietm-checked" : ""
                          }`}
                        key={i}
                      >
                        <View className='icon-wrap'>
                          <View className={`iconfont ${c.icon}`} />
                        </View>
                        <View className='demo-text-1'>{c.name}</View>
                      </View>
                    );
                  })}
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
        <Keyboard handelSubmit={handelSubmit} />
      </View>
    </>
  );
}

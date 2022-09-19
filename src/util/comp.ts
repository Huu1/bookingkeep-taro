import { SelectorQuery } from "@tarojs/taro"

function delay(delayTime = 25): Promise<null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, delayTime)
  })
}

export function delayQuerySelector(
  selectorStr: string,
  delayTime = 500
): Promise<any[]> {
  return new Promise(resolve => {
    const selector: SelectorQuery = Taro.createSelectorQuery()
    delay(delayTime).then(() => {
      selector
        .select(selectorStr)
        .boundingClientRect()
        .exec((res: any[]) => {
          resolve(res)
        })
    })
  })
}

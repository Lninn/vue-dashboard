// 邮箱验证正则表达式
const emailRe = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

export { emailRe, phoneRe }

/**
 * 组合 url 查询参数
 * @param url
 * @param params 一个保存所有查询参数的对象
 */
export function addParams(url, params = {}) {
  const names = Object.keys(params)
  if (names.length === 0) {
    return url
  }

  let temp = '?'
  for (const name of names) {
    temp += `${name}=${params[name]}&`
  }

  url = url + temp.replace(/&$/, '')
  return url
}

/**
 * 获取分页的数据格式，前端的表格组件需要后端分页，所以用这个方法 hack 一下
 * @param { pageNo = 1, pageSize = 10 } 当前的分页数据
 * @param { total = 0, data = [] } 后端返回的结果
 * @param keys 需要在数据中嵌入的字段，表格中有时候需要
 */
export function getPageResult(
  { page: pageNo = 1, pageSize = 10 },
  { total = 0, data = [] },
  fileds = {}
) {
  const res = {
    pageNo,
    pageSize,
    totalCount: total,
    totalPage: total / pageSize,
    data: data,
  }
  if (total <= 0) {
    return res
  }
  const keys = Object.keys(fileds)
  if (keys.length > 0) {
    keys.forEach(key => {
      if (key === 'no') {
        res.data = res.data.map((li, index) => {
          li[key] = index + 1 + pageSize * (pageNo - 1)
          return li
        })
      } else {
        res.data = res.data.map(li => {
          li[key] = fileds[key]
          return li
        })
      }
    })
  }
  return res
}

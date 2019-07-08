function table(method) {
  let res = null
  switch (method) {
    case 'GET':
      res = {
        data: [
          {
            id: 1,
            key: 1,
            cover:
              'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
            title: 'Alipay',
            description: '那是一种内在的东西， 他们到达不了，也无法触及的',
            status: 1,
            updatedAt: '2018-07-26 00:00:00',
            editable: false,
            callNo: 100,
            no: 'No 1',
          },
          {
            id: 2,
            key: 2,
            cover:
              'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
            title: 'Angular',
            description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
            status: 1,
            updatedAt: '2018-07-26 00:00:00',
            editable: false,
            callNo: 100,
            no: 'No 2',
          },
          {
            id: 3,
            key: 3,
            cover:
              'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
            title: 'Ant Design',
            description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
            status: 1,
            updatedAt: '2018-07-26 00:00:00',
            editable: false,
            callNo: 100,
            no: 'No 3',
          },
          {
            id: 4,
            key: 4,
            cover:
              'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
            title: 'Ant Design Pro',
            description: '那时候我只会想自己想要什么，从不想自己拥有什么',
            status: 1,
            updatedAt: '2018-07-26 00:00:00',
            editable: false,
            callNo: 100,
            no: 'No 4',
          },
          {
            id: 5,
            key: 5,
            cover:
              'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
            title: 'Bootstrap',
            description: '凛冬将至',
            status: 1,
            updatedAt: '2018-07-26 00:00:00',
            editable: false,
            callNo: 100,
            no: 'No 5',
          },
          {
            id: 6,
            key: 6,
            cover:
              'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
            title: 'Vue',
            description: '生命就像一盒巧克力，结果往往出人意料',
            status: 1,
            updatedAt: '2018-07-26 00:00:00',
            editable: false,
            callNo: 100,
            no: 'No 6',
          },
        ],
        pageSize: 10,
        pageNo: 0,
        totalPage: 6,
        totalCount: 57,
      }
      break

    default:
      res = null
      break
  }

  return res
}

module.exports = table

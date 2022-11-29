const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    menuname: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})


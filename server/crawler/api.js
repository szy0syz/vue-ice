import rp from 'request-promise'
import R from 'ramda'
import _ from 'lodash'
import { writeFileSync } from 'fs'

let characters = []

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const getAPICharacters = async (page = 1) => {
  console.log('page: ',page)
  const url = `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`
  console.log('开始爬取第 ' + page + ' 页数据')
  let body = await rp(url)
  body = JSON.parse(body)
  characters = _.union(characters, body)
  console.log('body.length~~  ', body.length)
  if (body.length < 50) {
    console.log('数据爬去完毕')
    return
  } else {
    console.log('爬取到50个数据')
    writeFileSync('./server/crawler/api.json', JSON.stringify(characters, null, 2), 'utf8')
    await sleep(3200)
    console.log('pagemmmmm:', page)
    getAPICharacters(page)
    // let that = this
    // new Promise(() => setTimeout(() => {
    //   that.page++
    //   console.log(that.page)
    //   getAPICharacters(page)
    // }, 2500))
  }
}

getAPICharacters()

// const fn = (n = 1) => {
//   console.log(n++)
//   if (n >= 100) {
//     return
//   } else {
//     fn(n)
//   }
// }
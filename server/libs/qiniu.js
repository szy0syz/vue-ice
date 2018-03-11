import qiniu from 'qiniu'
import config from '../config'
import { exec } from 'shelljs'

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

const bucket = config.qiniu.bucket

export const a = async (url, key) => {
  // const client = new qiniu.rs.Client()

  return new Promise((resolve, reject) => {
    // client.fetch(url, bucket, key, (err, ret) => {
    //   if (err) reject(err)
    //   else resolve(ret)
    // })

    const bash = `qshell fetch ${url} ${bucket} ${key}`
    const child = exec(bash, { async: true })
    child.stdout.on('data', data => {
      resolve(data)
    })
  })
}

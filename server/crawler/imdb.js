import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
import { writeFilesync, writeFileSync } from 'fs'
// import Agent from 'socks5-http-client'

export const getIMDBCharacters = async () => {
  const options = {
    uri: 'http://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm#cast',
    // agentClass: Agent,
    // AgentOptions: {
    //   socksHost: 'localhost',
    //   socksPort: 1080
    // },
    transform: body => cheerio.load(body)
  }

  const $ = await rp(options)
  let photos = []

  $('table.cast_list tr.odd, tr.even').each(function () {
    const nmIdDom = $(this).find('td.itemprop a')
    const nmId = nmIdDom.attr('href')

    const characterDom = $(this).find('td.character a')
    const name = characterDom.text()
    //const chId = characterDom.attr('href')

    const playedByDom = $(this).find('td.itemprop span.itemprop')
    const playedBy = playedByDom.text()

    photos.push({
      nmId,
      name,
      playedBy
    })
  })

  const fn = R.compose(
    R.map(photo => {
      const reg1 = /\/name\/(.*?)\/\?ref/
      // const reg2 = /\/characters\/(.*?)\?ref/
      const match1 = photo.nmId.match(reg1)
      // const match2 = photo.chId.match(reg2)

      try {
        photo.nmId = match1[1]
        // photo.chId = match2[1]
        return photo
      } catch (error) {
        return null
        console.error('匹配出错')
      }
    }),
    R.filter(photo => photo && photo.playedBy && photo.name && photo.nmId),
  )
  photos = fn(photos)
  writeFileSync('./server/crawler/imdb.json', JSON.stringify(photos, null, 2), 'utf8')
}

getIMDBCharacters()
const { Canvas } = require('canvas-constructor')
const fsn = require('fs-nextra')
const request = require('snekfetch')

exports.run = async (URL) => {
  return new Promise(async (resolve, reject) => {
    const userPromise = await request.get(URL)
    const templatePromise = await fsn.readFile('./resources/ban/ban.png')
    Promise.all([userPromise, templatePromise]).then((promises) => {
      const [user, template] = promises
      let halp = new Canvas(536, 751)
        .addImage(template, 0, 0, 536, 751)
        .addImage(user.raw, 70, 344, 400, 400)
        .toBuffer()
      resolve(halp)
    }).catch(reject)
  })
}

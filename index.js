const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://neylecm.github.io/project-break-dashboard/'

app.get('/', (req, res) => {
   // res.send('FUNCIONA') -- Probar que funciona
   axios.get(url).then((response) => {
    if(response.status === 200) {
    const html = response.data
    //console.log(html)
    const $ = cheerio.load(html)
    const pageTitle = $('title').text()
    //console.log(pageTitle)

    const links = []
    const imgs = []
    $('a').each((index, element) => {
        const link = $(element).attr('href')
        links.push(link)
    })
    $('img').each((index, element) => {
        const img = $(element).attr('src')
        imgs.push(img)
    })
    //console.log(links)
    res.send(`
        <title>${pageTitle}</title>
        <h2>Enlaces</h2>
        <ul>
        ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
        </ul>
        <h2>Imágenes</h2>
        <ul>
        ${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
        </ul>
        `)
    }
   })
})

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000')
})

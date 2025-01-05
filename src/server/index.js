require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

// example API call
app.get('/roversData', async (req, res) => {
    try {
        let curiosityData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/latest_photos?api_key=${process.env.API_KEY}`)
        curiosityData =  await curiosityData.json()
        let opportunityData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/Opportunity/latest_photos?api_key=${process.env.API_KEY}`)
        opportunityData = await opportunityData.json()
        let spiritData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/Spirit/latest_photos?api_key=${process.env.API_KEY}`)
        spiritData = await spiritData.json()
        res.send({ curiosityData, opportunityData, spiritData })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
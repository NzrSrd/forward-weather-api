const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

app.use(cors({
    origin: '*'
}))



app.get(':endpoint([\\/\\w\\.-]*)', function(req, res) {

    let endpoint = process.env.API_BASE_URL + req.params.endpoint;

    let params = {};

    if(!!process.env.APP_ID_PARAM_NAME && !!process.env.APP_ID) {
        params[process.env.APP_ID_PARAM_NAME] = process.env.APP_ID
    }

    for(const [field, value] of Object.entries(req.query)) {
        params[field] = value
    }

    axios
        .get(endpoint, {
            params: params
        }).then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.json(error)
        })
})

//PORT
const port = process.env.PORT || 4000
app.listen(port, () => {console.log(`OpenWeatherMap API listening ${port}...`)})


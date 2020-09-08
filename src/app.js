const path = require('path')
const express = require('express') //it has only one function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() //this will create new express application
const port = process.env.PORT || 3000

//paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials( partialsDirPath)

//setup static directory to serve
app.use(express.static(publicDirPath))
// For the above function:
// app.use is used to modify the server
// It takes the output of express.static function as its argument

//Suppose we have web page as app.com
// app.get(
//     '', //routing. For home page
//     (req,//this is the object containing inf about the incoming requests
//      res//this contains bunch of methods allowing us to decide what we are going to send back to the requestor
//     )=>{ //this will tell that what needs to be done when someone visits the particular route

//         res.send('Hello Express') //sends something back to requestor
//     }
// )

// app.get('/help' , (req, res) =>{
//     res.sendFile(publicDirPath+'/help.html') ******
// })

// app.get('/about' , (req, res) =>{
//     res.send('<h1>About Page</h1>')
// })

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Jerry'
    })
})

app.get('/about' , (req, res) =>{
    res.render('about',{
        title: 'About Dynamic Page',
        name: 'JerryAbout'
    })
})

app.get('/help' , (req, res) =>{
    res.render('help',{
        title:'help page',
        message:'demo help page',
        name: 'Jerryhelp'
    }) 
})

app.get('/weather' , (req, res) =>{
    const searchTerm = req.query.address
    if(!searchTerm){
        return res.send({
            error: 'Search parameter is mandatory'
        })
    }

    geocode(searchTerm, (error, {latitude , longitude} = {}) => {
    
        if(error){
            return res.send({error})
        }    
        forecast(latitude, longitude, (error, {location, current} = {})=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: current.weather_descriptions[0],
                address: req.query.address,
                location: location.name+','+location.country
            })
        })    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404-Not Found',
        error: 'help article not found',
        name: 'Jerryhelp404'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404-Not Found',
        error: 'Page not found',
        name: 'Jerry404'
    })
})

app.listen(port,()=>{//this will start up the server and listen on a specific port
    //this function will run when the server is up
    console.log('Server is up on port ' + port)
}) 
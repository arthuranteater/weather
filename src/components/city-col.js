import React from 'react'
import { Search } from './city-search'
import { WeatherCard } from './weather-card'
import { Radio } from './scale-radio'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export const CityCol = ({ col, del }) => {
    console.log('rendering city col', col)

    //col state
    const [coords, setCoords] = React.useState([])
    const [weather, setWeather] = React.useState({})
    const [scale, setScale] = React.useState('metric')
    const [forecast, setForecast] = React.useState({})

    //passing state
    const passCoords = React.useCallback(c => { setCoords(c) }, [])


    React.useEffect(() => {
        console.log('column', col)
        console.log('coords length', coords.length)
        if (coords.length === 0 && col === 1) {
            console.log('setting coords based off current location')
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition((c) => setCoords([c.coords.latitude, c.coords.longitude]))
            }
        }
    })

    React.useEffect(() => {
        console.log('coords changed, fetching weather')
        if (coords.length !== 0) {
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER_2}`
            console.log('api', api)
            fetch(api)
                .then(res => {
                    return res.json()
                })
                .then((json) => {
                    setWeather(json)
                })
        }

    }, [coords, scale])

    React.useEffect(() => {
        console.log('weatherdata', weather)
    }, [weather])

    React.useEffect(() => {
        console.log('coords changed, fetching forecast')
        if (coords.length !== 0) {
            const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER_2}`
            console.log('api', api)
            fetch(api)
                .then(res => {
                    return res.json()
                })
                .then((json) => {
                    setForecast(json)
                })
        }

    }, [coords, scale])

    React.useEffect(() => {
        console.log('forecast', forecast)
    }, [forecast])

    return (
        <Col id={col} className='mt-5' >
            <h1>{col}</h1>
            <div>
                {col !== 1 ? <Button className='btn-danger' onClick={() => del(col)}>Delete</Button> :
                    <Button style={{ visibility: 'hidden' }}>Boo</Button>
                }
            </div>
            <Radio passScale={(s) => setScale(s)} />
            <Search passCoords={passCoords} current={weather} />
            {weather !== {} ?
                <WeatherCard scale={scale} current={weather} forecast={forecast} />
                : <div></div>}
        </Col>

    )
}
import React from 'react'
import { Search } from './city-search'
import { WeatherCard } from './weather-card'
import { Radio } from './scale-radio'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export const CityCol = ({ col, del }) => {
    console.log('rendering city col')
    const [coords, setCoords] = React.useState([])
    const [weather, setWeather] = React.useState({})
    const [scale, setScale] = React.useState('metric')
    const [forecast, setForecast] = React.useState()

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
        console.log('coords changed')
        if (coords.length !== 0) {
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER}`
            console.log('api', api)
            fetch(api)
                .then(res => {
                    return res.json()
                })
                .then((json) => {
                    setWeather(json)
                })
        }

    }, [coords])

    React.useEffect(() => {
        console.log('weatherdata', weather)
    }, [weather])

    React.useEffect(() => {
        console.log('coords changed')
        if (coords.length !== 0) {
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER}`
            console.log('api', api)
            fetch(api)
                .then(res => {
                    return res.json()
                })
                .then((json) => {
                    setWeather(json)
                })
        }

    }, [coords])

    React.useEffect(() => {
        console.log('weatherdata', weather)
    }, [weather])

    return (
        <Col id={col} className='mt-5' >
            {console.log('rendering city col')}
            <div>
                {col !== 1 ? <Button className='btn-danger' onClick={() => del(col)}>Delete</Button> :
                    <Button style={{ visibility: 'hidden' }}>Boo</Button>
                }
            </div>
            <Radio passScale={(s) => setScale(s)} />
            <Search passCoords={(c) => setCoords(c)} />
            <WeatherCard current= />
        </Col>

    )
}
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const WeatherCard = ({ scale, current, forecast }) => {
    const [show, showForecast] = React.useState(false)

    const highLow = {}

    forecast.list.map(period => {
        const day = period.dt_txt.split(' ')[0].split('-')[2]
        const temp = period.main.temp
        console.log('day', day, 'temp', temp)
        if (highLow[day]) {
            console.log(highLow[day])
            highLow[day].push(temp)
        }
        else {
            highLow.push({ [day]: [temp] })
        }
    })

    let units

    if (current.weather !== undefined) {
        if (scale === 'metric') {
            units = 'C'
        } else if (scale === 'imperial') {
            units = 'F'
        } else {
            units = 'K'
        }
    }

    return (
        <>{current.weather !== undefined ?
            <Card className='mt-5' style={{ width: '18rem', margin: 'auto' }}>
                <Card.Body>
                    <Card.Header>{current.name}</Card.Header>
                    <Card.Title className='mt-2'>Current Weather</Card.Title>
                    <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt={`${current.weather}`} />
                    <p style={{ textAlign: 'center', fontSize: '1.2em', listStyle: 'none' }}>{current.main.temp} ° {units}</p>
                    <Button variant="primary" onClick={e => {
                        e.preventDefault()
                        showForecast(!show)
                    }}>Five Day Forecast</Button>
                </Card.Body>
            </Card> : <div></div>}
            {show ? Object.keys(highLow).map(day =>
                <Card className='mt-5' style={{ width: '18rem', margin: 'auto' }}>
                    <Card.Body>
                        <Card.Header>{current.name}</Card.Header>
                        <Card.Title className='mt-2'>{day}</Card.Title>
                        <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt={`${current.weather}`} />
                        <p style={{ textAlign: 'center', fontSize: '1.2em', listStyle: 'none' }}>{current.main.temp} ° {units}</p>
                        <Button variant="primary" onClick={e => {
                            e.preventDefault()
                            showForecast(!show)
                        }}>Five Day Forecast</Button>
                    </Card.Body>
                </Card>) :
                <div></div>}
        </>
    )
}
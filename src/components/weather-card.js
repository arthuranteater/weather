import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const WeatherCard = ({scale, current, forecast}) => {
    let units

    if (current.weather !== undefined) {
        if (scale === 'metric') {
            units = 'C'
        } else if (scale === 'imperial') {
            units ='F'
        } else {
            units ='K'
        }
    }

return (
<>{current.weather !== undefined ?
<Card className='mt-5' style={{ width: '18rem', margin: 'auto' }}>
        <Card.Body>
            <Card.Title>{current.name}</Card.Title>
            <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} alt={`${current.weather}`}/>
            <ul>
            <li style={{fontSize: '1.7em', listStyle: 'none'}}>{current.main.temp}°{units}</li>
            <li></li>
            <li></li>
            </ul>
            <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>: <div></div> }
    </>
)
}
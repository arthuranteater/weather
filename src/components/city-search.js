import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export const Search = ({ passCoords }) => {
    const [city, setCity] = React.useState({})

    React.useEffect(() => {
        console.log('change in city search')
        if (Object.keys(city).length !== 0) {
            const api = `https://maps.googleapis.com/maps/api/geocode/json?address=+${city}&key=${process.env.REACT_APP_GEO}`
            console.log('api', api)
            fetch(api)
                .then(res => {
                    // console.log('res', res)
                    return res.json()
                })
                .then((json) => {
                    const lat = json.results[0].geometry.location.lat
                    const lon = json.results[0].geometry.location.lng
                    console.log('lat', lat)
                    console.log('lon', lon)
                    passCoords([lat, lon])
                })
        }
    }, [city])



    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            setCity(e.target[0].value)
        }} className='mt-5' style={{ width: '18rem', margin: 'auto' }}>
            <Form.Group controlId="formText">
                <Form.Control type="text" placeholder="Enter City" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}



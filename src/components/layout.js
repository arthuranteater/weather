import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { CityCol } from './city-col'


export const Layout = (props) => {
    const [count, setCount] = React.useState([1])

    const helper = (del) => setCount(count.filter(col => col !== del))

    return (
        <Container>
            <Row className='mt-5'>
                {count.length > 2 ?
                    <div></div> :
                    <Col>
                        <Button onClick={() => setCount(count.concat(count[count.length - 1] + 1))} > Add City</Button>
                    </Col>}
            </Row>
            <Row>
                {count.map(col =>
                    <CityCol key={col} col={col} del={(del) => helper(del)} />
                )}
            </Row>
        </Container>
    )

}
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
        <Container fluid={true}>
            <Row className='mt-2' style={{ postion: 'sticky', top: 0 }}>
                <Col style={{ margin: 'auto' }} sm='4'>
                </Col>
                <Col style={{ margin: 'auto' }} sm='4'>
                    <a href="/"><h3>Whats the Weather In</h3></a>
                </Col>
                <Col sm='4'>
                    {count.length > 2 ?
                        <div></div> :
                        <Button className='float-right' onClick={() => setCount(count.concat(count[count.length - 1] + 1))}>+ Add City</Button>
                    }
                </Col>
            </Row>
            <Row>
                {count.map(col =>
                    <CityCol key={col} col={col} del={(del) => helper(del)} />
                )}
            </Row>
        </Container>
    )

}
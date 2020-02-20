import React from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'


export const Radio = ({ passScale }) =>
    <ButtonToolbar className='mt-2' style={{ display: 'block', margin: 'auto' }}>
        <ToggleButtonGroup type="radio" name="options" defaultValue='metric' onChange={(s) => passScale(s)}>
            <ToggleButton value='metric'>°C</ToggleButton>
            <ToggleButton value='imperial'>°F</ToggleButton>
            <ToggleButton value=''>°K</ToggleButton>
        </ToggleButtonGroup>
    </ButtonToolbar>
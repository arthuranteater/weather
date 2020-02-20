import React from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'


export const Radio = ({ passScale }) =>
    <ButtonToolbar className='mt-2' style={{ display: 'block', margin: 'auto' }}>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={(s) => passScale(s)}>
            <ToggleButton value={1}>°C</ToggleButton>
            <ToggleButton value={2}>°F</ToggleButton>
            <ToggleButton value={3}>°K</ToggleButton>
        </ToggleButtonGroup>
    </ButtonToolbar>
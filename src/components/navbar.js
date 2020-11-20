import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";

export function Navy({ cityList, setScale, setCount, count }) {
  const styles = {
    cityList: {
      marginLeft: "auto",
    },
    cityInv: {
      marginLeft: "auto",
      visibility: "hidden",
    },
  };
  return (
    <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
      <Nav.Item style={{ flex: "1" }}>
        {" "}
        <ButtonToolbar>
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue="metric"
            onChange={(s) => setScale(s)}
          >
            <ToggleButton value="metric">°C</ToggleButton>
            <ToggleButton value="imperial">°F</ToggleButton>
            <ToggleButton value="">°K</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </Nav.Item>
      <Navbar.Brand href="#home">What's the Weather In</Navbar.Brand>
      <Nav style={{ flex: 1 }}>
        {/* <Dropdown as={NavItem}>
          <Dropdown.Toggle as={NavLink}>Change/Add City</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() =>
                  setCount(count.concat(count[count.length - 1] + 1))
                }>New</Dropdown.Item>
            <Dropdown.Item>Col 1: {}</Dropdown.Item>
            <Dropdown.Item>Col 2: {}</Dropdown.Item>
            <Dropdown.Item>Col 3: {}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <Dropdown
          as={NavItem}
          style={count.length > 2 ? styles.cityInv : styles.cityList}
        >
          <Dropdown.Toggle as={NavLink}>Add City</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() =>
                setCount(count.concat(count[count.length - 1] + 1))
              }
            >
              New
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        <Button
          as={NavItem}
          style={count.length > 2 ? styles.cityInv : styles.cityList}
          onClick={() => setCount(count.concat(count[count.length - 1] + 1))}
        >
          + Add City
        </Button>
      </Nav>
    </Navbar>
  );
}

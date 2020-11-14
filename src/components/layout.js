import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { CityCol } from "./city-col";

export const Layout = () => {
  const [count, setCount] = React.useState([1]);
  const [scale, setScale] = React.useState("metric");

  const helper = (del) => setCount(count.filter((col) => col !== del));

  return (
    <Container fluid={true}>
      <Row className="mt-2" style={{ postion: "sticky", top: 0 }}>
        <Col style={{ margin: "auto" }} sm="4">
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
        </Col>
        <Col style={{ margin: "auto" }} sm="4">
          <a href="/">
            <h3>Whats the Weather In</h3>
          </a>
        </Col>
        <Col sm="4">
          {count.length > 2 ? (
            <div></div>
          ) : (
            <Button
              className="float-right"
              onClick={() =>
                setCount(count.concat(count[count.length - 1] + 1))
              }
            >
              + Add City
            </Button>
          )}
        </Col>
      </Row>
      <Row style={{ minHeight: "100vh" }}>
        {count.map((col) => (
          <CityCol
            key={col}
            col={col}
            del={(del) => helper(del)}
            scale={scale}
          />
        ))}
      </Row>
    </Container>
  );
};

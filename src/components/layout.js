import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { CityCol } from "./city-col";
import { Navy } from "./navbar";
import GlobeWrapper from "./globe-wrapper";

export const Layout = () => {
  const [count, setCount] = React.useState([1]);
  const [scale, setScale] = React.useState("metric");
  const [cityList, addCity] = React.useState([]);

  const addSearch = (city) => {
    console.log("city received", city);
    addCity((cityList) => [...cityList, city]);
  };

  const helper = (del) => setCount(count.filter((col) => col !== del));

  const onLoad = () => console.log("script loaded");

  return (
    <div style={{ backgroundColor: "black" }}>
      {console.log("cityList", cityList)}
      <Navy
        cityList={cityList}
        setScale={setScale}
        count={count}
        setCount={setCount}
      />
      <Container fluid={true}>
        <Row
          className="mt-5"
          style={
            {
              // backgroundImage: `url('http://getwallpapers.com/wallpaper/full/4/c/c/29997.jpg')`,
              // maxHeight: "400px",
            }
          }
        >
          <Col style={{ margin: "auto" }}>
            <GlobeWrapper asyncScriptOnLoad={onLoad} />
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ minHeight: "100vh", justifyContent: "center" }}
        >
          {count.map((col) => (
            <CityCol
              key={col}
              col={col}
              del={(del) => helper(del)}
              scale={scale}
              addSearch={addSearch}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Search = ({
  addSearch,
  passCoords,
  current,
  colName,
  cityName,
}) => {
  const [city, setCity] = React.useState({});

  const passCoordsUp = React.useCallback(
    (c) => {
      return passCoords(c);
    },
    [passCoords]
  );

  React.useEffect(() => {
    if (Object.keys(city).length > 0) {
      addSearch(city);
    }
  }, [city]);

  React.useEffect(() => {
    if (Object.keys(city).length !== 0) {
      const api = `https://maps.googleapis.com/maps/api/geocode/json?address=+${city}&key=${process.env.REACT_APP_GEO}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const lat = json.results[0].geometry.location.lat;
          const lon = json.results[0].geometry.location.lng;
          passCoordsUp([lat, lon]);
        });
    }
  }, [city, passCoordsUp]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setCity(e.target[0].value);
      }}
      className="mt-5"
      style={{ width: "18rem", margin: "auto" }}
    >
      <Form.Group as={Row} controlId="formText">
        <Form.Label column sm="2">
          City:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            className="float-left"
            type="text"
            placeholder={cityName ? cityName : "Enter City"}
          />
        </Col>
        <Col sm="2">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

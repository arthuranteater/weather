import React from "react";
import { Search } from "./city-search";
import { WeatherCard } from "./weather-card";
import { Radio } from "./scale-radio";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export const CityCol = ({ addSearch, col, del, scale }) => {
  //col state
  const [coords, setCoords] = React.useState([]);
  const [weather, setWeather] = React.useState({});
  const [forecast, setForecast] = React.useState({});
  const [stateName, setStateName] = React.useState(null);
  const [cityName, setCityName] = React.useState(null);
  const [countryName, setCountryName] = React.useState(null);
  const [colName, setColName] = React.useState(null);
  const [bg, setBG] = React.useState([]);

  //return random
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  //passing state
  const passCoords = React.useCallback((c) => {
    setCoords(c);
  }, []);

  React.useEffect(() => {
    if (coords.length === 0 && col === 1) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((c) =>
          setCoords([c.coords.latitude, c.coords.longitude])
        );
      }
    }
  });

  React.useEffect(() => {
    if (coords.length !== 0) {
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER_2}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setWeather(json);
        });
    }
  }, [coords, scale]);

  React.useEffect(() => {
    if (coords.length !== 0) {
      const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${process.env.REACT_APP_GEO}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((obj) => {
          const arr = obj.results[0].formatted_address.split(",").slice(-3);
          if (Number.isInteger(parseInt(arr[1].charAt(1)))) {
            arr.shift();
          }
          const arr2 = obj.results[0].address_components;
          const town = arr2.filter((x) => x.types[0] === "locality")[0]
            .long_name;
          const area = arr2.filter(
            (x) => x.types[0] === "administrative_area_level_1"
          )[0].long_name;
          const ctry = arr2.filter((x) => x.types[0] === "country")[0];
          const ctry_long = ctry.long_name;
          const ctry_short = ctry.short_name;
          setCountryName(ctry_long);
          setCityName(town);
          setStateName(area);
          setColName(`${town}, ${area}, ${ctry_short}`);
        });
    }
  }, [coords]);

  React.useEffect(() => {
    if (stateName !== null) {
      const cityArr = cityName.trim().split(" ");
      const stateArr = stateName.trim().split(" ");
      const ctryArr = countryName.trim().split(" ");
      let cityQ;
      if (cityArr.length > 0) {
        cityQ = cityArr.join("+");
      } else {
        cityQ = cityName;
      }
      let stateQ;
      if (stateArr.length > 0) {
        stateQ = stateArr.join("+");
      } else {
        stateQ = stateName;
      }
      let ctryQ;
      if (ctryArr.length > 0) {
        ctryQ = ctryArr.join("+");
      } else {
        ctryQ = countryName;
      }
      const api = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXA}&q=${cityQ}+${stateQ}&image_type=photo&safesearch=true`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((obj) => {
          if (obj.hits.length > 0) {
            const i = getRandom(0, obj.hits.length);
            setBG([
              obj.hits[i].largeImageURL,
              obj.hits[i].imageWidth,
              obj.hits[i].imageHeight,
            ]);
          } else {
            const api2 = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXA}&q=${stateQ}&image_type=photo&safesearch=true`;
            fetch(api2)
              .then((res) => {
                return res.json();
              })
              .then((stateRes) => {
                if (stateRes.hits.length > 0) {
                  const i = getRandom(0, stateRes.hits.length);
                  setBG([
                    stateRes.hits[i].largeImageURL,
                    stateRes.hits[i].imageWidth,
                    stateRes.hits[i].imageHeight,
                  ]);
                } else {
                  const api3 = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXA}&q=${ctryQ}&image_type=photo&safesearch=true`;
                  fetch(api3)
                    .then((res) => {
                      return res.json();
                    })
                    .then((ctryRes) => {
                      if (ctryRes.hits.length > 0) {
                        const i = getRandom(0, ctryRes.hits.length);
                        setBG([
                          ctryRes.hits[i].largeImageURL,
                          ctryRes.hits[i].imageWidth,
                          ctryRes.hits[i].imageHeight,
                        ]);
                      }
                    });
                }
              });
          }
        });
    }
  }, [stateName]);

  React.useEffect(() => {
    if (coords.length !== 0) {
      const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER_2}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setForecast(json);
        });
    }
  }, [coords, scale]);

  React.useEffect(() => {}, [forecast]);

  return (
    <Col
      id={col}
      className="mt-5"
      style={{
        maxWidth: "1280px",
      }}
    >
      <div>
        <Row
          style={{
            marginBottom: "1rem",
          }}
        >
          <Col>
            <div>
              {col !== 1 ? (
                <Button className="btn-danger" onClick={() => del(col)}>
                  X
                </Button>
              ) : (
                <Button style={{ visibility: "hidden" }}>Boo</Button>
              )}
            </div>
            <Search
              colName={colName}
              passCoords={passCoords}
              current={weather}
              cityName={cityName}
              addSearch={addSearch}
            />
            <div
              style={{
                display: "inline-block",
                borderRadius: "5px",
                background: "green",
              }}
            >
              {coords.length > 0 ? (
                <h5 style={{ padding: ".5rem", color: "white" }}>
                  {colName ? colName : "Searching..."}
                </h5>
              ) : (
                <h5
                  style={{ padding: ".5rem", color: "white", display: "none" }}
                >
                  Searching...
                </h5>
              )}
            </div>
          </Col>
        </Row>
        {bg.length > 0 ? (
          <Row
            style={{
              backgroundImage: `url(${bg[0]})`,
              minHeight: "100vh",
              borderRadius: "5px",
            }}
          >
            <Col>
              {weather !== {} ? (
                <WeatherCard
                  scale={scale}
                  current={weather}
                  forecast={forecast}
                  cityName={cityName}
                />
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        ) : (
          <Row
            style={{
              minHeight: "100vh",
              borderRadius: "5px",
            }}
          >
            <Col>
              {weather !== {} ? (
                <WeatherCard
                  scale={scale}
                  current={weather}
                  forecast={forecast}
                  cityName={cityName}
                />
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        )}
      </div>
    </Col>
  );
};

import React from "react";
import { Search } from "./city-search";
import { WeatherCard } from "./weather-card";
import { Radio } from "./scale-radio";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const CityCol = ({ col, del, scale }) => {
  console.log("rendering city col", col);

  //col state
  const [coords, setCoords] = React.useState([]);
  const [weather, setWeather] = React.useState({});
  const [forecast, setForecast] = React.useState({});
  const [cityname, setCityName] = React.useState(null);
  const [bg, setBG] = React.useState([]);

  //return random
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  //passing state
  const passCoords = React.useCallback((c) => {
    setCoords(c);
  }, []);

  React.useEffect(() => {
    console.log("column", col);
    console.log("coords length", coords.length);
    if (coords.length === 0 && col === 1) {
      console.log("setting coords based off current location");
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((c) =>
          setCoords([c.coords.latitude, c.coords.longitude])
        );
      }
    }
  });

  React.useEffect(() => {
    console.log("coords changed, fetching weather");
    console.log("coords", coords);
    if (coords.length !== 0) {
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER_2}`;
      console.log("weather data api", api);
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
    console.log("coords changed, fetching address");
    console.log("coords", coords);
    if (coords.length !== 0) {
      const api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${process.env.REACT_APP_GEO}`;
      console.log("rev geocoding api", api);
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((obj) => {
          console.log("rev gecoding .results", obj.results);
          const arr = obj.plus_code.compound_code.split(" ");
          arr.shift();
          // console.log("arr to join", arr);
          // console.log(
          //   "add",
          //   arr
          //     .join()
          //     .split(",")
          //     .filter((x) => x !== ",")
          //     .join(" ")
          //     .split("  ")
          //     .join("+")
          // );
          // setCityName(
          //   arr
          //     .join()
          //     .split(",")
          //     .filter((x) => x !== ",")
          //     .join(" ")
          //     .split("  ")
          //     .join("+")
          // );
          console.log(obj.results[0].address_components[5].long_name);
          setCityName(obj.results[0].address_components[5].long_name);
        });
    }
  }, [coords]);

  React.useEffect(() => {
    console.log("weather fetched, fetching bg img");
    console.log("weatherdata", weather);
    console.log("cityname", cityname);
    if (cityname !== null) {
      const api = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXA}&q=${cityname}&image_type=photo&safesearch=true`;
      console.log("bg img api", api);
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((obj) => {
          console.log("obj.hits", obj.hits);
          const i = getRandom(0, obj.hits.length);
          console.log("i", i);
          setBG([
            obj.hits[i].largeImageURL,
            obj.hits[i].imageWidth,
            obj.hits[i].imageHeight,
          ]);
        });
    }
  }, [cityname]);

  React.useEffect(() => {
    console.log("coords changed, fetching forecast");
    if (coords.length !== 0) {
      const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&units=${scale}&appid=${process.env.REACT_APP_WEATHER_2}`;
      console.log("api", api);
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setForecast(json);
        });
    }
  }, [coords, scale]);

  React.useEffect(() => {
    console.log("forecast", forecast);
  }, [forecast]);

  return (
    <>
      {bg !== [] ? (
        <Col
          id={col}
          className="mt-5"
          style={{
            backgroundImage: `url(${bg[0]})`,
            // minHieght: "100vh",
            // height: bg[2],
            maxWidth: "1280px",
          }}
        >
          <div>
            <div>
              {col !== 1 ? (
                <Button className="btn-danger" onClick={() => del(col)}>
                  Delete
                </Button>
              ) : (
                <Button style={{ visibility: "hidden" }}>Boo</Button>
              )}
            </div>
            <Search passCoords={passCoords} current={weather} />
            {weather !== {} ? (
              <WeatherCard
                scale={scale}
                current={weather}
                forecast={forecast}
              />
            ) : (
              <div></div>
            )}
          </div>
        </Col>
      ) : (
        <Col id={col} className="mt-5">
          <div>
            {col !== 1 ? (
              <Button className="btn-danger" onClick={() => del(col)}>
                Delete
              </Button>
            ) : (
              <Button style={{ visibility: "hidden" }}>Boo</Button>
            )}
          </div>
          <Search passCoords={passCoords} current={weather} />
          {weather !== {} ? (
            <WeatherCard scale={scale} current={weather} forecast={forecast} />
          ) : (
            <div></div>
          )}
        </Col>
      )}
    </>
  );
};

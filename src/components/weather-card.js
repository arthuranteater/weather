import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const WeatherCard = ({ scale, current, forecast, cityName }) => {
  const [five, showFive] = React.useState(false);
  const [hourly, showHourly] = React.useState(false);

  const highLow = {};
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const hrs = current.timezone / 3600;

  if (forecast.list !== undefined) {
    forecast.list.map((period) => {
      let day = period.dt_txt.split(" ")[0].split("-")[2];
      const month = parseInt(period.dt_txt.split(" ")[0].split("-")[1]);
      let time = parseInt(period.dt_txt.split(" ")[1].split(":")[0]) + hrs;
      if (time < 0) {
        time = time + 24;
        day = day - 1;
      }
      const temp = period.main.temp;
      const icon = period.weather[0].icon;
      if (highLow[day]) {
        highLow[day].temps.push(parseInt(temp));
        highLow[day].icons[time] = icon;
      } else {
        highLow[day] = {
          temps: [parseInt(temp)],
          icons: { [time]: icon },
          month: months[month - 1],
        };
      }
    });
  }

  let units;

  if (current.weather !== undefined) {
    if (scale === "metric") {
      units = "C";
    } else if (scale === "imperial") {
      units = "F";
    } else {
      units = "K";
    }
  }

  return (
    <>
      {current.weather !== undefined ? (
        <Card
          className="mt-5"
          style={{
            width: "12rem",
            margin: "auto",
            background: "rgb(255, 255, 255, 0.6)",
            color: "black",
          }}
        >
          <Card.Body>
            <Card.Title className="mt-2">
              Current
              {/* {cityName} | Current */}
            </Card.Title>
            <img
              src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
              alt={`${current.weather}`}
            />
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2em",
                listStyle: "none",
              }}
            >
              {current.main.temp} ° {units}
            </p>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                showFive(!five);
              }}
            >
              {five ? "Hide Five Day" : "Five Day Forecast"}
            </Button>
            <div className="mt-2">
              {five ? (
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    showHourly(!hourly);
                  }}
                >
                  {hourly ? "Hide Hours" : "Hourly"}
                </Button>
              ) : (
                <></>
              )}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
      {five ? (
        Object.entries(highLow).map((day, i) => (
          <Card
            key={day[0]}
            className="mt-5"
            style={{
              width: "12rem",
              margin: "auto",
              background: "rgb(255, 255, 255, 0.6)",
              color: "black",
            }}
          >
            {" "}
            <Card.Body>
              <Card.Title className="mt-2">
                {day[1].month} {day[0]}
                {/* {cityName} | {day[1].month} {day[0]} */}
              </Card.Title>
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1.2em",
                }}
              >
                {Math.min.apply(Math, day[1].temps)} -{" "}
                {Math.max.apply(Math, day[1].temps)} ° {units}
              </p>

              {hourly ? (
                Object.entries(day[1].icons).map((icon, i) => (
                  <p key={i}>
                    {icon[0]}:00
                    <img
                      key={i}
                      src={`http://openweathermap.org/img/wn/${icon[1]}.png`}
                      alt="icon"
                    />
                    {day[1].temps[i]} ° {units}
                  </p>
                ))
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

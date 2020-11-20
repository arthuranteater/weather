import React from "react";
import Button from "react-bootstrap/Button";

export default class motherEarth extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.WE) {
      const { WE } = this.props;
      const earth = new WE.map(this._container);
      WE.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(earth);
      earth.setView([46.8011, 8.2266], 2);
      var before = null;
      let spin = true;

      function animate(now) {
        if (!spin) {
          return;
        }
        var c = earth.getPosition();
        var elapsed = before ? now - before : 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1 * (elapsed / 30)]);
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }
  }

  render() {
    return (
      <div>
        {/* <Button>Play</Button> */}
        <div
          style={{ maxHeight: "400px", width: "auto", marginTop: "1rem" }}
          ref={(r) => (this._container = r)}
        />
      </div>
    );
  }
}

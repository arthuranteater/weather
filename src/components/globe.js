import React from "react";

export default class motherEarth extends React.Component {
  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    console.log("props", this.props);
    if (this.props.WE) {
      console.log("globe loaded, building globe");
      const { WE } = this.props;
      const earth = new WE.map(this._container);
      WE.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(earth);
      earth.setView([46.8011, 8.2266], 2);
      console.log("earth", earth);
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
      <div
        style={{ maxHeight: "400px", width: "auto", marginTop: "1rem" }}
        ref={(r) => (this._container = r)}
      />
    );
  }
}

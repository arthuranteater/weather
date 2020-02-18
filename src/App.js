import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from './components/layout'
import Nav from 'react-bootstrap/Nav'

function App() {
  return (
    <div className="App">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Whats the Weather In</Nav.Link>
        </Nav.Item>
      </Nav>
      <Layout />
    </div>
  );
}

export default App;

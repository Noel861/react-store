import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RiAddBoxLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div id="nav" className="p-3">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start mb-2 mb-md-0">
            <Link to="/" className="Link">
              <p className="store-title">Product Store</p>
              <FaCartShopping id="cart1" />
            </Link>
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end">
            <Link to="/create">
              <button className="button1 me-2">
                <RiAddBoxLine />
              </button>
            </Link>
            <button className="button2" onClick={toggleDarkMode}>
              {darkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Navbar;

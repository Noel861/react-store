import React, { useEffect, useState } from 'react';
import { PiSmileySad } from "react-icons/pi";
import { MdRocketLaunch } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaTrash, FaPen } from "react-icons/fa";

const Homepage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedImage, setEditedImage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (pid) => {
    await deleteProduct(pid);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedImage(product.image);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    const updatedProduct = {
      ...selectedProduct,
      name: editedName,
      price: editedPrice,
      image: editedImage,
    };

    await updateProduct(selectedProduct._id, updatedProduct);
    setShowModal(false);
  };

  return (
    <div>
      <div id='home'>
        <p>Current Products <MdRocketLaunch id='home1' size={50} /></p>
      </div>

      <Container className="my-4">
        {products.length === 0 ? (
          <div className='pro text-center my-5'>
            <p>No Products found <PiSmileySad className='sad' size={25} /></p>
            <Link to="/create" className='link'>
              <h6>Create A Product</h6>
            </Link>
          </div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="Card">
                  <Card.Img
                    className="product-card-img"
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{
                      height: '220px',
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-truncate">{product.name}</Card.Title>
                      <Card.Text className="fw-bold">${product.price}</Card.Text>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <Button className='pen' variant="warning" onClick={() => handleEditClick(product)}>
                        <FaPen className='pen1' />
                      </Button>
                      <Button className='del' variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                        <FaTrash className='del1' />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control value={editedName} onChange={(e) => setEditedName(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={editedImage} onChange={(e) => setEditedImage(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className='button'>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges} className='button'>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Homepage;

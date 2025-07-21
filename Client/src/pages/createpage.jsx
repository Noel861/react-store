import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useProductStore } from '../store/product';


function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // ✅ Hook must be called at the top level
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const newProduct = {
      name: productName,
      price,
      imageUrl,
    };

    const { success, message } = await createProduct(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);

    // Optionally reset the form
    setProductName('');
    setPrice('');
    setImageUrl('');
  };
  

  return (
    <div>
      <Container className="my-5">
        <h1 className="text-center mb-4 h1">Create New Product</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="p-4 custom-card">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>

                <Button className="submit w-100" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProductForm;

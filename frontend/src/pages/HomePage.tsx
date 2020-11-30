/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Card, } from 'react-bootstrap';
import { listProducts } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

interface ProductI { 
  _id: any; 
  image?: string; 
  name?: string; 
  rating?: number; 
  price?: number; 
}

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: RootStateOrAny) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Container>
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : (
          <>
            <Row>
              {products && products.map((product: ProductI) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Card className="my-3 p-3 rounded">
                    <Link to={`/product/${product._id}`}>
                      <Card.Img src={product.image} variant="top" />
                    </Link>

                    <Card.Body>
                      <Link to={`/product/${product._id}`}>
                        <Card.Title as="div">
                          {product.name}
                        </Card.Title>
                      </Link>

                      <Card.Text as="div">
                        <Rating value={product.rating} text="Rating" />
                      </Card.Text>

                      <Card.Text as="h3">
                        $
                        {product.price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
    </Container>
  );
};

export default HomePage;

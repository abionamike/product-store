/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Col, Row, Image, ListGroup, Container, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductDetails, deleteProduct, listProducts } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

// eslint-disable-next-line react/prop-types
const ProductDetailsPage = ({ history, match }: any) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin);

  const productDetails = useSelector((state: RootStateOrAny) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const handleUpdateProduct = () => {
    history.push(`/admin/products/${product._id}/update`);
  };

  const handleDeleteProduct = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete '${product.name}'?`)) {
      dispatch(deleteProduct(product._id));
      history.push('/');
      dispatch(listProducts());
    }
  };

  return (
    <Container>
      <Row className="align-items-center mb-3">
        {userInfo && userInfo.isAdmin
                    && (
                    <Col className="text-right">
                      <Button className="my-3 btn-lg mr-3" onClick={handleUpdateProduct}>
                        <i className="fas fa-plus" />
                        {' '}
                        Update Product
                      </Button>
                      <Button className="my-3 btn-lg btn-danger" onClick={handleDeleteProduct}>
                        <i className="fas fa-plus" />
                        {' '}
                        Delete Product
                      </Button>
                    </Col>
                    )}
      </Row>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : (
          <>
            <Row>
              <Col md={6}>
                <Image src={`/${product.image}`} alt={product.name} fluid />
              </Col>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.rating} rating`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: $
                    {product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Category:
                    {' '}
                    {product.category}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    {' '}
                    {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
    </Container>
  );
};

export default ProductDetailsPage;

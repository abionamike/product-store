/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table, Button, Row, Col, Container,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteProduct } from '../actions/productAction';

const ProductsListPage = ({ history }: any) => {
  const dispatch = useDispatch();

  const productList = useSelector((state: RootStateOrAny) => state.productList);
  const { loading, products, error } = productList;

  const productDelete = useSelector((state: RootStateOrAny) => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const userLogin = useSelector((state: RootStateOrAny) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.isAdmin) {
        history.push('/');
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id: any) => {
    // eslint-disable-next-line no-shadow
    const product = products.find((product: { _id: any; }) => product._id === id);
    if (window.confirm(`Are you sure you want to delete '${product.name}'?`)) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    history.push('/admin/products/create');
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" />
            {' '}
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <>
          <Table striped bordered hover responsive className="table-sm mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product: { _id: any; name: React.ReactNode; price: React.ReactNode; category: React.ReactNode; brand: React.ReactNode; }) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    $
                    {product.price}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ProductsListPage;

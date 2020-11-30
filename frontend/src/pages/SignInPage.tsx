import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  Form, Button, Card, Col, Row,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';

const SignInPage = ({ history }: any) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state: RootStateOrAny) => state.userLogin);

  const { loading, error } = userLogin;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(login(email, password));
    history.push('/');
  };
  return (
    <FormContainer>
      <Card>
        <Card.Body>
          <h2>Sign In</h2>
          <hr style={{ marginTop: 0 }} />
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer?
              <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default SignInPage;

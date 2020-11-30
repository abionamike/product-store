import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  Form, Button, Card, Row, Col,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import { listProducts } from '../actions/productAction';

const RegisterPage = ({ history }: any) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const userLogin = useSelector((state: RootStateOrAny) => state.userLogin);

  const { loading, error } = userLogin;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(name, email, password));
      history.push('/');
      dispatch(listProducts());
    }
  };

  return (
    <FormContainer>
      <Card style={{ width: '28rem' }}>
        <Card.Body>
          <h3>Sign Up</h3>
          <hr style={{ marginTop: 0 }} />
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account?
              <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default RegisterPage;

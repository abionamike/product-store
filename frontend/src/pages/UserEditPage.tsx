import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser, listUsers } from '../actions/userActions';

const UserEditPage = ({ match, history }: any) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootStateOrAny) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state: RootStateOrAny) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate } = userUpdate;

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updateUser(user._id, { name, email, isAdmin }));
    history.push('/admin/userslist');
    dispatch(listUsers());
  };

  return (
    <>
      <FormContainer>
        <Link to="/admin/userslist" className="btn btn-light my-3">
          Go Back
        </Link>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setIsAdmin(e.target.checked)} />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;

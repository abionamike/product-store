/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container } from 'react-bootstrap';
import Message from '../components/Message';
import { deleteUser, listUsers } from '../actions/userActions';

const UserListScreen = ({ history }: any) => {
  const dispatch = useDispatch();

  const userList = useSelector((state: RootStateOrAny) => state.userList);
  const { users, error } = userList;

  const userLogin = useSelector((state: RootStateOrAny) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state: RootStateOrAny) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        dispatch(listUsers());
      } else {
        history.push('/');
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id: any) => {
    const user = users.find((user: { _id: any; }) => user._id === id);
    if (window.confirm(`Are you sure you want to delete '${user.name}'?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container>
      <h1>Users</h1>
      {error ? <Message variant="danger">{error}</Message> : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <tr />
            </tr>
          </thead>
          <tbody>
            {users && users.map((user: { _id: any; name: React.ReactNode; email: React.ReactNode; isAdmin: any; }) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (<i className="fas fa-check" style={{ color: 'green' }} />) : (<i className="fas fa-check" style={{ color: 'red' }} />)}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;

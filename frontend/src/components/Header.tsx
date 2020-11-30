import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  Navbar, Nav, Container, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootStateOrAny) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: '35px', backgroundColor: '#29323c' }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Product-Store</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/products/create">
                  <NavDropdown.Item>Create Product</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/">
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link> Sign In</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userslist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productslist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/products/create">
                  <NavDropdown.Item>Create Product</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

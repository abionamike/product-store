import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const FormContainer = ({ children }: any) => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default FormContainer;

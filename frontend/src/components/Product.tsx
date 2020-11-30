/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

type Props = {
  product: {
    image: string,
    _id: any,
    name: string,
    rating: number,
    price: number,
  },
}

const Product = ({ product }: Props) => (
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
);

export default Product;

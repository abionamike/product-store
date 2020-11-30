/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, updateProduct } from '../actions/productAction';

// eslint-disable-next-line react/prop-types
const ProductDetailsUpdatePage = ({ match, history }: any) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state: RootStateOrAny) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setRating(product.rating);
    setImage(product.image);
    setCategory(product.category);
    setDescription(product.description);
  }, [product]);

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data.filename);
      setUploading(false);
    // eslint-disable-next-line no-shadow
    } catch (error) {
      setUploading(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(updateProduct({
      id: product._id, name, price, image, rating, category, description,
    }));
    history.push(`/product/${match.params.id}`);
    dispatch(listProductDetails(match.params.id));
  };

  return (
    <FormContainer>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : (
          <Card>
            <Card.Body>
              <h3>Update Product</h3>
              <hr style={{ marginTop: 0 }} />
              <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter roduct name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPrice(parseInt(e.target.value))} />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.File id="image-file" label="Upload image" onChange={uploadFileHandler} />
                  {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control type="number" placeholder="Enter rating" value={rating} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setRating(parseInt(e.target.value))} />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>category</Form.Label>
                  <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
    </FormContainer>
  );
};

export default ProductDetailsUpdatePage;

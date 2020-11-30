/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  variant: string,
  children: string,
}

// eslint-disable-next-line react/prop-types
const Message = ({ variant, children }:Props) => (
  <Alert variant={variant}>
    {children}
  </Alert>
);

Message.defaultProps = {
  variant: 'info',
};

export default Message;

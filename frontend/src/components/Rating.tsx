/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import React from 'react';

type Props = {
  value: number,
  text: string,
  color: string,
}

// eslint-disable-next-line react/prop-types
const Rating = ({ value, text, color }: Props) => (
  <div className="rating mb-3">
    <span>{ text && text }</span>
    <span>
      <i style={{ color }} className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
    </span>
    <span>
      <i style={{ color }} className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
    </span>
    <span>
      <i style={{ color }} className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
    </span>
    <span>
      <i style={{ color }} className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
    </span>
    <span>
      <i style={{ color }} className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} />
    </span>
  </div>
);

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;

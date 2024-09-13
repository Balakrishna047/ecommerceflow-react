// src/components/ProductItemDetailsWrapper/index.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductItemDetails from '../ProductItemDetails'; // Ensure this path is correct

const ProductItemDetailsWrapper = () => {
  const { id } = useParams(); // Extract product ID from route parameters

  return <ProductItemDetails id={id} />;
};

export default ProductItemDetailsWrapper;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthPage } from './App';

export default function Root(props) {
  return (
    <BrowserRouter>
      <AuthPage />
    </BrowserRouter>
  );
}

import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App/App';

describe('Root component', () => {
  it('should be in the document', () => {
    const { getByText } = render(<App name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});

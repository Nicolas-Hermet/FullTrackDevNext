import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../app/(default)/page';
import { act } from 'react';

describe('Home page', () => {
  it('renders PageIllustration background', () => {
    act(() => {
      render(<Page />);
    });
    // expect PageIllustration to be in the document
    const pageIllustration = screen.getByTestId('page-illustration');

    expect(pageIllustration).toBeInTheDocument();
  });
});

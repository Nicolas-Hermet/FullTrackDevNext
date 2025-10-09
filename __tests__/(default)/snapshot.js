import { render } from '@testing-library/react';
import Page from '../../app/(default)/page';

it('renders homepage unchanged', () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});

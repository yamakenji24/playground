import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  it('render', async () => {
    const onClickMock = vi.fn();

    const props = {
      onClick: onClickMock,
      title: 'button title',
    };
    render(<Button {...props} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('button title');
    expect(onClickMock).toBeCalled();
  });
});

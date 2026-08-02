import { fireEvent, render, screen } from '@testing-library/react';
import FeedbackToast from './feedback-toast';

describe('FeedbackToast', () => {
  it('renders the message and calls onClose when dismissed', () => {
    const onClose = vi.fn();

    render(<FeedbackToast message="Item removido" type="success" onClose={onClose} closeLabel="Fechar" />);

    expect(screen.getByText('Item removido')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /fechar/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

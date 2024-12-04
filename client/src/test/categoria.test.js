import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseProvider } from '../context/expenseContext';
import FormExpenses from '../components/dashboard/forms/FormExpenses';

describe('ExpenseForm', () => {
  test('debe llamar a onCreateExpense al enviar el formulario', () => {
    const mockOnCreateExpense = jest.fn();  // Cambiado de vi.fn() a jest.fn()

    render(
      <ExpenseProvider>
        <FormExpenses onCreateExpense={mockOnCreateExpense} />
      </ExpenseProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Título'), { target: { value: 'Egreso de prueba' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Descripción del egreso' } });
    fireEvent.change(screen.getByPlaceholderText('Monto'), { target: { value: '100000' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Inversión' } });

    fireEvent.click(screen.getByText('Crear Egreso'));

    expect(mockOnCreateExpense).toHaveBeenCalledWith({
      title: 'Egreso de prueba',
      description: 'Descripción del egreso',
      amount: '100000',
      category: 'Inversión',
    });
  });

  test('debe mostrar un alert si los campos obligatorios están vacíos', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});  // Cambiado de vi.spyOn a jest.spyOn
    const mockOnCreateExpense = jest.fn();  // Cambiado de vi.fn() a jest.fn()

    render(
      <ExpenseProvider>
        <FormExpenses onCreateExpense={mockOnCreateExpense} />
      </ExpenseProvider>
    );

    fireEvent.click(screen.getByText('Crear Egreso'));

    expect(mockAlert).toHaveBeenCalledWith('Los campos son obligatorios');
    expect(mockOnCreateExpense).not.toHaveBeenCalled();
  });
});

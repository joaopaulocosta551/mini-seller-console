import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeadsTable } from '../../components/ui/LeadsTable';

describe('LeadsTable Component', () => {
  const mockLeads = [
    {
      id: 1,
      name: 'John Doe',
      company: 'ABC Corp',
      email: 'john@example.com',
      source: 'Website',
      score: 85,
      status: 'Qualified' as const
    },
    {
      id: 2,
      name: 'Jane Smith',
      company: 'XYZ Inc',
      email: 'jane@example.com',
      source: 'Referral',
      score: 70,
      status: 'New' as const
    }
  ];
  
  const mockOnLeadSelect = jest.fn();

  test('renders loading state correctly', () => {
    render(<LeadsTable leads={[]} isLoading={true} error={null} onLeadSelect={mockOnLeadSelect} />);
    expect(screen.getByText(/loading leads/i)).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to load leads';
    render(<LeadsTable leads={[]} isLoading={false} error={errorMessage} onLeadSelect={mockOnLeadSelect} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    render(<LeadsTable leads={[]} isLoading={false} error={null} onLeadSelect={mockOnLeadSelect} />);
    expect(screen.getByText(/no leads found/i)).toBeInTheDocument();
  });

  test('renders leads correctly', () => {
    render(<LeadsTable leads={mockLeads} isLoading={false} error={null} onLeadSelect={mockOnLeadSelect} />);
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    
    // Check lead data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
    expect(screen.getByText('Qualified')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('XYZ Inc')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
  });

  test('calls onLeadSelect when a lead is clicked', () => {
    render(<LeadsTable leads={mockLeads} isLoading={false} error={null} onLeadSelect={mockOnLeadSelect} />);
    
    fireEvent.click(screen.getByText('John Doe'));
    expect(mockOnLeadSelect).toHaveBeenCalledWith(mockLeads[0]);
  });
});
import { renderHook, act } from '@testing-library/react';
import { useFilters } from '../../hooks/useFilters';

describe('useFilters Hook', () => {
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
    },
    {
      id: 3,
      name: 'Robert Johnson',
      company: 'DEF Ltd',
      email: 'robert@example.com',
      source: 'Conference',
      score: 90,
      status: 'Contacted' as const
    },
  ];

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('returns initial values correctly', () => {
    const { result } = renderHook(() => useFilters(mockLeads));
    
    expect(result.current.searchTerm).toBe('');
    expect(result.current.statusFilter).toBe('All');
    expect(result.current.filteredAndSortedLeads).toEqual(
      // Should be sorted by score in descending order
      [mockLeads[2], mockLeads[0], mockLeads[1]]
    );
  });

  test('filters by status correctly', () => {
    const { result } = renderHook(() => useFilters(mockLeads));
    
    act(() => {
      result.current.setStatusFilter('Qualified');
    });
    
    expect(result.current.statusFilter).toBe('Qualified');
    expect(result.current.filteredAndSortedLeads).toEqual([mockLeads[0]]);
  });

  test('searches by name correctly', () => {
    const { result } = renderHook(() => useFilters(mockLeads));
    
    act(() => {
      result.current.setSearchTerm('Jane');
    });
    
    expect(result.current.searchTerm).toBe('Jane');
    expect(result.current.filteredAndSortedLeads).toEqual([mockLeads[1]]);
  });

  test('searches by company correctly', () => {
    const { result } = renderHook(() => useFilters(mockLeads));
    
    act(() => {
      result.current.setSearchTerm('DEF');
    });
    
    expect(result.current.searchTerm).toBe('DEF');
    expect(result.current.filteredAndSortedLeads).toEqual([mockLeads[2]]);
  });

  test('combines filters correctly', () => {
    const { result } = renderHook(() => useFilters(mockLeads));
    
    act(() => {
      result.current.setStatusFilter('New');
      result.current.setSearchTerm('xyz');
    });
    
    expect(result.current.filteredAndSortedLeads).toEqual([mockLeads[1]]);
  });

  test('persists status filter to localStorage', () => {
    const { result } = renderHook(() => useFilters(mockLeads));
    
    act(() => {
      result.current.setStatusFilter('Contacted');
    });
    
    expect(localStorage.getItem('miniSellerConsoleStatusFilter')).toBe('Contacted');
    
    // Remount hook to test persistence
    const { result: newResult } = renderHook(() => useFilters(mockLeads));
    expect(newResult.current.statusFilter).toBe('Contacted');
  });
});
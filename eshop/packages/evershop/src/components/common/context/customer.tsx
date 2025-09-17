import { produce } from 'immer';
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import { _ } from '../../../lib/locale/translate/_.js';
import { CustomerAddressGraphql } from '../../../types/customerAddress.js';
import { useAppDispatch } from './app.js';

// Types
// Extend CustomerAddress to include isDefault flag and API endpoints
type ExtendedCustomerAddress = CustomerAddressGraphql & {
  addressId?: string | number;
  isDefault?: boolean;
  updateApi?: string;
  deleteApi?: string;
};

interface Customer {
  uuid: string;
  email: string;
  fullName: string;
  groupId: string;
  addresses: ExtendedCustomerAddress[];
  addAddressApi: string;
  [key: string]: any; // Allow additional customer properties
}

interface CustomerState {
  customer: Customer | undefined; // undefined for guest users
  isLoading: boolean;
}

type CustomerAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CUSTOMER'; payload: Customer | undefined }
  | { type: 'LOGOUT' };

// Initial state
const initialState: CustomerState = {
  customer: undefined,
  isLoading: false
};

// Reducer with Immer for immutable updates
const customerReducer = (
  state: CustomerState,
  action: CustomerAction
): CustomerState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_LOADING':
        draft.isLoading = action.payload;
        break;
      case 'SET_CUSTOMER':
        draft.customer = action.payload;
        draft.isLoading = false;
        break;
      case 'LOGOUT':
        draft.customer = undefined;
        draft.isLoading = false;
        break;
    }
  });
};

// Context types
interface CustomerContextValue extends CustomerState {}

interface CustomerDispatchContextValue {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setCustomer: (customer: Customer | undefined) => void;
  addAddress: (
    addressData: Omit<ExtendedCustomerAddress, 'id'>
  ) => Promise<ExtendedCustomerAddress>;
  updateAddress: (
    addressId: string | number,
    addressData: Partial<ExtendedCustomerAddress>
  ) => Promise<ExtendedCustomerAddress>;
  deleteAddress: (addressId: string | number) => Promise<void>;
}

// Contexts
const CustomerContext = createContext<CustomerContextValue | undefined>(
  undefined
);
const CustomerDispatchContext = createContext<
  CustomerDispatchContextValue | undefined
>(undefined);

// Provider props
interface CustomerProviderProps {
  children: ReactNode;
  loginAPI: string;
  logoutAPI: string;
  loginUrl: string; // Optional, used for redirect after login
  initialCustomer?: Customer; // Initial customer data if logged in
}

// Retry utility
const retry = async (
  fn: () => Promise<Response>,
  retries = 3,
  delay = 1000
): Promise<Response> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export function CustomerProvider({
  children,
  loginAPI,
  logoutAPI,
  loginUrl,
  initialCustomer
}: CustomerProviderProps) {
  const [state, dispatch] = useReducer(customerReducer, {
    ...initialState,
    customer: initialCustomer
  });

  const appDispatch = useAppDispatch();

  // Effect to update customer when initialCustomer prop changes
  useEffect(() => {
    // Compare by JSON string to handle object changes properly
    const currentCustomerStr = JSON.stringify(state.customer);
    const initialCustomerStr = JSON.stringify(initialCustomer);

    if (initialCustomerStr !== currentCustomerStr) {
      dispatch({ type: 'SET_CUSTOMER', payload: initialCustomer });
    }
  }, [initialCustomer]);

  // Helper function to get current URL with isAjax=true
  const getCurrentAjaxUrl = useCallback(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('ajax', 'true');
    return currentUrl.toString();
  }, []);

  // Login function
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const response = await retry(() =>
          fetch(loginAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
        );

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error?.message || _('Login failed'));
        }

        // Trigger page data refresh which will update customer via useEffect
        await appDispatch.fetchPageData(getCurrentAjaxUrl());

        return true;
      } catch (error) {
        dispatch({ type: 'SET_LOADING', payload: false });
        throw error;
      }
    },
    [loginAPI, appDispatch, getCurrentAjaxUrl]
  );

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await retry(() =>
        fetch(logoutAPI, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );

      // After successful logout, clear customer data locally
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      // Even if logout API fails, clear local customer data
      dispatch({ type: 'LOGOUT' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [logoutAPI]);

  // Set customer directly (for external updates)
  const setCustomer = useCallback((customer: Customer | undefined) => {
    dispatch({ type: 'SET_CUSTOMER', payload: customer });
  }, []);

  // Add address function
  const addAddress = useCallback(
    async (
      addressData: Omit<ExtendedCustomerAddress, 'id'>
    ): Promise<ExtendedCustomerAddress> => {
      if (!state.customer?.addAddressApi) {
        throw new Error(_('Add address API not available'));
      }

      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await retry(() =>
        fetch(state.customer!.addAddressApi!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(addressData)
        })
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || _('Failed to add address'));
      }

      if (json.error) {
        throw new Error(json.error.message || _('Failed to add address'));
      }

      // Sync with server to get fresh customer data including the new address
      await appDispatch.fetchPageData(getCurrentAjaxUrl());

      // Return the address from the API response for immediate use
      const newAddress = json.data?.address;
      if (!newAddress) {
        throw new Error(_('No address data received'));
      }

      return newAddress;
    },
    [state.customer, appDispatch, getCurrentAjaxUrl]
  );

  // Update address function
  const updateAddress = useCallback(
    async (
      addressId: string | number,
      addressData: Partial<ExtendedCustomerAddress>
    ): Promise<ExtendedCustomerAddress> => {
      const address = state.customer?.addresses?.find(
        (addr) => addr.addressId === addressId
      );
      if (!address?.updateApi) {
        throw new Error(_('Update address API not available'));
      }

      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await retry(() =>
        fetch(address.updateApi!, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(addressData)
        })
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || _('Failed to update address'));
      }

      if (json.error) {
        throw new Error(json.error.message || _('Failed to update address'));
      }

      // Sync with server to get fresh customer data including the updated address
      await appDispatch.fetchPageData(getCurrentAjaxUrl());

      // Return the address from the API response for immediate use
      const updatedAddress = json.data?.address;
      if (!updatedAddress) {
        throw new Error(_('No address data received'));
      }

      return updatedAddress;
    },
    [state.customer, appDispatch, getCurrentAjaxUrl]
  );

  // Delete address function
  const deleteAddress = useCallback(
    async (addressId: string | number): Promise<void> => {
      const address = state.customer?.addresses?.find(
        (addr) => addr.addressId === addressId
      );
      if (!address?.deleteApi) {
        throw new Error(_('Delete address API not available'));
      }

      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await retry(() =>
        fetch(address.deleteApi!, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || _('Failed to delete address'));
      }

      if (json.error) {
        throw new Error(json.error.message || _('Failed to delete address'));
      }

      // Sync with server to get fresh customer data with the address removed
      await appDispatch.fetchPageData(getCurrentAjaxUrl());
    },
    [state.customer, appDispatch, getCurrentAjaxUrl]
  );

  // Context values
  const contextValue = useMemo(
    (): CustomerContextValue => ({
      ...state
    }),
    [state]
  );

  const dispatchMethods = useMemo(
    (): CustomerDispatchContextValue => ({
      login,
      logout,
      setCustomer,
      addAddress,
      updateAddress,
      deleteAddress
    }),
    [login, logout, setCustomer, addAddress, updateAddress, deleteAddress]
  );

  return (
    <CustomerDispatchContext.Provider value={dispatchMethods}>
      <CustomerContext.Provider value={contextValue}>
        {children}
      </CustomerContext.Provider>
    </CustomerDispatchContext.Provider>
  );
}

// Custom hooks
export const useCustomer = (): CustomerContextValue => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

export const useCustomerDispatch = (): CustomerDispatchContextValue => {
  const context = useContext(CustomerDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCustomerDispatch must be used within a CustomerProvider'
    );
  }
  return context;
};

// Export types for consumers
export type { Customer, CustomerState, ExtendedCustomerAddress };

// src/components/ui/toast.tsx
import React from 'react';

const useToast = () => {
  return <div>Toast Component</div>;
};

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default useToast;
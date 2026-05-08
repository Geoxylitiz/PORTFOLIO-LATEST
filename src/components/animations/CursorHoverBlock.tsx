import React from 'react';
import { useCursor } from '../../contexts/CursorContext';
import { cn } from '../../lib/utils';

interface CursorHoverBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CursorHoverBlock: React.FC<CursorHoverBlockProps> = ({ children, className, ...props }) => {
  const { setCursorState } = useCursor();

  return (
    <div
      className={cn("cursor-none", className)}
      onMouseEnter={() => setCursorState('hover')}
      onMouseLeave={() => setCursorState('default')}
      {...props}
    >
      {children}
    </div>
  );
};

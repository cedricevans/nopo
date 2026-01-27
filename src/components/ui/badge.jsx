import React from 'react';

export const Badge = ({ children, className = '' }) => (
  <span
    className={[
      'inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold',
      'bg-white/3 text-white/90 border border-white/10',
      className,
    ].join(' ')}
  >
    {children}
  </span>
);

export default Badge;

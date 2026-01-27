import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={["rounded-xl border border-white/10 bg-[#071225] p-4 shadow-sm", className].join(' ')}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={["pb-2", className].join(' ')}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={["pt-0", className].join(' ')}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <div className={["text-lg font-semibold text-white", className].join(' ')}>{children}</div>
);

export default Card;

import Link from 'next/link';
import React from 'react';

const Button = ({
  children,
  type,
  onClick,
  href,
  className = '',
  otherProps,
}) => {
  const Component = href ? Link : 'button';
  const props = {
    ...otherProps,
    type,
    href,
    onClick,
    className,
  };

  return (
    <Component
      {...props}
      className="rounded-md bg-primary px-3 py-2 text-white"
    >
      {children}
    </Component>
  );
};

export default Button;

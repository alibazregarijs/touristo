import React from 'react';

const Layout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
};

export default Layout;

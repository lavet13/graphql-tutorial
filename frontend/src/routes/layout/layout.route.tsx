import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;

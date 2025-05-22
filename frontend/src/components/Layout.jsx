import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pt-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

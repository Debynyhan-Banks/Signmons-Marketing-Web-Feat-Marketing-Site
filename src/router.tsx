import Home from './pages/Home';
import Trust from './pages/Trust';

const Router = () => {
  const normalizedPath =
    window.location.pathname === '/'
      ? '/'
      : window.location.pathname.replace(/\/+$/, '');

  if (normalizedPath === '/trust') {
    return <Trust />;
  }

  return <Home />;
};

export default Router;

import Home from './pages/Home';
import Legal from './pages/Legal';
import Trust from './pages/Trust';

const Router = () => {
  const normalizedPath =
    window.location.pathname === '/'
      ? '/'
      : window.location.pathname.replace(/\/+$/, '');

  if (normalizedPath === '/trust') {
    return <Trust />;
  }

  if (normalizedPath === '/legal') {
    return <Legal />;
  }

  return <Home />;
};

export default Router;

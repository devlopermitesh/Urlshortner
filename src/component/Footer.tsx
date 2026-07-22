import { NavLink } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  const routes = [
    {
      path: '/',
      label: 'URL Shortener',
    },
    {
      path: '/about',
      label: 'About',
    },
    {
      path: '/contact',
      label: 'Contact',
    },
  ];

  return (
    <footer className="flex flex-col items-center justify-center bg-neutral-800 w-full h-32 text-white border-t-2 border-t-sky-600">
      <div className="text-center">
        <p>© {year} URL Shortener - Tool to shorten long links</p>
        <span>
          Powered by <span className="font-semibold text-sky-400">Mitesh</span>
        </span>
      </div>

      <div className="flex gap-6 mt-4">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive ? 'text-sky-400 font-semibold' : 'text-white hover:text-sky-300'
              }`
            }
          >
            {route.label}
          </NavLink>
        ))}
      </div>
    </footer>
  );
};

export default Footer;

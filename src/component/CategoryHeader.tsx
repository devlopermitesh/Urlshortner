import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { api } from "../utils/api";

type Category = { _id: string; name: string };

export const CategoryHeader = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between py-4 md:hidden">
          <h2 className="text-lg font-semibold">Categories</h2>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-gray-100"
            aria-expanded={isOpen}
            aria-label="Toggle categories menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop  */}
        <ul className="hidden md:flex items-center gap-3 py-4 overflow-x-auto">
          <li>
            <Link
              to="/"
              className={`px-4 py-2 rounded-full transition ${
                location.pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All
            </Link>
          </li>

          {categories.map((category) => {
            const path = `/category/${category._id}`;

            return (
              <li key={category._id}>
                <Link
                  to={path}
                  className={`whitespace-nowrap px-4 py-2 rounded-full transition ${
                    location.pathname === path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="grid grid-cols-2 gap-3 pb-4 md:hidden">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg border p-3 text-center ${
                  location.pathname === "/"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50"
                }`}
              >
                All
              </Link>
            </li>

            {categories.map((category) => {
              const path = `/category/${category._id}`;

              return (
                <li key={category._id}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg border p-3 text-center ${
                      location.pathname === path
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};

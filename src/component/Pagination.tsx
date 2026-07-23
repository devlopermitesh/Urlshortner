import { ChevronLeft, ChevronRight } from "lucide-react";
type PaginationProps = { totalItems: number; itemsPerPage?: number; currentPage: number; onPageChange: (page: number) => void };

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="rounded-lg border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          aria-label={`Page ${i + 1}`}
          aria-current={currentPage === i + 1 ? "page" : undefined}
          className={`h-10 w-10 rounded-lg border transition ${
            currentPage === i + 1
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="rounded-lg border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;

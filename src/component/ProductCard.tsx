import { twMerge } from "tailwind-merge";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price?: number;
  className?: string;
}

const ProductCard = ({
  image,
  title,
  description,
  price,
  className,
}: ProductCardProps) => {
  return (
    <div
      className={twMerge(
        "group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=No+Image'; }}
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
          {title}
        </h3>

        <p className="line-clamp-2 text-sm text-gray-500">
          {description}
        </p>

        {price != null && (
          <p className="pt-1 text-lg font-bold text-blue-600">
            ${price.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
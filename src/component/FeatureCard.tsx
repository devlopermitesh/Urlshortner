import type { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
interface FeatureCardProps {
  Icon: ElementType;
  title: string;
  size?: number;
  description: string;
  className?: string;
}
const FeatureCard = ({ Icon, title, description, size = 28, className }: FeatureCardProps) => {
  return (
    <div
      className={twMerge('flex flex-col items-center justify-center w-full h-auto p-4', className)}
    >
      <Icon size={size} />
      <div className="flex flex-col items-center  w-full">
        <h2 className="text-xl font-semibold ">{title}</h2>
        <p className="line-clamp-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};
export default FeatureCard;

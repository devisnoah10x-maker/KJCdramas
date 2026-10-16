import { Link } from 'react-router-dom';
import { cn } from '../../utils/format';

interface LogoProps {
  className?: string;
  to?: string;
}

export function Logo({
  className,
  to = '/'
}: LogoProps) {
  return (
    <Link
      to={to}
      className={cn('inline-flex items-center', className)}
      aria-label="KJCDramas — home"
    >
      <img
        src="/09673b76-0c44-436f-acaa-556b295bf667.jpg"
        alt="KJCDramas"
        width={480}
        height={120}
        decoding="async"
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
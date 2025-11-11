import Link from 'next/link';
import { HEADER_NAV } from '../../config/navigation';
import Bell from '@/shared/asset/svg/Bell';

export default function Header() {
  return (
    <header className="flex h-[70px] w-full items-center justify-center border-b border-gray-100 bg-white">
      <div className="flex w-150 flex-shrink-0 flex-grow-0 items-center justify-between px-3 text-center">
        <Link href="/main" className="text-main-800 text-xl font-bold">
          GSMC
        </Link>

        <nav className="flex items-center gap-8 text-sm">
          {HEADER_NAV.map((item) => (
            <Link key={item.path} className="text-gray-500" href={item.path}>
              {item.label}
            </Link>
          ))}
          <button className="font-semibold text-gray-900">로그아웃</button>
        </nav>

        <Bell />
      </div>
    </header>
  );
}

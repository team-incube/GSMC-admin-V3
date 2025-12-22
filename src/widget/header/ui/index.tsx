"use client"

import { useState } from 'react';

import Link from 'next/link';

import { signout } from '@/feature/google-auth/lib/signout';
import Bell from '@/shared/asset/svg/Bell';
import AlertsModal from '@/widget/main/ui/AlertsModal';

import { HEADER_NAV } from '../config/navigation';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex h-[70px] w-full items-center justify-center border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex w-225 flex-shrink-0 flex-grow-0 items-center justify-between px-3 text-center">
          <Link href="/member" className="text-main-800 text-xl font-bold">
            GSMC
          </Link>

          <nav className="flex mx-17 w-full justify-between items-center gap-8 text-sm">
            {HEADER_NAV.map((item) => (
              <Link key={item.path} className="text-gray-500" href={item.path}>
                {item.label}
              </Link>
            ))}
            <button type="button" className="font-semibold cursor-pointer text-gray-900" onClick={signout}>로그아웃</button>
          </nav>

          <Bell onClick={() => setIsModalOpen(((prev) => !prev))} className="cursor-pointer" />
        </div>
      </header>
      {isModalOpen ? <div className="fixed top-[70px] left-1/2 -translate-x-1/2 w-150 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <AlertsModal />
        </div>
      </div> : null}
    </>
  );
}

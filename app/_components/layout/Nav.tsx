'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Nav = () => {
  const [isActive, setIsActive] = useState<string>('');

  const onHandleClick = (menuName: string) => {
    setIsActive(menuName);
  };

  return (
    <nav className="mt-28 sticky top-20 bg-white shadow-lg shadow-black-500/50 z-50">
      <ul className="flex items-center justify-center gap-10 text-lg whitespace-nowrap font-semibold pt-5 pb-4 ">
        <li
          onClick={() => onHandleClick('community')}
          className={`hover:text-primaryColor ${isActive === 'community' ? 'active' : ''}`}
        >
          <Link href="/community">커뮤니티</Link>
        </li>
        <li
          onClick={() => onHandleClick('trade')}
          className={`hover:text-primaryColor ${isActive === 'trade' ? 'active' : ''}`}
        >
          <Link href="/trade">중고거래</Link>
        </li>
        <li
          onClick={() => onHandleClick('meal')}
          className={`hover:text-primaryColor ${isActive === 'meal' ? 'active' : ''}`}
        >
          <Link href="/meal">식당/카페</Link>
        </li>
        <li
          onClick={() => onHandleClick('medical')}
          className={`hover:text-primaryColor ${isActive === 'medical' ? 'active' : ''}`}
        >
          <Link href="/medical">병원/약국</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

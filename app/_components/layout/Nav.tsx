import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav className="pt-28 pb-5">
      <ul className="flex items-center justify-center gap-10 text-lg whitespace-nowrap font-semibold">
        <li className="hover:text-primaryColor">
          <Link href="/">커뮤니티</Link>
        </li>
        <li className="hover:text-primaryColor">
          <Link href="/">중고거래</Link>
        </li>
        <li className="hover:text-primaryColor">
          <Link href="/">식당/카페</Link>
        </li>
        <li className="hover:text-primaryColor">
          <Link href="/">병원/약국</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

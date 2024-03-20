import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav className="mt-28 sticky top-20 bg-white shadow-lg shadow-black-500/50">
      <ul className="flex items-center justify-center gap-10 text-lg whitespace-nowrap font-semibold pt-5 pb-4 ">
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

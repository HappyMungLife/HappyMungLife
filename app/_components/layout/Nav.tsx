import Link from 'next/link';
import React from 'react';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">유저 커뮤니티</Link>
        </li>
        <li>
          <Link href="/">중고거래</Link>
        </li>
        <li>
          <Link href="/">식당/카페</Link>
        </li>
        <li>
          <Link href="/">병원/약국</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

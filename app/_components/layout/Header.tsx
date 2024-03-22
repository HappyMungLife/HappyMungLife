import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center size-full px-5 py-10 fixed right-0 left-0 top-0 h-0 bg-secondaryColor z-50">
      <h1>
        <Link href="/" className="flex items-center gap-1">
          <Image className="w-40" src={Logo} alt="logo" />
        </Link>
      </h1>
      <div>
        <Link href="/" className="hover:text-primaryColor m-3">
          로그인
        </Link>
        <Link href="/" className="hover:text-primaryColor">
          회원가입
        </Link>
      </div>
    </header>
  );
}

import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import Link from 'next/link';
import { createClientJs } from '@/app/_utils/supabase/clientJs';

export default function Header() {
  const supabase = createClientJs();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <header className="flex justify-between items-center size-full px-5 py-10 fixed right-0 left-0 top-0 h-0 bg-secondaryColor z-50">
      <h1>
        <Link href="/" className="flex items-center gap-1">
          <Image className="w-40" src={Logo} alt="logo" />
        </Link>
      </h1>
      <div>
        <Link href="/sign/signIn" className="hover:text-primaryColor m-3">
          로그인
        </Link>
        {/* <div className="hover:text-primaryColor m-3">
          <button onClick={handleSignOut}>로그아웃</button>
        </div> */}
        <Link href="/sign/signUp" className="hover:text-primaryColor">
          회원가입
        </Link>
      </div>
    </header>
  );
}

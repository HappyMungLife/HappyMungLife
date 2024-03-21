import { createClient } from '@/app/_utils/supabase/server';
import Image from 'next/image';
import Visual from '@/public/images/visual_1.png';

export default async function Index() {
  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const isSupabaseConnected = canInitSupabaseClient();

  return (
    <main>
      <section>
        <ul>
          <li>
            <Image src={Visual} alt="visual" className="size-full" />
          </li>
        </ul>
      </section>
      <section className="flex text-center pt-10 gap-10 px-10">
        <div className="w-2/4">
          <h2 className="text-lg font-semibold">커뮤니티</h2>
          <div className="bg-secondaryColor rounded-xl mt-3 mb-10 p-10">커뮤니티 내용</div>
        </div>
        <div className="w-2/4">
          <h2 className="text-lg font-semibold">중고거래</h2>
          <div className="bg-secondaryColor rounded-xl mt-3 mb-10 p-10">
         중고거래 내용
          </div>
        </div>
      </section>
    </main>
  );
}

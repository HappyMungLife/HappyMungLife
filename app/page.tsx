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
    <section>
      <ul>
        <li>
          <Image src={Visual} alt="visual" />
        </li>
      </ul>
    </section>
  );
}

import LoginTemplate from '../components/login-template';
import { auth } from '../../auth';
import Link from 'next/link';
import { Play } from 'lucide-react';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LoginTemplate />;
  }
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 bg-black p-8 pb-20 font-[family-name:var(--font-geist-sans)] text-white/80 sm:p-20">
      <p className="text-6xl font-bold tracking-widest">
        Dev<span className="text-primary">T</span>ools
      </p>
      <ul className="list-decimal transition-all duration-500">
        <li className="flex items-center space-x-1 hover:text-primary">
          <Play size={15} />
          <Link href={'/github-delete-repos'}>Github Delete Repos</Link>
        </li>
      </ul>
    </div>
  );
}

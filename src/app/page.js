import { signIn, signOut } from '../../auth';
import { auth } from '../../auth';

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      Others are coming soon
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
    </div>
  );
}

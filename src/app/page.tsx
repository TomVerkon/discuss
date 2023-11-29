import * as actions from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/profile';
import { Button } from '@nextui-org/button';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={actions.signIn}>
        <Button type='submit'>Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type='submit'>Sign Out</Button>
      </form>

      <div>
        {session?.user ? `${session.user.name} is Signed In` : 'Signed Out'}
      </div>
      <Profile />
    </div>
  );
}

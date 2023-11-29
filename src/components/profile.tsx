'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();
  if (session.data?.user) {
    return <div>${session.data.user.email} is Signed In</div>;
  } else {
    return <div>Signed Out</div>;
  }
  return <div>profile</div>;
}

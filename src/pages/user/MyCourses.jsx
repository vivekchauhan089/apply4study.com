import { useEffect, useState } from 'react';
import { auth } from '../../firebase';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Your enrolled courses will appear here.</p>
    </div>
  );
}
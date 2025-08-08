'use client';

import Button from '@/components/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Button onClick={() => alert('Clicked!')}>Click me</Button>
    </main>
  );
}


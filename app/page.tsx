'use client';

import { useState } from 'react';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <p> Use the api/createSchema endpoint first</p>
      <p>
        {' '}
        Use the api/writeRecord endpoint after / curl -X POST
        http://localhost:3000/api/writeRecord{' '}
      </p>
    </main>
  );
}

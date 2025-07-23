'use client';

import { useState } from 'react';

export default function Home() {
  const [isCreatingSchema, setIsCreatingSchema] = useState(false);
  const [isWritingRecord, setIsWritingRecord] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateSchema = async () => {
    setIsCreatingSchema(true);
    setMessage('');

    try {
      const response = await fetch('/api/createSchema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Schema created successfully!');
      } else {
        setMessage(`❌ Error: ${data.error || 'Failed to create schema'}`);
      }
    } catch (error) {
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsCreatingSchema(false);
    }
  };

  const handleWriteRecord = async () => {
    setIsWritingRecord(true);
    setMessage('');

    try {
      const response = await fetch('/api/writeRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Record written successfully!');
      } else {
        setMessage(`❌ Error: ${data.error || 'Failed to write record'}`);
      }
    } catch (error) {
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsWritingRecord(false);
    }
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center'>
          Nillion SecretVaults Demo
        </h1>

        <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Step 1: Create the schema first
              </p>
              <button
                onClick={handleCreateSchema}
                disabled={isCreatingSchema}
                className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200'
              >
                {isCreatingSchema ? 'Creating Schema...' : 'Create Schema'}
              </button>
            </div>

            <div>
              <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Step 2: Write a record after creating schema
              </p>
              <button
                onClick={handleWriteRecord}
                disabled={isWritingRecord}
                className='w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200'
              >
                {isWritingRecord ? 'Writing Record...' : 'Write Record'}
              </button>
            </div>
          </div>

          {message && (
            <div className='mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md'>
              <p className='text-sm text-gray-800 dark:text-gray-200'>
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

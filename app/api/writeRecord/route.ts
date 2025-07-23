import { setupClient } from '@/app/utils/setupClient';
import { SecretVaultBuilderClient } from '@nillion/secretvaults';
import { NextResponse } from 'next/server';

const config = {
  NILCHAIN_URL: process.env.NILCHAIN_URL!,
  NILAUTH_URL: process.env.NILAUTH_URL!,
  NILDB_NODES: process.env.NILDB_NODES!.split(','),
  NILLION_API_KEY: process.env.NILLION_API_KEY!,
};

if (!config.NILLION_API_KEY) {
  console.error('❌ Please set NILLION_API_KEY in your .env file');
  process.exit(1);
}

async function step2_addRecords(
  builder: SecretVaultBuilderClient,
  collectionId: string
): Promise<any> {
  console.log('📝 STEP 2: Add Records');
  console.log('======================');

  const result = await builder.createStandardData({
    body: {
      collection: process.env.USER_COLLECTION_ID!,
      data: [
        {
          _id: '76752f09-bafb-4cc8-a2b1-6450a6d9365c',
          provider: 'email',
          created_at: '2025-07-21T07:49:21.247Z',
        },
      ],
    },
  });

  console.log('RESULT:', result);
  console.log('✅ Step 2 Complete!\n');

  return;
}

export async function POST() {
  try {
    const builder = await setupClient();
    console.log('🔑 Builder:', builder);
    const writeResult = await step2_addRecords(
      builder,
      process.env.USER_COLLECTION_ID!
    );
    console.log('WRITE RESULT:', writeResult);
    return NextResponse.json(
      { message: 'success', foo: 'bar' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Script failed:', error);
    return NextResponse.json(
      { error: 'Failed to write records' },
      { status: 500 }
    );
  }
}

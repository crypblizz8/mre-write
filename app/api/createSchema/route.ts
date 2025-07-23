import { setupClient } from '@/app/utils/setupClient';
import { SecretVaultBuilderClient } from '@nillion/secretvaults';
import { NextResponse } from 'next/server';

export const USER_SCHEMA = {
  _id: process.env.USER_COLLECTION_ID as string,
  type: 'standard' as const,
  name: 'USER_NILGPT_SANDBOX_V1',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        _id: { type: 'string', format: 'uuid', coerce: true },
        provider: { type: 'string' },
        created_at: { type: 'string' },
      },
      required: ['_id', 'provider', 'created_at'],
    },
  },
};

async function step1_createCollection(
  builder: SecretVaultBuilderClient
): Promise<string> {
  console.log('📁 STEP 1: Create Collection');
  console.log('============================');
  USER_SCHEMA;
  await builder.createCollection(USER_SCHEMA);
  console.log('✅ Step 1 Complete!\n');

  return process.env.USER_COLLECTION_ID!;
}

export async function POST() {
  try {
    const builder = await setupClient();
    console.log('🔑 Builder:', builder);
    const collectionId = await step1_createCollection(builder);
    console.log('CREATED COLLECTION:collectionId', collectionId);
    return NextResponse.json(
      { message: 'success', collectionId },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Script failed:', error);
    return NextResponse.json(
      { error: 'Failed to create schema' },
      { status: 500 }
    );
  }
}

import { Keypair } from '@nillion/nuc';
import { SecretVaultBuilderClient } from '@nillion/secretvaults';

const config = {
  NILCHAIN_URL: process.env.NILCHAIN_URL!,
  NILAUTH_URL: process.env.NILAUTH_URL!,
  NILDB_NODES: process.env.NILDB_NODES!.split(','),
  NILLION_API_KEY: process.env.NILLION_API_KEY!,
};

// Setup the client
export async function setupClient(): Promise<SecretVaultBuilderClient> {
  if (!config.NILLION_API_KEY) {
    console.error('❌ Please set NILLION_API_KEY in your .env file');
    process.exit(1);
  }

  console.log('🚀 Setting up Nillion SecretVault client...');

  const builderKeypair = Keypair.from(config.NILLION_API_KEY);
  console.log('🔑 Builder DID:', builderKeypair.toDid().toString());

  const builder = await SecretVaultBuilderClient.from({
    keypair: builderKeypair,
    urls: {
      chain: config.NILCHAIN_URL,
      auth: config.NILAUTH_URL,
      dbs: config.NILDB_NODES,
    },
    blindfold: {
      operation: 'store',
    },
  });

  await builder.refreshRootToken();
  console.log('✅ Client ready\n');

  return builder;
}

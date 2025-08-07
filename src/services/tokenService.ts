import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
  createSetAuthorityInstruction,
  AuthorityType,
  getMint,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from '@solana/spl-token';

// Payment wallet address
export const PAYMENT_WALLET = new PublicKey('543pQyP9nm3XYkUFDYKxCKUkWFeu1dud7eV5nexuvKgq');

// Metaplex Token Metadata Program ID
const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export interface TokenCreationParams {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  description?: string;
  logo?: File;
  creator?: string;
  website?: string;
  telegram?: string;
  twitter?: string;
  revokeFreeze: boolean;
  revokeMint: boolean;
  // Note: revokeUpdate removed - not applicable to SPL tokens
  revokeAll: boolean;
}

export interface TokenCreationResult {
  tokenAddress: string;
  transactionId: string;
  metadataAddress: string;
}

export class TokenService {
  private connection: Connection;

  constructor() {
    // Use devnet for testing
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }

  calculateTotalCost(params: TokenCreationParams): number {
    let cost = 0.07; // Base cost updated to 0.07 SOL
    if (params.revokeFreeze) cost += 0.01;
    if (params.revokeMint) cost += 0.01;
    // Note: revokeUpdate is not applicable to SPL tokens
    return cost;
  }

  async createToken(
    wallet: any, // Wallet adapter wallet
    params: TokenCreationParams
  ): Promise<TokenCreationResult> {
    try {
      console.log('=== TOKEN CREATION STARTED ===');
      console.log('Wallet publicKey:', wallet?.publicKey?.toString());
      console.log('Params:', params);

      if (!wallet.publicKey) {
        throw new Error('Wallet not connected');
      }

      if (!wallet.sendTransaction) {
        throw new Error('Wallet does not support sending transactions');
      }

      // Check wallet balance first
      console.log('Checking wallet balance...');
      const balance = await this.connection.getBalance(wallet.publicKey);
      console.log('Wallet balance:', balance / LAMPORTS_PER_SOL, 'SOL');
      
      if (balance === 0) {
        throw new Error('Wallet has no SOL balance. Please add some Devnet SOL from the faucet.');
      }

      // Calculate total cost
      const totalCost = this.calculateTotalCost(params);
      const totalLamports = Math.floor(totalCost * LAMPORTS_PER_SOL);
      console.log('Total cost:', totalCost, 'SOL (', totalLamports, 'lamports)');

      if (balance < totalLamports) {
        throw new Error(`Insufficient SOL balance. Need ${totalCost} SOL, but wallet has ${(balance / LAMPORTS_PER_SOL).toFixed(3)} SOL`);
      }

      // TRANSACTION 1: Payment only
      console.log('Creating payment transaction...');
      const paymentTransaction = new Transaction();
      paymentTransaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: PAYMENT_WALLET,
          lamports: totalLamports,
        })
      );

      // Get recent blockhash for payment transaction
      console.log('Getting recent blockhash...');
      const { blockhash } = await this.connection.getLatestBlockhash();
      paymentTransaction.recentBlockhash = blockhash;
      paymentTransaction.feePayer = wallet.publicKey;

      // Send payment
      console.log('Sending payment transaction...');
      const paymentSignature = await wallet.sendTransaction(paymentTransaction, this.connection);
      console.log('Payment signature:', paymentSignature);
      
      console.log('Confirming payment...');
      await this.connection.confirmTransaction(paymentSignature, 'confirmed');
      console.log('Payment confirmed!');

      // TRANSACTION 2: All token creation operations in ONE transaction
      console.log('Creating comprehensive token creation transaction...');
      const tokenCreationTransaction = new Transaction();

      // Create a keypair for the mint
      console.log('Creating mint keypair...');
      const mintKeypair = Keypair.generate();
      console.log('Mint address will be:', mintKeypair.publicKey.toString());

      // Calculate rent exemption for mint account
      console.log('Calculating rent exemption...');
      const mintRent = await this.connection.getMinimumBalanceForRentExemption(82);
      console.log('Mint rent:', mintRent, 'lamports');
      
      // Step 1: Create mint account
      tokenCreationTransaction.add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          lamports: mintRent,
          space: 82,
          programId: TOKEN_PROGRAM_ID,
        })
      );

      // Step 2: Initialize mint
      tokenCreationTransaction.add(
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          params.decimals,
          wallet.publicKey, // mint authority
          params.revokeFreeze ? null : wallet.publicKey, // freeze authority (null if revoking)
        )
      );

      // Step 3: Create associated token account
      const associatedTokenAddress = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey
      );
      console.log('Associated token address:', associatedTokenAddress.toString());

      tokenCreationTransaction.add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          associatedTokenAddress, // ata
          wallet.publicKey, // owner
          mintKeypair.publicKey // mint
        )
      );

      // Step 4: Mint tokens
      const mintAmount = params.supply * Math.pow(10, params.decimals);
      console.log('Mint amount:', mintAmount, 'tokens (with decimals)');
      
      tokenCreationTransaction.add(
        createMintToInstruction(
          mintKeypair.publicKey, // mint
          associatedTokenAddress, // destination
          wallet.publicKey, // authority
          mintAmount // amount
        )
      );

      // Step 5: Create metadata account
      console.log('Creating metadata account...');
      const metadataAccount = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          METADATA_PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        METADATA_PROGRAM_ID
      )[0];

      const metadataInstruction = this.createMetadataInstruction(
        mintKeypair.publicKey,
        metadataAccount,
        params.name,
        params.symbol
      );

      tokenCreationTransaction.add(metadataInstruction);

      // Step 6: Revoke authorities (if requested)
      if (params.revokeMint) {
        console.log('Adding mint authority revocation...');
        tokenCreationTransaction.add(
          createSetAuthorityInstruction(
            mintKeypair.publicKey,
            wallet.publicKey,
            AuthorityType.MintTokens,
            null,
            [],
            TOKEN_PROGRAM_ID
          )
        );
      }

      // Note: SPL tokens don't have an "update authority" - that's a metadata concept
      // For SPL tokens, only mint and freeze authorities can be revoked

      // Note: Freeze authority is handled during mint initialization (set to null if revoking)

      // Set recent blockhash and fee payer
      console.log('Setting blockhash for token creation transaction...');
      const { blockhash: tokenBlockhash } = await this.connection.getLatestBlockhash();
      tokenCreationTransaction.recentBlockhash = tokenBlockhash;
      tokenCreationTransaction.feePayer = wallet.publicKey;

      // Partially sign with mint keypair
      console.log('Partially signing token creation transaction...');
      tokenCreationTransaction.partialSign(mintKeypair);

      // Send and confirm the comprehensive token creation transaction
      console.log('Sending comprehensive token creation transaction...');
      console.log('Transaction contains:', tokenCreationTransaction.instructions.length, 'instructions');
      const tokenSignature = await wallet.sendTransaction(tokenCreationTransaction, this.connection);
      console.log('Token creation signature:', tokenSignature);
      
      console.log('Confirming token creation...');
      await this.connection.confirmTransaction(tokenSignature, 'confirmed');
      console.log('Token creation completed successfully!');

      const result = {
        tokenAddress: mintKeypair.publicKey.toString(),
        transactionId: tokenSignature,
        metadataAddress: metadataAccount.toString(), // Return metadata address
      };
      
      console.log('=== TOKEN CREATION COMPLETED SUCCESSFULLY ===');
      console.log('Result:', result);
      
      return result;
    } catch (error) {
      console.error('Error creating token:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('insufficient funds')) {
          throw new Error('Insufficient SOL balance. Please add more SOL to your wallet.');
        }
        if (error.message.includes('User rejected')) {
          throw new Error('Transaction was rejected by user.');
        }
        if (error.message.includes('blockhash')) {
          throw new Error('Network error. Please try again.');
        }
        if (error.message.includes('Wallet not connected')) {
          throw new Error('Please connect your wallet first.');
        }
        throw new Error(`Token creation failed: ${error.message}`);
      }
      
      throw new Error('Unknown error occurred during token creation. Please try again.');
    }
  }

  async getTokenInfo(tokenAddress: string) {
    try {
      const mint = new PublicKey(tokenAddress);
      const mintInfo = await getMint(this.connection, mint);
      return mintInfo;
    } catch (error) {
      console.error('Error getting token info:', error);
      throw error;
    }
  }

  // Helper function to create metadata account
  private createMetadataInstruction(
    mint: PublicKey,
    metadataAccount: PublicKey,
    name: string,
    symbol: string,
    uri: string = ''
  ) {
    const data = Buffer.from([
      0, // Create metadata account instruction
      ...Buffer.from(name),
      ...Buffer.from(symbol),
      ...Buffer.from(uri),
    ]);

    return {
      programId: METADATA_PROGRAM_ID,
      keys: [
        { pubkey: metadataAccount, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: mint, isSigner: false, isWritable: false }, // mint authority
        { pubkey: mint, isSigner: false, isWritable: false }, // payer
        { pubkey: mint, isSigner: false, isWritable: false }, // update authority
      ],
      data,
    };
  }
} 
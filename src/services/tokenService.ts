import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  SystemProgram,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
  getAccount,
  createSetAuthorityInstruction,
  AuthorityType,
} from '@solana/spl-token';

export interface TokenCreationParams {
  name: string;
  symbol: string;
  supply: number;
  description?: string;
  logo?: File;
  creator?: string;
  website?: string;
  telegram?: string;
  twitter?: string;
  revokeFreeze: boolean;
  revokeMint: boolean;
  revokeUpdate: boolean;
  revokeAll: boolean;
}

export interface TokenCreationResult {
  tokenAddress: string;
  transactionId: string;
  metadataAddress: string;
}

export class TokenService {
  private connection: Connection;

  constructor(endpoint: string) {
    this.connection = new Connection(endpoint, 'confirmed');
  }

  async createToken(
    payer: Keypair,
    params: TokenCreationParams
  ): Promise<TokenCreationResult> {
    try {
      // Create mint account
      const mint = Keypair.generate();
      
      // Calculate decimals (most memecoins use 9 decimals)
      const decimals = 9;
      
      // Create the mint
      const createMintTransaction = new Transaction();
      
      // Add create account instruction
      createMintTransaction.add(
        SystemProgram.createAccount({
          fromPubkey: payer.publicKey,
          newAccountPubkey: mint.publicKey,
          space: 82,
          lamports: await this.connection.getMinimumBalanceForRentExemption(82),
          programId: TOKEN_PROGRAM_ID,
        })
      );

      // Add create mint instruction
      createMintTransaction.add(
        createMint(
          mint.publicKey,
          decimals,
          payer.publicKey,
          params.revokeMint ? null : payer.publicKey,
          TOKEN_PROGRAM_ID
        )
      );

      // Send and confirm the mint creation transaction
      const mintTxId = await sendAndConfirmTransaction(
        this.connection,
        createMintTransaction,
        [payer, mint]
      );

      // Create associated token account for the payer
      const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        payer,
        mint.publicKey,
        payer.publicKey
      );

      // Mint tokens to the associated token account
      const mintToTransaction = new Transaction();
      mintToTransaction.add(
        mintTo(
          mint.publicKey,
          associatedTokenAccount.address,
          payer.publicKey,
          params.supply * Math.pow(10, decimals),
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const mintToTxId = await sendAndConfirmTransaction(
        this.connection,
        mintToTransaction,
        [payer]
      );

      // For now, we'll skip metadata creation to keep it simple
      // In a production app, you'd want to implement proper metadata handling
      const metadataAddress = '';

      // Handle authority revocations
      const authorityTransactions: Transaction[] = [];

      if (params.revokeFreeze) {
        const revokeFreezeTx = new Transaction();
        revokeFreezeTx.add(
          createSetAuthorityInstruction(
            mint.publicKey,
            payer.publicKey,
            AuthorityType.FreezeAccount,
            null,
            [],
            TOKEN_PROGRAM_ID
          )
        );
        authorityTransactions.push(revokeFreezeTx);
      }

      if (params.revokeMint) {
        const revokeMintTx = new Transaction();
        revokeMintTx.add(
          createSetAuthorityInstruction(
            mint.publicKey,
            payer.publicKey,
            AuthorityType.MintTokens,
            null,
            [],
            TOKEN_PROGRAM_ID
          )
        );
        authorityTransactions.push(revokeMintTx);
      }

      // Send authority revocation transactions
      const authorityTxIds = await Promise.all(
        authorityTransactions.map(tx =>
          sendAndConfirmTransaction(this.connection, tx, [payer])
        )
      );

      return {
        tokenAddress: mint.publicKey.toString(),
        transactionId: mintTxId,
        metadataAddress: metadataAddress,
      };
    } catch (error) {
      console.error('Error creating token:', error);
      throw new Error(`Failed to create token: ${error}`);
    }
  }

  async getTokenInfo(tokenAddress: string) {
    try {
      const mint = new PublicKey(tokenAddress);
      const mintInfo = await getAccount(this.connection, mint);
      return mintInfo;
    } catch (error) {
      console.error('Error getting token info:', error);
      throw error;
    }
  }

  async getAccountBalance(tokenAddress: string, walletAddress: string) {
    try {
      const mint = new PublicKey(tokenAddress);
      const wallet = new PublicKey(walletAddress);
      
      const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        { publicKey: wallet, secretKey: new Uint8Array() },
        mint,
        wallet
      );

      const accountInfo = await getAccount(this.connection, associatedTokenAccount.address);
      return accountInfo.amount;
    } catch (error) {
      console.error('Error getting account balance:', error);
      throw error;
    }
  }
} 
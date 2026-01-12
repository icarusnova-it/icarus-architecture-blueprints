/**
 * Usage Example: Cloud-Agnostic Storage
 * 
 * This example shows how application code uses the storage interface
 * without knowing which cloud provider is being used.
 * 
 * The provider is selected via configuration, and the application
 * code remains unchanged.
 */

import { IStorageService } from '../application/interfaces/IStorageService';
import { S3StorageService } from '../infrastructure/aws/S3StorageService';
import { BlobStorageService } from '../infrastructure/azure/BlobStorageService';
import { CloudStorageService } from '../infrastructure/gcp/CloudStorageService';

/**
 * Factory function to create storage service based on configuration
 * This is the only place where provider-specific code exists
 */
function createStorageService(provider: string): IStorageService {
  switch (provider) {
    case 'aws':
      return new S3StorageService(
        process.env.AWS_S3_BUCKET || 'my-bucket',
        process.env.AWS_REGION || 'us-east-1'
      );
    
    case 'azure':
      return new BlobStorageService(
        process.env.AZURE_STORAGE_ACCOUNT || 'myaccount',
        process.env.AZURE_STORAGE_CONTAINER || 'mycontainer',
        process.env.AZURE_STORAGE_KEY || ''
      );
    
    case 'gcp':
      return new CloudStorageService(
        process.env.GCP_STORAGE_BUCKET || 'my-bucket',
        process.env.GCP_PROJECT_ID || 'my-project'
      );
    
    default:
      throw new Error(`Unsupported storage provider: ${provider}`);
  }
}

/**
 * Application code - uses interface, not implementation
 * This code works with any provider
 */
async function exampleUsage() {
  // Get provider from configuration
  const provider = process.env.STORAGE_PROVIDER || 'aws';
  
  // Create storage service (provider-agnostic)
  const storage: IStorageService = createStorageService(provider);
  
  // Use storage service (same code for all providers)
  const fileKey = 'documents/example.pdf';
  const fileData = Buffer.from('file content');
  
  // Upload file
  await storage.upload(fileKey, fileData, {
    contentType: 'application/pdf',
    metadata: { author: 'John Doe' },
  });
  
  // Check if file exists
  const exists = await storage.exists(fileKey);
  console.log(`File exists: ${exists}`);
  
  // Download file
  const downloadedData = await storage.download(fileKey);
  console.log(`Downloaded ${downloadedData.length} bytes`);
  
  // Get public URL
  const url = await storage.getUrl(fileKey, 3600); // 1 hour expiry
  console.log(`File URL: ${url}`);
  
  // List files
  const files = await storage.list('documents/');
  console.log(`Found ${files.length} files`);
}

// Run example
if (require.main === module) {
  exampleUsage().catch(console.error);
}

export { createStorageService };

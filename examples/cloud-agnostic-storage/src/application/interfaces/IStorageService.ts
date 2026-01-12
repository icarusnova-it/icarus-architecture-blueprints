/**
 * Application Layer: Storage Service Interface
 * 
 * This interface defines the storage operations needed by the application.
 * It is cloud-agnostic - no cloud-specific details.
 * 
 * Infrastructure layer will implement this interface for different providers:
 * - AWS S3
 * - Azure Blob Storage
 * - GCP Cloud Storage
 * 
 * Benefits:
 * - Application code doesn't depend on cloud provider
 * - Can switch providers by changing implementation
 * - Easy to test (mock implementation)
 */

export interface IStorageService {
  /**
   * Upload a file
   */
  upload(key: string, data: Buffer, options?: UploadOptions): Promise<void>;

  /**
   * Download a file
   */
  download(key: string): Promise<Buffer>;

  /**
   * Delete a file
   */
  delete(key: string): Promise<void>;

  /**
   * Check if file exists
   */
  exists(key: string): Promise<boolean>;

  /**
   * Get file URL (for public access)
   */
  getUrl(key: string, expiresIn?: number): Promise<string>;

  /**
   * List files with prefix
   */
  list(prefix: string): Promise<string[]>;
}

export interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  public?: boolean;
}

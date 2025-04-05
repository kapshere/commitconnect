
import { useState } from "react";
import { FileUp, FileCheck, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUpload: (file: { name: string; url: string; type?: string }) => void;
  supportedTypes?: string;
  maxSize?: number; // in MB
}

const FileUpload = ({ 
  onFileUpload, 
  supportedTypes = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg", 
  maxSize = 5 
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // In a real app, this would upload to a storage service
  const mockUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate upload delay
      setTimeout(() => {
        // Create a mock URL (in production this would be a real URL)
        const mockUrl = `https://example.com/uploads/${encodeURIComponent(file.name)}`;
        resolve(mockUrl);
      }, 1000);
    });
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };
  
  const handleFileSelection = async (file: File) => {
    // Validate file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isValidType = supportedTypes.includes(fileExtension);
    
    if (!isValidType) {
      toast.error(`Invalid file type. Supported types: ${supportedTypes}`);
      return;
    }
    
    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      toast.error(`File too large. Maximum size: ${maxSize}MB`);
      return;
    }
    
    // Upload file
    setIsUploading(true);
    try {
      const fileUrl = await mockUpload(file);
      
      onFileUpload({
        name: file.name,
        url: fileUrl,
        type: file.type,
      });
      
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging 
          ? "border-connect-400 bg-connect-50 dark:bg-connect-900/10" 
          : "border-gray-300 dark:border-gray-700"
      } glow-effect`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="flex flex-col items-center justify-center py-4">
          <Loader2 className="h-10 w-10 text-connect-500 animate-spin mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Uploading file...</p>
        </div>
      ) : (
        <>
          <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {supportedTypes} (Max {maxSize}MB)
          </p>
          <input
            type="file"
            className="hidden"
            accept={supportedTypes}
            onChange={handleFileChange}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="mt-4 inline-block">
            <Button 
              type="button" 
              variant="outline"
              className="text-connect-500 border-connect-500"
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </label>
        </>
      )}
    </div>
  );
};

export default FileUpload;

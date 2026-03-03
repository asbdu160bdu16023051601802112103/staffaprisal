import React, { useRef } from "react";
import { Label } from "@/components/ui/label";

const ACCEPTED_TYPES = ".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx";

interface CertificateUploadProps {
  sectionKey: string;
  files: File[];
  onFilesChange: (sectionKey: string, files: File[]) => void;
  label?: string;
}

const CertificateUpload = ({
  sectionKey,
  files,
  onFilesChange,
  label = "Upload Certificate (Optional)",
}: CertificateUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesChange(sectionKey, [...files, ...newFiles]);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    onFilesChange(sectionKey, files.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-3">
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        <label className="cursor-pointer bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md text-sm hover:opacity-80 transition-opacity">
          📎 Choose Files
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>
        <span className="text-xs text-muted-foreground">
          PDF, JPG, PNG, DOC, DOCX, PPT, PPTX
        </span>
      </div>
      {files.length > 0 && (
        <div className="mt-2 space-y-1">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-2 text-sm bg-muted px-2 py-1 rounded">
              <span className="truncate flex-1">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-destructive hover:opacity-70 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateUpload;

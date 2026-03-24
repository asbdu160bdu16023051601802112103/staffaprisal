import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Certificate {
  id: string;
  section_number: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

interface CertificateViewerProps {
  appraisalId: string;
  staffName: string;
  onClose: () => void;
}

const CertificateViewer = ({ appraisalId, staffName, onClose }: CertificateViewerProps) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, [appraisalId]);

  const fetchCertificates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appraisal_certificates")
      .select("*")
      .eq("appraisal_id", appraisalId)
      .order("section_number", { ascending: true });

    if (error) {
      toast.error("Failed to load certificates");
    } else {
      setCertificates(data || []);
    }
    setLoading(false);
  };

  const getDownloadUrl = (filePath: string) => {
    const { data } = supabase.storage.from("certificates").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleDownloadAll = () => {
    if (certificates.length === 0) {
      toast.error("No certificates to download");
      return;
    }
    certificates.forEach((cert) => {
      const url = getDownloadUrl(cert.file_path);
      const a = document.createElement("a");
      a.href = url;
      a.download = cert.file_name;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    toast.success("Downloading all certificates...");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">📄 Certificates - {staffName}</h3>
            <p className="text-sm text-muted-foreground">{certificates.length} file(s) uploaded</p>
          </div>
          <div className="flex gap-2">
            {certificates.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="submit-btn text-sm bg-accent"
              >
                ⬇️ Download All
              </button>
            )}
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-xl font-bold px-2"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4">
          {loading ? (
            <p className="text-center text-muted-foreground py-6">Loading certificates...</p>
          ) : certificates.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No certificates uploaded for this appraisal.</p>
          ) : (
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between bg-muted px-3 py-2 rounded-md"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{cert.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      Section {cert.section_number} • {new Date(cert.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <a
                      href={getDownloadUrl(cert.file_path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      👁️ View
                    </a>
                    <a
                      href={getDownloadUrl(cert.file_path)}
                      download={cert.file_name}
                      className="text-accent hover:underline text-sm"
                    >
                      ⬇️ Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;

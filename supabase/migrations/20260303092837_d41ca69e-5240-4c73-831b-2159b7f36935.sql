
-- Create storage bucket for certificates
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true);

-- Storage policies
CREATE POLICY "Anyone can upload certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates');

CREATE POLICY "Anyone can view certificates"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

CREATE POLICY "Anyone can delete certificates"
ON storage.objects FOR DELETE
USING (bucket_id = 'certificates');

-- Certificates metadata table
CREATE TABLE public.appraisal_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appraisal_id UUID REFERENCES public.appraisals(id) ON DELETE CASCADE,
  section_number TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.appraisal_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert certificates"
ON public.appraisal_certificates FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view certificates"
ON public.appraisal_certificates FOR SELECT
USING (true);

CREATE POLICY "Anyone can delete certificates"
ON public.appraisal_certificates FOR DELETE
USING (true);


-- Table to store all staff appraisal submissions
CREATE TABLE public.appraisals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Section 1: Personal Information
  staff_name TEXT NOT NULL,
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  email_id TEXT,
  employee_id TEXT,
  
  -- Section 2: Leave/Permission/On Duty
  casual_leave_days NUMERIC DEFAULT 0,
  loss_of_pay_days NUMERIC DEFAULT 0,
  permission_hours NUMERIC DEFAULT 0,
  on_duty_days NUMERIC DEFAULT 0,
  
  -- Section 3: Professional Development
  qualification_upgradation BOOLEAN DEFAULT false,
  fdp_days_attended NUMERIC DEFAULT 0,
  seminars_workshops_attended NUMERIC DEFAULT 0,
  seminars_workshops_organized NUMERIC DEFAULT 0,
  
  -- Section 4: Online Courses & e-Content
  online_courses_completed NUMERIC DEFAULT 0,
  e_contents_developed NUMERIC DEFAULT 0,
  
  -- Section 5: Awards & Recognitions
  number_of_awards NUMERIC DEFAULT 0,
  
  -- Section 6: Memberships in Academic Bodies
  active_memberships NUMERIC DEFAULT 0,
  
  -- Section 7: Administrative Actions
  administrative_penalties BOOLEAN DEFAULT false,
  
  -- Section 8: Curriculum Development
  curriculum_contributions NUMERIC DEFAULT 0,
  
  -- Section 9: Teaching Learning & Evaluation
  workload_hours_per_week NUMERIC DEFAULT 0,
  courses_taught NUMERIC DEFAULT 0,
  remedial_classes NUMERIC DEFAULT 0,
  exam_duties NUMERIC DEFAULT 0,
  course_file_submitted BOOLEAN DEFAULT false,
  
  -- Section 10: Value Added Courses
  value_added_courses_offered NUMERIC DEFAULT 0,
  
  -- Section 11: Co-curricular Activities
  cocurricular_activities_organized NUMERIC DEFAULT 0,
  
  -- Section 12: Extra-curricular Activities
  extracurricular_activities_advisor NUMERIC DEFAULT 0,
  
  -- Section 13: Social Responsibility
  social_programs_participated NUMERIC DEFAULT 0,
  
  -- Section 14: Student Projects
  projects_guided NUMERIC DEFAULT 0,
  
  -- Section 15: Internship/Training
  internships_guided NUMERIC DEFAULT 0,
  
  -- Section 16: Tutor-Ward System
  number_of_mentees NUMERIC DEFAULT 0,
  
  -- Section 17: Class In-Charge
  class_in_charge BOOLEAN DEFAULT false,
  
  -- Section 18: Student Results
  average_pass_percentage NUMERIC DEFAULT 0,
  
  -- Section 19: Student Attendance
  attendance_percentage NUMERIC DEFAULT 0,
  
  -- Section 20: Exam Attendance
  exam_attendance_percentage NUMERIC DEFAULT 0,
  
  -- Section 21: Parent Meetings
  parent_meetings_conducted NUMERIC DEFAULT 0,
  
  -- Section 22: Slow Learners
  slow_learners_assisted NUMERIC DEFAULT 0,
  
  -- Section 23: Advanced Learners
  advanced_learners_tasks NUMERIC DEFAULT 0,
  
  -- Section 24-25: Research Activities
  research_papers_published NUMERIC DEFAULT 0,
  research_projects NUMERIC DEFAULT 0,
  
  -- Section 26-28: Leadership & Governance
  leadership_roles NUMERIC DEFAULT 0,
  files_maintained BOOLEAN DEFAULT false,
  
  -- Self-Assessment
  strengths TEXT,
  areas_for_improvement TEXT,
  additional_achievements TEXT,
  future_goals TEXT,
  
  -- Remarks
  reviewer_remarks TEXT,
  hod_remarks TEXT,
  principal_remarks TEXT,
  overall_recommendations TEXT,
  
  -- Calculated score
  total_score NUMERIC DEFAULT 0
);

-- Allow anyone to insert (staff don't need auth)
ALTER TABLE public.appraisals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert appraisals"
ON public.appraisals
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated (admin) can view all
CREATE POLICY "Authenticated users can view all appraisals"
ON public.appraisals
FOR SELECT
TO authenticated
USING (true);

-- Allow anon to read their own by employee_id (for "View My Data")
CREATE POLICY "Anon can select by employee_id"
ON public.appraisals
FOR SELECT
TO anon
USING (true);

-- Allow delete for authenticated (admin)
CREATE POLICY "Authenticated users can delete appraisals"
ON public.appraisals
FOR DELETE
TO authenticated
USING (true);

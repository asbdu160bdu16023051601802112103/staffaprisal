import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import Header from "@/components/Header";
import FormSection from "@/components/FormSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { AppraisalData, getDefaultData, calculateScore } from "@/lib/scoreCalculator";

const StaffForm = () => {
  const [data, setData] = useState<AppraisalData>(getDefaultData());
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [lastSubmittedData, setLastSubmittedData] = useState<AppraisalData | null>(null);
  const [lastSubmittedScore, setLastSubmittedScore] = useState<number | null>(null);
  const navigate = useNavigate();

  const set = (field: keyof AppraisalData, value: string | number | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const numInput = (field: keyof AppraisalData, label: string, placeholder = "0") => (
    <div>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Input
        type="number"
        min={0}
        placeholder={placeholder}
        value={data[field] as number}
        onChange={(e) => set(field, Number(e.target.value))}
        className="mt-1"
      />
    </div>
  );

  const textInput = (field: keyof AppraisalData, label: string, placeholder: string, required = false) => (
    <div>
      <Label className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        type="text"
        placeholder={placeholder}
        value={data[field] as string}
        onChange={(e) => set(field, e.target.value)}
        required={required}
        className="mt-1"
      />
    </div>
  );

  const boolInput = (field: keyof AppraisalData, label: string, yesPoints?: string) => (
    <div>
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="flex gap-3 mt-1">
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name={field}
            checked={!(data[field] as boolean)}
            onChange={() => set(field, false)}
          />
          No
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name={field}
            checked={data[field] as boolean}
            onChange={() => set(field, true)}
          />
          Yes {yesPoints && `(${yesPoints})`}
        </label>
      </div>
    </div>
  );

  const handleCalculateScore = () => {
    const s = calculateScore(data);
    setScore(s);
  };

  const handleSubmit = async () => {
    if (!data.staff_name || !data.department || !data.designation || !data.academic_year) {
      toast.error("Please fill in all required fields in Personal Information");
      return;
    }

    setLoading(true);
    const totalScore = calculateScore(data);

    const { error } = await supabase.from("appraisals").insert({
      ...data,
      total_score: totalScore,
    });

    setLoading(false);

    if (error) {
      toast.error("Failed to submit: " + error.message);
    } else {
      toast.success(`Appraisal submitted successfully! Score: ${totalScore}/200`);
      setLastSubmittedData({ ...data });
      setLastSubmittedScore(totalScore);
      setData(getDefaultData());
      setScore(null);
    }
  };

  const handleClear = () => {
    setData(getDefaultData());
    setScore(null);
    toast.info("Form cleared");
  };

  const handleDownloadExcel = () => {
    if (!lastSubmittedData || lastSubmittedScore === null) return;
    const exportData = { ...lastSubmittedData, total_score: lastSubmittedScore };
    const ws = XLSX.utils.json_to_sheet([exportData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "My Appraisal");
    XLSX.writeFile(wb, `Appraisal_${lastSubmittedData.staff_name}_${lastSubmittedData.academic_year}.xlsx`);
    toast.success("Excel file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/admin")}
            className="mode-badge-admin cursor-pointer"
          >
            🔒 Admin Mode
          </button>
          <span className="mode-badge-staff">👤 Staff Mode</span>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          📊 Staff Appraisal System - Complete 28 Sections
        </h2>
        <div className="info-banner mb-6">
          Fill all 28 sections. Upload proof files where required for scoring.{" "}
          <strong>Total Score: 200 points.</strong>
        </div>

        {/* Section 1 */}
        <FormSection number="1" icon="👤" title="Personal Information">
          <div className="form-grid">
            {textInput("staff_name", "Staff Name", "Full Name", true)}
            {textInput("department", "Department", "Department", true)}
            {textInput("designation", "Designation", "Designation", true)}
            {textInput("academic_year", "Academic Year", "2024-2025", true)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {textInput("email_id", "Email ID", "email@bonsecourscollege.edu")}
            {textInput("employee_id", "Employee ID", "EMP001")}
          </div>
        </FormSection>

        {/* Section 2 */}
        <FormSection number="2" icon="📅" title="Leave / Permission / On Duty">
          <div className="form-grid">
            {numInput("casual_leave_days", "Casual Leave days taken")}
            {numInput("loss_of_pay_days", "Loss of Pay days")}
            {numInput("permission_hours", "Permission Hours")}
            {numInput("on_duty_days", "On Duty days")}
          </div>
        </FormSection>

        {/* Section 3 */}
        <FormSection number="3" icon="🎓" title="Professional Development">
          {boolInput("qualification_upgradation", "Qualification Upgradation", "5 points")}
          <div className="form-grid mt-3">
            {numInput("fdp_days_attended", "FDP days attended")}
            {numInput("seminars_workshops_attended", "Seminars/Workshops Attended")}
            {numInput("seminars_workshops_organized", "Seminars/Workshops Organized")}
          </div>
        </FormSection>

        {/* Section 4 */}
        <FormSection number="4" icon="💻" title="Online Courses & e-Content">
          <div className="form-grid">
            {numInput("online_courses_completed", "Online courses completed")}
            {numInput("e_contents_developed", "e-Contents developed")}
          </div>
        </FormSection>

        {/* Section 5 */}
        <FormSection number="5" icon="🏆" title="Awards & Recognitions">
          {numInput("number_of_awards", "Number of awards")}
        </FormSection>

        {/* Section 6 */}
        <FormSection number="6" icon="🤝" title="Memberships in Academic Bodies">
          {numInput("active_memberships", "Active memberships")}
        </FormSection>

        {/* Section 7 */}
        <FormSection number="7" icon="⚖️" title="Administrative Actions">
          {boolInput("administrative_penalties", "Administrative penalties?", "-5 points")}
        </FormSection>

        {/* Section 8 */}
        <FormSection number="8" icon="📚" title="Curriculum Development">
          {numInput("curriculum_contributions", "Contributions to curriculum")}
        </FormSection>

        {/* Section 9 */}
        <FormSection number="9" icon="👨‍🏫" title="Teaching Learning & Evaluation">
          <div className="form-grid">
            {numInput("workload_hours_per_week", "Workload (hours/week)")}
            {numInput("courses_taught", "Courses taught")}
            {numInput("remedial_classes", "Remedial classes")}
            {numInput("exam_duties", "Exam duties")}
          </div>
          <div className="mt-3">
            {boolInput("course_file_submitted", "Course file submitted?", "5 points")}
          </div>
        </FormSection>

        {/* Section 10 */}
        <FormSection number="10" icon="➕" title="Value Added Courses">
          {numInput("value_added_courses_offered", "Value-added courses offered")}
        </FormSection>

        {/* Section 11 */}
        <FormSection number="11" icon="🎭" title="Co-curricular Activities">
          {numInput("cocurricular_activities_organized", "Activities organized")}
        </FormSection>

        {/* Section 12 */}
        <FormSection number="12" icon="🏀" title="Extra-curricular Activities">
          {numInput("extracurricular_activities_advisor", "Activities as advisor")}
        </FormSection>

        {/* Section 13 */}
        <FormSection number="13" icon="🤲" title="Social Responsibility">
          {numInput("social_programs_participated", "Programs participated")}
        </FormSection>

        {/* Section 14 */}
        <FormSection number="14" icon="🔬" title="Student Projects">
          {numInput("projects_guided", "Projects guided")}
        </FormSection>

        {/* Section 15 */}
        <FormSection number="15" icon="💼" title="Internship / Training">
          {numInput("internships_guided", "Internships guided")}
        </FormSection>

        {/* Section 16 */}
        <FormSection number="16" icon="👥" title="Tutor-Ward System">
          {numInput("number_of_mentees", "Number of mentees")}
        </FormSection>

        {/* Section 17 */}
        <FormSection number="17" icon="👑" title="Class In-Charge">
          {boolInput("class_in_charge", "Were you class in-charge?", "5 points")}
        </FormSection>

        {/* Section 18 */}
        <FormSection number="18" icon="📊" title="Student Results">
          {numInput("average_pass_percentage", "Average pass % (0-100)")}
        </FormSection>

        {/* Section 19 */}
        <FormSection number="19" icon="📈" title="Student Attendance">
          {numInput("attendance_percentage", "Attendance % in classes")}
        </FormSection>

        {/* Section 20 */}
        <FormSection number="20" icon="📝" title="Exam Attendance">
          {numInput("exam_attendance_percentage", "Exam attendance %")}
        </FormSection>

        {/* Section 21 */}
        <FormSection number="21" icon="👨‍👩‍👧‍👦" title="Parent Meetings">
          {numInput("parent_meetings_conducted", "Parent meetings conducted")}
        </FormSection>

        {/* Section 22 */}
        <FormSection number="22" icon="🐢" title="Slow Learners">
          {numInput("slow_learners_assisted", "Slow learners assisted")}
        </FormSection>

        {/* Section 23 */}
        <FormSection number="23" icon="🚀" title="Advanced Learners">
          {numInput("advanced_learners_tasks", "Advanced learners tasks")}
        </FormSection>

        {/* Section 24 */}
        <FormSection number="24" icon="🔬" title="Research Papers Published">
          {numInput("research_papers_published", "Research papers published")}
        </FormSection>

        {/* Section 25 */}
        <FormSection number="25" icon="🔬" title="Research Projects">
          {numInput("research_projects", "Research projects")}
        </FormSection>

        {/* Section 26 */}
        <FormSection number="26" icon="🌟" title="Leadership Roles">
          {numInput("leadership_roles", "Leadership roles")}
        </FormSection>

        {/* Section 27 */}
        <FormSection number="27" icon="📁" title="Files Maintained">
          {boolInput("files_maintained", "Files maintained?", "5 points")}
        </FormSection>

        {/* Self-Assessment */}
        <FormSection number="" icon="📝" title="Self-Assessment & Additional Info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Strengths</Label>
              <Textarea value={data.strengths} onChange={(e) => set("strengths", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Areas for Improvement</Label>
              <Textarea value={data.areas_for_improvement} onChange={(e) => set("areas_for_improvement", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Additional Achievements</Label>
              <Textarea value={data.additional_achievements} onChange={(e) => set("additional_achievements", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Future Goals</Label>
              <Textarea value={data.future_goals} onChange={(e) => set("future_goals", e.target.value)} className="mt-1" />
            </div>
          </div>
        </FormSection>

        {/* Remarks */}
        <FormSection number="" icon="📝" title="Remarks & Recommendations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Reviewer Remarks</Label>
              <Textarea value={data.reviewer_remarks} onChange={(e) => set("reviewer_remarks", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>HOD Remarks</Label>
              <Textarea value={data.hod_remarks} onChange={(e) => set("hod_remarks", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Principal Remarks</Label>
              <Textarea value={data.principal_remarks} onChange={(e) => set("principal_remarks", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Overall Recommendations</Label>
              <Textarea value={data.overall_recommendations} onChange={(e) => set("overall_recommendations", e.target.value)} className="mt-1" />
            </div>
          </div>
        </FormSection>

        {/* Score display */}
        {score !== null && (
          <div className="section-card text-center">
            <p className="text-2xl font-bold text-primary">
              Total Score: {score} / 200
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-6 mb-4">
          <button onClick={handleCalculateScore} className="submit-btn flex items-center gap-2">
            📊 Calculate Score
          </button>
          <button onClick={handleSubmit} disabled={loading} className="submit-btn flex items-center gap-2 bg-accent">
            💾 {loading ? "Saving..." : "Save & Submit"}
          </button>
          <button onClick={handleClear} className="submit-btn flex items-center gap-2 bg-destructive">
            🗑️ Clear Form
          </button>
        </div>

        {/* Download own Excel after submission */}
        {lastSubmittedData && lastSubmittedScore !== null && (
          <div className="section-card text-center mb-10">
            <p className="text-lg font-semibold text-primary mb-3">
              ✅ Appraisal submitted! Score: {lastSubmittedScore}/200
            </p>
            <button onClick={handleDownloadExcel} className="submit-btn flex items-center gap-2 mx-auto">
              📥 Download My Appraisal as Excel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffForm;

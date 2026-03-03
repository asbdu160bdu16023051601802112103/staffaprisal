export interface AppraisalData {
  staff_name: string;
  department: string;
  designation: string;
  academic_year: string;
  employee_id: string;
  casual_leave_days: number;
  loss_of_pay_days: number;
  permission_hours: number;
  on_duty_days: number;
  qualification_upgradation: boolean;
  fdp_days_attended: number;
  seminars_workshops_attended: number;
  seminars_workshops_organized: number;
  online_courses_completed: number;
  e_contents_developed: number;
  number_of_awards: number;
  active_memberships: number;
  administrative_penalties: boolean;
  curriculum_contributions: number;
  workload_hours_per_week: number;
  courses_taught: number;
  remedial_classes: number;
  exam_duties: number;
  course_file_submitted: boolean;
  value_added_courses_offered: number;
  cocurricular_activities_organized: number;
  extracurricular_activities_advisor: number;
  social_programs_participated: number;
  projects_guided: number;
  internships_guided: number;
  number_of_mentees: number;
  class_in_charge: boolean;
  average_pass_percentage: number;
  attendance_percentage: number;
  exam_attendance_percentage: number;
  parent_meetings_conducted: number;
  slow_learners_assisted: number;
  advanced_learners_tasks: number;
  research_papers_published: number;
  research_projects: number;
  leadership_roles: number;
  files_maintained: boolean;
  strengths: string;
  areas_for_improvement: string;
  additional_achievements: string;
  future_goals: string;
  reviewer_remarks: string;
  hod_remarks: string;
  principal_remarks: string;
  overall_recommendations: string;
}

export const getDefaultData = (): AppraisalData => ({
  staff_name: "",
  department: "",
  designation: "",
  academic_year: "2024-2025",
  employee_id: "",
  casual_leave_days: 0,
  loss_of_pay_days: 0,
  permission_hours: 0,
  on_duty_days: 0,
  qualification_upgradation: false,
  fdp_days_attended: 0,
  seminars_workshops_attended: 0,
  seminars_workshops_organized: 0,
  online_courses_completed: 0,
  e_contents_developed: 0,
  number_of_awards: 0,
  active_memberships: 0,
  administrative_penalties: false,
  curriculum_contributions: 0,
  workload_hours_per_week: 0,
  courses_taught: 0,
  remedial_classes: 0,
  exam_duties: 0,
  course_file_submitted: false,
  value_added_courses_offered: 0,
  cocurricular_activities_organized: 0,
  extracurricular_activities_advisor: 0,
  social_programs_participated: 0,
  projects_guided: 0,
  internships_guided: 0,
  number_of_mentees: 0,
  class_in_charge: false,
  average_pass_percentage: 0,
  attendance_percentage: 0,
  exam_attendance_percentage: 0,
  parent_meetings_conducted: 0,
  slow_learners_assisted: 0,
  advanced_learners_tasks: 0,
  research_papers_published: 0,
  research_projects: 0,
  leadership_roles: 0,
  files_maintained: false,
  strengths: "",
  areas_for_improvement: "",
  additional_achievements: "",
  future_goals: "",
  reviewer_remarks: "",
  hod_remarks: "",
  principal_remarks: "",
  overall_recommendations: "",
});

export interface SectionScore {
  section: string;
  score: number;
  maxScore: number;
}

export function calculateSectionScores(data: AppraisalData, certificateSections: Set<string>): SectionScore[] {
  const sections: SectionScore[] = [];
  const certBonus = (sectionKey: string, base: number, max: number) => {
    const bonus = certificateSections.has(sectionKey) ? Math.ceil(base * 0.1) : 0;
    return Math.min(base + bonus, max);
  };

  // Section 1: Personal Info - no score
  // Section 2: Leave
  let s2 = 0;
  if (data.casual_leave_days <= 3) s2 += 10;
  else if (data.casual_leave_days <= 6) s2 += 7;
  else if (data.casual_leave_days <= 10) s2 += 4;
  if (data.loss_of_pay_days === 0) s2 += 5;
  sections.push({ section: "2. Leave / Permission / On Duty", score: certBonus("s2", s2, 15), maxScore: 15 });

  // Section 3: Professional Development
  let s3 = 0;
  if (data.qualification_upgradation) s3 += 5;
  s3 += Math.min(data.fdp_days_attended, 5) * 2;
  s3 += Math.min(data.seminars_workshops_attended, 5) * 2;
  s3 += Math.min(data.seminars_workshops_organized, 3) * 5;
  sections.push({ section: "3. Professional Development", score: certBonus("s3", s3, 40), maxScore: 40 });

  // Section 4: Online Courses
  let s4 = 0;
  s4 += Math.min(data.online_courses_completed, 3) * 5;
  s4 += Math.min(data.e_contents_developed, 3) * 3;
  sections.push({ section: "4. Online Courses & e-Content", score: certBonus("s4", s4, 24), maxScore: 24 });

  // Section 5: Awards
  let s5 = Math.min(data.number_of_awards, 3) * 5;
  sections.push({ section: "5. Awards & Recognitions", score: certBonus("s5", s5, 15), maxScore: 15 });

  // Section 6: Memberships
  let s6 = Math.min(data.active_memberships, 3) * 3;
  sections.push({ section: "6. Memberships", score: certBonus("s6", s6, 9), maxScore: 9 });

  // Section 7: Administrative
  let s7 = data.administrative_penalties ? -5 : 0;
  sections.push({ section: "7. Administrative Actions", score: s7, maxScore: 0 });

  // Section 8: Curriculum
  let s8 = Math.min(data.curriculum_contributions, 3) * 3;
  sections.push({ section: "8. Curriculum Development", score: certBonus("s8", s8, 9), maxScore: 9 });

  // Section 9: Teaching
  let s9 = 0;
  if (data.workload_hours_per_week >= 16) s9 += 5;
  s9 += Math.min(data.courses_taught, 5);
  s9 += Math.min(data.remedial_classes, 3) * 2;
  s9 += Math.min(data.exam_duties, 3) * 2;
  if (data.course_file_submitted) s9 += 5;
  sections.push({ section: "9. Teaching & Evaluation", score: certBonus("s9", s9, 22), maxScore: 22 });

  // Section 10: Value Added
  let s10 = Math.min(data.value_added_courses_offered, 3) * 3;
  sections.push({ section: "10. Value Added Courses", score: certBonus("s10", s10, 9), maxScore: 9 });

  // Section 11: Co-curricular
  let s11 = Math.min(data.cocurricular_activities_organized, 3) * 3;
  sections.push({ section: "11. Co-curricular Activities", score: certBonus("s11", s11, 9), maxScore: 9 });

  // Section 12: Extra-curricular
  let s12 = Math.min(data.extracurricular_activities_advisor, 3) * 3;
  sections.push({ section: "12. Extra-curricular Activities", score: certBonus("s12", s12, 9), maxScore: 9 });

  // Section 13: Social
  let s13 = Math.min(data.social_programs_participated, 3) * 3;
  sections.push({ section: "13. Social Responsibility", score: certBonus("s13", s13, 9), maxScore: 9 });

  // Section 14: Projects
  let s14 = Math.min(data.projects_guided, 5) * 2;
  sections.push({ section: "14. Student Projects", score: certBonus("s14", s14, 10), maxScore: 10 });

  // Section 15: Internship
  let s15 = Math.min(data.internships_guided, 3) * 3;
  sections.push({ section: "15. Internship / Training", score: certBonus("s15", s15, 9), maxScore: 9 });

  // Section 16: Mentoring
  let s16 = Math.min(data.number_of_mentees, 5);
  sections.push({ section: "16. Tutor-Ward System", score: certBonus("s16", s16, 5), maxScore: 5 });

  // Section 17: Class in-charge
  let s17 = data.class_in_charge ? 5 : 0;
  sections.push({ section: "17. Class In-Charge", score: s17, maxScore: 5 });

  // Section 18: Results
  let s18 = 0;
  if (data.average_pass_percentage >= 90) s18 = 10;
  else if (data.average_pass_percentage >= 75) s18 = 7;
  else if (data.average_pass_percentage >= 60) s18 = 4;
  sections.push({ section: "18. Student Results", score: certBonus("s18", s18, 10), maxScore: 10 });

  // Section 19: Attendance
  let s19 = 0;
  if (data.attendance_percentage >= 90) s19 = 5;
  else if (data.attendance_percentage >= 75) s19 = 3;
  sections.push({ section: "19. Student Attendance", score: certBonus("s19", s19, 5), maxScore: 5 });

  // Section 20: Exam Attendance
  let s20 = 0;
  if (data.exam_attendance_percentage >= 90) s20 = 5;
  else if (data.exam_attendance_percentage >= 75) s20 = 3;
  sections.push({ section: "20. Exam Attendance", score: certBonus("s20", s20, 5), maxScore: 5 });

  // Section 21: Parent Meetings
  let s21 = Math.min(data.parent_meetings_conducted, 3) * 2;
  sections.push({ section: "21. Parent Meetings", score: certBonus("s21", s21, 6), maxScore: 6 });

  // Section 22: Slow Learners
  let s22 = Math.min(data.slow_learners_assisted, 5);
  sections.push({ section: "22. Slow Learners", score: certBonus("s22", s22, 5), maxScore: 5 });

  // Section 23: Advanced Learners
  let s23 = Math.min(data.advanced_learners_tasks, 5);
  sections.push({ section: "23. Advanced Learners", score: certBonus("s23", s23, 5), maxScore: 5 });

  // Section 24: Research Papers
  let s24 = Math.min(data.research_papers_published, 5) * 3;
  sections.push({ section: "24. Research Papers", score: certBonus("s24", s24, 15), maxScore: 15 });

  // Section 25: Research Projects
  let s25 = Math.min(data.research_projects, 3) * 3;
  sections.push({ section: "25. Research Projects", score: certBonus("s25", s25, 9), maxScore: 9 });

  // Section 26: Leadership
  let s26 = Math.min(data.leadership_roles, 3) * 3;
  sections.push({ section: "26. Leadership Roles", score: certBonus("s26", s26, 9), maxScore: 9 });

  // Section 27: Files
  let s27 = data.files_maintained ? 5 : 0;
  sections.push({ section: "27. Files Maintained", score: s27, maxScore: 5 });

  return sections;
}

export function calculateScore(data: AppraisalData, certificateSections?: Set<string>): number {
  const sections = calculateSectionScores(data, certificateSections || new Set());
  const total = sections.reduce((sum, s) => sum + s.score, 0);
  return Math.min(Math.max(total, 0), 200);
}

export function getPerformanceLevel(score: number): { label: string; emoji: string } {
  if (score >= 170) return { label: "Excellent", emoji: "🌟" };
  if (score >= 130) return { label: "Very Good", emoji: "👏" };
  if (score >= 90) return { label: "Good", emoji: "👍" };
  return { label: "Needs Improvement", emoji: "📈" };
}

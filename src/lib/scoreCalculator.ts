export interface AppraisalData {
  staff_name: string;
  department: string;
  designation: string;
  academic_year: string;
  email_id: string;
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
  email_id: "",
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

export function calculateScore(data: AppraisalData): number {
  let score = 0;

  // Leave scoring: fewer leaves = more points (max 10)
  if (data.casual_leave_days <= 3) score += 10;
  else if (data.casual_leave_days <= 6) score += 7;
  else if (data.casual_leave_days <= 10) score += 4;

  if (data.loss_of_pay_days === 0) score += 5;

  // Professional development
  if (data.qualification_upgradation) score += 5;
  score += Math.min(data.fdp_days_attended, 5) * 2; // max 10
  score += Math.min(data.seminars_workshops_attended, 5) * 2; // max 10
  score += Math.min(data.seminars_workshops_organized, 3) * 5; // max 15

  // Online courses
  score += Math.min(data.online_courses_completed, 3) * 5; // max 15
  score += Math.min(data.e_contents_developed, 3) * 3; // max 9

  // Awards
  score += Math.min(data.number_of_awards, 3) * 5; // max 15

  // Memberships
  score += Math.min(data.active_memberships, 3) * 3; // max 9

  // Administrative penalties
  if (data.administrative_penalties) score -= 5;

  // Curriculum
  score += Math.min(data.curriculum_contributions, 3) * 3; // max 9

  // Teaching
  if (data.workload_hours_per_week >= 16) score += 5;
  score += Math.min(data.courses_taught, 5);
  score += Math.min(data.remedial_classes, 3) * 2;
  score += Math.min(data.exam_duties, 3) * 2;
  if (data.course_file_submitted) score += 5;

  // Value added courses
  score += Math.min(data.value_added_courses_offered, 3) * 3;

  // Activities
  score += Math.min(data.cocurricular_activities_organized, 3) * 3;
  score += Math.min(data.extracurricular_activities_advisor, 3) * 3;

  // Social responsibility
  score += Math.min(data.social_programs_participated, 3) * 3;

  // Projects & internships
  score += Math.min(data.projects_guided, 5) * 2;
  score += Math.min(data.internships_guided, 3) * 3;

  // Mentoring
  score += Math.min(data.number_of_mentees, 5);

  // Class in-charge
  if (data.class_in_charge) score += 5;

  // Results & attendance
  if (data.average_pass_percentage >= 90) score += 10;
  else if (data.average_pass_percentage >= 75) score += 7;
  else if (data.average_pass_percentage >= 60) score += 4;

  if (data.attendance_percentage >= 90) score += 5;
  else if (data.attendance_percentage >= 75) score += 3;

  if (data.exam_attendance_percentage >= 90) score += 5;
  else if (data.exam_attendance_percentage >= 75) score += 3;

  // Parent meetings
  score += Math.min(data.parent_meetings_conducted, 3) * 2;

  // Slow & advanced learners
  score += Math.min(data.slow_learners_assisted, 5);
  score += Math.min(data.advanced_learners_tasks, 5);

  // Research
  score += Math.min(data.research_papers_published, 5) * 3;
  score += Math.min(data.research_projects, 3) * 3;

  // Leadership
  score += Math.min(data.leadership_roles, 3) * 3;
  if (data.files_maintained) score += 5;

  return Math.min(score, 200);
}

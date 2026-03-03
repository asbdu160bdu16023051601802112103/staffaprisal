export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appraisal_certificates: {
        Row: {
          appraisal_id: string | null
          created_at: string
          file_name: string
          file_path: string
          id: string
          section_number: string
        }
        Insert: {
          appraisal_id?: string | null
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          section_number: string
        }
        Update: {
          appraisal_id?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          section_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "appraisal_certificates_appraisal_id_fkey"
            columns: ["appraisal_id"]
            isOneToOne: false
            referencedRelation: "appraisals"
            referencedColumns: ["id"]
          },
        ]
      }
      appraisals: {
        Row: {
          academic_year: string
          active_memberships: number | null
          additional_achievements: string | null
          administrative_penalties: boolean | null
          advanced_learners_tasks: number | null
          areas_for_improvement: string | null
          attendance_percentage: number | null
          average_pass_percentage: number | null
          casual_leave_days: number | null
          class_in_charge: boolean | null
          cocurricular_activities_organized: number | null
          course_file_submitted: boolean | null
          courses_taught: number | null
          created_at: string
          curriculum_contributions: number | null
          department: string
          designation: string
          e_contents_developed: number | null
          email_id: string | null
          employee_id: string | null
          exam_attendance_percentage: number | null
          exam_duties: number | null
          extracurricular_activities_advisor: number | null
          fdp_days_attended: number | null
          files_maintained: boolean | null
          future_goals: string | null
          hod_remarks: string | null
          id: string
          internships_guided: number | null
          leadership_roles: number | null
          loss_of_pay_days: number | null
          number_of_awards: number | null
          number_of_mentees: number | null
          on_duty_days: number | null
          online_courses_completed: number | null
          overall_recommendations: string | null
          parent_meetings_conducted: number | null
          permission_hours: number | null
          principal_remarks: string | null
          projects_guided: number | null
          qualification_upgradation: boolean | null
          remedial_classes: number | null
          research_papers_published: number | null
          research_projects: number | null
          reviewer_remarks: string | null
          seminars_workshops_attended: number | null
          seminars_workshops_organized: number | null
          slow_learners_assisted: number | null
          social_programs_participated: number | null
          staff_name: string
          strengths: string | null
          total_score: number | null
          value_added_courses_offered: number | null
          workload_hours_per_week: number | null
        }
        Insert: {
          academic_year: string
          active_memberships?: number | null
          additional_achievements?: string | null
          administrative_penalties?: boolean | null
          advanced_learners_tasks?: number | null
          areas_for_improvement?: string | null
          attendance_percentage?: number | null
          average_pass_percentage?: number | null
          casual_leave_days?: number | null
          class_in_charge?: boolean | null
          cocurricular_activities_organized?: number | null
          course_file_submitted?: boolean | null
          courses_taught?: number | null
          created_at?: string
          curriculum_contributions?: number | null
          department: string
          designation: string
          e_contents_developed?: number | null
          email_id?: string | null
          employee_id?: string | null
          exam_attendance_percentage?: number | null
          exam_duties?: number | null
          extracurricular_activities_advisor?: number | null
          fdp_days_attended?: number | null
          files_maintained?: boolean | null
          future_goals?: string | null
          hod_remarks?: string | null
          id?: string
          internships_guided?: number | null
          leadership_roles?: number | null
          loss_of_pay_days?: number | null
          number_of_awards?: number | null
          number_of_mentees?: number | null
          on_duty_days?: number | null
          online_courses_completed?: number | null
          overall_recommendations?: string | null
          parent_meetings_conducted?: number | null
          permission_hours?: number | null
          principal_remarks?: string | null
          projects_guided?: number | null
          qualification_upgradation?: boolean | null
          remedial_classes?: number | null
          research_papers_published?: number | null
          research_projects?: number | null
          reviewer_remarks?: string | null
          seminars_workshops_attended?: number | null
          seminars_workshops_organized?: number | null
          slow_learners_assisted?: number | null
          social_programs_participated?: number | null
          staff_name: string
          strengths?: string | null
          total_score?: number | null
          value_added_courses_offered?: number | null
          workload_hours_per_week?: number | null
        }
        Update: {
          academic_year?: string
          active_memberships?: number | null
          additional_achievements?: string | null
          administrative_penalties?: boolean | null
          advanced_learners_tasks?: number | null
          areas_for_improvement?: string | null
          attendance_percentage?: number | null
          average_pass_percentage?: number | null
          casual_leave_days?: number | null
          class_in_charge?: boolean | null
          cocurricular_activities_organized?: number | null
          course_file_submitted?: boolean | null
          courses_taught?: number | null
          created_at?: string
          curriculum_contributions?: number | null
          department?: string
          designation?: string
          e_contents_developed?: number | null
          email_id?: string | null
          employee_id?: string | null
          exam_attendance_percentage?: number | null
          exam_duties?: number | null
          extracurricular_activities_advisor?: number | null
          fdp_days_attended?: number | null
          files_maintained?: boolean | null
          future_goals?: string | null
          hod_remarks?: string | null
          id?: string
          internships_guided?: number | null
          leadership_roles?: number | null
          loss_of_pay_days?: number | null
          number_of_awards?: number | null
          number_of_mentees?: number | null
          on_duty_days?: number | null
          online_courses_completed?: number | null
          overall_recommendations?: string | null
          parent_meetings_conducted?: number | null
          permission_hours?: number | null
          principal_remarks?: string | null
          projects_guided?: number | null
          qualification_upgradation?: boolean | null
          remedial_classes?: number | null
          research_papers_published?: number | null
          research_projects?: number | null
          reviewer_remarks?: string | null
          seminars_workshops_attended?: number | null
          seminars_workshops_organized?: number | null
          slow_learners_assisted?: number | null
          social_programs_participated?: number | null
          staff_name?: string
          strengths?: string | null
          total_score?: number | null
          value_added_courses_offered?: number | null
          workload_hours_per_week?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

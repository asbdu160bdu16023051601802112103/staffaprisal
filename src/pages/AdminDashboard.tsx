import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import Header from "@/components/Header";
import CertificateViewer from "@/components/CertificateViewer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Appraisal {
  id: string;
  created_at: string;
  staff_name: string;
  department: string;
  designation: string;
  academic_year: string;
  email_id: string | null;
  employee_id: string | null;
  total_score: number | null;
  [key: string]: unknown;
}

const AdminDashboard = () => {
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchAppraisals();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      navigate("/admin");
    }
  };

  const fetchAppraisals = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appraisals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load data");
    } else {
      setAppraisals((data as Appraisal[]) || []);
    }
    setLoading(false);
  };

  const handleExportExcel = () => {
    if (appraisals.length === 0) {
      toast.error("No data to export");
      return;
    }

    const exportData = appraisals.map(({ id, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff Appraisals");
    XLSX.writeFile(wb, `Staff_Appraisals_${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Excel file downloaded!");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this appraisal?")) return;
    const { error } = await supabase.from("appraisals").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Deleted");
      fetchAppraisals();
    }
  };

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to delete ALL appraisal data? This cannot be undone.")) return;
    const { error } = await supabase.from("appraisals").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      toast.error("Failed to clear data");
    } else {
      toast.success("All data cleared");
      setAppraisals([]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filtered = appraisals.filter(
    (a) =>
      a.staff_name.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase()) ||
      (a.employee_id || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-foreground">
            👑 Admin Panel - All Staff Records
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => navigate("/")} className="mode-badge-staff cursor-pointer text-sm">
              👤 Staff Mode
            </button>
            <button onClick={handleLogout} className="mode-badge-admin cursor-pointer text-sm">
              🔓 Logout
            </button>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={fetchAppraisals} className="submit-btn text-sm">
            🔄 Refresh
          </button>
          <button onClick={handleExportExcel} className="submit-btn text-sm bg-accent">
            📈 Export All to Excel
          </button>
          <button onClick={handleClearAll} className="submit-btn text-sm bg-destructive">
            🗑️ Clear All Data
          </button>
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="🔍 Search by name, department, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="section-card text-center">
            <p className="text-2xl font-bold text-primary">{appraisals.length}</p>
            <p className="text-sm text-muted-foreground">Total Submissions</p>
          </div>
          <div className="section-card text-center">
            <p className="text-2xl font-bold text-accent">
              {appraisals.length > 0
                ? Math.round(
                    appraisals.reduce((sum, a) => sum + (a.total_score || 0), 0) /
                      appraisals.length
                  )
                : 0}
            </p>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </div>
          <div className="section-card text-center">
            <p className="text-2xl font-bold text-primary">
              {new Set(appraisals.map((a) => a.department)).size}
            </p>
            <p className="text-sm text-muted-foreground">Departments</p>
          </div>
          <div className="section-card text-center">
            <p className="text-2xl font-bold text-accent">
              {appraisals.length > 0
                ? Math.max(...appraisals.map((a) => a.total_score || 0))
                : 0}
            </p>
            <p className="text-sm text-muted-foreground">Highest Score</p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-muted-foreground py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="section-card text-center py-10">
            <p className="text-muted-foreground">No appraisal records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="header-gradient text-primary-foreground">
                  <th className="px-3 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Staff Name</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Department</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Designation</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Year</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Employee ID</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Score</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-3 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-3 py-3 text-sm">{i + 1}</td>
                    <td className="px-3 py-3 text-sm font-medium">{a.staff_name}</td>
                    <td className="px-3 py-3 text-sm">{a.department}</td>
                    <td className="px-3 py-3 text-sm">{a.designation}</td>
                    <td className="px-3 py-3 text-sm">{a.academic_year}</td>
                    <td className="px-3 py-3 text-sm">{a.employee_id || "-"}</td>
                    <td className="px-3 py-3 text-sm font-bold text-primary">{a.total_score}/200</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="text-destructive hover:underline text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

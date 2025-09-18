import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";

interface User {
  type: "student" | "teacher";
  name: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userType: "student" | "teacher", credentials: { name: string; password: string }) => {
    // In a real app, you would validate credentials here
    setUser({
      type: userType,
      name: credentials.name
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.type === "student") {
    return <StudentDashboard studentName={user.name} onLogout={handleLogout} />;
  }

  return <TeacherDashboard teacherName={user.name} onLogout={handleLogout} />;
};

export default Dashboard;
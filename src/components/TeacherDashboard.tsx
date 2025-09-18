import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Users, 
  FileText, 
  Send,
  TrendingUp,
  LogOut,
  ShieldAlert,
  Flame,
  Waves,
  CloudRain
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TeacherDashboardProps {
  teacherName: string;
  onLogout: () => void;
}

export const TeacherDashboard = ({ teacherName, onLogout }: TeacherDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"alerts" | "progress" | "reports">("alerts");

  // Mock student data
  const students = [
    { id: 1, name: "Alice Johnson", progress: 75, lessonsCompleted: 3, quizAvg: 88 },
    { id: 2, name: "Bob Smith", progress: 50, lessonsCompleted: 2, quizAvg: 92 },
    { id: 3, name: "Carol Davis", progress: 100, lessonsCompleted: 4, quizAvg: 95 },
    { id: 4, name: "David Wilson", progress: 25, lessonsCompleted: 1, quizAvg: 85 },
  ];

  const emergencyTypes = [
    { 
      type: "earthquake", 
      name: "Earthquake", 
      icon: ShieldAlert, 
      message: "Alert: Earthquake detected. All students are safe. Stay calm and follow evacuation procedures. Will update further.",
      color: "destructive" as const
    },
    { 
      type: "fire", 
      name: "Fire Emergency", 
      icon: Flame, 
      message: "Alert: Fire emergency in the building. All students have been evacuated safely. Emergency services on site. Will update further.",
      color: "destructive" as const
    },
    { 
      type: "flood", 
      name: "Flood Warning", 
      icon: Waves, 
      message: "Alert: Flood warning issued. All students are secure in upper floors. No immediate danger. Will keep you updated.",
      color: "alert-warning" as const
    },
    { 
      type: "storm", 
      name: "Severe Weather", 
      icon: CloudRain, 
      message: "Alert: Severe weather conditions. All students are safely sheltered indoors. Classes continue normally. Will update further.",
      color: "alert-warning" as const
    }
  ];

  const sendAlert = (alertType: typeof emergencyTypes[0]) => {
    toast({
      title: "Alert Sent Successfully",
      description: `${alertType.name} alert has been sent to all parents.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">SafeSchool Teacher Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome, {teacherName}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-card border-r border-border p-6">
          <div className="space-y-2">
            {[
              { id: "alerts", label: "Emergency Alerts", icon: AlertTriangle },
              { id: "progress", label: "Student Progress", icon: TrendingUp },
              { id: "reports", label: "Admin Reports", icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(id as any)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "alerts" && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <h2 className="text-3xl font-bold">Emergency Alert System</h2>
              </div>
              
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Emergency Alert Protocol</CardTitle>
                  <CardDescription>
                    Use these buttons only during actual emergencies to send instant alerts to all parents.
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {emergencyTypes.map((emergency) => {
                  const IconComponent = emergency.icon;
                  return (
                    <Card key={emergency.type} className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <IconComponent className="h-8 w-8 text-destructive" />
                        <h3 className="text-xl font-semibold">{emergency.name}</h3>
                      </div>
                      
                      <div className="bg-muted p-3 rounded-md mb-4 text-sm">
                        <strong>Message:</strong> {emergency.message}
                      </div>
                      
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        onClick={() => sendAlert(emergency)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send {emergency.name} Alert
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Student Progress Overview</h2>
              
              <div className="grid gap-4">
                {students.map((student) => (
                  <Card key={student.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{student.name}</h3>
                      <Badge variant={student.progress >= 75 ? "default" : student.progress >= 50 ? "secondary" : "destructive"}>
                        {student.progress}% Complete
                      </Badge>
                    </div>
                    
                    <Progress value={student.progress} className="mb-4" />
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Lessons Completed</p>
                        <p className="font-semibold">{student.lessonsCompleted}/4</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quiz Average</p>
                        <p className="font-semibold">{student.quizAvg}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-semibold">
                          {student.progress >= 75 ? "Excellent" : student.progress >= 50 ? "Good" : "Needs Support"}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Admin Reports</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Class Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Students:</span>
                      <span className="font-semibold">{students.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Progress:</span>
                      <span className="font-semibold">
                        {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students at Risk:</span>
                      <span className="font-semibold text-destructive">
                        {students.filter(s => s.progress < 50).length}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Progress Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Send Report to Admin
                    </Button>
                    <Button className="w-full" variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Flag Student for Support
                    </Button>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Lesson Resources</h3>
                <p className="text-muted-foreground mb-4">
                  Download resources for offline teaching and distribution to students without computer access.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {["Earthquake Safety Pack", "Fire Safety Materials", "Flood Preparedness Kit", "First Aid Resources"].map((resource) => (
                    <Button key={resource} variant="outline" className="text-left justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {resource}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
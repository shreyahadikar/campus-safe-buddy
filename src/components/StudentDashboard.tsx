import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  TrendingUp, 
  Play, 
  Download,
  CheckCircle,
  LogOut
} from "lucide-react";

interface StudentDashboardProps {
  studentName: string;
  onLogout: () => void;
}

export const StudentDashboard = ({ studentName, onLogout }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"lessons" | "quizzes" | "badges" | "progress">("lessons");

  // Mock data
  const lessons = [
    { id: 1, title: "Earthquake Safety", completed: true, hasVideo: true },
    { id: 2, title: "Fire Safety & Evacuation", completed: true, hasVideo: true },
    { id: 3, title: "Flood Preparedness", completed: false, hasVideo: true },
    { id: 4, title: "First Aid Basics", completed: false, hasVideo: true }
  ];

  const quizzes = [
    { id: 1, title: "Earthquake Quiz", score: 85, completed: true },
    { id: 2, title: "Fire Safety Quiz", score: 92, completed: true },
    { id: 3, title: "Flood Quiz", score: null, completed: false },
    { id: 4, title: "First Aid Quiz", score: null, completed: false }
  ];

  const badges = [
    { id: 1, title: "Earthquake Expert", earned: true, description: "Completed earthquake safety course" },
    { id: 2, title: "Fire Safety Hero", earned: true, description: "Scored 90+ on fire safety quiz" },
    { id: 3, title: "Safety Scholar", earned: false, description: "Complete all lessons" },
    { id: 4, title: "Quiz Master", earned: false, description: "Score 95+ on all quizzes" }
  ];

  const overallProgress = 50;
  const completedLessons = lessons.filter(l => l.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">SafeSchool</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {studentName}</p>
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
              { id: "lessons", label: "Lessons", icon: BookOpen },
              { id: "quizzes", label: "Quizzes", icon: HelpCircle },
              { id: "badges", label: "Badges", icon: Award },
              { id: "progress", label: "Progress", icon: TrendingUp }
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
          {activeTab === "lessons" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Safety Lessons</h2>
              <div className="grid gap-4">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      {lesson.completed ? (
                        <CheckCircle className="h-6 w-6 text-secondary" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-muted-foreground" />
                      )}
                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Video lesson with downloadable materials
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Knowledge Quizzes</h2>
              <div className="grid gap-4">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {quiz.completed 
                            ? `Score: ${quiz.score}%` 
                            : "Not completed yet"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {quiz.completed && (
                          <Badge variant={quiz.score! >= 80 ? "default" : "secondary"}>
                            {quiz.score}%
                          </Badge>
                        )}
                        <Button size="sm" disabled={quiz.completed}>
                          {quiz.completed ? "Completed" : "Start Quiz"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Achievement Badges</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {badges.map((badge) => (
                  <Card key={badge.id} className={`p-4 ${badge.earned ? 'bg-secondary/10' : 'opacity-50'}`}>
                    <div className="flex items-center space-x-4">
                      <Award className={`h-8 w-8 ${badge.earned ? 'text-accent' : 'text-muted-foreground'}`} />
                      <div>
                        <h3 className="font-semibold">{badge.title}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        {badge.earned && (
                          <Badge className="mt-2">Earned!</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Learning Progress</h2>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Overall Progress</h3>
                <Progress value={overallProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {overallProgress}% complete - {completedLessons} of {lessons.length} lessons finished
                </p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Lessons Completed</h3>
                  <div className="text-3xl font-bold text-secondary">{completedLessons}</div>
                  <p className="text-sm text-muted-foreground">out of {lessons.length} total lessons</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Average Quiz Score</h3>
                  <div className="text-3xl font-bold text-primary">88.5%</div>
                  <p className="text-sm text-muted-foreground">across completed quizzes</p>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
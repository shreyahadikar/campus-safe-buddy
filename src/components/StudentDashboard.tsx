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
import { LessonDetail } from "./LessonDetail";

// Import poster images
import earthquakePoster from "@/assets/earthquake-safety-poster.jpg";
import firePoster from "@/assets/fire-safety-poster.jpg";
import floodPoster from "@/assets/flood-safety-poster.jpg";
import firstAidPoster from "@/assets/first-aid-poster.jpg";
import weatherPoster from "@/assets/weather-safety-poster.jpg";
import proceduresPoster from "@/assets/emergency-procedures-poster.jpg";
import preparednessPoster from "@/assets/preparedness-kit-poster.jpg";

interface StudentDashboardProps {
  studentName: string;
  onLogout: () => void;
}

export const StudentDashboard = ({ studentName, onLogout }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"lessons" | "quizzes" | "badges" | "progress">("lessons");
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  // Updated lessons data with 7 lessons
  const lessons = [
    { 
      id: 1, 
      title: "Earthquake Safety Fundamentals", 
      description: "Learn the essential 'Drop, Cover, and Hold On' technique and earthquake safety protocols for schools.",
      completed: true, 
      hasVideo: true,
      videoUrl: "/videos/earthquake-safety.mp4",
      posterUrl: earthquakePoster,
      duration: "8:45",
      objectives: [
        "Understand how earthquakes occur and their effects",
        "Master the 'Drop, Cover, and Hold On' technique",
        "Identify safe spots and hazards in classroom environments",
        "Learn post-earthquake safety procedures"
      ]
    },
    { 
      id: 2, 
      title: "Fire Safety & Evacuation Procedures", 
      description: "Master fire safety protocols, evacuation routes, and emergency response procedures.",
      completed: true, 
      hasVideo: true,
      videoUrl: "/videos/fire-safety.mp4",
      posterUrl: firePoster,
      duration: "10:20",
      objectives: [
        "Recognize fire hazards and prevention measures",
        "Learn proper evacuation procedures and routes",
        "Understand when and how to use fire safety equipment",
        "Practice stop, drop, and roll technique"
      ]
    },
    { 
      id: 3, 
      title: "Flood Preparedness & Water Safety", 
      description: "Understanding flood risks, safety measures, and emergency response during flooding events.",
      completed: false, 
      hasVideo: true,
      videoUrl: "/videos/flood-safety.mp4",
      posterUrl: floodPoster,
      duration: "7:30",
      objectives: [
        "Identify flood warning signs and risks",
        "Learn safe evacuation to higher ground",
        "Understand water safety and rescue procedures",
        "Know how to stay informed during flood events"
      ]
    },
    { 
      id: 4, 
      title: "First Aid Basics for Students", 
      description: "Essential first aid skills every student should know in emergency situations.",
      completed: false, 
      hasVideo: true,
      videoUrl: "/videos/first-aid.mp4",
      posterUrl: firstAidPoster,
      duration: "12:15",
      objectives: [
        "Learn to assess emergency situations safely",
        "Master basic wound care and bandaging",
        "Understand when and how to call for help",
        "Practice the recovery position technique"
      ]
    },
    { 
      id: 5, 
      title: "Severe Weather Safety", 
      description: "Staying safe during thunderstorms, tornadoes, and other severe weather events.",
      completed: false, 
      hasVideo: true,
      videoUrl: "/videos/weather-safety.mp4",
      posterUrl: weatherPoster,
      duration: "9:10",
      objectives: [
        "Recognize severe weather warning signs",
        "Learn indoor and outdoor safety positions",
        "Understand lightning and tornado safety",
        "Know how to monitor weather alerts"
      ]
    },
    { 
      id: 6, 
      title: "Emergency Communication & Procedures", 
      description: "School emergency protocols, communication systems, and assembly procedures.",
      completed: false, 
      hasVideo: true,
      videoUrl: "/videos/emergency-procedures.mp4",
      posterUrl: proceduresPoster,
      duration: "6:45",
      objectives: [
        "Understand school emergency communication systems",
        "Learn proper assembly and attendance procedures",
        "Know how to follow teacher and administrator instructions",
        "Practice calm and orderly evacuation techniques"
      ]
    },
    { 
      id: 7, 
      title: "Family Emergency Preparedness", 
      description: "Building family emergency kits and creating home disaster preparedness plans.",
      completed: false, 
      hasVideo: true,
      videoUrl: "/videos/family-preparedness.mp4",
      posterUrl: preparednessPoster,
      duration: "11:30",
      objectives: [
        "Create a comprehensive family emergency kit",
        "Develop family communication and meeting plans",
        "Learn about home hazard identification and mitigation",
        "Understand the importance of regular drills and practice"
      ]
    }
  ];

  const quizzes = [
    { id: 1, title: "Earthquake Safety Quiz", score: 85, completed: true },
    { id: 2, title: "Fire Safety Quiz", score: 92, completed: true },
    { id: 3, title: "Flood Safety Quiz", score: null, completed: false },
    { id: 4, title: "First Aid Quiz", score: null, completed: false },
    { id: 5, title: "Severe Weather Quiz", score: null, completed: false },
    { id: 6, title: "Emergency Procedures Quiz", score: null, completed: false },
    { id: 7, title: "Family Preparedness Quiz", score: null, completed: false }
  ];

  const badges = [
    { id: 1, title: "Earthquake Expert", earned: true, description: "Completed earthquake safety course" },
    { id: 2, title: "Fire Safety Hero", earned: true, description: "Scored 90+ on fire safety quiz" },
    { id: 3, title: "Weather Watcher", earned: false, description: "Complete severe weather lesson" },
    { id: 4, title: "First Aid Certified", earned: false, description: "Complete first aid training" },
    { id: 5, title: "Safety Scholar", earned: false, description: "Complete all 7 lessons" },
    { id: 6, title: "Quiz Master", earned: false, description: "Score 95+ on all quizzes" }
  ];

  const handleLessonClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
  };

  const handleLessonComplete = (lessonId: number) => {
    setCompletedLessons(prev => [...prev, lessonId]);
    setSelectedLessonId(null);
  };

  const handleBackToLessons = () => {
    setSelectedLessonId(null);
  };

  const selectedLesson = lessons.find(l => l.id === selectedLessonId);

  const overallProgress = Math.round((completedLessons.length / lessons.length) * 100);
  const completedLessonsCount = completedLessons.length;

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
          {selectedLesson ? (
            <LessonDetail 
              lesson={{
                ...selectedLesson,
                completed: completedLessons.includes(selectedLesson.id)
              }}
              onBack={handleBackToLessons}
              onComplete={handleLessonComplete}
            />
          ) : (
            <>
              {activeTab === "lessons" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Safety Theory Lessons</h2>
                  <p className="text-muted-foreground">Complete all 7 comprehensive safety lessons with videos and downloadable materials.</p>
                  
                  <div className="grid gap-4">
                    {lessons.map((lesson) => (
                      <Card key={lesson.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="h-6 w-6 text-secondary" />
                            ) : (
                              <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs font-bold">
                                {lesson.id}
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{lesson.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>📹 Video: {lesson.duration}</span>
                                <span>📄 Downloadable Poster</span>
                                <span>📋 {lesson.objectives.length} Learning Objectives</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleLessonClick(lesson.id)}
                              variant={completedLessons.includes(lesson.id) ? "outline" : "default"}
                            >
                              {completedLessons.includes(lesson.id) ? "Review" : "Start Lesson"}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!selectedLesson && activeTab === "quizzes" && (
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

          {!selectedLesson && activeTab === "badges" && (
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

          {!selectedLesson && activeTab === "progress" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Learning Progress</h2>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Overall Progress</h3>
                <Progress value={overallProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  {overallProgress}% complete - {completedLessonsCount} of {lessons.length} lessons finished
                </p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Lessons Completed</h3>
                  <div className="text-3xl font-bold text-secondary">{completedLessonsCount}</div>
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Play, 
  Download, 
  CheckCircle,
  FileText,
  Video,
  Image
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  objectives: string[];
  completed: boolean;
}

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (lessonId: number) => void;
}

export const LessonDetail = ({ lesson, onBack, onComplete }: LessonDetailProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCompleteLesson = () => {
    onComplete(lesson.id);
  };

  const handleDownloadPoster = () => {
    // In a real app, this would trigger an actual download
    const link = document.createElement('a');
    link.href = lesson.posterUrl;
    link.download = `${lesson.title.replace(/\s+/g, '_')}_Poster.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lessons
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Lesson {lesson.id}: {lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>
        {lesson.completed && (
          <Badge className="bg-secondary text-secondary-foreground">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Lesson Video
                <Badge variant="outline" className="ml-2">{lesson.duration}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {!isVideoPlaying ? (
                  <div className="text-center">
                    <Button 
                      size="lg"
                      onClick={() => setIsVideoPlaying(true)}
                      className="mb-4"
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Play Lesson Video
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Click to start the {lesson.title} educational video
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-pulse mb-4">
                        <Video className="h-16 w-16 mx-auto mb-2" />
                        <p className="text-lg font-semibold">Video Playing...</p>
                        <p className="text-sm opacity-80">Educational content for {lesson.title}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsVideoPlaying(false)}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Pause Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Educational Poster */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Educational Poster
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={lesson.posterUrl} 
                  alt={`${lesson.title} Educational Poster`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button 
                onClick={handleDownloadPoster}
                className="w-full"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Poster
              </Button>
              <p className="text-xs text-muted-foreground">
                High-quality poster for classroom display and offline learning
              </p>
            </CardContent>
          </Card>

          {/* Lesson Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Watch Video</span>
                  <CheckCircle className={`h-4 w-4 ${isVideoPlaying ? 'text-secondary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Review Objectives</span>
                  <CheckCircle className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Download Materials</span>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              {!lesson.completed && (
                <Button 
                  onClick={handleCompleteLesson}
                  className="w-full"
                  disabled={!isVideoPlaying}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Lesson Transcript
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Activity Worksheets
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Teacher Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
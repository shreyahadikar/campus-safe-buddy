import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, GraduationCap, Users } from "lucide-react";

interface LoginPageProps {
  onLogin: (userType: "student" | "teacher", credentials: { name: string; password: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null);
  const [credentials, setCredentials] = useState({ name: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType && credentials.name && credentials.password) {
      onLogin(userType, credentials);
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">SafeSchool</h1>
            <p className="text-muted-foreground mt-2">
              Disaster Preparedness & Safety Education Platform
            </p>
          </div>

          <div className="space-y-4">
            <Card 
              className="cursor-pointer transition-colors hover:bg-muted/50 border-2 hover:border-primary/50"
              onClick={() => setUserType("student")}
            >
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">I'm a Student</h3>
                    <p className="text-sm text-muted-foreground">
                      Access lessons, quizzes, and track progress
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-colors hover:bg-muted/50 border-2 hover:border-primary/50"
              onClick={() => setUserType("teacher")}
            >
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">I'm a Teacher</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage alerts, monitor progress, and access resources
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {userType === "student" ? (
              <GraduationCap className="h-12 w-12 text-primary" />
            ) : (
              <Users className="h-12 w-12 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {userType === "student" ? "Student" : "Teacher"} Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access SafeSchool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={credentials.name}
                onChange={(e) => setCredentials(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Sign In
              </Button>
              <Button type="button" variant="outline" onClick={() => setUserType(null)}>
                Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
import type { Metadata } from "next";
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EduBridge Community",
  description: "Join our global community of learners and educators",
};

const trendingTopics = [
  { topic: "Mathematics Help", discussions: 124, participants: 45 },
  { topic: "Language Exchange", discussions: 98, participants: 62 },
  { topic: "Coding Best Practices", discussions: 85, participants: 39 },
  { topic: "Study Tips", discussions: 72, participants: 110 },
];

const topContributors = [
  { name: "John Doe", role: "Math Tutor", contributions: 450, image: "https://i.pravatar.cc/150?u=john" },
  { name: "Sarah Smith", role: "Coding Tutor", contributions: 390, image: "https://i.pravatar.cc/150?u=sarah" },
  { name: "David Wilson", role: "Language Expert", contributions: 320, image: "https://i.pravatar.cc/150?u=david" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Learn, Share, and Grow <span className="text-primary italic">Together</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of learners and educators in a space designed for collaboration and mutual growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-8">Join the Community</Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">Browse Discussions</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg bg-emerald-50 dark:bg-emerald-950/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-xl flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Discussion Forums</h3>
                  <p className="text-sm text-muted-foreground mb-4">Engage in deep dives on subjects you&apos;re passionate about.</p>
                  <Button variant="link" className="p-0 text-emerald-600 h-auto">
                    Explore Forums <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-blue-50 dark:bg-blue-950/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Study Groups</h3>
                  <p className="text-sm text-muted-foreground mb-4">Find partners and collaborate on challenging projects.</p>
                  <Button variant="link" className="p-0 text-blue-600 h-auto">
                    Find a Group <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Trending Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {trendingTopics.map((topic, idx) => (
                    <div key={idx} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div>
                        <h4 className="font-bold mb-1">{topic.topic}</h4>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>{topic.discussions} discussions</span>
                          <span>{topic.participants} members</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-amber-500" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {topContributors.map((user, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{user.contributions}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Points</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">View Leaderboard</Button>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-xl font-bold mb-2">Community Rewards</h3>
                <p className="text-sm opacity-90 mb-6">Earn badges and discounts by helping others in the community.</p>
                <Button variant="secondary" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

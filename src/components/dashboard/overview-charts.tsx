"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardCharts() {
  const data = [
    { name: "Mon", sessions: 2 },
    { name: "Tue", sessions: 4 },
    { name: "Wed", sessions: 3 },
    { name: "Thu", sessions: 5 },
    { name: "Fri", sessions: 2 },
    { name: "Sat", sessions: 1 },
    { name: "Sun", sessions: 0 },
  ];

  const maxSessions = Math.max(...data.map(d => d.sessions));

  const categoryData = [
    { name: "Math", value: 40, color: "bg-blue-500" },
    { name: "Physics", value: 30, color: "bg-emerald-500" },
    { name: "English", value: 20, color: "bg-amber-500" },
    { name: "Others", value: 10, color: "bg-indigo-500" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="shadow-sm border-primary/5">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-end justify-between gap-2 pt-4">
            {data.map((item) => (
              <div key={item.name} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-primary/20 rounded-t-mg hover:bg-primary/40 transition-all duration-300 relative group"
                  style={{ height: `${(item.sessions / maxSessions) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.sessions} sessions
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-primary/5">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Sessions by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex flex-col justify-center space-y-4">
            {categoryData.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span>{cat.name}</span>
                  <span>{cat.value}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${cat.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function DriverHome() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-background rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Driver Fatigue Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your drivers fatigue levels in real-time.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ClockIcon className="h-5 w-5 text-muted-foreground" />
            <span>Last updated: 5 min ago</span>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fatigue Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative w-full h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-green-500">Normal</div>
              </div>
              <Progress value={30} className="h-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Fatigue History</CardTitle>
          </CardHeader>
          <CardContent>
            <LinechartChart className="w-full aspect-[9/4]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fatigue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">3.2</div>
              <div className="text-muted-foreground">Average Fatigue</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">8</div>
              <div className="text-muted-foreground">Fatigue Alerts</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">-15%</div>
              <div className="text-muted-foreground">Fatigue Trend</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">92%</div>
              <div className="text-muted-foreground">Fatigue Reduction</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Fatigue Prevention Tips</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4">
              <CoffeeIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Stay Hydrated</h3>
                <p className="text-muted-foreground">
                  Drink plenty of water throughout the day to stay alert and focused.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MoonIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Get Enough Rest</h3>
                <p className="text-muted-foreground">
                  Ensure you get adequate sleep and take regular breaks to recharge.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <DumbbellIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Exercise Regularly</h3>
                <p className="text-muted-foreground">
                  Incorporate light exercises and stretches to boost energy levels.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <AlarmClockIcon className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">Manage Stress</h3>
                <p className="text-muted-foreground">
                  Practice relaxation techniques to reduce fatigue and improve focus.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AlarmClockIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
    </svg>
  )
}


function ClockIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function CoffeeIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  )
}


function DumbbellIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  )
}


function LinechartChart(props:any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function MoonIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function RefreshCwIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}


// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }
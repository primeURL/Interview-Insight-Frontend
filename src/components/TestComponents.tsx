import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function TestComponents() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">shadcn/ui Components Test</h1>

      {/* Card Component */}
      <Card>
        <CardHeader>
          <CardTitle>Card Component</CardTitle>
          <CardDescription>This is a test card with shadcn/ui styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Card content goes here. This demonstrates the Card component is working correctly.
          </p>
        </CardContent>
      </Card>

      {/* Button Component */}
      <Card>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </CardContent>
      </Card>

      {/* Input Component */}
      <Card>
        <CardHeader>
          <CardTitle>Input Component</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
        </CardContent>
      </Card>

      {/* Textarea Component */}
      <Card>
        <CardHeader>
          <CardTitle>Textarea Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message here" rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Checkbox Component */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={checked}
              onCheckedChange={(checked) => setChecked(checked as boolean)}
            />
            <Label htmlFor="terms" className="cursor-pointer">
              Accept terms and conditions (checked: {checked ? 'Yes' : 'No'})
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Alert Component */}
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert component from shadcn/ui.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>
          This is a destructive/error alert component from shadcn/ui.
        </AlertDescription>
      </Alert>

      {/* Responsive Test */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Grid Test</CardTitle>
          <CardDescription>Testing Tailwind responsive utilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-md">Column 1</div>
            <div className="p-4 bg-secondary/10 rounded-md">Column 2</div>
            <div className="p-4 bg-accent rounded-md">Column 3</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

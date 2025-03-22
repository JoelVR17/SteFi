import Link from "next/link";
import { Lock, ArrowLeft, LogIn, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <div className="container w-full flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold">Unauthorized</CardTitle>
          <p className="text-muted-foreground">
            You don't have permission to access this resource
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4 pt-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Error Code: 401</p>
            <p className="text-sm text-muted-foreground">
              This error occurs when you try to access a resource that requires
              authentication or when your current authentication is invalid or
              expired.
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>You might want to:</p>
            <ul className="list-disc pl-5 text-left space-y-1">
              <li>Log in with valid credentials</li>
              <li>Check if your session has expired</li>
              <li>Verify you have the necessary permissions</li>
              <li>
                Contact your administrator if you believe this is an error
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/support">
              <HelpCircle className="mr-2 h-4 w-4" />
              Get Help
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

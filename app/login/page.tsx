import { LogIn } from "lucide-react"

import { Button, Input, Separator } from "@/components/ui"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

const logoSvg = "https://www.figma.com/api/mcp/asset/9d3f9041-f7b4-406d-a20c-6774c276a5f3"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full border border-border">
      {/* Left panel */}
      <div className="flex flex-1 flex-col justify-between overflow-hidden bg-secondary px-8 py-8 pr-16">
        <div className="flex items-center gap-2">
          <img src={logoSvg} alt="" className="size-6" />
          <span className="text-xl font-semibold tracking-tight text-foreground">Acme Inc</span>
        </div>
        <p className="text-base text-foreground">
          &ldquo;This library has saved me countless hours of work and helped me deliver stunning
          designs to my clients faster than ever before.&rdquo; &mdash; Sofia Davis
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background p-8">
        <div className="flex w-full max-w-[350px] flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">
            <Input type="email" placeholder="name@example.com" />

            <Button variant="default" size="default" className="w-full">
              Sign in with Email
            </Button>

            <div className="flex items-center gap-6">
              <Separator className="flex-1" />
              <span className="text-sm font-medium text-muted-foreground">Or continue with</span>
              <Separator className="flex-1" />
            </div>

            <Button variant="outline" size="default" className="w-full">
              <GithubIcon />
              Github
            </Button>
          </div>

          {/* Terms */}
          <p className="text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <Button variant="ghost" size="default">
          <LogIn />
          Login
        </Button>
      </div>
    </div>
  )
}

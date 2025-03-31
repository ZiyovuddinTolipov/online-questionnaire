import { LoginForm } from "@/components/common/login-form"

export default function LoginPage() {
    return (
        <div className="flex min-h-[100svh] h-full flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-md">
                <LoginForm />
            </div>
        </div>
    )
}


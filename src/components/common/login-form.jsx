import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import googleIcon from "@/assets/google.png";
import appleIcon from "@/assets/apple.png";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {toast} from "react-hot-toast"
export function LoginForm({ className, ...props }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        try {
            const response = await fetch("https://employmentsystem1.pythonanywhere.com/login/", {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(username + ":" + password),
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user?.status);
                localStorage.setItem("name", data.user?.user?.first_name ||  data.user?.user?.username);
                toast.success("Login successful.");
                if(data.user?.status == "admin"){
                    navigate("/admin");
                }else if(data.user?.status == "employer"){
                    navigate("/employer");
                }else {
                    navigate("/job_seekers");
                }
            }else {
                toast.error("Login failed. Please check your credentials.");

            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Xush kelibsiz</h1>
                                <p className="text-balance text-muted-foreground">Hisobingizga kiring</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" placeholder="username" required onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Parol</Label>
                                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                                        Parolni unutdingizmi?
                                    </a>
                                </div>
                                <Input id="password" type="text" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button type="submit" className="w-full">
                                Hisobga kirish
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">Yoki davom eting</span>
                            </div>
                            <div className="text-center text-sm">
                                Hisobingiz yo&apos;qmi?
                                <Link to='/register' className="underline underline-offset-4">
                                    Ro&apos;yxatdan o&apos;tish
                                </Link>
                            </div>
                        </div>
                    </form>
                    {/* <div className="relative hidden bg-muted md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div> */}
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Davom etish tugmasini bosish orqali siz <a href="#">Xizmat shartlari</a> va <a href="#">Maxfiylik siyosatimizga rozilik bildirasiz</a>.
            </div>
        </div>
    )
}


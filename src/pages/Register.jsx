import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function Register({ className, ...props }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState("job_seeker");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("https://employmentsystem1.pythonanywhere.com/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    first_name: firstName,
                    password,
                    address,
                    phone_number: phoneNumber,
                    status,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user?.status);
                localStorage.setItem("name", data.user?.user?.first_name ||  data.user?.user?.username);
                toast.success("Register successful.");
                navigate("/" + data.user?.status);
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };
    return (
        <div className="flex min-h-[100svh] h-full flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-md">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden">
                        <CardContent className="">
                            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Xush kelibsiz</h1>
                                        <p className="text-balance text-muted-foreground">Yangi Hisob Yaratish</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" type="text" placeholder="username" required onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="first_name">Ism</Label>
                                        <Input id="first_name" type="text" placeholder="Ism" required onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Manzil</Label>
                                        <Input id="address" type="text" placeholder="Manzil" required onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone_number">Telefon raqami</Label>
                                        <Input id="phone_number" type="text" placeholder="Telefon raqami" required onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select id="status" value={status} onValueChange={(value) => setStatus(value)} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="job_seeker">Job Seeker</SelectItem>
                                                <SelectItem value="employer">Employer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                            <Label htmlFor="password">Parol</Label>
                                        <Input id="password" type="text" required onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Hisob yaratish
                                    </Button>
                                    <div className="text-center text-sm">
                                        Hisobingiz bormi? &nbsp;
                                        <a href="#" className="underline underline-offset-4">
                                             Hisobga kirish
                                        </a>
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
            </div>
        </div>
    )
}


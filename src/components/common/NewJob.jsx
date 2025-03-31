"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
// Form validation schema
const formSchema = z.object({
    title: z.string().min(2, { message: "Ish nomi kamida 2 ta belgidan iborat bo'lishi kerak" }),
    description: z.string().min(10, { message: "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak" }),
    location: z.string().min(2, { message: "Joylashuv kamida 2 ta belgidan iborat bo'lishi kerak" }),
    salary: z.string().refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, {
        message: "Maosh musbat son bo'lishi kerak",
    }),
    job_type_id: z.string().refine((val) => !isNaN(Number.parseInt(val)), {
        message: "Ish turini tanlang",
    }),
})

const NewJob = () => {
    const navigate = useNavigate()
    const [jobTypes, setJobTypes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingJobTypes, setIsLoadingJobTypes] = useState(false)

    // Initialize form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
            salary: "",
            job_type_id: 1,
        },
    })

    // Fetch job types for the dropdown
    const fetchJobTypes = async () => {
        try {
            setIsLoadingJobTypes(true)
            const res = await axios.get("https://employmentsystem1.pythonanywhere.com/job-types/", {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            setJobTypes(res.data)
            setIsLoadingJobTypes(false)
        } catch (error) {
            console.error("Error fetching job types:", error)
            setIsLoadingJobTypes(false)
            toast.error('Ish turlarini yuklashda xatolik yuz berdi')
        }
    }

    useEffect(() => {
        fetchJobTypes()
    }, [])

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            setIsLoading(true)

            // Convert salary to string and job_type_id to integer
            const formattedData = {
                ...data,
                salary: data.salary.toString(),
                job_type_id: Number.parseInt(data.job_type_id),
            }

            await axios.post("https://employmentsystem1.pythonanywhere.com/jobs/", formattedData, {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })

            toast({
                title: "Muvaffaqiyatli yaratildi",
                description: "Yangi ish e'loni muvaffaqiyatli yaratildi",
            })

            // Reset form and navigate back
            form.reset()
            if(localStorage.getItem("role") == "employer"){
                navigate("/employer") 
            }else if(localStorage.getItem("role") == "admin"){
                navigate("/jobs")
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error creating job:", error)
            setIsLoading(false)
            toast({
                variant: "destructive",
                title: "Xatolik yuz berdi",
                description: error.response?.data?.message || "Ish e'lonini yaratishda xatolik yuz berdi",
            })
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Button variant="ghost" className="mr-4 p-0 h-auto" onClick={() => navigate(-1)} disabled={isLoading}>
                    <ArrowLeft className="h-5 w-5 mr-1" />
                </Button>
                <h1 className="text-2xl font-bold">Yangi ish e'lonini yaratish</h1>
            </div>

            <Card className="max-w-3xl ">
                <CardHeader>
                    <CardTitle>Ish ma'lumotlari</CardTitle>
                    <CardDescription>Yangi ish e'loni yaratish uchun quyidagi ma'lumotlarni to'ldiring</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ish nomi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masalan: Frontend dasturchi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tavsif</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Ish haqida batafsil ma'lumot..." className="min-h-[150px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Joylashuv</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Masalan: Toshkent" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="salary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Maosh (so'm)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Masalan: 5000000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="job_type_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ish turi</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Ish turini tanlang" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {isLoadingJobTypes ? (
                                                    <div className="flex items-center justify-center py-2">
                                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                        Yuklanmoqda...
                                                    </div>
                                                ) : (
                                                    jobTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.id.toString()}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="flex justify-end gap-4 px-0 pt-4">
                                <Button type="button" variant="outline" onClick={() =>  navigate(-1)} disabled={isLoading}>
                                    Bekor qilish
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Saqlash
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewJob


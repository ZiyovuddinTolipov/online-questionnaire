"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Calendar, User, Briefcase } from "lucide-react"

const JobsDetails = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    const getJobById = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://employmentsystem1.pythonanywhere.com/jobs/${id}/`, {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            setJob(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getJobById()
    }, [id])

    // Format salary to Uzbek som
    const formatSalary = (salary) => {
        return new Intl.NumberFormat("uz-UZ").format(salary) + " so'm"
    }

    // Format date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date)
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-0">
                <Card className="overflow-hidden">
                    <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <Skeleton className="h-8 w-64 mb-2" />
                                <div className="flex items-center mt-2">
                                    <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                            <Skeleton className="h-10 w-32 rounded-md" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <Skeleton className="h-48 w-full rounded-md mb-4" />
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-3/4 mb-4" />

                                <Skeleton className="h-6 w-40 mb-2" />
                                <div className="flex items-center mb-2">
                                    <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center mb-2">
                                    <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                                <div className="flex items-center">
                                    <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                    <Skeleton className="h-4 w-36" />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <Skeleton className="h-6 w-32 mb-3" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-4" />

                                <Skeleton className="h-6 w-40 mb-3" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4">
                                        <Skeleton className="h-5 w-24 mb-2" />
                                        <Skeleton className="h-6 w-full" />
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <Skeleton className="h-5 w-24 mb-2" />
                                        <Skeleton className="h-6 w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!job) {
        return <div className="container mx-auto px-4 py-8">Ish topilmadi</div>
    }

    return (
        <div className="container mx-auto px-4 py-2">
            <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                            <div className="flex items-center mt-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{job.location}</span>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                            <DollarSign className="h-5 w-5 mr-1 inline" />
                            <span className="font-semibold">{formatSalary(job.salary)}</span>
                        </Badge>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <div className="mb-6">
                                {job.job_type.pic1 ? (
                                    <div className="max-w-[240px] mx-auto">

                                        <img
                                            src={job.job_type.pic1}
                                            alt={job.job_type.name}
                                            className="w-full h-auto rounded-lg object-cover mb-4 "
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-muted-foreground">Rasm topilmadi</span>
                                    </div>
                                )}

                                <h3 className="text-lg font-semibold mb-2">Ish turi</h3>
                                <Badge className="mb-2">{job.job_type.name}</Badge>
                                <p className="text-sm text-muted-foreground">{job.job_type.description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Qo'shimcha ma'lumot</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>Ish beruvchi: {job.employer.username}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>Ish ID: {job.id}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span>E'lon qilingan: {formatDate(job.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-semibold mb-3">Ish tavsifi</h3>
                            <p className="text-muted-foreground whitespace-pre-line mb-6">{job.description}</p>

                            <h3 className="text-lg font-semibold mb-3">Asosiy ma'lumotlar</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Ish joyi</p>
                                    <p className="font-medium text-lg">{job.location}</p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Maosh</p>
                                    <p className="font-medium text-lg text-primary">{formatSalary(job.salary)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default JobsDetails


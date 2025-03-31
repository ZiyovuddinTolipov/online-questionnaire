"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { DollarSign, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [jobType, setJobType] = useState(null);
    const [jobTypes, setJobTypes] = useState([])
    const getAllJobs = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://employmentsystem1.pythonanywhere.com/jobs/", {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            setJobs(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const fetchJobTypes = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://employmentsystem1.pythonanywhere.com/job-types/", {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            setJobTypes(res.data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching job types:", error)
            setLoading(false)
        }
    }
    const getAllJobsByType = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://employmentsystem1.pythonanywhere.com/job-types/${jobType}/jobs/`, {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            setJobs(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (jobType) {
            getAllJobsByType()
        } else {
            getAllJobs()
        }
    }, [jobType])
    useEffect(() => {
        fetchJobTypes()
    }, [])
    // Format salary to Uzbek som
    const formatSalary = (salary) => {
        return new Intl.NumberFormat("uz-UZ").format(salary) + " so'm"
    }
    return (
        <div className="container mx-auto px-4 py-8 pt-0">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-6">Ish e'lonlar</h1>
                <Select onValueChange={(value) => {
                    setJobType(value)
                    console.log(value)
                }} className="mb-6">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={jobType ? jobTypes.find(type => type.id === jobType)?.name : "Barchasi"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null}>
                            Barchasi
                        </SelectItem>
                        {jobTypes.map((jobType) => (
                            <SelectItem key={jobType.id} value={jobType.id}>
                                {jobType.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <Card
                            key={index}
                            className={`overflow-hidden ${index >= 2 && "md:hidden"} ${index >= 4 && "hidden md:block lg:hidden"}`}
                        >
                            <CardHeader className="pb-2">
                                <Skeleton className="h-6 w-3/4" />
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <div className="flex items-center">
                                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                        <Skeleton className="h-4 w-2/3" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-full rounded-md" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {
                        localStorage.getItem("role") === "employer" &&
                        <Link className="bg-transparent border-dashed border-2 border-blue-500 rounded-lg" to='jobs/new'>
                            <div className="pb-2 flex justify-center items-center h-full">
                                <h3 className="text-2xl font-medium py-4">Ish qo'shish</h3>
                            </div>
                        </Link>
                    }
                    {jobs.map((job) => (
                        <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="space-y-3">
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <DollarSign className="h-4 w-4 mr-2" />
                                        <span className="font-medium text-primary">{formatSalary(job.salary)}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link to={`jobs/${job.id}`} className="btn btn-primary w-full">
                                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors">
                                        Ishni ko'rish
                                    </button></Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Jobs


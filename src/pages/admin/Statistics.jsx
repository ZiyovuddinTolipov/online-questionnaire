import { Card, CardHeader } from '@/components/ui/card'
import axios from 'axios'
import { FileText, FileUser } from 'lucide-react'
import { useEffect, useState } from 'react'

const Statistics = () => {
    const [stat, setStat] = useState({})
    const getStatistics = async () => {
        try {
            const res = await axios.post("https://employmentsystem1.pythonanywhere.com/admin-stats/", {}, {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                }
            })
            setStat(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getStatistics()
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2'>
            <Card className=" w-full p-4">
                <div className="flex items-center">
                    <FileUser size={72} strokeWidth={1} absoluteStrokeWidth/>
                    <div>
                        <p>Arizalar soni</p>
                        <p className='text-2xl'>{stat.total_applications } ta</p>
                    </div>
                </div>
            </Card>
            <Card className=" w-full p-4">
                <div className="flex items-center">
                    <FileText size={72} strokeWidth={1} absoluteStrokeWidth />
                    <div>
                        <p>Ish e'lonlar soni</p>
                        <p className='text-2xl'>{stat.total_jobs} ta</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Statistics
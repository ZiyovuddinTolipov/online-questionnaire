import React from "react"
import { motion } from "framer-motion"
import { ClipboardList, Users, BarChart3, ShieldCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <a href="/" className="flex items-center gap-2">
                        <ClipboardList className="h-6 w-6" />
                        <span className="text-xl font-bold">So'rovEdu</span>
                    </a>
                    <nav className="hidden md:flex gap-6">
                        <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
                            Xususiyatlar
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
                            Narxlar
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
                            Resurslar
                        </a>
                        <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
                            Aloqa
                        </a>
                    </nav>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                        >
                            Kirish
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            Ro'yxatdan o'tish
                        </a>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div className="flex flex-col justify-center space-y-4" variants={itemVariants}>
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Dars mazmunini baholash uchun onlayn so'rov vositasi
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Ta'lim mazmuni haqida qimmatli fikr-mulohazalarni to'plash uchun so'rovnomalar yarating, tarqating
                                        va tahlil qiling. Maxsus o'qituvchilar va ta'lim muassasalari uchun mo'ljallangan.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg" asChild>
                                        <a href="#">Boshlash</a>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild>
                                        <a href="#">Batafsil ma'lumot</a>
                                    </Button>
                                </div>
                            </motion.div>
                            <motion.div className="flex justify-center" variants={itemVariants}>
                                <img
                                    src="https://placehold.co/550x550"
                                    width={550}
                                    height={550}
                                    alt="Ta'lim so'rovi illyustratsiyasi"
                                    className="rounded-lg object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            className="flex flex-col items-center justify-center space-y-4 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    O'qituvchilar uchun mo'ljallangan xususiyatlar
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Bizning platformamiz samarali so'rovnomalar yaratish va mazmunli fikr-mulohazalarni to'plash uchun
                                    zarur barcha vositalarni taqdim etadi.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full">
                                    <CardHeader className="pb-2">
                                        <ClipboardList className="h-12 w-12 text-primary mb-2" />
                                        <CardTitle>Oson test yaratish</CardTitle>
                                        <CardDescription>
                                            Bizning intuitiv sürükle-va-tashla quruvchimiz bilan maxsus so'rovnomalar yarating. Texnik
                                            ko'nikmalar talab qilinmaydi.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Bir nechta savol turlaridan tanlang, media qo'shing va ko'rinishni muassasangiz brendiga mos
                                            ravishda sozlang.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full">
                                    <CardHeader className="pb-2">
                                        <Users className="h-12 w-12 text-primary mb-2" />
                                        <CardTitle>Tezkor talaba kirishi</CardTitle>
                                        <CardDescription>
                                            So'rovnomalarni elektron pochta, havola orqali yoki to'g'ridan-to'g'ri o'quv boshqaruv
                                            tizimingizga joylashtirib ulashing.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Talabalar hisob yaratmasdan har qanday qurilmada so'rovnomalarga kira oladilar, bu yuqori ishtirok
                                            darajasini ta'minlaydi.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full">
                                    <CardHeader className="pb-2">
                                        <BarChart3 className="h-12 w-12 text-primary mb-2" />
                                        <CardTitle>Real vaqt natijalari</CardTitle>
                                        <CardDescription>
                                            Javoblarni kelishi bilanoq ko'ring va bir necha marta bosish bilan keng qamrovli hisobotlar
                                            yarating.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Tendentsiyalarni tahlil qiling, turli guruhlar bo'yicha natijalarni solishtiring va ma'lumotlarni
                                            keyingi tahlil uchun turli formatlarda eksport qiling.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full">
                                    <CardHeader className="pb-2">
                                        <ShieldCheck className="h-12 w-12 text-primary mb-2" />
                                        <CardTitle>Admin nazorati</CardTitle>
                                        <CardDescription>
                                            Foydalanuvchi huquqlarini boshqaring, so'rovnoma yakunlanishini kuzating va ma'lumotlar
                                            maxfiyligiga rioya qiling.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Kafedra darajasidagi kirishni o'rnating, so'rovnoma shablonlarini yarating va barcha
                                            so'rovnomalarda muassasa siyosatlarini amalga oshiring.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-center order-last lg:order-first">
                                <img
                                    src="https://placehold.co/550x550"
                                    width={550}
                                    height={550}
                                    alt="So'rov platformasidan foydalanayotgan o'qituvchi"
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                        Butun dunyo o'qituvchilari ishonadi
                                    </h2>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        O'quv materiallarini va talabalar tajribasini yaxshilash uchun platformamizdan foydalanadigan
                                        minglab ta'lim muassasalariga qo'shiling.
                                    </p>
                                </div>
                                <ul className="grid gap-2 py-4">
                                    <li className="flex items-center gap-2">
                                        <div className="flex h-2 w-2 rounded-full bg-primary"></div>
                                        <span>500 dan ortiq ta'lim muassasalari foydalanadi</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="flex h-2 w-2 rounded-full bg-primary"></div>
                                        <span>GDPR talablariga javob beradi va xavfsiz</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="flex h-2 w-2 rounded-full bg-primary"></div>
                                        <span>Mashhur LMS platformalari bilan integratsiya qilingan</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="flex h-2 w-2 rounded-full bg-primary"></div>
                                        <span>Ta'lim foydalanuvchilari uchun maxsus yordam</span>
                                    </li>
                                </ul>
                                <div>
                                    <Button size="lg" asChild>
                                        <a href="#">Demo so'rash</a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            className="flex flex-col items-center justify-center space-y-4 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Ta'lim mazmunini yaxshilashga tayyormisiz?
                                </h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Bugun so'rovnomalar yaratishni boshlang va o'quv materiallaringizni yaxshilash uchun zarur
                                    fikr-mulohazalarni to'plang.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button size="lg" asChild>
                                    <a href="#">Bepul boshlash</a>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <a href="#">Sotuvlar bilan bog'lanish</a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <footer className="border-t">
                <div className="container flex flex-col gap-4 py-10 md:flex-row md:py-8 px-4 md:px-6">
                    <div className="flex flex-col gap-2 md:gap-4 md:w-1/3">
                        <a href="/" className="flex items-center gap-2">
                            <ClipboardList className="h-6 w-6" />
                            <span className="text-xl font-bold">So'rovEdu</span>
                        </a>
                        <p className="text-sm text-muted-foreground">
                            Samarali fikr-mulohazalar orqali o'qituvchilarga yaxshiroq ta'lim tajribasini yaratishga imkon beradi.
                        </p>
                    </div>
                    <div className="grid flex-1 grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Mahsulot</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Xususiyatlar
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Narxlar
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Integratsiyalar
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Ko'p so'raladigan savollar
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Resurslar</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Hujjatlar
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Qo'llanmalar
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Yordam
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Kompaniya</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Biz haqimizda
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Karyera
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Aloqa
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Maxfiylik
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t py-6">
                    <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} So'rovEdu. Barcha huquqlar himoyalangan.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-xs text-muted-foreground hover:underline">
                                Xizmat ko'rsatish shartlari
                            </a>
                            <a href="#" className="text-xs text-muted-foreground hover:underline">
                                Maxfiylik siyosati
                            </a>
                            <a href="#" className="text-xs text-muted-foreground hover:underline">
                                Cookie siyosati
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App

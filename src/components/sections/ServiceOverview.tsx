"use client"

import { serviceList } from "@/configs/constants"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { motion } from "framer-motion"


export const ServicesOverview = () => {
    return (
        <section className="container py-24 sm:py-32 px-5">
            <div className="text-center mb-12">
                <h2 className="text-lg text-primary font-semibold tracking-wider">Our Services</h2>
                <p className="text-3xl md:text-4xl font-bold mt-2">How we Drive Innovation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    serviceList.map((service) => (
                        <motion.div
                            key={service.title}
                            whileHover={{scale: 1.05, y: -5}}
                            transition={{duration: 0.2}}
                        >
                            <Card key={service.title}>
                                <CardHeader>
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                                        {<service.icon />}
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription className="pt-2">{service.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))
                }
            </div>
        </section>
    )
}
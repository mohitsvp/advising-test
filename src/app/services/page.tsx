"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceCategories } from "@/configs/constants";
import { useRouter } from "next/navigation";



export default function ServicePage() {
    const router = useRouter();
    return (
        <section className="container py-24 sm:py-32">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">Our Solutions</h1>
                <p className="text-xl text-muted-foreground mt-4">
                    Explore our comprehensive suite of Generative AI services.
                </p>
            </div>

            <Tabs defaultValue="support" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {
                        serviceCategories.map((category) => (
                            <TabsTrigger key={category.value} value={category.value}>
                                {category.title.split("&")[0]}
                            </TabsTrigger>
                        ))
                    }
                </TabsList>

                {
                    serviceCategories.map((category) => (
                        <TabsContent key={category.value} value={category.value}>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                                {
                                    category.services.map((service) => (
                                        <Card key={service.name} onClick={() => router.push(`/services/${service.id}`)}>
                                            <CardHeader>
                                                <CardTitle>{service.name}</CardTitle>
                                                <CardDescription>{service.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))
                                }
                            </div>
                        </TabsContent>
                    ))
                }
            </Tabs>
        </section>
    )
}
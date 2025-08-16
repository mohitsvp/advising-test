import { featureList } from "@/configs/constants"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"



export const WhyChooseUs = () => {
    return (
        <section className="container py-24 sm:py-32 px-5 bg-secondary">
            <div className="text-center mb-12">
                <h2 className="text-lg text-primary font-semibold tracking-wider">Why Choose Us?</h2>
                <p className="text-3xl md:text-4xl font-bold mt-2">
                    Your Strategic AI Partner
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {
                    featureList.map((feature) => (
                        <Card key={feature.title} className="bg-background">
                            <CardHeader>
                                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                                    {<feature.icon/>}
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription className="pt-2">{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { teamList } from "@/configs/constants";



export default function AboutPage() {
    return (
        <section className="container py-24 sm:py-32">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <h1 className="text-4xl md:text-5xl font-bold">Our Mission</h1>
                <p className="text-xl text-muted-foreground mt-4">
                    To empower businesses with transformative AI solutions, turning complex challenges into opportunities for growth and innovation. We are dedicated to building intelligent systems that are not only powerful but also ethical and reliable.
                </p>
            </div>

            {/* Team Section */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
                <p className="text-lg text-muted-foreground mt-2 mb-12">
                    The Innovators Behind AdvisInt
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        teamList.map((member) => (
                            <Card className="text-center p-6" key={member.name}>
                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                    <AvatarImage src={member.avatarUrl} alt={member.name}/>
                                    <AvatarFallback>{member.name.split(" ").map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <CardHeader className="p-0">
                                    <CardTitle>{member.name}</CardTitle>
                                    <CardDescription>{member.role}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
"use client"

import { serviceCategories } from "@/configs/constants";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Lightbulb, Rocket, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Types for markdown components
interface MarkdownComponentProps {
    children?: ReactNode;
}

const ServiceDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Find the service and its category
    const currentCategory = serviceCategories.find(category => 
        category.services.some(service => service.id === params.serviceName)
    );
    
    const service = serviceCategories
        .flatMap((category) => category.services)
        .find((service) => service.id === params.serviceName);

    // Get related services from the same category
    const relatedServices = currentCategory?.services.filter(s => s.id !== params.serviceName).slice(0, 2) || [];

    useEffect(() => {
        if (!params.serviceName) return;

        const fetchMarkdown = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/content/services/${params.serviceName}.md`);
                if (!response.ok) {
                    throw new Error(`File not found: ${response.statusText}`);
                }
                const text = await response.text();
                setMarkdownContent(text);
            } catch (err) {
                console.error("Failed to fetch markdown:", err);
                setError("Could not load the service details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [params.serviceName]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <CardContent>
                        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
                        <Button onClick={() => router.push('/services')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Custom markdown components with proper types
    const MarkdownComponents = {
        h1: ({ children }: MarkdownComponentProps) => (
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                {children}
            </h1>
        ),
        h2: ({ children }: MarkdownComponentProps) => (
            <h2 className="text-3xl font-bold mb-4 mt-8 text-foreground flex items-center">
                <Rocket className="mr-3 h-6 w-6 text-primary" />
                {children}
            </h2>
        ),
        h3: ({ children }: MarkdownComponentProps) => (
            <h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground">{children}</h3>
        ),
        p: ({ children }: MarkdownComponentProps) => (
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{children}</p>
        ),
        ul: ({ children }: MarkdownComponentProps) => (
            <ul className="space-y-2 mb-6">{children}</ul>
        ),
        li: ({ children }: MarkdownComponentProps) => (
            <li className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{children}</span>
            </li>
        ),
        strong: ({ children }: MarkdownComponentProps) => (
            <strong className="font-bold text-primary">{children}</strong>
        ),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
            {/* Breadcrumb & Back Navigation */}
            <div className="container pt-8 pb-4 px-5">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-2 text-sm text-muted-foreground mb-4"
                >
                    <Link href="/services" className="hover:text-primary transition-colors">
                        Services
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{currentCategory?.title}</span>
                    <span>/</span>
                    <span className="text-primary font-medium">{service.name}</span>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => router.back()}
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Services
                </motion.button>
            </div>

            {/* Hero Section */}
            <section className="container px-5 pb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F596D3]/20 to-[#61ADFB]/20 rounded-2xl mb-6">
                        <Lightbulb className="h-10 w-10 text-primary" />
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        <span className="">
                            {service.name}
                        </span>
                    </h1>
                    
                    <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {service.description}
                    </p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button size="lg" className="hover:from-[#E085C2] hover:to-[#C136AE]">
                            Get Started Today
                        </Button>
                        <Button variant="outline" size="lg">
                            Schedule Consultation
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="container px-5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-8 lg:p-12">
                                {loading && (
                                    <div className="text-center py-12">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <p className="mt-4 text-muted-foreground">Loading content...</p>
                                    </div>
                                )}
                                
                                {error && (
                                    <div className="text-center py-12">
                                        <p className="text-red-500 mb-4">{error}</p>
                                        <Button onClick={() => window.location.reload()}>
                                            Try Again
                                        </Button>
                                    </div>
                                )}
                                
                                {!loading && !error && (
                                    <div className="prose prose-lg max-w-none">
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={MarkdownComponents}
                                        >
                                            {markdownContent}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="container px-5 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Related Services</h2>
                            <p className="text-muted-foreground">Explore more solutions in {currentCategory?.title}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {relatedServices.map((relatedService, index) => (
                                <motion.div
                                    key={relatedService.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="group"
                                >
                                    <Card className="h-full border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#61ADFB]/20 to-[#03a3d7]/20 rounded-lg">
                                                    <Star className="h-6 w-6 text-blue-500" />
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <CardTitle className="group-hover:text-primary transition-colors">
                                                {relatedService.name}
                                            </CardTitle>
                                            <CardDescription className="text-base">
                                                {relatedService.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <Link href={`/services/${relatedService.id}`}>
                                                <Button variant="ghost" className="w-full justify-start p-0 h-auto font-medium">
                                                    Learn More
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* CTA Section */}
            <section className="container px-5 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Card className="border-0 bg-gradient-to-r from-[#F596D3]/10 via-[#61ADFB]/10 to-[#03a3d7]/10 backdrop-blur-sm">
                        <CardContent className="text-center py-12 px-8">
                            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Let&apos;s discuss how {service.name} can transform your business and drive measurable results.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] hover:from-[#E085C2] hover:to-[#C136AE]">
                                    Start Your Project
                                </Button>
                                <Button variant="outline" size="lg">
                                    Contact Our Team
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
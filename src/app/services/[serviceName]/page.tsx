"use client"

import { serviceCategories } from "@/configs/constants";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// You can keep your ServiceData interface if you use it elsewhere
// interface ServiceData { ... }

const ServiceDetailPage = () => {
    const params = useParams();
    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // This logic correctly finds the service metadata (name, description)
    const service = serviceCategories
        .flatMap((service) => service.services)
        .find((service) => service.id === params.serviceName);

    useEffect(() => {
        // Ensure params.serviceName is available before fetching
        if (!params.serviceName) return;

        const fetchMarkdown = async () => {
            setLoading(true);
            setError(null);
            try {
                // Files in the 'public' folder are served from the root path '/'
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
    }, [params.serviceName]); // Re-run the effect if the serviceName param changes

    if (!service) {
        return <div>Service not found</div>;
    }

    return (
        <div className="py-24 sm:py-32">
            <div className="container text-center mb-12 px-5">
                <h1 className="text-3xl lg:text-4xl font-bold">{service?.name}</h1>
                <p className="text-lg lg:text-xl">{service?.description}</p>
            </div>

            <div className="container prose-invert lg:prose-xl mx-auto px-5 w-[60%]">
                {/* Render based on the loading and error state */}
                {loading && <p>Loading content...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default ServiceDetailPage;
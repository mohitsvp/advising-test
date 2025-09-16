"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";


export default function ContactPage() {
    const {toast} = useToast();

    const [formData, setFormData] = useState({
        firstName : "",
        lastName: "",
        email: "",
        message: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setFormData((prev) => ({...prev, [id] : value}));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const templateParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            to_name: "AdvisInt",
            message: formData.message
        }

        emailjs
        .send(
            process.env.EMAIL_JS_SERVICE_ID || "",
            process.env.EMAIL_JS_TEMPLATE_NAME || "",
            templateParams,
            process.env.EMAIL_JS_PUBLIC_KEY || ""
        )
        .then(
            (response) => {
                console.log("SUCCESS!", response.status, response.text);
                toast({
                    title: "Message Sent!",
                    description: "Thank you for contacting us. We'll get back to you shortly.",
                });
                setFormData({firstName: "", lastName: "", email: "", message: ""})
            },
            (error) => {
                console.log("FAILED...", error);
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request. Please try again.",
                    variant: "destructive",
                })
            }
        )
    }

    return (
        <section className="container py-24 sm:py-32">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
                <p className="text-xl text-muted-foreground mt-4">
                    Have a project in mind? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="grid lg:grid-cols-1 w-[50%] mx-auto">
                {/* <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Email</h3>
                            <p className="text-muted-foreground">
                                Reach out to us via email for any inquiries.
                            </p>
                            <a href="mailto:contact@advisint.com" className="text-primary hover:underline">contact@advisint.com</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Phone</h3>
                            <p className="text-muted-foreground">
                                Give us a call to discuss your needs.
                            </p>
                            <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Office</h3>
                            <p className="text-muted-foreground">
                                123 Innovation Drive, Tech City, 12345
                            </p>
                        </div>
                    </div>
                </div> */}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} required/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleInputChange} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" value={formData.message} onChange={handleInputChange} required/>
                    </div>
                    <Button type="submit" className="w-full">
                        Send Message
                    </Button>
                </form>
            </div>
        </section>
    )
}
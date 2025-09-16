import Link from "next/link";
import { Youtube, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    const socialLinks = [
        {
            name: "YouTube",
            icon: Youtube,
            url: "https://www.youtube.com/@Advisint",
            hoverColor: "hover:text-red-500"
        },
        {
            name: "X (Twitter)", 
            icon: Twitter,
            url: "https://x.com/advisint",
            hoverColor: "hover:text-blue-400"
        },
        {
            name: "LinkedIn",
            icon: Linkedin, 
            url: "https://www.linkedin.com/in/advisint-com-552705383/",
            hoverColor: "hover:text-blue-600"
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://www.instagram.com/advisint_com/",
            hoverColor: "hover:text-pink-500"
        }
    ];

    return (
        <footer className="py-6 md:px-8 md:py-0 border-t bg-card/50 backdrop-blur-sm">
            <div className="container flex flex-col items-center justify-between gap-6 md:h-24 md:flex-row">
                {/* Copyright */}
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} AdvisInt. All Rights Reserved.
                </p>
                
                {/* Social Media Links */}
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground hidden md:block">Follow us:</span>
                    <div className="flex items-center space-x-3">
                        {socialLinks.map((social) => {
                            const IconComponent = social.icon;
                            return (
                                <Link
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all duration-200 text-muted-foreground ${social.hoverColor} hover:bg-accent hover:scale-110 group`}
                                    aria-label={`Follow us on ${social.name}`}
                                >
                                    <IconComponent className="h-5 w-5" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import { Briefcase, Lightbulb, Users, Medal, Wrench, Rocket, LucideIcon } from "lucide-react";

interface ServiceList {
    title: string;
    description: string;
    icon: LucideIcon;
}

export const serviceList : ServiceList[] = [
    {
        title: "Expert Staffing",
        description: "We provide top-tier AI and software engineers to augment your team and accelerate your project timelines.",
        icon: Briefcase
    },
    {
        title: "AI Consulting",
        description: "Our in-house experts design and build custom Generative AI solutions tailored to your specific business needs.",
        icon: Lightbulb
    },
    {
        title: "Corporate Training",
        description: "Empower your workforce with our comprehensive training programs on GenAI integration and best practices.",
        icon: Users
    }
]

interface FeatureList {
    title: string;
    description: string;
    icon: LucideIcon;
}

export const featureList: FeatureList[] = [
    {
        title: "Expert Team",
        description: "Our team consists of seasoned AI professionals and software engineers with a passion for innovation.",
        icon: Medal
    },
    {
        title: "Custom Solutions",
        description: "We don't believe in one-size-fits-all. Every solution is meticulously crafted to meet your unique challenges.",
        icon: Wrench,
    },
    {
        title: "Proven Results",
        description: "We are committed to delivering measurable outcomes that drive real business value and ROI.",
        icon: Rocket
    }
]

interface Service {
    name: string;
    description: string;
}

interface ServiceCategory {
    value: string;
    title: string;
    services: Service[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    value: "support",
    title: "Customer Support & Engagement",
    services: [
      { name: "AI Chatbot", description: "24/7 automated customer assistance using NLP for FAQs, booking requests, and product inquiries." },
      { name: "Voice-based Virtual Assistant", description: "Let customers interact via voice commands (Speech-to-Text + Text-to-Speech)." },
      { name: "Sentiment Analysis on Feedback", description: "Automatically analyse customer reviews and contact forms to detect satisfaction level." },
    ],
  },
  {
    value: "marketing",
    title: "Content & Marketing Automation",
    services: [
        { name: "AI Content Generator", description: "Automatically generate blogs, product descriptions, and marketing copy." },
        { name: "Social Media Post Creator", description: "Create AI-assisted social media content with optimized hashtags and captions." },
        { name: "SEO Optimization Tool", description: "AI keyword analysis and ranking suggestions for better search engine visibility." },
    ],
  },
  {
    value: "personalization",
    title: "Product & Service Personalization",
    services: [
        { name: "Recommendation Engine", description: "Suggest products/services based on user browsing and purchase history." },
        { name: "Dynamic Pricing AI", description: "Adjust pricing based on demand, competitor prices, and inventory." },
        { name: "Customized Offers & Email Marketing", description: "AI-driven personalized promotions." },
    ],
  },
  {
    value: "analytics",
    title: "Data Insights & Analytics",
    services: [
        { name: "Predictive Analytics Dashboard", description: "Forecast sales, customer churn, and demand trends." },
        { name: "Automated Data Visualization", description: "Turn uploaded CSV/Excel files into interactive charts." },
        { name: "Customer Segmentation", description: "AI clustering to group customers by behaviour and preferences." },
    ],
  },
  {
    value: "media",
    title: "Visual & Media AI",
    services: [
        { name: "AI Image Recognition", description: "Detect and tag objects in user-uploaded images (e.g., product photos)." },
        { name: "Virtual Try-On / AR Previews", description: "Customers can preview products (clothing, furniture, etc.) before buying." },
        { name: "AI Video Summarization", description: "Summarize long videos for quick previews." },
    ],
  },
  {
    value: "security",
    title: "Security & Compliance",
    services: [
        { name: "Fraud Detection System", description: "Monitor transactions for suspicious patterns." },
        { name: "AI-based Document Verification", description: "Automatically validate ID proofs and documents." },
        { name: "GDPR-Compliant Data Processing", description: "AI tools with privacy-first architecture." },
    ],
  },
];


interface TeamList {
    name : string;
    role: string;
    avatarUrl: string;
}

export const teamList: TeamList[] = [
  {
    name: "Jane Doe",
    role: "CEO & AI Strategist",
    avatarUrl: "https://placehold.co/100x100/61DAFB/FFFFFF?text=JD",
  },
  {
    name: "John Smith",
    role: "CTO & Lead Engineer",
    avatarUrl: "https://placehold.co/100x100/D247BF/FFFFFF?text=JS",
  },
  {
    name: "Emily White",
    role: "Head of Corporate Training",
    avatarUrl: "https://placehold.co/100x100/F596D3/FFFFFF?text=EW",
  },
];
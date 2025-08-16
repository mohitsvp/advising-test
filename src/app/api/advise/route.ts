import { NextRequest, NextResponse } from "next/server";

const servicesCatalog = `
1. Customer Support & Engagement: AI Chatbot, Voice-based Virtual Assistant, Sentiment Analysis on Feedback.
2. Content & Marketing Automation: AI Content Generator, Social Media Post Creator, SEO Optimization Tool.
3. Product & Service Personalization: Recommendation Engine, Dynamic Pricing AI, Customized Offers & Email Marketing.
4. Data Insights & Analytics: Predictive Analytics Dashboard, Automated Data Visualization, Customer Segmentation.
5. Visual & Media AI: AI Image Recognition, Virtual Try-On / AR Previews, AI Video Summarization.
6. Security & Compliance: Fraud Detection System, AI-based Document Verification, GDPR-Compliant Data Processing.
7. Industry-Specific AI: Solutions for Healthcare, Finance, E-commerce, and Education.
`;


export async function POST(req: NextRequest) {
    try {
        const {userPrompt} = await req.json();

        if (!userPrompt) {
            return NextResponse.json({error: "Prompt is Required"}, {status: 400});
        }

        const fullPrompt = `
            You are an expert AI solutions consultant for a firm named "AdvisInt".
            Your task is to analyze a potential client's business problem and recommend the most suitable solutions from our service catalog.

            Here is our service catalog:
            ${servicesCatalog}

            Client's business problem: "${userPrompt}"

            Based on this problem, please identify and recommend 1 to 3 of our most relevant services.
            For each recommended service, briefly explain *why* it is a good fit for the client's problem.
            Format your response in clear, professional, and easy-to-read markdown.
        `;

        const apiKey=process.env.GOOGLE_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{role: "user", parts: [{text: fullPrompt}]}]
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
             throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No content in API response");
        }

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error in advise API:", error);
        return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });

    }
}
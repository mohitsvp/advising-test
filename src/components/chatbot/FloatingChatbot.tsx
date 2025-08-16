// src/components/chatbot/FloatingChatbot.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, User, X, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  content: string;
}

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: input }),
      });

      if (!response.ok) throw new Error("Failed to get response from AI");

      const data = await response.json();
      const aiMessage: Message = { role: "ai", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "ai",
        content: "I'm sorry, but I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <MessageSquare className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card className="w-[380px] h-[550px] shadow-xl flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot /> AI Solution Advisor
                </CardTitle>
                <CardDescription>How can I help your business today?</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-4">
                <div className="flex-grow space-y-4 overflow-y-auto pr-2 mb-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 text-sm ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'ai' && <Bot className="w-6 h-6 flex-shrink-0" />}
                      <div className={`rounded-lg p-3 max-w-[85%] min-w-0 break-words ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        {/* <div className="prose dark:prose-invert max-w-none prose-sm"> */}
                          <ReactMarkdown >
                            {msg.content}
                          </ReactMarkdown>
                        {/* </div> */}
                      </div>
                      {msg.role === 'user' && <User className="w-6 h-6 flex-shrink-0" />}
                    </div>
                  ))}
                   {isLoading && (
                      <div className="flex gap-3 text-sm">
                          <Bot className="w-6 h-6 flex-shrink-0" />
                          <div className="rounded-lg p-3 bg-secondary animate-pulse">
                              <p>Thinking...</p>
                          </div>
                      </div>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your challenge..."
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading}>Send</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
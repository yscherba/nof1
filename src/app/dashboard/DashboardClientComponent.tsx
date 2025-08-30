"use client";

import React, { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeftSidebar from '../components/LeftSidebar';
import { addConversation } from '../utils/facade';

export default function Home() {
    const [chatRequest, setChatRequest] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [chatLoading, setChatLoading] = useState(false);

    async function handleChatSubmit(e: React.FormEvent) {
        e.preventDefault();
        setChatLoading(true);

        const result = await addConversation(chatRequest);

        if (result.error) {
            setChatResponse(`Error: ${result.error}`);
        } else {
            setChatResponse(result.success || "Success!");
            setChatRequest("");
        }

        setChatLoading(false);
    }

    return (
        <div className="page">
            <Header />
            <div className="container">
                <div className="grid grid-cols-12 min-h-1/2">
                    <LeftSidebar />
                    <main className="col-span-8 flex items-center">
                        <div className="rounded-lg border border-gray-300 justify-center m-4 mr-0 w-full px-4 py-6">
                            <h2>Chat here</h2>
                            <div className="chat-interface">
                                <textarea
                                    className="border p-2 rounded w-full"
                                    rows={10}
                                    readOnly
                                    value={chatResponse}
                                    placeholder="Response from the assistant will appear here..."
                                />
                                <form onSubmit={handleChatSubmit} className="flex flex-col gap-4 mt-4">
                                    <textarea
                                        className="border p-2 rounded w-full"
                                        rows={5}
                                        value={chatRequest}
                                        onChange={(e) => setChatRequest(e.target.value)}
                                        placeholder="Type your message here..."
                                        required
                                    />
                                    <button type="submit" className="button" disabled={chatLoading} >
                                        {chatLoading ? "Sending..." : "Send"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}
import React, { useState } from "react";
import { loadUserProfile } from "../utils/userProfile";
import { buildProfileSummary } from "../utils/profileHelpers";

const RememberThis = ({ onSave }) => {
    const [text, setText] = useState("");
    const [type, setType] = useState("reminder");
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        const memoryToSave = aiSuggestion || {
            text,
            type,
            mode: "active", // default if not using AI suggestion
        };

        const newMemory = {
            ...memoryToSave,
            createdAt: new Date().toISOString(),
            status: "active",
        };

        onSave(newMemory);
        setText("");
        setType("reminder");
        setAiSuggestion(null);
    };
    const handleAnalyze = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setAiSuggestion(null);

        const userProfile = loadUserProfile();
        const profileSummary = buildProfileSummary(userProfile);

        const systemMessage = `
You are an AI assistant in a memory companion app.
Use the user's preferences, routines, and relationships to improve your response.

${profileSummary}

Instructions:
Rephrase the user's input to make it clearer and more specific.
Then suggest a memory type (reminder, note, event, or follow-up),
and whether it is active or passive.

Respond in this format:

Improved: [rephrased memory]
Type: [type]
Mode: [active or passive]
`;
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-0125",
                    messages: [
                        { role: "system", content: systemMessage },
                        { role: "user", content: text },
                    ],
                }),
            });

            const data = await response.json();
            const responseText = data.choices[0].message.content;

            // Parse lines
            const improvedMatch = responseText.match(/Improved:\s*(.*)/i);
            const typeMatch = responseText.match(/Type:\s*(.*)/i);
            const modeMatch = responseText.match(/Mode:\s*(.*)/i);

            setAiSuggestion({
                text: improvedMatch?.[1]?.trim() || text,
                type: typeMatch?.[1]?.trim().toLowerCase() || "note",
                mode: modeMatch?.[1]?.trim().toLowerCase() || "active",
            });
        } catch (error) {
            console.error("AI analysis failed:", error);
            setAiSuggestion("⚠️ AI suggestion failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <label className="block font-semibold text-lg">📝 Remember this:</label>

            <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Type something you want to remember..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                type="button"
                onClick={handleAnalyze}
                className="text-sm text-indigo-600 underline hover:text-indigo-800"
            >
                💡 Analyze with Compass AI
            </button>

            {loading && <p className="text-sm text-gray-500">Thinking...</p>}

            {aiSuggestion && (
                <div className="mt-2 p-3 bg-gray-100 rounded border border-indigo-200">
                    <p className="text-sm text-gray-700 mb-1 font-semibold">💡 Suggested:</p>
                    <p className="text-sm text-gray-800 italic mb-1">{aiSuggestion.text}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Type: {aiSuggestion.type}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Type: {aiSuggestion.mode}</p>
                </div>
            )}

            <div>
                <label className="block font-medium mb-1">Memory Type</label>
                <select
                    className="w-full border rounded px-3 py-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="reminder">⏰ Reminder</option>
                    <option value="note">📝 Note</option>
                    <option value="event">📅 Event</option>
                    <option value="conversation">💬 Conversation</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Save
            </button>
        </form>);
};

export default RememberThis;
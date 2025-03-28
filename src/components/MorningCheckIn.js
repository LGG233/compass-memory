import React, { useState } from "react";

const MorningCheckIn = ({ onSave }) => {
    const [mood, setMood] = useState("");
    const [thoughts, setThoughts] = useState("");
    const [bringIntoToday, setBringIntoToday] = useState("");
    const [letGoOf, setLetGoOf] = useState("");
    const [aiResponse, setAiResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAiResponse(null);

        if (!mood && !thoughts.trim() && !bringIntoToday.trim() && !letGoOf.trim()) {
            setAiResponse("It’s okay to check in later if nothing’s on your mind right now.");
            return;
        }

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
                        {
                            role: "system",
                            content: `You are Compass, a gentle and thoughtful life companion. 
You reflect on what the user shares, surface meaningful insights, and offer gentle nudges when appropriate. Keep it short and warm.`
                        },
                        {
                            role: "user",
                            content: `Mood: ${mood}
Thoughts: ${thoughts}
Bring into today: ${bringIntoToday}
Let go of: ${letGoOf}`,
                        },
                    ],
                }),
            });

            const data = await response.json();
            const reply = data.choices[0].message.content.trim();
            setAiResponse(reply);
            onSave({
                text: reply,
                type: "reflection",
                mood,
                createdAt: new Date().toISOString(),
                status: "active",
            });
            setMood("");
            setThoughts("");
            setBringIntoToday("");
            setLetGoOf("");

        } catch (error) {
            console.error("AI reflection failed:", error);
            setAiResponse("⚠️ I had trouble reflecting just now, but I'm still here.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow mb-8">
            <h2 className="text-2xl font-semibold mb-4">🌅 Morning Check-In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Mood</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    >
                        <option value="">How are you feeling?</option>
                        <option value="energized">😊 Energized</option>
                        <option value="neutral">😐 Neutral</option>
                        <option value="tired">😴 Tired</option>
                        <option value="anxious">😔 Anxious</option>
                        <option value="reflective">🧠 Reflective</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium">What’s on your mind?</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        value={thoughts}
                        onChange={(e) => setThoughts(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium">What would you like to carry into today?</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={bringIntoToday}
                        onChange={(e) => setBringIntoToday(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium">Anything you’d like to let go of?</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={letGoOf}
                        onChange={(e) => setLetGoOf(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Check In with Compass
                </button>
            </form>

            {loading && <p className="mt-4 text-sm text-gray-500">Thinking…</p>}

            {aiResponse && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <p className="text-sm text-indigo-600 font-semibold">Compass reflects:</p>
                    <p className="mt-2 text-gray-800 whitespace-pre-line">{aiResponse}</p>
                </div>
            )}
        </div>
    );
};

export default MorningCheckIn;

// src/components/Section.js
import React from "react";

const Section = ({ title, items }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="bg-white p-3 rounded shadow border-l-4 border-indigo-300 text-gray-800"
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Section;
import {  useEffect,useRef
 } from "react";

const cards = [
    {
        title: "Website 1",
        description: "Description of Website 1.",
    },
    {
        title: "Website 2",
        description: "Description of Website 2.",
    },
    {
        title: "Website 3",
        description: "Description of Website 3.",
    },
    {
        title: "Website 4",
        description: "Description of Website 4.",
    },

]
export default function WebsiteCard() {
    const elementRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // You can add any scroll-related logic here if needed
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {cards.map((card, index) => (
                <div key={index} className={`z-${index * 10} bg-white shadow-md rounded-lg p-6`}>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-700">{card.description}</p>
                </div>
            ))}
        </div>
    );
}
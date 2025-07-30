'use client'
import React, { useEffect, useRef, useState } from "react";

// Define the initial list of websites
const initialWebsites = [
  { title: "RobotX Shop", description: "Buy educational robotics kits online", link: "https://robotxshop.com" },
  { title: "Portfolio", description: "Showcasing personal projects and skills", link: "https://louem.dev" },
  { title: "HorizonLux", description: "Company Notification App for internal communications", link: "https://horizonlux.com" },
  { title: "EcoHarvest Solutions", description: "Platform for sustainable agriculture practices", link: "https://ecoharvest.com" },
  { title: "Artisan Gallery", description: "Online marketplace for handcrafted goods", link: "https://artisangallery.com" },
  { title: "FitLife Tracker", description: "Personal fitness and nutrition tracking application", link: "https://fitlifetracker.com" },
  { title: "CodeSphere Academy", description: "Interactive coding tutorials and courses", link: "https://codesphere.edu" },
  { title: "Travel Planner Pro", description: "Comprehensive travel itinerary builder", link: "https://travelplanner.pro" },
];

const Websites: React.FC = () => {
  // useRef to store references to each card element for the Intersection Observer and height calculations
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  // useState to manage the visibility state of each card for fade-in animation
  const [visible, setVisible] = useState<boolean[]>(Array(initialWebsites.length).fill(false));
  // useState to manage the websites data, allowing dynamic updates
  const [websites, setWebsites] = useState(initialWebsites);
  // useState to manage loading state for each card's description enhancement
  const [loadingStates, setLoadingStates] = useState<boolean[]>(Array(initialWebsites.length).fill(false));
  // useState for Firebase auth and app instances
  const [auth, setAuth] = useState<any>(null);
  // State to hold the dynamic top offset for each sticky card
  const [stickyOffsets, setStickyOffsets] = useState<number[]>(Array(initialWebsites.length).fill(0));

  // Initialize Firebase and authenticate
  
  // Effect for Intersection Observer to handle initial fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[index] = entry.isIntersecting;
              return updated;
            });
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [websites]); // Re-run if websites array changes (e.g., new descriptions)

  // Effect to calculate and update sticky offsets for stacking animation
  useEffect(() => {
    const calculateStickyOffsets = () => {
      const newOffsets: number[] = [];
      let cumulativeHeight = 0;
      const gap = 48; // Corresponds to Tailwind's gap-12 (12 * 4px = 48px)

      cardsRef.current.forEach((cardEl, i) => {
        if (cardEl) {
          // The 'top' position where this card should stick in the viewport
          newOffsets[i] = cumulativeHeight;
          // Add the current card's height and the gap for the next card's offset
          cumulativeHeight += cardEl.offsetHeight + gap;
        } else {
          newOffsets[i] = 0; // Default if element not yet rendered
        }
      });
      setStickyOffsets(newOffsets);
    };

    // Calculate offsets initially and on window resize
    window.addEventListener('resize', calculateStickyOffsets);
    // Use a small timeout to ensure elements are rendered before calculating heights
    const timeoutId = setTimeout(calculateStickyOffsets, 100);

    return () => {
      window.removeEventListener('resize', calculateStickyOffsets);
      clearTimeout(timeoutId);
    };
  }, [websites]); // Recalculate if websites data changes (e.g., new cards added)

  // Function to call Gemini API and enhance description
  const enhanceDescription = async (index: number, title: string, currentDescription: string) => {
    setLoadingStates((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    
    try { 
      let chatHistory = [];
      const prompt = `Given the website title '${title}' and its current description '${currentDescription}', generate a more detailed, engaging, and professional description (around 2-3 sentences) that highlights its key value proposition. Focus on what makes it unique and beneficial. Do not include the title in the response.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      let response;
      let result;
      let retries = 0;
      const maxRetries = 5;
      const baseDelay = 1000; // 1 second

      // Implement exponential backoff for API calls
      while (retries < maxRetries) {
        try {
          response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            result = await response.json();
            break; // Success, exit loop
          } else if (response.status === 429) { // Too Many Requests
            const delay = baseDelay * Math.pow(2, retries) + Math.random() * 1000; // Add jitter
            console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
            await new Promise(res => setTimeout(res, delay));
            retries++;
          } else {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error during fetch, retrying:", error);
          const delay = baseDelay * Math.pow(2, retries) + Math.random() * 1000;
          await new Promise(res => setTimeout(res, delay));
          retries++;
        }
      }

      if (result && result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const enhancedText = result.candidates[0].content.parts[0].text;
        setWebsites((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], description: enhancedText };
          return updated;
        });
      } else {
        console.error("Gemini API response structure unexpected:", result);
        // Optionally, revert to original description or show an error message on the UI
      }
    } catch (error) {
      console.error("Error enhancing description with Gemini API:", error);
      // Optionally, revert to original description or show an error message on the UI
    } finally {
      setLoadingStates((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-start gap-12 py-24 z-20 min-h-screen relative">
      {/* Sticky header for the title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-center px-4 sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-transparent w-full pt-4 pb-8">
        Our Featured Projects
      </h1>
      {websites.map((site, i) => (
        <div
          key={i}
          ref={(el) => { cardsRef.current[i] = el; }}
          className={`
            transition-all duration-700 ease-in-out
            ${visible[i] ? "opacity-100" : "opacity-0"}
            bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg
            shadow-2xl rounded-3xl p-8 md:p-10 max-w-xl lg:max-w-2xl w-full
            text-center border border-gray-700 hover:border-blue-500
            hover:shadow-blue-500/30
            sticky
          `}
          // Dynamically set z-index to ensure correct stacking order (later cards on top)
          // Dynamically set top for sticky positioning based on calculated offsets
          style={{ top: `${stickyOffsets[i]}px`, zIndex: 10 + i }}
        >
          <h2 className="text-3xl font-bold mb-3 text-white">{site.title}</h2>
          <p className="text-gray-300 mb-6 text-lg min-h-[4.5rem] flex items-center justify-center">
            {loadingStates[i] ? "Generating a new description..." : site.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={site.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full
                         shadow-lg hover:bg-blue-700 transition-colors duration-300
                         transform hover:scale-105 focus:outline-none focus:ring-2
                         focus:ring-blue-500 focus:ring-opacity-75"
            >
              Visit Site
            </a>
            <button
              onClick={() => enhanceDescription(i, site.title, site.description)}
              disabled={loadingStates[i]}
              className={`
                inline-block px-8 py-3 rounded-full font-semibold shadow-lg
                transition-colors duration-300 transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-opacity-75
                ${loadingStates[i]
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500"
                }
              `}
            >
              {loadingStates[i] ? "Generating..." : "✨ Enhance Description"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Websites;

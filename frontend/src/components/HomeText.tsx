import { motion } from "motion/react";

const textData = [
  "Welcome to Hoovie Your Ultimate Movie Search Tool!",
  "Looking for the perfect movie to watch? Hoovie makes it easy to find movies that match your preferences. With our powerful search engine, you can explore an extensive movie database and refine your results using various filters and sorting options.",
  "Key Features",
  "Search & Discover: Quickly find any movie by title or keyword.",
  "Advanced Filters & Sorting: Narrow down your choices by genre, release year, popularity, and more.",
  "Detailed Movie Pages: Click on any movie to view in-depth details, including synopsis, cast, ratings, and more.",
  "Streaming Availability: Instantly check if a movie is available on popular streaming platforms.",
  "Whether you’re in the mood for an action-packed blockbuster or a hidden indie gem, Hoovie helps you find the right movie in seconds. Start exploring now and make your movie nights better than ever!"
];

const textVariants = {
  offscreen: { opacity: 0, y: -200 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

export default function HomeText() {
  return (
    <div className=" text-center p-10 space-y-6">
      {textData.map((text, index) => (
        <motion.p
          key={index}
          className={index === 0 ? "text-9xl font-bold" : "text-2xl"}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ amount: 0.8, once: true }}
          variants={textVariants}
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}

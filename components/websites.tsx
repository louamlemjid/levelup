import { motion, useScroll, useTransform } from 'framer-motion';

// Mock data for cards
const mockData = [
  { id: 1, title: 'Project Alpha', description: 'Innovative tech solution', color: 'bg-blue-500', progress: 75 },
  { id: 2, title: 'Project Beta', description: 'Creative design platform', color: 'bg-green-500', progress: 60 },
  { id: 3, title: 'Project Gamma', description: 'Data analytics tool', color: 'bg-purple-500', progress: 85 },
  { id: 4, title: 'Project Delta', description: 'AI automation system', color: 'bg-red-500', progress: 45 },
];

const Card = ({ data, index }:{ data: typeof mockData[number], index: number }) => {
  const { scrollY } = useScroll();
  const offset = 100; // Offset for when cards start sticking
  const cardHeight = 200; // Card height in pixels
  const stackPosition = index * 20; // Stacking offset for each card

  // Calculate when card should stick (based on its position)
  const stickPoint = index * cardHeight + offset;
  const y = useTransform(
    scrollY,
    [0, stickPoint, stickPoint + 100],
    [index * cardHeight, stackPosition, stickPoint]
  );

  // Fade-in animation when scrolling
  const opacity = useTransform(scrollY, [stickPoint - 100, stickPoint], [0, 1]);

  return (
    <motion.div
      className={`w-80 h-48 rounded-lg shadow-lg p-6 text-white ${data.color} absolute left-1/2 -translate-x-1/2`}
      style={{ y, opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold">{data.title}</h2>
      <p className="mt-2">{data.description}</p>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-white h-2.5 rounded-full"
            style={{ width: `${data.progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">Progress: {data.progress}%</p>
      </div>
    </motion.div>
  );
};

const CardStack = () => {
  return (
    <div className=" min-h-[200vh] bg-gray-100 flex flex-col items-center pt-20">
      <div className="relative h-[800px]">
        {mockData.map((data, index) => (
          <Card key={data.id} data={data} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CardStack;
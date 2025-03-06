export default function Loading({
  indicatorState,
}: {
  indicatorState: LoadingIndicator[];
}) {
  const [bootUpComplete, setBootUpComplete] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, bootMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setBootUpComplete(true), 1000);
    }
  }, [currentIndex]);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="py-1 max-w-[60%] transition-shadow duration-300"
    >
      {!bootUpComplete ? (
        <div className="bg-black/50 backdrop-blur-sm p-2 rounded-lg">
          {displayedMessages.map((msg, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-cyan-300 font-mono shadow-cyan-500 text-lg tracking-wide"
            >
              {msg}
            </motion.p>
          ))}
        </div>
      ) : (
        indicatorState.map((indicator, index) => (
          <Pill
            key={indicator.status}
            status={indicator.status}
            icon={indicator.icon}
            isError={indicator.icon === "error"}
            isDone={index !== indicatorState.length - 1}
          />
        ))
      )}
    </motion.div>
  );
}

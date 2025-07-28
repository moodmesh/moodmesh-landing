import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [email, setEmail] = useState("");
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const validateEmail = (email: string) => {
    if (!email.trim()) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNotify = async () => {
    if (!validateEmail(email)) {
      setModalType("error");
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://moodmesh-landing.onrender.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      await response.json();

      if (response.status === 201) {
        setModalType("success");
        setShowModal(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 8000);
      } else if (response.status === 409) {
        setModalType("exists");
        setShowModal(true);
      } else {
        setModalType("error");
        setShowModal(true);
      }
    } catch {
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen text-white flex items-center justify-center px-4 overflow-hidden">
      {/* 🎉 Confetti Layer */}
      {showConfetti && (
        <div className="fixed inset-0 z-[70] pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={300}
            recycle={true} // Confetti keeps recycling (continuous confetti)
          />
        </div>
      )}

      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Launching Soon <span className="inline-block animate-bounce">🚀</span>
        </h1>
        <p className="text-lg mb-6 text-gray-300">
          We're working hard to bring you something amazing. Be the first to
          know when we go live.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-md w-72 text-white bg-transparent border border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_0_20px_#00FFAB50]"
          />
          <button
            onClick={handleNotify}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 flex items-center gap-2 ${
              loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <span>🔔</span> {loading ? "Loading..." : "Notify Me"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div
            className={`w-96 p-6 rounded-lg text-center shadow-lg relative ${
              modalType === "success"
                ? "bg-green-600"
                : modalType === "exists"
                ? "bg-yellow-500"
                : "bg-red-600"
            }`}
          >
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-2 right-3 text-white text-xl font-bold"
              title="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">
              {modalType === "success"
                ? "🎉 Subscribed!"
                : modalType === "exists"
                ? "⚠️ Already Subscribed"
                : "❌ Invalid or Failed"}
            </h2>
            <p className="text-white">
              {modalType === "success"
                ? "You'll be the first to know when we launch."
                : modalType === "exists"
                ? "This email is already on our list."
                : "Please enter a valid email or try again later."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

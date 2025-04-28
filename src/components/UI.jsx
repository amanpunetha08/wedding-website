import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

// Photos array
const pictures = [
  "DSC01420",
  "DSC00993",
  "DSC00933",
  "DSC00966",
  "DSC01011",
  "DSC01040",
  "DSC00680",
  "DSC01489",
  "DSC02031",
  "DSC01103",
  "DSC02064",
  "DSC02069",
  "DSC01071",
  "DSC01064",
];

// Build the pages
export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [page, setPage] = useAtom(pageAtom);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audio] = useState(
    new Audio("/wedding-website/audios/background-music.mp3")
  );

  // Page flip sound
  useEffect(() => {
    const flipAudio = new Audio("/wedding-website/audios/page-flip-01a.mp3");
    flipAudio.play();
  }, [page]);

  // Background music
  useEffect(() => {
    const isAudioPlayedBefore = localStorage.getItem("audioPlayed");

    audio.loop = true;
    audio.muted = true;
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });

    const unmuteAudio = () => {
      if (!audioPlaying) {
        audio.muted = false;
        setAudioPlaying(true);
        localStorage.setItem("audioPlayed", "true");
        window.removeEventListener("click", unmuteAudio);
        window.removeEventListener("scroll", unmuteAudio);
      }
    };

    window.addEventListener("click", unmuteAudio);
    window.addEventListener("scroll", unmuteAudio);

    return () => {
      window.removeEventListener("click", unmuteAudio);
      window.removeEventListener("scroll", unmuteAudio);
    };
  }, [audio, audioPlaying]);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex flex-col justify-between">
        {/* Header */}
        <header className="pointer-events-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-4">
            <img
              className="w-40 h-auto sm:w-48"
              src="/wedding-website/images/aman&garima.png"
              alt="Logo"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex justify-center gap-10 text-[#f5f5f5] text-lg font-serif tracking-wide">
            {["Home", "About", "Functions", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#e0c070] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <div className="sm:hidden">
            <button
              className="text-white text-3xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="pointer-events-auto sm:hidden flex flex-col items-center gap-4 py-6 bg-black/80 text-white text-lg font-serif">
            {["Home", "About", "Functions", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#e0c070] transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* Page Navigation */}
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      {/* Marquee Text */}
      <div className="fixed inset-0 overflow-hidden select-none flex items-center -rotate-2">
        <div className="w-full whitespace-nowrap">
          <div className="flex animate-marquee w-[200%]">
            {/* First Instance */}
            <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-1/2 justify-center">
              <h1
                className="text-white text-4xl sm:text-5xl md:text-8xl lg:text-10xl font-bold"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Aman
              </h1>
              <h2
                className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-8xl italic"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                Weds
              </h2>
              <h2
                className="text-white text-4xl sm:text-6xl md:text-10xl lg:text-12xl font-bold"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Garima
              </h2>
            </div>

            {/* Second Instance */}
            <div className="flex items-center gap-6 sm:gap-8 w-full sm:w-1/2 justify-center">
              <h1
                className="text-white text-4xl sm:text-5xl md:text-8xl lg:text-10xl font-bold"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Aman
              </h1>
              <h2
                className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-8xl italic"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                Weds
              </h2>
              <h2
                className="text-white text-4xl sm:text-6xl md:text-10xl lg:text-12xl font-bold"
                style={{ fontFamily: "Dancing Script, cursive" }}
              >
                Garima
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio */}
      {audioPlaying && (
        <audio
          src="/wedding-website/audios/background-music.mp3"
          autoPlay
          loop
          muted={false}
          className="hidden"
        />
      )}
    </>
  );
};

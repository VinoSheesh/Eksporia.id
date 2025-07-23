import { Ship, MapPin, Eye, Target } from "lucide-react";
import { useEffect, useState } from "react";
import visi from "../assets/about/visi.png"
import misi from "../assets/about/misi.png"
import tentang from "../assets/about/tentang.png"
import latarBelakang from "../assets/about/latarBelakang.png"

function About() {

  const CARD_IDS = ['tentang', 'latar', 'visi', 'misi'];

  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('cards-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = container.offsetHeight - windowHeight;

      // Hitung progress (0 sampai 1)
      let progress = (windowHeight - rect.top) / totalScroll;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // Tentukan kartu mana yang muncul
      const visible: string[] = [];
      CARD_IDS.forEach((id, idx) => {
        if (progress > idx * 0.25) visible.push(id);
      });
      setVisibleCards(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardAnimation = (cardId: string, index: number) => {
    const isVisible = visibleCards.includes(cardId);
    return {
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(80px) scale(0.8)',
      opacity: isVisible ? 1 : 0,
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.3}s`
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center sticky top-0 z-0">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent mt-8 animate-pulse">
            Eksporia.id
          </h1>
        </div>
      </div>

      {/* Cards Container */}
      <div id="cards-container" className="relative h-[100vh] bg-gray-100 dark:bg-gray-900">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
          <div className="max-w-5xl mx-20 px-6 w-full">
            <div className="rounded-t-[64px]  bg-gray-100 dark:bg-gray-900">
              <h2 className="text-5xl font-bold text-center text-gray-800 dark:text-gray-200 py-8 opacity-90">
                Adalah
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-4 grid-rows-6 gap-6 ">
              {/* Tentang Kami - Large card */}
              <div
                className="col-span-2 row-span-5 relative rounded-3xl overflow-hidden group cursor-pointer"
                style={{
                  backgroundImage: `url(${tentang})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `center`,
                  willChange: "background-position",
                  ...getCardAnimation('tentang', 0),
                  ...(visibleCards.includes('tentang') ? getCardAnimation('tentang', 0) : {})
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br transition-all duration-700"
                  style={{
                    backgroundImage: `url(${tentang})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `center`,
                  }}></div>

                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 10}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Icon with enhanced hover */}
                <div className="absolute top-8 left-8 z-10 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-white/40 group-hover:shadow-xl transition-all duration-500">
                    <Ship className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                </div>

                {/* Content with enhanced hover effects */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-end group-hover:translate-y-[-8px] transition-transform duration-500">
                  <h2 className="text-4xl font-bold text-white mb-6 group-hover:text-blue-100 group-hover:scale-105 transition-all duration-500">
                    Tentang Kami
                  </h2>
                  <p className="text-white/90 text-lg leading-relaxed group-hover:text-white transition-all duration-500">
                    Eksporia.id adalah platform ekspor digital yang membantu pelaku usaha Indonesia menjangkau pasar global dengan mudah dan terpercaya. Kami hadir sebagai solusi lengkap—dari edukasi, pengurusan dokumen, hingga pengiriman.
                  </p>
                </div>

                {/* Enhanced mask with hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>

                {/* Hover shadow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl rounded-3xl"></div>
              </div>

              {/* Latar Belakang */}
              <div
                className="col-span-2 row-span-3 relative rounded-3xl overflow-hidden group cursor-pointer"
                style={{
                  backgroundImage: `url(${latarBelakang})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `center`,
                  ...getCardAnimation('latar', 1),
                  ...(visibleCards.includes('latar') ? getCardAnimation('latar', 1) : {})
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br transition-all duration-700"
                  style={{
                    backgroundImage: `url(${latarBelakang})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `center`,
                  }}></div>

                {/* Animated background */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute top-8 right-8 w-32 h-32 border-2 border-white/30 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-1000"></div>
                  <div className="absolute top-16 right-16 w-16 h-16 border border-white/40 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                </div>

                <div className="absolute top-8 left-8 z-10 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:bg-white/40 group-hover:shadow-xl transition-all duration-500">
                    <MapPin className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-end group-hover:translate-y-[-6px] transition-transform duration-500">
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-100 group-hover:scale-105 transition-all duration-500">
                    Latar Belakang
                  </h2>
                  <p className="text-white/90 text-base leading-relaxed group-hover:text-white transition-all duration-500">
                    Banyak pengusaha kesulitan ekspor karena minimnya akses dan informasi. Eksporia.id hadir untuk membuka jalan dan memberikan akses lebih sederhana serta bisa diakses siapa saja.
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>
              </div>

              {/* Visi */}
              <div
                className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer"
                style={{
                  backgroundImage: `url(${visi})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `center`,
                  ...getCardAnimation('visi', 2),
                  ...(visibleCards.includes('visi') ? getCardAnimation('visi', 2) : {})
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br transition-all duration-700"
                  style={{
                    backgroundImage: `url(${visi})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `center`,
                  }}></div>

                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute top-6 right-6 w-20 h-20 border border-white/30 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                </div>

                <div className="absolute top-6 left-6 z-10 group-hover:scale-125 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-white/40 group-hover:shadow-lg transition-all duration-500">
                    <Eye className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-end group-hover:translate-y-[-4px] transition-transform duration-500">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 group-hover:scale-105 transition-all duration-500">
                    Visi
                  </h2>
                  <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-all duration-500">
                    Menjadi jembatan utama produk lokal Indonesia ke pasar dunia.
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>
              </div>

              {/* Misi */}
              <div
                className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer"
                style={{
                  ...getCardAnimation('misi', 3),
                  ...(visibleCards.includes('misi') ? getCardAnimation('misi', 3) : {})
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br transition-all duration-700"
                  style={{
                    backgroundImage: `url(${misi})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `center`,
                  }}></div>

                <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute top-6 right-6 w-20 h-20 border border-white/30 rounded-lg rotate-45 group-hover:rotate-90 group-hover:scale-110 transition-all duration-700"></div>
                </div>

                <div className="absolute top-6 left-6 z-10 group-hover:scale-125 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-white/40 group-hover:shadow-lg transition-all duration-500">
                    <Target className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-700" />
                  </div>
                </div>

                <div className="relative z-10 p-6 h-full flex flex-col justify-end group-hover:translate-y-[-4px] transition-transform duration-500">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-100 group-hover:scale-105 transition-all duration-500">
                    Misi
                  </h2>
                  <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-all duration-500">
                    Memberikan kemudahan ekspor melalui digitalisasi proses dan edukasi komprehensif.
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
"use client"

import { useState, useRef, useEffect } from "react"
import PotensiCard from "../components/PotensiCard"
import PotensiModal from "../components/PotensiModal"
import potensiList, { type PotensiData } from "../data/DataPotensi"

function Potensi() {
  const [selectedProduct, setSelectedProduct] = useState(null as PotensiData | null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollX, setScrollX] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // State for scroll reveal animation
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (data: PotensiData | null) => {
    if (isScrolling) return
    setSelectedProduct(data)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollX(containerRef.current.scrollLeft)
    }
  }

  const handleResize = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth
      setContainerWidth(width)
      setIsMobile(window.innerWidth < 768)
    }
  }

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (el) {
      el.addEventListener("scroll", handleScroll)
      handleResize() // Initial size
      window.addEventListener("resize", handleResize)

      return () => {
        el.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  // Responsive card dimensions
  const CARD_WIDTH = isMobile ? Math.min(280, containerWidth - 80) : 300
  const CARD_GAP = isMobile ? 20 : 32

  // Calculate exact center padding to ensure perfect centering
  const centerPadding = Math.max((containerWidth - CARD_WIDTH) / 2, isMobile ? 40 : 60)

  // Calculate total content width with proper padding
  const totalContentWidth = potensiList.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP + centerPadding * 2
  const maxScrollLeft = Math.max(0, totalContentWidth - containerWidth)

  // Calculate active index based on scroll position - more accurate
  const getActiveIndex = () => {
    if (containerWidth === 0) return 0

    // Calculate which card should be centered based on scroll position
    const scrollCenter = scrollX + containerWidth / 2
    const cardIndex = Math.round((scrollCenter - centerPadding - CARD_WIDTH / 2) / (CARD_WIDTH + CARD_GAP))

    return Math.max(0, Math.min(potensiList.length - 1, cardIndex))
  }

  const activeIndex = getActiveIndex()

  const scrollToCard = (index: number) => {
    if (containerRef.current && !isScrolling) {
      setIsScrolling(true)

      // Calculate the exact position to center the card
      const cardPosition = index * (CARD_WIDTH + CARD_GAP)
      const targetScroll = cardPosition - (containerWidth - CARD_WIDTH) / 2

      containerRef.current.scrollTo({
        left: Math.max(0, Math.min(maxScrollLeft, targetScroll)),
        behavior: "smooth",
      })

      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false)
      }, 800) // Slightly longer than scroll animation
    }
  }

  // Auto-center first card on load
  useEffect(() => {
    if (containerRef.current && containerWidth > 0) {
      setTimeout(() => {
        scrollToCard(0)
      }, 100)
    }
  }, [containerWidth, CARD_WIDTH])

  return (
    <div
      id="potensi"
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out bg-white dark:bg-gray-900 min-h-screen ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto pt-8 md:pt-32 pb-16 px-2 sm:px-4">
        {/* Header with reveal animation */}
        <div
          className={`text-center mb-8 md:mb-16 px-4 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 mb-2">
            Potensi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl px-4">
            Jelajahi berbagai potensi yang ada
          </p>
        </div>

        {/* Carousel Container with reveal animation */}
        <div
          className={`relative transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          {/* Gradient Overlays - Responsive */}
          <div
            className={`absolute left-0 top-0 bottom-0 ${isMobile ? "w-8" : "w-20"} bg-gradient-to-r from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent z-10 pointer-events-none`}
          ></div>
          <div
            className={`absolute right-0 top-0 bottom-0 ${isMobile ? "w-8" : "w-20"} bg-gradient-to-l from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent z-10 pointer-events-none`}
          ></div>

          <div
            ref={containerRef}
            className="overflow-x-auto no-scrollbar snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              // Enhanced smooth scrolling properties
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: `${centerPadding}px`,
              scrollPaddingRight: `${centerPadding}px`,
            }}
          >
            {/* Cards container with perfect centering */}
            <div
              className={`flex items-center ${isMobile ? "min-h-[400px]" : "min-h-[450px]"}`}
              style={{
                paddingLeft: `${centerPadding}px`,
                paddingRight: `${centerPadding}px`,
                gap: `${CARD_GAP}px`,
                width: `${totalContentWidth}px`,
              }}
            >
              {potensiList.map((data, index) => {
                // More precise card position calculation for centering effects
                const cardLeft = centerPadding + index * (CARD_WIDTH + CARD_GAP)
                const cardCenter = cardLeft + CARD_WIDTH / 2 - scrollX
                const containerCenter = containerWidth / 2

                // Calculate distance from exact center
                const distanceFromCenter = Math.abs(containerCenter - cardCenter)
                const maxEffectDistance = (CARD_WIDTH + CARD_GAP) * 0.8
                const normalizedDistance = Math.min(distanceFromCenter / maxEffectDistance, 1)

                const scaleMin = isMobile ? 0.75 : 0.65
                const scaleMax = 1.0
                const scale = scaleMax - Math.pow(normalizedDistance, 1.8) * (scaleMax - scaleMin)

                // Enhanced opacity curve
                const opacityMin = isMobile ? 0.4 : 0.3
                const opacityMax = 1.0
                const opacity = opacityMax - Math.pow(normalizedDistance, 1.4) * (opacityMax - opacityMin)

                const maxBlur = isMobile ? 2 : 3
                const blurAmount = Math.pow(normalizedDistance, 1.6) * maxBlur

                // Z-index for proper layering
                const zIndex = Math.floor(100 - normalizedDistance * 50)

                const isNearLeftEdge = cardCenter < containerWidth * 0.15
                const isNearRightEdge = cardCenter > containerWidth * 0.85
                const shouldDisablePointer = (isNearLeftEdge || isNearRightEdge) && normalizedDistance > 0.3

                return (
                  <div
                    key={data.id}
                    className={`snap-center flex-shrink-0 transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    } ${shouldDisablePointer ? "pointer-events-none" : "pointer-events-auto"}`}
                    style={{
                      width: `${CARD_WIDTH}px`,
                      transform: `scale(${scale}) translateZ(0) ${!isVisible ? "translateY(48px)" : ""}`,
                      opacity: isVisible ? opacity : 0,
                      filter: `blur(${blurAmount}px)`,
                      zIndex,
                      transition: isVisible
                        ? "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        : "all 1s cubic-bezier(0.4, 0.0, 0.2, 1)",
                      transitionDelay: isVisible ? "0ms" : `${600 + index * 100}ms`,
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    <PotensiCard data={data} onClick={handleCardClick} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Enhanced Scroll Indicators with reveal animation */}
          <div
            className={`flex justify-center mt-6 md:mt-8 space-x-1.5 md:space-x-2 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
          >
            {potensiList.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-500 rounded-full touch-manipulation ${
                  index === activeIndex
                    ? `${isMobile ? "w-8 h-1.5" : "w-10 h-2"} bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg`
                    : `${isMobile ? "w-1.5 h-1.5" : "w-2 h-2"} bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 active:bg-gray-500`
                }`}
                onClick={() => scrollToCard(index)}
                disabled={isScrolling}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className={`absolute ${isMobile ? "left-1 top-1/2" : "left-4 top-1/2"} -translate-y-1/2 z-30 ${isMobile ? "w-10 h-10" : "w-12 h-12"} bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center opacity-80 hover:opacity-100 active:opacity-100 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none touch-manipulation ${
              isVisible ? "translate-x-0" : "-translate-x-8"
            }`}
            style={{
              transitionDelay: isVisible ? "600ms" : "0ms",
              transitionDuration: isVisible ? "800ms" : "300ms",
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (activeIndex > 0 && !isScrolling) {
                scrollToCard(activeIndex - 1)
              }
            }}
            disabled={activeIndex <= 0 || isScrolling}
            aria-label="Previous card"
          >
            <svg
              className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-gray-700 dark:text-gray-300`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className={`absolute ${isMobile ? "right-1 top-1/2" : "right-4 top-1/2"} -translate-y-1/2 z-30 ${isMobile ? "w-10 h-10" : "w-12 h-12"} bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center opacity-80 hover:opacity-100 active:opacity-100 active:scale-95 transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none touch-manipulation ${
              isVisible ? "translate-x-0" : "translate-x-8"
            }`}
            style={{
              transitionDelay: isVisible ? "600ms" : "0ms",
              transitionDuration: isVisible ? "800ms" : "300ms",
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (activeIndex < potensiList.length - 1 && !isScrolling) {
                scrollToCard(activeIndex + 1)
              }
            }}
            disabled={activeIndex >= potensiList.length - 1 || isScrolling}
            aria-label="Next card"
          >
            <svg
              className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} text-gray-700 dark:text-gray-300`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Modal */}
        <PotensiModal data={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  )
}

export default Potensi

"use client"

import type React from "react"

import { MapPin, Star, Eye } from "lucide-react"
import type { PotensiData } from "../data/DataPotensi"

interface PotensiCardProps {
  data: PotensiData
  onClick: (data: PotensiData | null) => void
}

const PotensiCard: React.FC<PotensiCardProps> = ({ data, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:-translate-y-2 flex-shrink-0 w-2xl sm:w-80 min-h-[400px] group relative border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
      onClick={() => onClick(data)}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-blue-50/0 group-hover:from-orange-50/30 group-hover:to-blue-50/20 dark:group-hover:from-orange-900/10 dark:group-hover:to-blue-900/10 transition-all duration-500 rounded-xl pointer-events-none"></div>

      <div className="relative">
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={data.image}
            alt={data.nama}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Enhanced category badge with subtle animation */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            {data.kategori}
          </span>
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>
      </div>

      <div className="p-4 relative z-10">
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
          <MapPin className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:scale-110" />
          <span>{data.lokasi}</span>
        </div>

        <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-100">
          {data.nama}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-xs mb-4 line-clamp-2 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
          {data.deskripsi.substring(0, 80)}...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center transition-transform duration-300 group-hover:scale-105">
            <Star className="w-3 h-3 text-yellow-400 mr-1 transition-all duration-300 group-hover:text-yellow-500 group-hover:drop-shadow-sm" />
            <span className="text-xs text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
              {data.rating}
            </span>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 hover:-translate-y-0.5">
            <Eye className="w-3 h-3 mr-1 transition-transform duration-300 group-hover:scale-110" />
            Pelajari
          </button>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  )
}

export default PotensiCard

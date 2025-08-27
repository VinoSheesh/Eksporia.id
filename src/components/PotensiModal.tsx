"use client"

import type React from "react"

import { X, MapPin, Star, TrendingUp, Users, Calendar, ChevronDown } from "lucide-react"
import type { PotensiData } from "../data/DataPotensi"
import { useEffect } from "react"

export interface PotensiModalProps {
  data: PotensiData | null
  isOpen: boolean
  onClose: () => void
}

const PotensiModal: React.FC<PotensiModalProps> = ({ data, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !data) return null

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-8">
            {/* Tombol close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Isi Modal */}
            <div className="overflow-y-auto no-scrollbar">
              {/* Gambar dan Kategori */}
              <div className="relative">
                <img
                  src={data.image || "/placeholder.svg"}
                  alt={data.nama}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {data.kategori}
                  </span>
                </div>
              </div>

              {/* Konten */}
              <div className="p-6">
                {/* Nama dan Lokasi */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{data.nama}</h2>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{data.lokasi}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="font-semibold text-yellow-600 dark:text-yellow-400">{data.rating}</span>
                  </div>
                </div>

                {/* Deskripsi */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{data.deskripsi}</p>

                {/* Informasi Detail */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Produksi Tahunan</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{data.produksiTahunan}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Area Produksi</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{data.areaProduksi}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-purple-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Jumlah Pelaku</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{data.jumlahPetani}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-orange-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Dimulai Sejak</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{data.tahunMulai}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keunggulan */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Keunggulan</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {data.keunggulan.map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Pasar */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Target Pasar</h3>
                  <div className="flex gap-2 flex-wrap">
                    {data.pasar.map((pasar, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {pasar}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Icon Bawah */}
                <div className="flex justify-center">
                  <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PotensiModal

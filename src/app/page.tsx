"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from "framer-motion"
import { Play, Pause, Square } from 'lucide-react'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'

export default function Home() {

  const [time, setTime] = useState<Date | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  const formatTime_full = (date: Date) => {
    return date.toLocaleString(); // e.g. "6/28/2025, 10:42:05 AM"
  }

  const formatTime_hour = (date: Date) => {
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const updateTime = () => setTime(new Date())

  useEffect(() => {
    setHasMounted(true)
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className='min-h-screen flex items-center justify-center bg-white p-6'
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Card className='max-w-4xl w-full p-10 shadow-md rounded-lg'>
        <div className='text-xl font-bold text-gray-900'>
          <div className='text-2xl font-extrabold mb-4'>
            Timer App
          </div>
          <div className='text-lg text-gray-700'>
            {time ? formatTime_full(time) : 'Loading...'}
          </div>

          {hasMounted && (
            <div className='flex gap-6 pt-8'>
              <div className='flex-[2] pr-6 flex justify-center items-center'>
                <Clock value={time} size={280} />
              </div>

              <Card className='flex-[3] p-6 shadow-sm rounded-lg border border-gray-200'>
                <Card className='flex items-center justify-center'>
                  00 : 00 : 00
                </Card>

                <div className='flex gap-6 text-gray-700 text-lg p-2'>
                  <input
                    placeholder='Set hour'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                  <input
                    placeholder='Set minute'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                  <input
                    placeholder='Set second'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>

                <div className='flex items-center justify-center gap-4'>
                  <motion.div whileHover={{ scale: 1.13 }}>
                    <Square className="w-8 h-8 text-red-500" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.13 }}>
                    <Pause className="w-8 h-8 text-yellow-500" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.13 }}>
                    <Play className="w-8 h-8 text-green-500" />
                  </motion.div>
                </div>
              </Card>

            </div>
          )}

        </div>
      </Card>
    </motion.div>
  )
}

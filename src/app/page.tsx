"use client"

import { useState, useEffect, ChangeEvent, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from "framer-motion"
import { Play, Pause, Square } from 'lucide-react'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'
import { Button } from '@/components/ui/button'

export default function Home() {

  const [time, setTime] = useState<Date | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  const [hour, setHour] = useState("00")
  const [minute, setMinute] = useState("00")
  const [second, setSecond] = useState("00")

  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const remainingRef = useRef(0);

  const start = () => {

    alert("Countdown Started")

    const totalSeconds = Number(hour) * 3600 + Number(minute) * 60 + Number(second)
    if (isNaN(totalSeconds) || totalSeconds <= 0) return

    remainingRef.current = totalSeconds
    setIsRunning(true)

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (remainingRef.current <= 0) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        setIsRunning(false)
        return alert("Alarm !")
      }

      remainingRef.current -= 1;

      const h = Math.floor(remainingRef.current / 3600)
      const m = Math.floor((remainingRef.current % 3600) / 60)
      const s = remainingRef.current % 60;

      setHour(h.toString().padStart(2, '0'))
      setMinute(m.toString().padStart(2, '0'))
      setSecond(s.toString().padStart(2, '0'))

    }, 1000)
  }

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setIsRunning(false)
    alert("Time Paused")
  }

  const stop = () => {
    pause()

    setHour("00")
    setMinute("00")
    setSecond("00")
    remainingRef.current = 0

    alert("Cleared")
  }

  const formatTime_full = (date: Date) => {
    return date.toLocaleString()
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
                  {hour} : {minute} : {second}
                </Card>

                <div className='flex gap-6 text-gray-700 text-lg p-2'>
                  <input
                    type='number'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {

                      if (e.target.value === "") {
                        setHour("00")
                        return
                      }
                      const num = Math.max(0, Math.min(100, parseInt(e.target.value)));
                      setHour(num.toString().padStart(2, "0"));

                    }}
                    placeholder='Set hour'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    min={0}
                    max={100}
                    step={1}
                  />
                  <input
                    type='number'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {

                      if (e.target.value === "") {
                        setMinute("00")
                        return
                      }
                      const num = Math.max(0, Math.min(60, parseInt(e.target.value)));
                      setMinute(num.toString().padStart(2, "0"));

                    }}
                    placeholder='Set minute'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    min={0}
                    max={60}
                    step={1}
                  />
                  <input
                    type='number'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {

                      if (e.target.value === "") {
                        setSecond("00")
                        return
                      }
                      const num = Math.max(0, Math.min(60, parseInt(e.target.value)));
                      setSecond(num.toString().padStart(2, "0"));

                    }}
                    placeholder='Set second'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    min={0}
                    max={60}
                    step={1}
                  />
                </div>

                <div className='flex items-center justify-center gap-4'>
                  <motion.div whileHover={{ scale: 1.13 }}>
                    <Button
                      variant="outline"
                      className="p-2 border border-red-500 hover:bg-red-100"
                      onClick={stop}
                    >
                      <Square className="w-6 h-6 text-red-500" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.13 }}>
                    <Button
                      variant="outline"
                      className="p-2 border border-yellow-500 hover:bg-yellow-100"
                      onClick={pause}
                    >
                      <Pause className="w-6 h-6 text-yellow-500" />
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.13 }}>
                    <Button
                      variant="outline"
                      className="p-2 border border-green-500 hover:bg-green-100"
                      onClick={start}
                    >
                      <Play className="w-6 h-6 text-green-500" />
                    </Button>
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

import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

function App() {
  const [current, setCurrent] = useState(0)
  const [showBtn, setShowBtn] = useState(false)
  const slides = useMemo(
    () => [
      { title: 'Benvenuto!', text: 'Finalmente la nuova Montanari App è qui', bg: '#FFD400' },
      { title: 'Libri e Poesia', text: 'Esplora contenuti unici e ispiranti', bg: '#FFF176' },
      { title: 'Scopri', text: 'Tutto ciò che ami in un’unica app elegante', bg: '#FFE57F' },
      { title: 'Pronta da scaricare!', text: 'Non perdere tempo, scarica ora', bg: '#FFD400' },
    ],
    []
  )

  const intervalRef = useRef(null)

  useEffect(() => {
    // cycle through slides
    const start = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => {
          const next = prev + 1
          if (next >= slides.length) {
            clearInterval(intervalRef.current)
            setShowBtn(true)
            return prev
          }
          return next
        })
      }, 4000)
    }, 1000)

    return () => {
      clearTimeout(start)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [slides.length])

  useEffect(() => {
    // create floating book icons
    const count = 8
    const icons = []
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'book-icon'
      el.style.left = Math.random() * 90 + '%'
      el.style.top = Math.random() * 80 + '%'
      el.style.animationDuration = 4 + Math.random() * 3 + 's'
      document.body.appendChild(el)
      icons.push(el)
    }
    return () => {
      icons.forEach((el) => el.remove())
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Spline full-cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* brand tint for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-[#FFD400]/40 to-white/70" />
      </div>

      {/* Dynamic background color layer to match original effect */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: slides[current].bg, mixBlendMode: 'soft-light' }}
      />

      {/* Slides */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#003A8C] drop-shadow-sm">{s.title}</h1>
            <p className="mt-4 text-2xl md:text-3xl text-[#003A8C] max-w-3xl">{s.text}</p>
            {i === slides.length - 1 && (
              <a
                href="https://drive.google.com/file/d/1mCb6fNwNQSyy179mG34dYvK8IbBV3pqr/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex items-center justify-center rounded-xl px-8 py-4 text-xl font-semibold transition-transform duration-700 bg-[#003A8C] text-[#FFD400] shadow-lg ${
                  showBtn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                Download
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Floating book icons styling */}
      <style>{`
        .book-icon {
          position: absolute;
          width: 50px; height: 50px;
          background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/11/Book_icon_1.svg');
          background-size: contain;
          background-repeat: no-repeat;
          animation: float 6s ease-in-out infinite;
          z-index: 5;
          opacity: 0.85;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  )
}

export default App

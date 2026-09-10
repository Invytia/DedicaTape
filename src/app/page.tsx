export default function Home() {
  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Panel Izquierdo: Formulario */}
        <div className="w-full md:w-1/2 p-8 bg-neutral-50 border-r border-neutral-200">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Crea tu Mixtape</h1>
          <p className="text-neutral-500 mb-8">Personaliza tu casete y añade hasta 4 canciones.</p>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Título del Casete</label>
              <input type="text" placeholder="Ej. Para mi persona favorita" className="w-full border border-neutral-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Mensaje Especial</label>
              <textarea placeholder="Escribe una dedicatoria..." rows={3} className="w-full border border-neutral-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Color del Casete</label>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-transparent focus:border-black transition-all"></button>
                <button className="w-10 h-10 rounded-full bg-red-400 border-2 border-transparent focus:border-black transition-all"></button>
                <button className="w-10 h-10 rounded-full bg-blue-400 border-2 border-transparent focus:border-black transition-all"></button>
                <button className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-transparent focus:border-black transition-all"></button>
              </div>
            </div>

            <button className="w-full bg-black text-white font-bold py-3 rounded-lg mt-6 hover:bg-neutral-800 transition-colors">
              Generar Mixtape
            </button>
          </div>
        </div>

        {/* Panel Derecho: Previsualización */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-[#e5e5f7] relative">
          {/* Fondo estilo cuadrícula retro */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#444cf7 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          
          <div className="z-10 text-center">
            <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-6">Vista Previa</h2>
            
            {/* Casete Placeholder (Pronto lo cambiaremos por el SVG) */}
            <div className="w-72 h-48 bg-yellow-400 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 w-3/4 h-12 bg-white border-2 border-black rounded flex items-center justify-center">
                 <span className="font-mono text-black font-bold">LADO A</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-black bg-white mx-4 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-black bg-white mx-4 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

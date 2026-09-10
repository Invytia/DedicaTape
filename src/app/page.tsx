'use client';

import { useState } from 'react';

export default function Home() {
  // Estados para guardar lo que escribe el usuario
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [color, setColor] = useState('bg-yellow-400');
  
  // Estados para controlar el proceso
  const [loading, setLoading] = useState(false);
  const [mixtapeLink, setMixtapeLink] = useState('');

  // Tu Webhook de Google Apps Script
  const webhookUrl = 'https://script.google.com/macros/s/AKfycbzEuISqdSPvb53kM_DZykcWRKVBX7qA4BM6y4lwgosuMZ6IUdhgzB5M86EhlHFdvB23/exec';

  const generarMixtape = async () => {
    if (!titulo) return alert("Por favor, ponle un título a tu mixtape");
    
    setLoading(true);
    try {
      // Enviamos los datos a Google Sheets
      const response = await fetch(webhookUrl, {
        method: 'POST',
        // Usamos text/plain para evitar bloqueos de seguridad (CORS) en el navegador
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          titulo: titulo,
          mensaje: mensaje,
          color: color,
          canciones: [] // Pronto integraremos el buscador de YouTube aquí
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Obtenemos tu nombre de usuario de GitHub para generar el enlace real
        const githubUser = window.location.hostname.split('.')[0];
        const repoName = window.location.pathname.split('/')[1] || '';
        
        // Generamos el enlace corto final
        const urlBase = window.location.hostname === 'localhost' 
          ? 'http://localhost:3000' 
          : `https://${githubUser}.github.io/${repoName}`;
          
        setMixtapeLink(`${urlBase}/m/${data.id}`);
      } else {
        alert("Hubo un problema al generar el mixtape.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <main className="flex-grow flex items-center justify-center p-4 sm:p-8 min-h-screen bg-neutral-100 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Panel Izquierdo: Formulario */}
        <div className="w-full md:w-1/2 p-8 bg-neutral-50 border-r border-neutral-200">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Crea tu Mixtape</h1>
          <p className="text-neutral-500 mb-8">Personaliza tu casete y añade tu mensaje.</p>
          
          {mixtapeLink ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
              <h3 className="text-green-800 font-bold mb-2">¡Tu Mixtape está listo! 📼</h3>
              <p className="text-sm text-green-600 mb-4">Copia este enlace y envíalo por WhatsApp:</p>
              <input 
                type="text" 
                readOnly 
                value={mixtapeLink} 
                className="w-full border border-green-300 rounded p-2 text-center text-sm mb-4 outline-none bg-white"
              />
              <button 
                onClick={() => navigator.clipboard.writeText(mixtapeLink)}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Copiar Enlace
              </button>
              <button 
                onClick={() => setMixtapeLink('')}
                className="block w-full mt-4 text-sm text-neutral-500 underline"
              >
                Crear otro
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Título del Casete</label>
                <input 
                  type="text" 
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej. Para mi persona favorita" 
                  className="w-full border border-neutral-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black bg-white" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Mensaje Especial</label>
                <textarea 
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe una dedicatoria..." 
                  rows={3} 
                  className="w-full border border-neutral-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black bg-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Color del Casete</label>
                <div className="flex gap-3">
                  {['bg-yellow-400', 'bg-red-400', 'bg-blue-400', 'bg-neutral-800'].map((colorOp) => (
                    <button 
                      key={colorOp}
                      onClick={() => setColor(colorOp)}
                      className={`w-10 h-10 rounded-full ${colorOp} border-2 transition-all ${color === colorOp ? 'border-black scale-110 shadow-md' : 'border-transparent opacity-70'}`}
                    ></button>
                  ))}
                </div>
              </div>

              <button 
                onClick={generarMixtape}
                disabled={loading}
                className="w-full bg-black text-white font-bold py-3 rounded-lg mt-6 hover:bg-neutral-800 transition-colors disabled:bg-neutral-400"
              >
                {loading ? 'Generando y guardando...' : 'Generar Mixtape'}
              </button>
            </div>
          )}
        </div>

        {/* Panel Derecho: Previsualización */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-[#e5e5f7] relative">
          {/* Fondo estilo cuadrícula retro */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#444cf7 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          
          <div className="z-10 text-center w-full max-w-[300px]">
            <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-6 bg-white/50 inline-block px-3 py-1 rounded-full">Vista Previa</h2>
            
            {/* Casete Dinámico */}
            <div className={`w-full aspect-[3/2] ${color} rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden transition-colors duration-300`}>
              <div className="absolute top-4 w-3/4 min-h-[48px] bg-white border-2 border-black rounded flex items-center justify-center p-2 text-center">
                 <span className="font-mono text-black font-bold text-xs sm:text-sm leading-tight line-clamp-2">
                   {titulo || 'LADO A'}
                 </span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-black bg-white mx-4 flex items-center justify-center relative">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-black bg-white mx-4 flex items-center justify-center relative">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

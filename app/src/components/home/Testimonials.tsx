'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'João Silva',
    role: 'CEO, TechSolutions',
    content: 'A CMTecnologia transformou a nossa presença digital. O novo website aumentou as nossas conversões em 300% no primeiro mês.',
    image: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Ana Costa',
    role: 'Diretora de Marketing, InovaCorp',
    content: 'O nível de detalhe e a performance das aplicações desenvolvidas são impressionantes. Uma parceria que recomendamos a 100%.',
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    role: 'Fundador, StartUp PT',
    content: 'Desde a automação de processos até ao design premium, a equipa entregou resultados muito acima das nossas expectativas.',
    image: 'https://i.pravatar.cc/150?img=8',
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400"
          >
            Prova Social & Autoridade
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300"
          >
            O que dizem os líderes que confiaram na nossa visão e execução.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors duration-300 group"
            >
              <div className="text-5xl text-purple-500/50 absolute top-4 right-6 font-serif">"</div>
              <p className="text-gray-300 mb-8 relative z-10 text-lg leading-relaxed">
                {t.content}
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-purple-500/50 object-cover" />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-sm text-emerald-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
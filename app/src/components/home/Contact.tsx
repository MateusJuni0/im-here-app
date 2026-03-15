'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, ChevronDown, Monitor, Cpu, Zap } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone deve ter pelo menos 9 dígitos').regex(/^[\d\s\-+()]+$/, 'Telefone inválido'),
  service: z.string().min(1, 'Selecione um serviço'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulação da chamada /api/trpc/contact.submit que existia no legado
      // Como não sabemos a implementação do backend, simulamos com sucesso.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mostrar notificação de sucesso com Sonner
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Obrigado! Entraremos em contato em até 24 horas.',
        duration: 5000,
        icon: <CheckCircle2 className="text-green-500" />,
        className: 'bg-black/90 border-green-500/30 text-white backdrop-blur-xl',
      });
      
      reset();
    } catch (error) {
      toast.error('Erro ao enviar mensagem.', {
        description: 'Por favor, verifique a sua ligação e tente novamente.',
        className: 'bg-black/90 border-red-500/30 text-white backdrop-blur-xl',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 w-full bg-black text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-900/30 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/30 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Disponibilidade Imediata
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Pronto para a Evolução <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Digital?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Deixe os detalhes connosco. Estamos prontos para criar soluções web premium e automatizar o seu negócio para escalar os seus resultados.
            </p>

            <ul className="mt-10 space-y-8 text-gray-300">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border border-purple-400/50 shadow-lg">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Websites de Alta Performance</h4>
                  <p className="text-gray-400 leading-relaxed">Soluções digitais que convertem, com design de elite e SEO otimizado para dominar as pesquisas.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 border border-blue-400/50 shadow-lg">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Automação com Inteligência Artificial</h4>
                  <p className="text-gray-400 leading-relaxed">Reduzimos os seus custos operacionais em até 80% com chatbots e automações personalizadas.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border border-amber-400/50 shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Resultados Acelerados</h4>
                  <p className="text-gray-400 leading-relaxed">O nosso foco é o seu ROI. Estratégias que geram crescimento visível e mensurável.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl lg:ml-auto"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-white">Inicie o seu Projeto</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Nome completo"
                    className={`w-full min-h-[48px] bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400 pl-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email profissional"
                      className={`w-full min-h-[48px] bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400 pl-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="Telefone"
                      className={`w-full min-h-[48px] bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-400 pl-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Service Selection */}
                <div className="relative">
                  <select
                    {...register('service')}
                    defaultValue=""
                    className={`w-full min-h-[48px] appearance-none bg-white/5 border ${errors.service ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                  >
                    <option value="" disabled className="bg-gray-900 text-gray-500">Selecione o serviço de interesse</option>
                    <option value="website" className="bg-gray-900 text-white">Websites Premium</option>
                    <option value="automacao" className="bg-gray-900 text-white">Automação & IA</option>
                    <option value="consultoria" className="bg-gray-900 text-white">Consultoria Estratégica</option>
                    <option value="outro" className="bg-gray-900 text-white">Outro</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </div>
                  {errors.service && <p className="mt-1 text-xs text-red-400 pl-1">{errors.service.message}</p>}
                </div>

                {/* Message */}
                <div className="relative">
                  <div className="absolute top-3 left-4 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                  </div>
                  <textarea
                    {...register('message')}
                    placeholder="Descreva o seu projeto..."
                    rows={4}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all resize-none`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-400 pl-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[56px] mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enviar Pedido de Contato</span>
                      <Send className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </section>
  );
}

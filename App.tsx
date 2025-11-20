
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  X, 
  Instagram,
  Linkedin,
  ArrowUpRight,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Service, TeamMember } from './types';

// --- Config ---
const WHATSAPP_NUMBER = "5519999592852";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// --- Dados ---

const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Tráfego Pago',
    description: 'Google Ads, Meta Ads & TikTok Ads.',
    icon: ArrowRight 
  },
  {
    id: '2',
    title: 'Social Media',
    description: 'Direção de arte & Estratégia de conteúdo.',
    icon: ArrowRight
  },
  {
    id: '3',
    title: 'Filmmaking',
    description: 'Produção audiovisual cinematográfica.',
    icon: ArrowRight
  },
  {
    id: '4',
    title: 'Branding',
    description: 'Posicionamento & Identidade Visual.',
    icon: ArrowRight
  }
];

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Vinicius',
    role: 'CEO',
    description: 'Visão Estratégica',
    // Updated image link for Vinicius
    image: 'https://drive.google.com/uc?export=view&id=1P4-di8Y7oBXeMf4sTvNrZblhRhoutSDA'
  },
  {
    id: '2',
    name: 'Mateus',
    role: 'COO',
    description: 'Direção Criativa',
    // Foto ilustrativa: Perfil criativo. Substitua pelo link real da sua foto.
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Gustavo',
    role: 'CCO',
    description: 'Novos Negócios',
    // Foto ilustrativa: Homem de Blazer. Substitua pelo link real da sua foto.
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Tech Corp",
    category: "Rebranding & Performance",
    video: "https://cdn.coverr.co/videos/coverr-hands-typing-on-a-laptop-keyboard-4689/1080p.mp4" 
  },
  {
    id: 2,
    title: "Fashion Brand",
    category: "Filmmaking & Social",
    video: "https://cdn.coverr.co/videos/coverr-walking-in-a-fashion-show-2728/1080p.mp4"
  },
  {
    id: 3,
    title: "Alpha Construtora",
    category: "Gestão de Tráfego",
    video: "https://cdn.coverr.co/videos/coverr-modern-office-buildings-5477/1080p.mp4"
  },
  {
    id: 4,
    title: "E-Commerce Growth",
    category: "Estratégia de Vendas",
    video: "https://cdn.coverr.co/videos/coverr-people-working-in-office-4668/1080p.mp4"
  }
];

// --- Componentes ---

const Marquee: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full overflow-hidden bg-[#00D2C1] py-4 md:py-6 border-y border-[#00D2C1]/20">
    <motion.div 
      className="flex gap-8 whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-heading font-bold text-black uppercase tracking-tighter flex items-center">
          {text} <span className="mx-4 w-4 h-4 bg-black rounded-full block"></span>
        </span>
      ))}
    </motion.div>
  </div>
);

const ServiceItem: React.FC<{ service: Service, index: number }> = ({ service, index }) => {
  return (
    <motion.div 
      className="group relative border-t border-white/20 py-12 md:py-16 cursor-pointer z-20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Removed background hover effect */}

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-baseline z-10 relative pointer-events-none">
        <h3 className="text-4xl md:text-6xl font-heading font-bold text-white group-hover:text-[#00D2C1] transition-colors duration-500 uppercase leading-none break-words">
          {service.title}
        </h3>
        <p className="text-gray-400 mt-4 md:mt-0 font-mono text-sm md:text-lg group-hover:text-white transition-colors duration-300">
          0{index + 1} — {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    instagram: '',
    nicho: '',
    objetivo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Nova Solicitação via Site Ômega*%0A%0A👤 *Nome:* ${formData.nome}%0A📱 *WhatsApp:* ${formData.whatsapp}%0A📸 *Instagram:* ${formData.instagram}%0A🎯 *Nicho:* ${formData.nicho}%0A🚀 *Objetivo:* ${formData.objetivo}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#00D2C1] selection:text-black cursor-none">
      <CustomCursor />
      <FluidBackground />
      <AIChat />

      {/* Botão Flutuante Whatsapp - Reduced size */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 md:left-12 md:bottom-12 z-40 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-[#00D2C1] text-black rounded-full hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00D2C1]/30"
      >
         <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7" />
         <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-50" />
      </a>

      {/* Navegação - Estilo KOTA */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference">
        <div className="flex items-center gap-6">
           {/* Boxed Logo */}
           <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter border-[3px] border-white px-3 py-1 md:px-4 md:py-2">
             ÔMEGA<span className="text-[#00D2C1]">.</span>
           </div>
           <span className="hidden md:block font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-300 mt-1">
             Est. 2024 : Brasil
           </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Pill Button CTA */}
          <a 
             href={WHATSAPP_LINK}
             target="_blank"
             rel="noopener noreferrer"
             className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold uppercase text-xs tracking-wide hover:bg-[#00D2C1] transition-colors duration-300"
           >
             Falar com a gente <ArrowRight className="w-4 h-4" />
           </a>

           {/* Circle Menu Button */}
           <button 
             onClick={() => setMenuOpen(true)}
             className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group bg-black/20 backdrop-blur-sm"
           >
             <div className="flex flex-col gap-1.5 group-hover:gap-0 transition-all">
               <span className="w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
               <span className="w-6 h-0.5 bg-white group-hover:bg-black transition-colors" />
             </div>
           </button>
        </div>
      </nav>

      {/* MENU ESTILO CARD BRANCO */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-0"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white text-black w-full max-w-sm rounded-[1.5rem] p-8 relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar */}
              <button 
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Links */}
              <div className="flex flex-col gap-4 mt-8 mb-8">
                {['Trabalhos', 'Metodologia', 'A Agência', 'Serviços', 'Contato'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-').replace('ê', 'e')}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="text-2xl md:text-3xl font-heading font-bold hover:text-[#00D2C1] transition-colors w-fit bg-transparent text-black"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* Botão CTA Estilo Pílula */}
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-between w-full px-6 py-4 border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 group bg-transparent text-black"
              >
                <span className="font-medium text-lg">Iniciar Projeto</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.a>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
         
         <div className="flex flex-col justify-center z-10 w-full max-w-[90vw] mx-auto">
            <motion.div 
              style={{ y: heroTextY, opacity: heroOpacity }}
              className="w-full"
            >
               {/* Hierarquia Visual Limpa */}
               <h1 className="flex flex-col items-start">
                  <span className="block text-xl md:text-3xl font-bold uppercase tracking-widest text-gray-400 mb-4 pl-1">
                    Assessoria
                  </span>
                  <span className="block text-[10vw] font-black uppercase tracking-tighter text-white leading-none -ml-1">
                    ÔMEGA<span className="text-[#00D2C1]">.</span>
                  </span>
               </h1>
            </motion.div>
         </div>

         {/* Bottom Info Bar */}
         <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-t border-white/10 pt-8">
            
            {/* Badges */}
            <div className="flex gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00D2C1] rounded-full"></div>
                  <span className="font-mono text-xs md:text-sm font-bold">GOOGLE PARTNER</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00D2C1] rounded-full"></div>
                  <span className="font-mono text-xs md:text-sm font-bold">META ADS</span>
               </div>
            </div>

            {/* Descrição */}
            <div className="flex justify-end">
               <p className="text-lg md:text-xl text-gray-400 leading-tight max-w-md text-left md:text-right">
                 Estratégias de performance para marcas que <span className="text-white font-bold border-b border-[#00D2C1]">lideram o mercado</span>.
               </p>
            </div>
         </div>

      </header>

      {/* SERVICES LIST */}
      <section id="servicos" className="pb-32 relative z-10">
        <div className="relative px-6 md:px-12 mb-12 md:mb-20 pt-24 md:pt-0">
            {/* Título Reduzido e Ajustado */}
            <h2 className="text-[6vw] leading-[0.95] font-heading font-black uppercase tracking-tighter text-white py-4">
                Nossos <br/> 
                <span className="text-[#00D2C1]">Serviços</span>
            </h2>
            
            <div className="absolute right-6 top-1/3 md:right-24 md:top-1/2 -translate-y-1/2 opacity-30">
               <ArrowRight className="w-16 h-16 md:w-24 md:h-24 text-white -rotate-45" />
            </div>
        </div>
        
        <div>
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
          <div className="border-t border-white/20" />
        </div>
      </section>

      <Marquee text="Performance • Branding • Estratégia • Growth" />

      {/* WORK GRID (VÍDEOS) */}
      <section id="trabalhos" className="py-24 md:py-32 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between mb-16 md:mb-20">
          <h2 className="text-[6vw] font-heading font-bold leading-[0.95] uppercase">
            Projetos <br/> <span className="text-[#00D2C1]">Selecionados</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="overflow-hidden rounded-lg mb-6 aspect-[4/5] relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  poster={`https://source.unsplash.com/random/800x1000?business&sig=${i}`}
                >
                   <source src={project.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-3xl font-heading font-bold">{project.title}</h3>
              <p className="text-gray-400 mt-2 uppercase text-sm tracking-wider">{project.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: METODOLOGIA */}
      <section id="metodologia" className="py-24 md:py-32 bg-white text-black relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 items-start">
               <div>
                 <h2 className="text-sm font-mono uppercase tracking-widest mb-6 text-gray-500">Por que a Ômega?</h2>
                 <h3 className="text-4xl md:text-7xl font-heading font-bold leading-[1.1] mb-8">
                   Não somos apenas <br/> uma agência.
                 </h3>
                 <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                   Somos um ecossistema de crescimento. Enquanto o mercado foca em "likes", nós focamos em receita, previsibilidade e construção de autoridade sólida.
                 </p>
               </div>

               <div className="flex flex-col gap-12 mt-8 md:mt-0">
                  {/* Card 1 */}
                  <div className="border-l-2 border-black pl-8 py-2 group hover:pl-12 transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4">
                       <Target className="w-8 h-8 text-[#00D2C1]" />
                       <h4 className="text-2xl font-heading font-bold">Estratégia 360º</h4>
                     </div>
                     <p className="text-gray-600">
                       Integramos tráfego, conteúdo e branding. Não adianta atrair clientes se a sua casa não está pronta para recebê-los.
                     </p>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="border-l-2 border-gray-200 hover:border-black pl-8 py-2 group hover:pl-12 transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4">
                       <BarChart3 className="w-8 h-8 text-[#00D2C1]" />
                       <h4 className="text-2xl font-heading font-bold">Foco em ROI</h4>
                     </div>
                     <p className="text-gray-600">
                       Criatividade sem venda é arte. Nosso foco é performance e retorno sobre o investimento do seu negócio.
                     </p>
                  </div>

                  {/* Card 3 */}
                  <div className="border-l-2 border-gray-200 hover:border-black pl-8 py-2 group hover:pl-12 transition-all duration-300">
                     <div className="flex items-center gap-4 mb-4">
                       <Zap className="w-8 h-8 text-[#00D2C1]" />
                       <h4 className="text-2xl font-heading font-bold">Escala Previsível</h4>
                     </div>
                     <p className="text-gray-600">
                       Implementamos processos validados para que o crescimento da sua empresa não seja uma questão de sorte.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* TEAM */}
      <section id="a-agencia" className="py-24 md:py-32 bg-[#050505] text-white border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-tight">As Mentes</h2>
                <p className="mt-4 md:mt-0 max-w-md text-gray-400">
                    Por trás de cada estratégia existe um time obcecado por resultados.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TEAM.map((member) => (
                <div key={member.id} className="relative group border border-white/10 hover:bg-white hover:text-black transition-colors duration-500 p-8 flex flex-col justify-between h-[400px] overflow-hidden">
                  <div className="z-10 relative">
                    <div className="text-xs font-mono uppercase mb-4 text-[#00D2C1] group-hover:text-[#00806d] transition-colors">{member.role}</div>
                    <h3 className="text-3xl font-heading font-bold">{member.name}</h3>
                  </div>
                  
                  <div className="mt-auto z-10 relative">
                     <p className="text-sm text-gray-400 group-hover:text-gray-600 border-t border-white/20 group-hover:border-black/10 pt-4 transition-colors">{member.description}</p>
                  </div>

                  {/* Imagem da Equipe */}
                  <img 
                    src={member.image}
                    className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 object-cover grayscale group-hover:grayscale-0 opacity-30 group-hover:opacity-100 transition-all duration-500 mix-blend-screen group-hover:mix-blend-normal"
                    style={{ clipPath: 'circle(70% at 80% 80%)' }}
                    alt={member.name}
                  />
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* FOOTER / CONTACT FORM */}
      <footer id="contato" className="bg-black text-white py-20 md:py-32 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
           
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Left Side - Title */}
              <div className="lg:w-1/2">
                <h2 className="text-[8vw] lg:text-[5vw] leading-[0.95] font-heading font-black uppercase tracking-tighter mb-8">
                  Vamos<br/>Conversar?
                </h2>
                <p className="text-gray-400 text-lg max-w-md mb-8">
                  Preencha o formulário para iniciarmos um diagnóstico da sua operação. Nossa equipe entrará em contato em breve.
                </p>
                <a href="mailto:assessoriaomega1@gmail.com" className="text-xl border-b border-white/30 pb-2 hover:border-[#00D2C1] hover:text-[#00D2C1] transition-colors">
                   assessoriaomega1@gmail.com
                 </a>
              </div>

              {/* Right Side - Form */}
              <div className="lg:w-1/2 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-[#00D2C1]">Seu Nome</label>
                    <input 
                      type="text" 
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Como podemos te chamar?" 
                      className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                      required
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="font-mono text-xs uppercase text-[#00D2C1]">WhatsApp</label>
                      <input 
                        type="tel" 
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="(00) 99999-9999" 
                        className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="font-mono text-xs uppercase text-[#00D2C1]">Instagram</label>
                      <input 
                        type="text" 
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="@suaempresa" 
                        className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-[#00D2C1]">Nicho de Atuação</label>
                    <input 
                      type="text" 
                      name="nicho"
                      value={formData.nicho}
                      onChange={handleInputChange}
                      placeholder="Ex: E-commerce, Imobiliária, Infoproduto..." 
                      className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 transition-colors w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-[#00D2C1]">Objetivo Principal</label>
                    <textarea 
                      name="objetivo"
                      value={formData.objetivo}
                      onChange={handleInputChange}
                      placeholder="O que você busca com a assessoria?" 
                      rows={3}
                      className="bg-transparent border-b border-white/20 py-3 focus:border-[#00D2C1] outline-none text-xl placeholder-white/20 resize-none transition-colors w-full"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="mt-8 w-full bg-white text-black py-5 rounded-full font-heading font-bold uppercase tracking-widest hover:bg-[#00D2C1] transition-colors duration-300 flex items-center justify-center gap-3 group"
                  >
                    Enviar Proposta
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </button>

                </form>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-mono uppercase mt-24 pt-8 border-t border-white/10">
              <div>
                © 2025 Assessoria Ômega.
              </div>
              <div className="flex gap-6">
                 <a href="#" className="hover:text-white flex items-center gap-2"><Instagram className="w-4 h-4"/> Instagram</a>
                 <a href="#" className="hover:text-white flex items-center gap-2"><Linkedin className="w-4 h-4"/> LinkedIn</a>
              </div>
           </div>
        </div>
      </footer>

    </div>
  );
};

export default App;

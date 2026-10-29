'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Users, X, ChevronDown } from 'lucide-react';
import BenefitCard from '@/components/ui/benefit-card';

// ─── Datos base de las tarjetas ───────────────────────────────────────────────
const benefits = [
    {
        id: 'eventos',
        icon: Calendar,
        title: "Eventos Exclusivos",
        description: "Acceso privilegiado a networking y conferencias con líderes de la industria.",
        imageSrc: "/images/cards/eventos_exclusivos.webp",
        imageAlt: "Eventos profesionales y networking",
        // ── Detalle expandible ──
        detailTitle: "Próximos Eventos CIPRO",
        detailSubtitle: "Conecta, aprende y crece con nuestra comunidad",
        detailItems: [
            {
                fecha: "Por confirmar",
                nombre: "Taller de Gestión Ágil con Scrum",
                tipo: "Workshop",
                lugar: "Sala de reuniones UNI",
            },
            {
                fecha: "Por confirmar",
                nombre: "Demo Day — Proyectos CIPRO 2025",
                tipo: "Presentación",
                lugar: "Auditorio Facultad",
            },
            {
                fecha: "Por confirmar",
                nombre: "Networking: Consultoras Jr. & Empresas",
                tipo: "Networking",
                lugar: "Por definir",
            },
        ],
    },
    {
        id: 'recursos',
        icon: BookOpen,
        title: "Recursos Premium",
        description: "Biblioteca curada de plantillas, guías y herramientas de gestión.",
        imageSrc: "/images/cards/recursos_premium.webp",
        imageAlt: "Recursos y materiales de aprendizaje",
        detailTitle: null, // Sin detalle expandible (es de miembros)
        detailSubtitle: null,
        detailItems: [],
    },
    {
        id: 'capacitaciones',
        icon: Users,
        title: "Capacitaciones",
        description: "Workshops intensivos para dominar las metodologías ágiles modernas.",
        imageSrc: "/images/cards/capacitaciones.webp",
        imageAlt: "Capacitación y desarrollo profesional",
        // ── Detalle expandible ──
        detailTitle: "Programa de Capacitaciones",
        detailSubtitle: "Metodologías y herramientas de clase mundial",
        detailItems: [
            {
                fecha: "Nivel Básico",
                nombre: "Introducción a la Gestión de Proyectos (PMBOK)",
                tipo: "Online · Autónomo",
                lugar: "Plataforma CIPRO",
            },
            {
                fecha: "Nivel Intermedio",
                nombre: "Scrum Master & Product Owner",
                tipo: "Presencial",
                lugar: "Sala técnica UNI",
            },
            {
                fecha: "Nivel Avanzado",
                nombre: "Design Thinking aplicado a proyectos",
                tipo: "Intensivo",
                lugar: "Por confirmar",
            },
            {
                fecha: "Nivel Avanzado",
                nombre: "Kanban & Gestión Visual de Proyectos",
                tipo: "Taller práctico",
                lugar: "Por confirmar",
            },
        ],
    },
];

// ─── Panel de detalle (drawer dentro de la página) ────────────────────────────
function DetailPanel({
    benefit,
    onClose,
}: {
    benefit: typeof benefits[0];
    onClose: () => void;
}) {
    if (!benefit.detailTitle) return null;

    const typeColors: Record<string, string> = {
        'Workshop': 'text-electric-orange border-electric-orange/40 bg-electric-orange/10',
        'Presentación': 'text-blue-400 border-blue-400/40 bg-blue-400/10',
        'Networking': 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
        'Online · Autónomo': 'text-purple-400 border-purple-400/40 bg-purple-400/10',
        'Presencial': 'text-electric-orange border-electric-orange/40 bg-electric-orange/10',
        'Intensivo': 'text-rose-400 border-rose-400/40 bg-rose-400/10',
        'Taller práctico': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="overflow-hidden col-span-1 md:col-span-3"
        >
            <div className="mt-4 rounded-3xl border border-electric-orange/20 bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:p-8 relative">
                {/* Línea decorativa superior */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-electric-orange to-transparent" />

                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{benefit.detailTitle}</h3>
                        <p className="text-sm text-gray-400 mt-1">{benefit.detailSubtitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 ml-4"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefit.detailItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-electric-orange/20 hover:bg-white/[0.04] transition-all"
                        >
                            <div className="w-10 h-10 rounded-xl bg-electric-orange/10 border border-electric-orange/20 flex items-center justify-center flex-shrink-0 text-electric-orange font-bold text-sm">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm leading-snug">{item.nombre}</p>
                                <p className="text-gray-500 text-xs mt-0.5">📍 {item.lugar}</p>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border text-gray-300 border-white/10 bg-white/5">
                                        {item.fecha}
                                    </span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeColors[item.tipo] ?? 'text-gray-400 border-white/10 bg-white/5'}`}>
                                        {item.tipo}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="text-[11px] text-gray-600 text-center mt-6">
                    📌 Información actualizada por la directiva de CIPRO. Los detalles pueden cambiar.
                </p>
            </div>
        </motion.div>
    );
}

// ─── Sección principal ────────────────────────────────────────────────────────
export default function BenefitsSection() {
    const [openPanel, setOpenPanel] = useState<string | null>(null);

    const handleCardClick = (id: string) => {
        const benefit = benefits.find(b => b.id === id);
        if (!benefit?.detailTitle) return; // Recursos no tiene panel
        setOpenPanel(prev => (prev === id ? null : id));
    };

    const activeBenefit = benefits.find(b => b.id === openPanel);

    return (
        <section className="py-20 md:py-32 bg-void-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-orange/5 rounded-full blur-[128px]" />
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Más que una comunidad.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg hover:text-gray-300 transition-colors">
                        Gestionamos el presente, proyectamos el futuro.
                    </p>
                </motion.div>

                {/* Grid de tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={benefit.id} className="relative">
                            <BenefitCard
                                title={benefit.title}
                                description={benefit.description}
                                icon={benefit.icon}
                                imageSrc={benefit.imageSrc}
                                imageAlt={benefit.imageAlt}
                                index={index}
                                hasDetail={!!benefit.detailTitle}
                                isOpen={openPanel === benefit.id}
                                onClick={() => handleCardClick(benefit.id)}
                            />
                            {/* Indicador de que tiene panel (chevron) */}
                            {benefit.detailTitle && (
                                <motion.div
                                    animate={{ rotate: openPanel === benefit.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center text-electric-orange/60 pointer-events-none"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Panel de detalle expandible (debajo del grid, span completo) */}
                <AnimatePresence>
                    {openPanel && activeBenefit?.detailTitle && (
                        <DetailPanel
                            key={openPanel}
                            benefit={activeBenefit}
                            onClose={() => setOpenPanel(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

'use client'

import { useState } from 'react'
import { Wind, Heart, Brain, Activity } from 'lucide-react'
import { SelfHelpTool } from '@/types'

const tools: SelfHelpTool[] = [
  {
    id: '1',
    title: 'Дыхательный тренажер',
    description: 'Техника глубокого дыхания для снижения стресса и тревоги',
    type: 'breathing',
    content: 'Инструкция по использованию дыхательного тренажера...',
  },
  {
    id: '2',
    title: 'Медитация для подростков',
    description: 'Короткие медитативные практики для ежедневного использования',
    type: 'meditation',
    content: 'Руководство по медитации...',
  },
  {
    id: '3',
    title: 'Упражнения на осознанность',
    description: 'Практики mindfulness для улучшения эмоционального состояния',
    type: 'exercise',
    content: 'Упражнения на осознанность...',
  },
]

const iconMap = {
  breathing: Wind,
  meditation: Brain,
  exercise: Activity,
  other: Heart,
}

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<SelfHelpTool | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Инструменты самопомощи</h1>
          <p className="text-gray-600 text-lg">
            Практические инструменты и техники для поддержания психологического благополучия
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = iconMap[tool.type]
            return (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="card cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{tool.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{tool.type}</p>
                  </div>
                </div>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            )
          })}
        </div>

        {/* Breathing Tool Demo */}
        {selectedTool?.type === 'breathing' && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">{selectedTool.title}</h2>
            <BreathingExercise />
          </div>
        )}
      </div>
    </div>
  )
}

function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const [isRunning, setIsRunning] = useState(false)

  const phases = {
    inhale: { duration: 4000, label: 'Вдох', color: 'bg-primary-500' },
    hold: { duration: 4000, label: 'Задержка', color: 'bg-primary-600' },
    exhale: { duration: 4000, label: 'Выдох', color: 'bg-secondary-500' },
    pause: { duration: 2000, label: 'Пауза', color: 'bg-gray-300' },
  }

  return (
    <div className="text-center">
      <div className="w-64 h-64 mx-auto mb-8 relative">
        <div
          className={`w-full h-full rounded-full ${phases[phase].color} transition-all duration-1000 flex items-center justify-center text-white text-2xl font-bold`}
          style={{
            transform: phase === 'inhale' ? 'scale(1.2)' : phase === 'exhale' ? 'scale(0.8)' : 'scale(1)',
          }}
        >
          {phases[phase].label}
        </div>
      </div>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="btn-primary"
      >
        {isRunning ? 'Пауза' : 'Начать'}
      </button>
      <p className="mt-4 text-gray-600">
        Следуйте инструкциям на экране. Дышите медленно и глубоко.
      </p>
    </div>
  )
}


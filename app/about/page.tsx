import { TeamMember } from '@/types'

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Постоева Кира',
    role: 'Идейный вдохновитель',
    age: 16,
    bio: 'Идея основать психологический журнал пришла тогда, когда в жизни был кризис, и нужна была информация о том, как справиться с кризисом. Информации было очень мало, приходилось собирать ее по крупицам, поэтому родился проект нашего журнала.',
  },
  {
    id: '2',
    name: 'Пак Юлия',
    role: 'Куратор проекта',
    age: 41,
    bio: 'Психолог, преподаватель психологии, монтессори-педагог (3-6, 6-12 лет). Многолетняя работа с подростками и детьми всех возрастов привела меня к видению того, как сильно не хватает информации, поддержки и помощи нашим детям. Участие в проекте помогает мне внести вклад в качественное развитие детей нашей страны, а так же оказание помощи и поддержки.',
  },
  {
    id: '3',
    name: 'Постоева Наталья',
    role: 'Информационная поддержка',
    age: 51,
    bio: 'Ландшафтный дизайнер, перинатальный психолог, педагог. Участие в проекте - важный социальный вопрос моей жизни, потому что оставаться безучастной в вопросах помощи будущему поколению считаю не позволительным.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-accent-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">О журнале</h1>
        </div>
      </section>

      {/* About Journal */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">О чем журнал</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Мы публикуем научные статьи, обзоры и отчеты о фундаментальных и прикладных исследованиях 
              в области психологии, охватывая различные направления, такие как подростковая психология, 
              буллинг среди подростков, буллинг в школе, буллинг со стороны учителей, подростковые коммуникации, 
              школа и подростки, родители и подростки, профориентация и т.д.
            </p>
            <p>
              Они освещают актуальные проблемы общества с точки зрения психологии, обсуждают методологические 
              вопросы, перспективы развития психологической науки и практики, а также материалы научных конференций 
              и работы классиков психологии.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="card text-center">
                {member.photo && (
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden">
                    {/* Photo would go here */}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                {member.age && <p className="text-gray-500 text-sm mb-4">{member.age} лет</p>}
                <p className="text-gray-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Партнеры</h2>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Частная школа Nota school</h3>
            <p className="text-gray-700">
              Концепция нашей школы создавать среду для развития детей и подростков, мы поддерживаем 
              психологический журнал и точно знаем, что это поможет большому количеству подростков 
              справляться с трудными жизненными ситуациями, лучше узнавать себя и т.д.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Целевая аудитория</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Специалисты помогающих профессий',
              'Врачи',
              'Психологи',
              'Педагоги',
              'Социальные работники',
              'Родители',
              'Подростки',
            ].map((audience) => (
              <div key={audience} className="card">
                <p className="font-medium">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


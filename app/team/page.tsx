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

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-accent-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Наша команда</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
  )
}


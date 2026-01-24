"use client";

import { useEffect, useState } from "react";
import { MotionDiv } from "@/components/MotionDiv";
import Link from "next/link";
import { FileText, Users, Eye, ArrowRight, Database, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const publishedCount = articles.filter((a) => a.status === "published").length;
  const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const stats = [
    { label: "Всего статей", value: articles.length, icon: FileText, color: "bg-blue-500" },
    { label: "Опубликовано", value: publishedCount, icon: Users, color: "bg-green-500" },
    { label: "Просмотров", value: totalViews, icon: Eye, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-500">Добро пожаловать в админ-панель</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <MotionDiv
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                <stat.icon size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Недавние статьи</h2>
          <Link href="/admin/articles" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
            Смотреть все <ArrowRight size={16} />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {articles.slice(0, 5).map((article) => (
            <div key={article.id || article._id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{article.title}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${article.status === 'published'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
                }`}>
                {article.status === 'published' ? 'Опубликовано' : (article.status === 'draft' ? 'Черновик' : article.status)}
              </span>
            </div>
          ))}
          {articles.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Статей пока нет. Создайте свою первую статью.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


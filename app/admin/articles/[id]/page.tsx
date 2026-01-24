"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/TiptapEditor";
import { put } from "@vercel/blob";
import { MotionDiv } from "@/components/MotionDiv";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EditArticlePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [publishedAt, setPublishedAt] = useState<string>("");
    const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');

    // SEO Fields
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeywords, setMetaKeywords] = useState("");

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showSeo, setShowSeo] = useState(false);

    useEffect(() => {
        async function fetchArticle() {
            try {
                const res = await fetch(`/api/articles/${params.id}`);
                if (!res.ok) throw new Error("Failed to fetch article");
                const article = await res.json();

                setTitle(article.title);
                setSlug(article.slug);
                setExcerpt(article.excerpt);
                setContent(article.content);
                setCoverImage(article.heroImage);
                setPublishedAt(new Date(article.publishedAt).toISOString().slice(0, 16));
                setStatus(article.status);
                setMetaTitle(article.metaTitle || "");
                setMetaDescription(article.metaDescription || "");
                setMetaKeywords(article.metaKeywords?.join(", ") || "");
            } catch (error) {
                console.error(error);
                alert("Ошибка загрузки статьи");
            } finally {
                setLoading(false);
            }
        }
        fetchArticle();
    }, [params.id]);

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        try {
            const file = e.target.files[0];
            const { url } = await put(file.name, file, {
                access: 'public',
                token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN
            });
            setCoverImage(url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Ошибка загрузки изображения");
        } finally {
            setUploading(false);
        }
    };

    const generateSlug = (str: string) => {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleSave = async () => {
        if (!title || !content || !slug) {
            alert("Пожалуйста, заполните заголовок, URL и содержимое статьи");
            return;
        }
        setSaving(true);

        try {
            const response = await fetch(`/api/articles/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    slug,
                    excerpt,
                    content,
                    heroImage: coverImage,
                    status,
                    publishedAt: new Date(publishedAt),
                    metaTitle,
                    metaDescription,
                    metaKeywords: metaKeywords.split(',').map(k => k.trim()).filter(k => k),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update article');
            }

            router.push("/admin/articles");
            router.refresh();
        } catch (error) {
            console.error("Failed to save", error);
            alert("Не удалось сохранить измененения");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-gray-50 z-20 py-4 border-b border-gray-200 backdrop-blur-sm bg-opacity-80">
                <Link
                    href="/admin/articles"
                    className="flex items-center text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Назад
                </Link>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                        {saving ? "Сохранение..." : "Изменение существующей статьи"}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-600/20"
                    >
                        <Save size={20} className="mr-2" />
                        Сохранить
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Заголовок статьи"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-4xl font-bold placeholder-gray-300 border-none focus:ring-0 bg-transparent p-0 text-gray-900"
                        />

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-medium">URL (slug):</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(generateSlug(e.target.value))}
                                className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs w-full max-w-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <textarea
                            placeholder="Краткое описание..."
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={2}
                            className="w-full text-xl text-gray-500 placeholder-gray-300 border-none focus:ring-0 bg-transparent p-0 resize-none"
                        />
                    </MotionDiv>

                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <TiptapEditor content={content} onChange={setContent} />
                    </MotionDiv>

                    {/* SEO Section */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <button
                            onClick={() => setShowSeo(!showSeo)}
                            className="flex items-center justify-between w-full text-left font-semibold text-gray-900"
                        >
                            <span>SEO Настройки</span>
                            <span className="text-gray-400 text-sm">{showSeo ? "Скрыть" : "Показать"}</span>
                        </button>

                        {showSeo && (
                            <MotionDiv
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="mt-4 space-y-4 overflow-hidden"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Заголовок</label>
                                    <input
                                        type="text"
                                        value={metaTitle}
                                        onChange={(e) => setMetaTitle(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Описание</label>
                                    <textarea
                                        value={metaDescription}
                                        onChange={(e) => setMetaDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ключевые слова</label>
                                    <input
                                        type="text"
                                        value={metaKeywords}
                                        onChange={(e) => setMetaKeywords(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </MotionDiv>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 sticky top-24">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="draft">Черновик</option>
                                <option value="published">Опубликовано</option>
                                <option value="archived">Архив</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Дата публикации</label>
                            <input
                                type="datetime-local"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-3">Обложка</h3>
                            <div className="relative group aspect-video bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center">
                                {coverImage ? (
                                    <>
                                        <Image
                                            src={coverImage}
                                            alt="Cover"
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={() => setCoverImage(null)}
                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                        >
                                            Удалить
                                        </button>
                                    </>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
                                        {uploading ? (
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
                                        ) : (
                                            <>
                                                <Upload className="mb-2 text-gray-400" />
                                                <span className="text-sm text-gray-400">Загрузить обложку</span>
                                            </>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

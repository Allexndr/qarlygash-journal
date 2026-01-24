"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/TiptapEditor";
import { put } from "@vercel/blob";
import { MotionDiv } from "@/components/MotionDiv";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    try {
      const file = e.target.files[0];
      const { url } = await put(file.name, file, { access: 'public', token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN });
      setCoverImage(url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const cleanSlug = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async () => {
    if (!title || !content) {
      alert("Please fill in title and content");
      return;
    }
    setSaving(true);

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug: cleanSlug(title),
          excerpt,
          content,
          heroImage: coverImage,
          status: 'published',
          tags: [], // Add tags management later if needed
          readingTime: Math.ceil(content.split(' ').length / 200), // Simple reading time calculation
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      router.push("/admin/articles");
    } catch (error) {
      console.error("Failed to save", error);
      alert("Failed to save article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="flex items-center text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Articles
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save size={20} className="mr-2" />
          {saving ? "Saving..." : "Publish Article"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-4xl font-bold placeholder-gray-300 dark:placeholder-zinc-700 border-none focus:ring-0 bg-transparent p-0 dark:text-white"
              />
              <textarea
                placeholder="Short excerpt..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full text-xl text-gray-500 placeholder-gray-300 dark:placeholder-zinc-700 border-none focus:ring-0 bg-transparent p-0 resize-none dark:text-gray-400"
              />
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TiptapEditor content={content} onChange={setContent} />
          </MotionDiv>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="font-semibold dark:text-gray-200">Cover Image</h3>
            <div className="relative group aspect-video bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-zinc-700 flex items-center justify-center">
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
                    Remove
                  </button>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  {uploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
                  ) : (
                    <>
                      <Upload className="mb-2 text-gray-400" />
                      <span className="text-sm text-gray-400">Upload Cover</span>
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
  );
}

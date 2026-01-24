"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useCallback, useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Image as ImageIcon
} from "lucide-react";

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    const addImage = useCallback(() => {
        if (editor) {
            const url = window.prompt('Введите URL')
            if (url) {
                editor.chain().focus().setImage({ src: url }).run()
            }
        }
    }, [editor])

    if (!editor) {
        return null;
    }

    const uploadImage = async (file: File) => {
        try {
            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/api/admin/upload',
                addRandomSuffix: true,
            } as any);
            editor.chain().focus().setImage({ src: newBlob.url }).run();
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Ошибка загрузки изображения: " + (error as Error).message);
        }
    }

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                await uploadImage(file);
            }
        };
        input.click();
    }

    return (
        <div className="border-b border-gray-200 dark:border-zinc-700 p-2 flex flex-wrap gap-2 sticky top-0 bg-white dark:bg-zinc-800 z-10">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <Strikethrough size={18} />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <Heading2 size={18} />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400'}`}
            >
                <Quote size={18} />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={handleImageUpload}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400 transition-colors"
            >
                <ImageIcon size={18} />
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1 self-center" />

            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400 transition-colors disabled:opacity-50"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400 transition-colors disabled:opacity-50"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};



export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!mounted) return <div className="min-h-[300px] bg-gray-50 animate-pulse rounded-lg" />;

    return (
        <div className="border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (
                pathname,
                /* clientPayload */
            ) => {
                // Here you can verify the session or perform other checks
                // For example, using next-auth
                // const session = await getServerSession(authOptions);
                // if (!session) throw new Error('Unauthorized');

                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                        // userId: session.user.id,
                    }),
                    addRandomSuffix: true,
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                // 🚀 Here you can update your database
                console.log('blob upload completed', blob, tokenPayload);
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The client will also get this error
        );
    }
}

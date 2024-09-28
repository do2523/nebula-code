// app/api/generativeAI/route.ts

import { NextResponse } from 'next/server';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use environment variable or fallback to the direct path
const apiKey = process.env.API_KEY as string;
const mediaPath = './public/BankStatement.png'; // Direct path to your image file

interface FileUploadResult {
  file: {
    uri: string;
    mimeType: string;
    displayName?: string; // Allow displayName to be undefined
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const fileManager = new GoogleAIFileManager(apiKey);

    // Upload the file using the direct path
    const uploadResult: FileUploadResult = await fileManager.uploadFile(
      mediaPath, // Use the complete path here
      {
        mimeType: 'image/png',
        displayName: 'Alexa drawing', // Change the display name to describe your image
      },
    );

    // Safely handle displayName
    const fileName = uploadResult.file.displayName ?? 'Unnamed File';
    console.log(`Uploaded file ${fileName} as: ${uploadResult.file.uri}`);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([
      'Analyze this bank statement and give me every individual item cost and the total cost (add every individual item with its name in parenthesis)',
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    const responseText = result.response.text();
    console.log(responseText);

    return NextResponse.json({
      message: 'Success',
      content: responseText,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(errorMessage);

    return NextResponse.json({ message: 'Error', error: errorMessage }, { status: 500 });
  }
}

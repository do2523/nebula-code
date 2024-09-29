// import { NextResponse } from 'next/server';
// import { GoogleAIFileManager } from '@google/generative-ai/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const apiKey = process.env.API_KEY as string;
// const mediaPath = 'https://utfs.io/f/Rxz7OPoStZyQ84pL5Ieyit1UGgv97SXxQafpDRrmzdcYVPNE';

// interface FileUploadResult {
//   file: {
//     uri: string;
//     mimeType: string;
//     displayName?: string;
//   };
// }

// interface Part {
//   text: string;
//   fileData?: {
//     fileUri: string;
//     mimeType: string;
//   };
// }

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     const fileManager = new GoogleAIFileManager(apiKey);

//     // Upload the file using the direct path
//     const uploadResult: FileUploadResult = await fileManager.uploadFile(
//       mediaPath,
//       {
//         mimeType: 'image/jpeg',
//         displayName: 'Alexa drawing',
//       },
//     );

//     const fileName = uploadResult.file.displayName ?? 'Unnamed File';
//     console.log(`Uploaded file ${fileName} as: ${uploadResult.file.uri}`);

//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     // Construct the request with array of parts
//     const parts: Part[] = [
//       {
//         text: 'Analyze this bank statement and give me every individual item cost and the total cost (add every individual item with its name in parenthesis)',
//         fileData: {
//           fileUri: uploadResult.file.uri,
//           mimeType: uploadResult.file.mimeType,
//         },
//       },
//     ];

    
//       const result = await model.generateContent(parts[0]?.text ?parts[0]?.text : "");
    

//     // Send the request as an array of parts

//     const responseText = await result.response.text(); // Await the promise returned by text()
//     console.log(responseText);

//     return NextResponse.json({
//       message: 'Success',
//       content: responseText,
//     });
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
//     console.error(errorMessage);

//     return NextResponse.json({ message: 'Error', error: errorMessage }, { status: 500 });
//   }
// }
import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name}`;
    const publicPath = path.join(process.cwd(), 'public/uploads');
    
    // Ensure the uploads directory exists
    try {
      await mkdir(publicPath, { recursive: true });
    } catch (error) {
      // Ignore error if directory already exists
      if ((error as any).code !== 'EEXIST') {
        throw error;
      }
    }

    // Write the file
    await writeFile(`${publicPath}/${filename}`, buffer);
    
    return NextResponse.json({ 
      message: "File uploaded successfully",
      url: `/uploads/${filename}`
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
} 
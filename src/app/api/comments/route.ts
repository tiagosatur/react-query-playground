import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://dummyjson.com/comments');
    const json = await res.json();
    return NextResponse.json(json);
  } catch (e) {
    console.log('Error', e);
  }
}

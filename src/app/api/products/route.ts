import { NextResponse, NextRequest } from 'next/server';
import { getQueryStringParamFromURL } from '@/app/utils/getQueryStringParamFromURL';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const limit = getQueryStringParamFromURL('limit', req.url);

    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=10&select=title,price,category,thumbnail,rating,brand`
    );
    const json = await res.json();
    return NextResponse.json(json);
  } catch (e) {
    console.log('Error', e);
  }
}

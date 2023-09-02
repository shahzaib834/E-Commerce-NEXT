import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!label || !imageUrl) {
      return new NextResponse('Label OR ImageUrl is required', { status: 400 });
    }

    if (!userId) {
      return new NextResponse('UnAuthenticated', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store Id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('UnAuthorized', { status: 403 });
    }

    const billboard = await prismadb.billBoard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    console.log('[BILLBOARDS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store Id is required', { status: 400 });
    }

    const billboards = await prismadb.billBoard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (err) {
    console.log('[BILLBOARDS_GET]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

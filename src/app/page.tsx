'use client';
import { useQuery } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import Image from 'next/image';

type Comment = {
  postId: number;
  id: number;
  body: string;
  user: {
    id: number;
    username: string;
  };
};

type Product = {
  id: number;
  brand: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
};

interface PaginationGeneral {
  limit: number;
  skip: number;
  total: number;
}

interface GetComments extends PaginationGeneral {
  comments: Comment[];
}

interface GetProducts extends PaginationGeneral {
  products: Product[];
}

const getComments = async (): Promise<GetComments> => {
  const res = await fetch('/api/comments');
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }

  return res.json();
};

const getProducts = async (limit: number): Promise<GetProducts> => {
  const res = await fetch(`/api/products?limit=${limit}`);
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }

  return res.json();
};

const signUp = async (): Promise<{ token: string }> => {
  const res = await fetch('/api/signup', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to signup');
  }
  return res.json();
};

const useComments = () => {
  const {
    data: { comments, limit, skip, total } = {
      comments: [],
      limit: null,
      skip: null,
      total: null,
    },
    isLoading,
    error,
  } = useQuery(['comments'], getComments, {
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    comments,
    limit,
    skip,
    total,
    isLoading,
    error,
  };
};

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { comments } = useComments();

  const {
    data: signup,
    isLoading: signupLoading,
    error: signupError,
  } = useQuery(['signup'], signUp);

  const {
    data: { products = [], skip, limit, total } = {
      products: [],
      skip: null,
      limit: null,
      total: 0,
    },
    isLoading,
    error: getProductsError,
  } = useQuery(['products'], () => getProducts(10));

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>React Query Examples</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map(({ id, title, category, rating, price, thumbnail }) => (
          <div key={id} className='rounded-2xl overflow-hidden'>
            <header>
              <Image
                src={thumbnail}
                alt={title}
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                loading='eager'
                priority={true}
              />
              <h4>{title}</h4>
            </header>
            <span>{rating}</span>
            <span> U$ {price}</span>
            <span>{category}</span>
          </div>
        ))}
      </div>
      <div className='grid grid-cools-2 md:grid-cols-3 gap-6'>
        {comments.map((c, i) => (
          <div
            key={c.id}
            className='bg-white rounded p-3 shadow-lg flex flex-col'
          >
            <p className='text-xl font-medium grow'>{c.body}</p>
            <p className='text-slate-500  self-end'>@{c.user.username}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

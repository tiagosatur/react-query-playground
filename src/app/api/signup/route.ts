import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

const jwtSecret = 'my_secret';

export async function POST(req: NextApiRequest) {
  const { name, email, password } = req.body as unknown as SignupRequestBody;
  const user = {
    name,
    email,
    password,
  };

  const token = sign(user, jwtSecret);

  const cookieValue = `tree=${token}; max-age=${30 * 24 * 60 * 60}; HttpOnly`;
  const body = JSON.stringify({
    token,
  });

  return new NextResponse(body, {
    status: 200,
    headers: { 'Set-Cookie': cookieValue },
  });
}

export async function GET(request: Request, res: NextResponse) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    const json = await res.json();
    return NextResponse.json(json);
  } catch (e) {
    console.log('Error', e);
  }
}

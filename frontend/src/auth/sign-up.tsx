import { Icons } from '@/components';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { useCreateUser } from '@/lib/react-query/queries';


const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const navigate = useNavigate();

  const { mutate, isPending: isLoading } = useCreateUser();

  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    mutate(
      { email, password },
      {
        onSuccess: ({ sentToEmail }) => {
          toast.success(`Verification email sent to ${sentToEmail}.`);
          navigate('/verify-email?to=' + sentToEmail);
        },
		//eslint-disable-next-line
        onError: (err: any) => {
          if (err.response?.status === 409) {
            toast.error('This email is already in use. Sign in instead?');
          } else if (err instanceof ZodError) {
            toast.error(err.issues[0].message);
          } else {
            toast.error('Something went wrong. Please try again.');
          }
        },
      }
    );
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              to='/sign-in'>
              Already have an account? Sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder='you@example.com'
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    {...register('password')}
                    type='password'
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder='Password'
                  />
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

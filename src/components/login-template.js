import React from 'react';
import { signIn } from '../../auth';
import Button from './button';
import { Github } from 'lucide-react';

const LoginTemplate = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black p-5">
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
        className="flex-col justify-center rounded-md bg-secondary px-5 py-10 text-center md:w-1/3"
      >
        <p className="pb-5 text-2xl text-white">DevTools</p>
        <Button type={'submit'}>
          <p className="flex items-center space-x-1">
            <Github />
            <span>Login to Github</span>
          </p>
        </Button>
      </form>
    </div>
  );
};

export default LoginTemplate;

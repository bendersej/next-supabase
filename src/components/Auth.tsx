import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { Text, Center, Input, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import { supabase } from '../lib/supabase';

export const Auth: FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        alert(error.message);
      } else {
        alert('Check your email for the login link!');
      }
      setLoading(false);
    },
    [email],
  );

  const handleUpdateEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  return (
    <Center minHeight={'100vh'}>
      <form onSubmit={handleLogin}>
        <Stack spacing={3}>
          <Text>Sign in via magic link with your email below</Text>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Your email"
              size="md"
              value={email}
              required={true}
              onChange={handleUpdateEmail}
            />
          </FormControl>
          <Button disabled={loading} isLoading={loading} type="submit">
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </Button>
        </Stack>
      </form>
    </Center>
  );
};

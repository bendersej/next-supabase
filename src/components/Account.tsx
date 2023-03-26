import { FC, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react';
import { Center, Input, Button, Stack, FormControl, FormLabel, Spinner } from '@chakra-ui/react';
import { Database } from '../lib/supabase/database';

type Profiles = Database['public']['Tables']['profiles']['Row'];

type Props = {
  session: Session;
};

export const Account: FC<Props> = ({ session }) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<{
    first_name: Profiles['first_name'];
    last_name: Profiles['last_name'];
  }>({
    first_name: null,
    last_name: null,
  });

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUserDetails({
          first_name: data.first_name,
          last_name: data.last_name,
        });
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    first_name,
    last_name,
  }: {
    first_name: Profiles['first_name'];
    last_name: Profiles['last_name'];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        first_name,
        last_name,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateUserDetails = useCallback(
    ({ currentTarget: { name, value } }: ChangeEvent<HTMLInputElement>) =>
      setUserDetails((userDetails) => ({ ...userDetails, [name]: value })),
    [],
  );

  return (
    <Center minHeight={'100vh'}>
      <Stack spacing={3} minWidth={400}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Your email" size="md" value={session.user.email} disabled={true} />
        </FormControl>
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="Mary"
            size="md"
            name="first_name"
            value={userDetails.first_name || ''}
            onChange={handleUpdateUserDetails}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Jane"
            size="md"
            name="last_name"
            value={userDetails.last_name || ''}
            onChange={handleUpdateUserDetails}
          />
        </FormControl>
        <Button background="green.400" onClick={() => updateProfile(userDetails)}>
          Update details
        </Button>
        <Button background="red.400" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </Stack>
    </Center>
  );
};

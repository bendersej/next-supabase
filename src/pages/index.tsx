import { Box } from '@chakra-ui/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { User, useSession } from '@supabase/auth-helpers-react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Database } from '../lib/supabase/database';
import { Account } from '../components/Account';
import { Auth } from '../components/Auth';
import { DataViewer } from '../components/DataViewer';

const Home = ({ user }: { user: User | null }) => {
  const session = useSession();

  return (
    <Box minHeight={'100vh'}>
      {!session ? (
        <Auth />
      ) : (
        <Tabs>
          <TabList>
            <Tab>Data</Tab>
            <Tab>Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DataViewer session={session} />
            </TabPanel>
            <TabPanel>
              <Account session={session} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  return { props: { user: user ?? null } };
}

export default Home;

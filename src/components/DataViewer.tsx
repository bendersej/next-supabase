import { FC, useEffect, useState } from 'react';

import { Database } from '../lib/supabase/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/supabase-js';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

type Props = {
  session: Session;
};

export const DataViewer: FC<Props> = () => {
  const [data, setData] = useState<Database['public']['Tables']['data']['Row'][]>([]);
  const supabase = useSupabaseClient<Database>();

  const getData = async () => {
    const { data } = await supabase.from('data').select(`id, fruit, size, price, created_at`);

    setData(data ?? []);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Fruit</Th>
            <Th>Size</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.fruit}</Td>
              <Td>{item.size}</Td>
              <Td isNumeric>${item.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

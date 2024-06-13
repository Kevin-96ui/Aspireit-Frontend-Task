import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ChakaraTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>All users in the database are shown in the Chakara UI Table</TableCaption>
          <Thead>
            <Tr>
              <Th><strong>Username</strong></Th>
              <Th><strong>Password</strong></Th>
              <Th><strong>Email</strong></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>Encrypted for all users</Td>
                <Td>{user.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ChakaraTable;

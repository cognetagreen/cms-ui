import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import swal from 'sweetalert';
import UseAuth from '../../Services/Hooks/UseAuth'
import { useNavigate } from 'react-router';
import CustomerHandlingService from '../../Services/CustomerHandlingService';
import { useCustomerOptionsContext } from '../../Context/CustomerOptionsContext';
import { useSelectedCustomerIDContext } from '../../Context/SelectedCustomerIDContext';

export default function Login() {
  
    const {login} = UseAuth();

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate();
    const goToForgotPassword = () => {
      navigate('/forgotPassword')
    }

    const {setCustomerOptions} = useCustomerOptionsContext();
    const {setSelectedCustomerID} = useSelectedCustomerIDContext();

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        const response = await login(username, password);
        if(response === false) {
          swal({
            title: "Authentication Failed!",
            text: "Invalid Username or Password!",
            icon: "error",
          });
        }else {
          try {
            const textSearch = "kW";
            await CustomerHandlingService(textSearch, setCustomerOptions, setSelectedCustomerID);
            
          } catch (error) {
            console.error("Error fetching customer data:", error);
          }
          navigate('/');
        }

    }

    return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox visibility={'hidden'}>Remember me</Checkbox>
                        <Text
                           color={'blue.400'}
                           cursor={'pointer'}
                           onClick={goToForgotPassword}
                           >
                            Forgot password?
                        </Text>
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        type='submit'
                        _hover={{
                        bg: 'blue.500',
                        }}>
                        Sign in
                    </Button>
                    </Stack>
                </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
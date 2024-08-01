import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import useAuth from '../../Services/Hooks/UseAuth'
import swal from 'sweetalert'
import { useNavigate } from 'react-router'

type ForgotPasswordFormInputs = {
  email: string
}

export default function ForgotPassword() {

    const [email, setEmail] = useState<string>("");
    const {forgotPasswordHandle} = useAuth();
    const navigate = useNavigate();
    const sendResetRequst = async (event : any) => {
        event.preventDefault();
        const response = await forgotPasswordHandle(email);
        if(response === true) {
            swal({
                title: "Request Sent!",
                text: "Reset link has been sent!",
                icon: "success",
            });
            navigate('/login');
        }else {
            swal({
                title: "Request Email is not send!",
                text: "Invalid Email!",
                icon: "error",
            });
        }
    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
            onClick={sendResetRequst}
            >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
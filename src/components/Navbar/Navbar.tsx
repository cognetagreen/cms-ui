import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Icon,
  HStack,
  VStack,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useNavigate } from "react-router";
import SidebarContent from "./SidebarContent";
import useAuth from "../../Services/Hooks/UseAuth";
import cogneta_logo from "../../assets/cogneta_logo.png";
import { Select } from "chakra-react-select";
import { useCustomerOptionsContext } from "../../Context/CustomerOptionsContext";
import { useSelectedCustomerIDContext } from "../../Context/SelectedCustomerIDContext";

interface JwtHeader {
  firstName: string;
  lastName: string;
  scopes: string[];
}

const Navbar: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const jwt = localStorage.getItem("token");
  if (!jwt) {
    throw new Error("JWT not found in localStorage");
  }

  let fname = "";
  let lname = "";
  let user = "";

  try {
    const decodedToken: JwtHeader = jwtDecode<JwtHeader>(jwt);
    const { firstName, lastName, scopes } = decodedToken;
    fname = firstName;
    lname = lastName;
    user = scopes[0];
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useAuth();
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  
  const handleLogOut = async () => {
    const response = await logout();
    if (response === true) {
      navigate("/");
    }
  };
  
  const handleToggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
  
  const { customerOptions } = useCustomerOptionsContext();
  const {selectedCustomerID, setSelectedCustomerID} = useSelectedCustomerIDContext();

  const handlePlantChange = (selectedOption: any) => {
    setSelectedCustomerID(selectedOption?.value);
    localStorage.setItem("SelectedCustomerId", selectedOption?.value || "");
    window.location.reload();
  };
  // console.log(customerOptions)
  // console.log(selectedCustomerID)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  useEffect(() => {
    if (customerOptions) {
      // console.log(customerOptions)
      setSelectedCustomerId(selectedCustomerID);
      localStorage.setItem("SelectedCustomerId", selectedCustomerID || "")
    } 
  }, []);


  return (
    <Box as="section" bg="#F2F3F8" _dark={{ bg: "gray.700" }} minH="100vh">
      <SidebarContent
        isSidebarExpanded={isSidebarExpanded}
        onToggleSidebar={handleToggleSidebar}
        display={{ base: "block", md: "block" }}
        boxShadow="rgba(0, 0, 0, 0.8)"
        bgColor="#001C3C"
      />
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="full"
        pos="fixed"
        top={0}
        left={0}
        px="4"
        pl="0"
        bg="white"
        _dark={{ bg: "gray.800" }}
        borderBottomWidth="1px"
        color="inherit"
        h={"55px"}
        boxShadow="rgba(0, 0, 0, 0.06)"
        zIndex={9999}
      >
        <Flex px="4" py="5" align="center">
          <Image src={cogneta_logo} alt="logo" w="30" h="20" />
          <FormControl
            ml={5}
            px={5}
            width={300}
            h={14}
            borderLeft={"1px solid #D1D8DD"}
          >
            <FormLabel
              fontFamily={"inter"}
              fontSize={10}
              fontWeight={10}
              color={"#747474"}
              mt={2}
            >
              Select Plant
            </FormLabel>
            <Box mt={-3} fontWeight={600}>
              <Select
                isMulti={false}
                name="plants"
                placeholder="Select Any Plant"
                closeMenuOnSelect={true}
                variant="unstyle"
                focusBorderColor="transparent"
                options={customerOptions || []}
                value={customerOptions?.find(option => option.value === localStorage.getItem("SelectedCustomerId"))}
                onChange={handlePlantChange}
                useBasicStyles={true}
              />
            </Box>
          </FormControl>
        </Flex>
        <Flex align="center">
          <IconButton
            aria-label="Color Switcher"
            icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
            onClick={toggleColorMode}
            cursor="pointer"
            mr="15"
            boxSize="25px"
          />
          <Icon color="gray.500" as={FaBell} cursor="pointer" boxSize="20px" />
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Icon
                    as={FaCircleUser}
                    color="gray.500"
                    cursor="pointer"
                    ml="4"
                    boxSize="25px"
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text
                      fontSize="sm"
                      textTransform="capitalize"
                      fontWeight="600"
                      letterSpacing="1px"
                      fontFamily="sans-serif"
                    >
                      {fname + " " + lname}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.600"
                      textTransform="lowercase"
                      fontWeight="500"
                    >
                      {user.replace("_", " ")}
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem
                  color="red.500"
                  fontWeight="700"
                  onClick={handleLogOut}
                >
                  <Icon as={FaSignOutAlt} color="gray.500" mr="5" />
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      <Box as="main" p="4" ml={isSidebarExpanded ? [5, 0] : [5, 0]} mt="14">
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;

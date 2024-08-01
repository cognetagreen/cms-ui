import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Collapse,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  useColorModeValue,
  HStack,
  VStack,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight, MdDarkMode, MdLightMode } from "react-icons/md";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { CiSliderVertical } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import useAuth from "../Services/Hooks/UseAuth";
import cogneta_logo from "../assets/cogneta_logo.png";
import {
  AlertTicket,
  Analysis,
  Home,
  Site,
  Tools,
} from "../assets/Navbar/SideNavBar";
import { Link } from "react-router-dom";

interface JwtHeader {
  firstName: string;
  lastName: string;
  scopes: string[];
}

var fname = "";
var lname = "";
var user = "";

interface NavItemProps {
  icon?: React.ElementType;
  children: React.ReactNode;
  showLabel: boolean;
  [x: string]: any;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  children,
  showLabel,
  ...rest
}) => {
  const color = useColorModeValue("white", "gray.300");
  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color="inherit"
      _dark={{
        color: "gray.400",
      }}
      _hover={{
        bg: "gray.100",
        _dark: {
          bg: "gray.900",
        },
        color: "gray.900",
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="10"
          boxSize="14px"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {showLabel && children}
    </Flex>
  );
};

interface SidebarContentProps {
  isSidebarExpanded: boolean;
  onToggleSidebar: () => void;
  [x: string]: any;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  isSidebarExpanded,
  onToggleSidebar,
  ...props
}) => {
  const home = useDisclosure();
  const sites = useDisclosure();
  const integrations = useDisclosure();
  const showLabels = isSidebarExpanded;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="14"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      borderRightWidth="1px"
      w={showLabels ? "200px" : "60px"}
      transition="width 0.3s"
      {...props}
    >
      <Flex
        direction="column"
        as="nav"
        mt={2}
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <IconButton
          mt={5}
          aria-label="Menu"
          icon={isSidebarExpanded ? <CiSliderVertical /> : <FiMenu />}
          display={{
            base: "inline-flex",
            md: "inline-flex",
          }}
          cursor={"pointer"}
          alignSelf={isSidebarExpanded ? "end" : "center"}
          onClick={onToggleSidebar}
          mb={8}
        />
        <NavItem
          icon={Home}
          onClick={home.onToggle}
          fontSize={"md"}
          fontWeight={600}
          showLabel={showLabels}
          color={home.isOpen ? "#8842E0" : "white"}
        >
          &nbsp; Home
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={home.isOpen ? "rotate(90deg)" : undefined}
          />
        </NavItem>
        <Collapse in={home.isOpen}>
          <NavItem
            pl="12"
            py="2"
            showLabel={showLabels}
            color={"#101820"}
            fontWeight={600}
            as={Link}
            to="/"
          >
            Portfolio
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            onClick={sites.onToggle}
            showLabel={showLabels}
            color={home.isOpen ? "#8842E0" : "#000"}
            fontWeight={500}
          >
            Sites
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={sites.isOpen ? "rotate(90deg)" : undefined}
            />
          </NavItem>
          <Collapse in={sites.isOpen}>
            <NavItem
              pl="12"
              py="2"
              showLabel={showLabels}
              color={"#000"}
              fontWeight={500}
              as={Link}
              to="/grid"
            >
              &nbsp; BESS
            </NavItem>
            <NavItem
              pl="12"
              py="2"
              showLabel={showLabels}
              color={"#000"}
              fontWeight={500}
              as={Link}
              to="/grid"
            >
              &nbsp; Grid
            </NavItem>
          </Collapse>
        </Collapse>
        <NavItem
          icon={AlertTicket}
          fontSize={"md"}
          color = {"#101820"}
          fontWeight={600}
          showLabel={showLabels}
        >
          &nbsp; Articles
        </NavItem>
        <NavItem
          icon={Analysis}
          fontSize={"md"}
          color = {"#101820"}
          fontWeight={600}
          showLabel={showLabels}
        >
          &nbsp; Collections
        </NavItem>
        <NavItem
          icon={Site}
          showLabel={showLabels}
          color = {"#101820"}
          fontSize={"md"}
          fontWeight={600}
        >
          &nbsp; Checklists
        </NavItem>
        <NavItem
          icon={Tools}
          onClick={integrations.onToggle}
          showLabel={showLabels}
          color = {"#101820"}
          fontSize={"md"}
          fontWeight={600}
        >
          &nbsp; Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen ? "rotate(90deg)" : undefined}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2" showLabel={showLabels}>
            Shopify
          </NavItem>
          <NavItem pl="12" py="2" showLabel={showLabels}>
            Slack
          </NavItem>
          <NavItem pl="12" py="2" showLabel={showLabels}>
            Zapier
          </NavItem>
        </Collapse>
        {/* <NavItem icon={AiFillGift} showLabel={showLabels}>Changelog</NavItem>
        <NavItem icon={BsGearFill} showLabel={showLabels}>Settings</NavItem> */}
      </Flex>
    </Box>
  );
};

const Navbar: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const jwt = localStorage.getItem("token");
  if (!jwt) {
    throw new Error("JWT not found in localStorage");
  } else {
    try {
      const decodedToken: JwtHeader = jwtDecode<JwtHeader>(jwt);
      const { firstName, lastName, scopes } = decodedToken;
      fname = firstName;
      lname = lastName;
      user = scopes[0];
    } catch (error) {
      console.error("Error decoding token:", error);
    }
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

  return (
    <Box
      as="section"
      bg="#F2F3F8"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
      borderColor={"#000"}
      shadow={"xl"}
    >
      <SidebarContent
        isSidebarExpanded={isSidebarExpanded}
        onToggleSidebar={handleToggleSidebar}
        display={{
          base: "block",
          md: "block",
        }}
        boxShadow="rgba(0, 0, 0, 0.8)"
        bgColor = "#001C3C"
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
        _dark={{
          bg: "gray.800",
        }}
        borderBottomWidth="1px"
        color="inherit"
        h="14"
        boxShadow="rgba(0, 0, 0, 0.06)"
        zIndex={9999}
      >
        <Flex px="4" py="5" align="center">
          <Image src={cogneta_logo} alt="logo" w="30" h="20" />
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
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
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
      <Box as="main" p="4" ml={isSidebarExpanded ? [5, 200] : [5, 0]} mt="14">
        {children}        
      </Box>
    </Box>
  );
};

export default Navbar;

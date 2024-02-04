import { useState } from "react";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { postFetch } from "../../utils/postFetch";

export default function LoginRestaurateur() {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = () => setShow(!show);
  const handleLogin = async () => {
    try {
      const response = await postFetch("/login-restaurant", loginData);
      console.log("Restaurateur logged in successfully!");
    } catch (error) {
      console.error("Error logging in restaurateur:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            variant="flushed"
            placeholder="Name"
            name="name"
            value={loginData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputGroup variant="flushed">
            <Input
              type={show ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <Button size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
      <div className="flex mt-12">
        <Button
          variant="solid"
          colorScheme="teal"
          size="lg"
          width="100%"
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}

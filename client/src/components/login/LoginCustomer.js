import { useState } from "react";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { postFetch } from "../../utils/postFetch";

export default function LoginCustomer() {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setLoginData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const handleClick = () => setShow(!show);
  const handleLogin = async () => {
    try {
      await postFetch("/login", loginData);
      console.log("Login successfully!");
    } catch (error) {
      console.error("Error login :", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            variant="flushed"
            placeholder="Email"
            name="email"
            value={loginData.category}
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

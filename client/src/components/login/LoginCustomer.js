import { useState } from "react";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { postFetch } from "../../utils/postFetch";
import { multiSetSessionStorage } from "../../utils/utilitaire";

export default function LoginCustomer() {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setLoginData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const handleClick = () => setShow(!show);
  const handleLogin = async () => {
    setResponse(await postFetch("/login", loginData));
    try {
      if (response.token) {
        await multiSetSessionStorage([
          ["token", response.token],
          ["ID", response.user_id],
          ["role", response.role],
        ]);

        if (response.role === "admin") {
          window.location.href = "/admin";
        } else {
          await postFetch("/ws/create/user/" + sessionStorage.ID)
          window.location.href = "/home";
        }
      }
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

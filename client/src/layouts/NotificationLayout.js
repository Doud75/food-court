import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

const NotificationLayout = ({children}) => {
  if (sessionStorage.ID) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var { lastMessage } = useWebSocket('ws://localhost:8097/ws/join/user/' + sessionStorage.ID)
  }

  useEffect(() => {
    console.log(lastMessage?.data?.content)
  }, [lastMessage])

  

  return (
    <>{children}</>
  );
}

export default NotificationLayout
import { useState, useEffect } from "react";
import { getFetch } from "../../utils/getFetch";
import { Card, CardBody, Text, Button, Flex, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteFetch } from "../../utils/deleteFetch";
import { postFetch } from "../../utils/postFetch";

const MenuHandler = () => {
  const restaurantID = sessionStorage.getItem("ID");
  const [menus, setMenus] = useState([]);
  const [popupDelete, setPopupDelete] = useState(false);
  const [popupModify, setPopupModify] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [menuModifyData, setMenuModifyData] = useState({
    dishes: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleAddMenuClick = () => {
    navigate(`/home-restaurant/create-menu`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/restaurants/${restaurantID}/menus`);
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchData();
  }, [restaurantID]);

  function handlePopupDelete(menu = []) {
    setPopupDelete(!popupDelete);
    if (menu.id) {
      setSelectedMenu(menu);
    }
  }

  function handlePopupModify(menu = []) {
    setPopupModify(!popupModify);
    if (menu.id) {
      setSelectedMenu(menu);
    }
  }

  const deleteDishes = async (menuID) => {
    try {
      await deleteFetch(`/restaurants/${restaurantID}/delete-dishes/${menuID}`);

      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuID));
      setSelectedMenu([]);
      handlePopupDelete();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuModifyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const modifyDishes = async (menuID) => {
    try {
      const response = await postFetch(
        `/restaurants/${restaurantID}/modify-dishes/${menuID}`,
        menuModifyData
      );
      if (
        response.message &&
        response.message === "Dishes modify successfully"
      ) {
        menuModifyData.id = menuID;
        setMenus((prevState) =>
          prevState.map((menu) => (menu.id === menuID ? menuModifyData : menu))
        );
      }

      setSelectedMenu([]);
      setMenuModifyData({ dishes: "", price: "" });
      handlePopupModify();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <>
      <div className="p-8">
        {menus && menus.length > 0 ? (
          menus.map((menu) => (
            <Card key={menu.id} className="mb-5">
              <CardBody>
                <Text className="flex justify-between px-3 pt-3">
                  <span className="text-base font-semibold">{menu.dishes}</span>
                  <span className="text-base font-bold">{menu.price} €</span>
                </Text>
                <Flex justifyContent="space-between" className="px-3 pt-3">
                  <Button
                    colorScheme="teal"
                    onClick={() => handlePopupModify(menu)}
                  >
                    Modifier
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handlePopupDelete(menu)}
                  >
                    Supprimer
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>Aucun menu disponible.</p>
        )}
        {popupDelete && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="flex flex-col w-3/4 p-8 bg-white rounded">
              <p>
                Êtes-vous sûr de vouloir supprimer ce plat :{" "}
                <strong className="font-bold">{selectedMenu.dishes}</strong> ?
              </p>
              <div className="flex justify-end mx-auto mt-4 ">
                <Button
                  colorScheme="teal"
                  onClick={() => deleteDishes(selectedMenu.id)}
                >
                  Valider
                </Button>
                <Button colorScheme="red" ml={5} onClick={handlePopupDelete}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}
        {popupModify && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="flex flex-col w-3/4 p-8 bg-white rounded">
              <div>
                <span>Dishes name</span>
                <Input
                  variant="outline"
                  placeholder="Dishes name"
                  name="dishes"
                  value={menuModifyData.dishes}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <span>Price</span>
                <Input
                  variant="outline"
                  placeholder="Price"
                  name="price"
                  type="number"
                  step="0.01"
                  pattern="[0-9]+([.][0-9]+)?"
                  value={menuModifyData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end mx-auto mt-4 ">
                <Button
                  colorScheme="teal"
                  onClick={() => modifyDishes(selectedMenu.id)}
                >
                  Valider
                </Button>
                <Button colorScheme="red" ml={5} onClick={handlePopupModify}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex mt-12">
          <Button
            variant="solid"
            colorScheme="teal"
            size="lg"
            width="100%"
            onClick={handleAddMenuClick}
          >
            Add Menu
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuHandler;

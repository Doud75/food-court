import { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import {Card, CardBody, Text, Button, Flex, Input} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteFetch } from "../utils/deleteFetch";
import {postFetch} from "../utils/postFetch";

const MenuList = () => {
  const { restaurantID } = useParams();
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
    navigate(`/Restaurants/${restaurantID}/Menus/Handler/CreateMenu`);
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
      setSelectedMenu([])
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
      const response = await postFetch(`/restaurants/${restaurantID}/modify-dishes/${menuID}`, menuModifyData);
      if (response.message && response.message === 'Dishes modify successfully') {
        menuModifyData.id = menuID
        setMenus(prevState => prevState.map(menu => menu.id === menuID ? menuModifyData : menu));
      }

      setSelectedMenu([])
      setMenuModifyData({dishes: "", price: ""})
      handlePopupModify();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <>
      <nav className="p-6">
        <Button colorScheme="teal" size="sm">
          <a href="/Restaurants">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </a>
        </Button>
      </nav>
      <div className="p-8">
        {menus && menus.length > 0 ? (
          menus.map((menu) => (
            <Card key={menu.id} className="mb-5">
              <CardBody>
                <Text className="flex justify-between pt-3 px-3">
                  <span className="text-base font-semibold">{menu.dishes}</span>
                  <span className="text-base font-bold">{menu.price} €</span>
                </Text>
                <Flex justifyContent="space-between" className="px-3 pt-3">
                  <Button colorScheme="teal" onClick={() => handlePopupModify(menu)}>Modifier</Button>
                  <Button colorScheme="red" onClick={() => handlePopupDelete(menu)}>
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
            <div className="bg-white p-8 rounded w-3/4 flex flex-col">
              <p>
                Êtes-vous sûr de vouloir supprimer ce plat :{" "}
                <strong className="font-bold">{selectedMenu.dishes}</strong> ?
              </p>
              <div className="flex justify-end mt-4 mx-auto ">
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
            <div className="bg-white p-8 rounded w-3/4 flex flex-col">
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
                    value={menuModifyData.price}
                    onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end mt-4 mx-auto ">
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

export default MenuList;

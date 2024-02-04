import { Card, Text } from "@chakra-ui/react";

export default function CardComponent(props) {
  const { name, description, price } = props;

  return (
    <Card className="mb-5" borderRadius="lg" overflow="hidden">
      {/* <Image
            className='h-40'
            src="https://source.unsplash.com/bol-de-salades-de-legumes-IGfIGP5ONV0"
            alt="Green double couch with wooden legs"
        /> */}
      <div className="pt-3 p-3 flex">
        <div className="w-4/6">
          <h4 className="text-base font-semibold mb-2">{name}</h4>
          <Text className="line-clamp-2 text-sm">{description}</Text>
        </div>
        <div className="flex justify-end items-end grow">
          <span className="text-2xl font-semibold">
            {price ? price + "€" : ""}
          </span>
        </div>
      </div>
    </Card>
  );
}

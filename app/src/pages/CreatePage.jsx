import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStoreState } from "../store/Product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const showToast = (status) => {
    if (!status.success) {
      toast({
        title: status.message,
        duration: 9000,
        isClosable: true,
        status: "error",
      });
    } else {
      toast({
        title: status.message,
        duration: 9000,
        isClosable: true,
        status: "success",
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
      }); // reset fields if successful toast shown
    }
  };

  const { createProduct } = useProductStoreState();
  const handleAddProduct = async () => {
    // Make request to API
    const { success, message } = await createProduct(newProduct);
    showToast({ success, message }); // send status popup to user after attempted creation
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={2}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"md"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              variant="filled"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              variant="filled"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              variant="filled"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

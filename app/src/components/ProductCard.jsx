import {
  Modal,
  HStack,
  Text,
  Box,
  Image,
  Heading,
  useColorModeValue,
  IconButton,
  useToast,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  VStack,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStoreState } from "../store/Product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  // in eslint.config set "react/prop-types:off"

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const toast = useToast();
  const {
    isOpen: updateIsOpen,
    onOpen: updateOnOpen,
    onClose: updateOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStoreState();

  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    updateOnClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      id={product._id}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={64}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={updateOnOpen}
            colorScheme="blue"
          />
          <IconButton
            onClick={deleteOnOpen}
            icon={<DeleteIcon />}
            colorScheme="red"
          />
        </HStack>
      </Box>

      {/* Update Modal */}
      <Modal isOpen={updateIsOpen} onClose={updateOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={updateOnClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete modal */}
      <Modal isOpen={deleteIsOpen} onClose={deleteOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={deleteOnClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { createSite } from "lib/db";
import { useAuth } from "lib/auth";
interface Data {
	site: string;
	url: string;
}
const AddSiteModal: React.FC = () => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const { handleSubmit, register, errors } = useForm();
	const auth = useAuth();
	const onCreateSite = (data: Data) => {
		if (auth.user) {
			createSite({
				authorId: auth.user.uid,
				createdAt: new Date().toISOString(),
				...data,
			});
			onClose();
			toast({
				title: "Success !",
				description: "We've added your site",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Echec",
				description: "You are not connected",
				duration: 5000,
				isClosable: true,
			});
		}
	};
	return (
		<>
			<Button fontWeight="medium" maxW="200px" onClick={onOpen}>
				Add your first site
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
					<ModalHeader fontWeight="bold">Add Site</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="My site"
								name="site"
								ref={register({
									required: "Required",
								})}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Link</FormLabel>

							<Input
								placeholder="https://website.com"
								name="url"
								ref={register({
									required: "Required",
								})}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose} mr={3} fontWeight="medium">
							Cancel
						</Button>
						<Button
							backgroundColor="#99FFFE"
							color="#194D4C"
							fontWeight="medium"
							type="submit"
						>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddSiteModal;

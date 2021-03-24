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
import { mutate } from "swr";
interface Data {
	name: string;
	url: string;
}
const AddSiteModal: React.FC = (props) => {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const { handleSubmit, register, errors } = useForm();
	const auth = useAuth();
	const onCreateSite = ({ name, url }: Data) => {
		if (auth.user) {
			const newSite = {
				authorId: auth.user.uid,
				createdAt: new Date().toISOString(),
				name,
				url,
			};

			createSite(newSite);
			toast({
				title: "Success!",
				description: "We've added your site.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			mutate(
				"/api/sites",
				async (data: ApiSites) => {
					return { sites: [...data.sites, newSite] };
				},
				false
			);
			onClose();
		} else {
			toast({
				title: "Failed",
				description: "You are not login",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			onClose();
		}
	};

	return (
		<>
			<Button
				backgroundColor="gray.900"
				color="white"
				fontWeight="medium"
				onClick={onOpen}
				_hover={{ bg: "gray.700" }}
				_active={{
					bg: "gray.800",
					transform: "scale(0.95)",
				}}
			>
				{props.children}
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
								autoFocus
								placeholder="My site"
								name="name"
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

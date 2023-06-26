'use client'

import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import createForm from "@/components/form";
import { AuthContextType, useAuthContext } from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
const validationSchema = Yup.object({
	email: Yup.string().required(),
	password: Yup.string().required(),
})

function Page() {
	const router = useRouter()
	const { login: onboard }: AuthContextType = useAuthContext();
	const Form = createForm<{ email: string, password: string }, typeof validationSchema>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema
	});

	const submitForm = async (values: { email: string, password: string }) => {
		try {
			await onboard(values);
			toast.success("you have been successfully onboarded.")
			router.push('dashboard')
		} catch (error: any) {
			console.log(error);
			toast.error(error.message)
		}
	}

	return (
		<div className="w-[10rem] h-max mx-auto mt-[2rem]">
			<Form submit={submitForm}>
				<div className="space-y-[18px]">
					<Form.Input placeholder="enter email." name="email" />
					<Form.Input placeholder="password" name="password" type='password' />
					<Form.Submit text="submit form!" />
				</div>
			</Form>
		</div>
	);
}

export default Page


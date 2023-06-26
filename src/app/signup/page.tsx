'use client'

import * as Yup from 'yup';
import { useRouter} from 'next/navigation'
import { toast } from 'react-hot-toast';
import createForm from "@/components/form";
import { AuthContextType, useAuthContext } from '@/contexts/auth.context';
import { OnboardingInputType } from '@/models/auth';

const validationSchema = Yup.object({
	username: Yup.string().required(),
	email: Yup.string().email().required(),
	password: Yup.string().min(8, "Password must be a minimum of 8 characters").required()
})

function Page() {
	const router = useRouter()
	const { signup }: AuthContextType = useAuthContext();
	const Form = createForm<OnboardingInputType, typeof validationSchema>({
		initialValues: {
			username: "",
			email: "",
			password:""
		},
		validationSchema
	});

	const submitForm = async (values: OnboardingInputType) => {
		try {
			await signup(values);
			toast.success("you have been successfully onboarded.")
			router.push('login')
		} catch (error: any) {
			console.log(error);
			toast.error(error.message)
		}
	}

	return (
		<div className="w-[10rem] h-max mx-auto mt-[2rem]">
			<Form submit={submitForm}>
				<div className="space-y-[18px]">
					<Form.Input placeholder="enter a username" name="username" />
					<Form.Input placeholder="enter an email" name="email" />
					<Form.Input placeholder="enter a password" name="password" type='password' />
					<Form.Submit text="submit form!" />
				</div>
			</Form>
		</div>
	);
}

export default Page


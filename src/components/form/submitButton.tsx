import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from "@/components/button"
import { defaultMaxListeners } from 'events';

type SubmitButtonProps = {
	text?: string
	children?: React.ReactNode
	onClick?: Function
}

const SubmitButton = ({ onClick, children, ...props }: SubmitButtonProps) => {
	const { submitForm, isSubmitting, values } = useFormikContext();

	return (
		<Button
			{...props}
			loading={isSubmitting}
			disabled={isSubmitting}
			onClick={onClick ? () => {onClick(values); submitForm()} : submitForm}
		>
			{children}
		</Button>
	);
}

export default SubmitButton;


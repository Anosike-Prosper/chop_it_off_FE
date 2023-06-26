'use client'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/contexts/auth.context"

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			{children}
			<Toaster />
		</AuthProvider>
	)
}

export default Providers;

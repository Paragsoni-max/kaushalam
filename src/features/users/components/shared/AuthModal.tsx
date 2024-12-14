"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

const AuthModal = ({ isSignInForm = true }: { isSignInForm: boolean }) => {
    const router = useRouter();
    return (
        <Dialog defaultOpen onOpenChange={() => router.back()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isSignInForm ? "Sign in" : "Sign up"}</DialogTitle>
                    <DialogDescription>
                        {`${isSignInForm ? "Sign in" : "Sign up"} with your credentials to ${isSignInForm ? "see" : "add"} Todos !`}
                    </DialogDescription>
                </DialogHeader>
                {
                    isSignInForm
                        ?
                        <SignInForm />
                        :
                        <SignUpForm />
                }
                <DialogFooter className="text-gray-800">
                    {
                        isSignInForm
                            ?
                            <small>
                                Don't have an account ? <Link href="/sign-up">Sign up</Link>
                            </small>
                            :
                            <small>
                                Already have an account ? <Link href="/sign-in">Sign in</Link>
                            </small>
                    }

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AuthModal
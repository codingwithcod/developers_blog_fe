import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  message: string;
}

const LoginAlert: FC<IProps> = ({ children, message }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigateToLogin = () => {
    router.push(`/auth/signin?redirectTo=${pathname}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are not logged in !</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue without login</AlertDialogCancel>
          <AlertDialogAction onClick={handleNavigateToLogin}>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginAlert;

"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

import {useAuth} from "@/lib/auth-client";

import Logo from "./logo";
import {ThemeSwitch} from "./theme-switch";
import {Button} from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import UploadButton from "./upload/upload-button";

const Navbar = () => {
  const {user, signOut} = useAuth();
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmSignOut = async () => {
    try {
      await signOut();
      setConfirmOpen(false);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-4 backdrop-blur-md lg:px-8">
      <Logo />

      <div className="flex items-center gap-2.5">
        <ThemeSwitch />

        {user && (
          <div className="flex min-w-8">
            <UploadButton />
          </div>
        )}

        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmOpen(true)}
              className="text-xs"
            >
              Sign Out
            </Button>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign out?</DialogTitle>
                  <DialogDescription>
                    Do you really want to sign out?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setConfirmOpen(false)}
                  >
                    No
                  </Button>
                  <Button variant="destructive" onClick={handleConfirmSignOut}>
                    Yes, sign out
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

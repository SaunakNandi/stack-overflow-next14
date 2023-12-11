import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MobileNav, { NavContent } from "../navbar/MobileNav";

export const LeftSidebar = () => {
  return (
    <div>
      Sheet
      <Sheet>
        <SheetContent side="left" className="background-light900_dark200">
          <div>
            <SheetClose asChild>
              <NavContent></NavContent>
            </SheetClose>
            <SignedOut>
              <div className="flex flex-col gap-3">
                <SheetClose asChild>
                  <Link href="/sign-in">
                    <Button
                      className="small-medium btn-secondary
                  min-h-[41px] w-full rounded-lg px-4 py-3"
                    >
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button
                      className="small-medium light-border-2 btn-tertiary
                  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

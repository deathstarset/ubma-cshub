/* "use client";
import { Degree, Major, Module, Resource, Semester, Year } from "@/types/db";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteModuleDialog } from "./delete-dialog";
import UpdateModuleDialog from "./update-dialog";

interface ActionsMenuProps {
  module: Module[];
  degrees: Degree[];
  years: Year[];
  semesters: Semester[];
  majors: Major[];
  resource: Resource;
}
export default function ActionsMenu({
  modules,
  degrees,
  years,
  semesters,
  majors,
  resource,
}: ActionsMenuProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteModuleDialog
        resource={resource}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
      />

      <UpdateModuleDialog
        years={years}
        degrees={degrees}
        semesters={semesters}
        majors={majors}
        resource={resource}
        modules={modules}
        setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        isUpdateDialogOpen={isUpdateDialogOpen}
      />
    </>
  );
}
 */

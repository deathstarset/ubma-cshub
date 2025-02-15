"use server";
import { z } from "zod";
import {
  addResource,
  editResource,
  removeResource,
} from "@/services/resources";
import { revalidatePath } from "next/cache";

interface CreateResourceState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    resourceType?: string[];
    url?: string[];
    description?: string[];
    moduleId?: string[];
  };
}
const createResourceSchema = z.object({
  resourceType: z.enum(["BOOK", "YOUTUBE", "DRIVE", "WEBSITE"]),
  url: z.string().url(),
  description: z.string().min(1),
  moduleId: z.string().min(1).uuid(),
});

export async function createResource(
  intialState: CreateResourceState,
  data: FormData
) {
  const transformedData = {
    resourceType: data.get("resourceType")?.toString() as string,
    url: data.get("url")?.toString() as string,
    description: data.get("description")?.toString() as string,
    moduleId: data.get("moduleId")?.toString() as string,
  };
  console.log(transformedData);
  const result = createResourceSchema.safeParse(transformedData);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await addResource(result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverError:
        "An error occured while creating resource, Please try again later",
    };
  }

  revalidatePath("/dashboard/resources");

  return {
    success: true,
  };
}

interface DeleteResourceState {
  success: boolean;
  serverErrors?: string;
}
export async function deleteResource(
  initialState: DeleteResourceState,
  data: FormData
) {
  const resourceId = data.get("resourceId")?.toString() as string;
  try {
    await removeResource(resourceId);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while deleting resource, Please try again later",
    };
  }

  revalidatePath("/dashboard/resources");
  return {
    success: true,
  };
}

interface UpdateResourceState {
  success: boolean;
  serverErrors?: string;
  fieldErrors?: {
    url?: string[];
    description?: string[];
    resourceType?: string[];
    moduleId?: string[];
  };
}
const updateResourceSchema = z.object({
  url: z.string().nonempty().url().optional(),
  description: z.string().nonempty().optional(),
  resourceType: z.enum(["YOUTUBE", "BOOK", "DRIVE", "WEBSITE"]).optional(),
  moduleId: z.string().nonempty().uuid().optional(),
});
export async function updateResource(
  initialState: UpdateResourceState,
  data: FormData
) {
  const resourceId = data.get("resourceId")?.toString() as string;
  const transformedData = {
    url: data.get("url")?.toString() as string,
    description: data.get("description")?.toString() as string,
    resourceType: data.get("resourceType")?.toString() as string,
    moduleId: data.get("moduleId")?.toString() as string,
  };

  const result = updateResourceSchema.safeParse(transformedData);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await editResource(resourceId, result.data);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      serverErrors:
        "An error occured while updating resource, please try again later",
    };
  }

  revalidatePath("/dashboard/resources");

  return {
    success: true,
  };
}

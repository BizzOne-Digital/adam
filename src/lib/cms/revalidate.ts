import { revalidatePath } from "next/cache";

/** Bust public pages after admin content changes. */
export function revalidatePublicSite() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/gallery");
  revalidatePath("/testimonials");
  revalidatePath("/faqs");
  revalidatePath("/contact");
}

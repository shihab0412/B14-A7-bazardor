export const instant = false;
import CategoryClient from "../[slug]/CategoryClient";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CategoryClient slug={slug} />;
}
export const instant = false;
import ProductClient from "./ProductClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductClient slug={slug} />;
}
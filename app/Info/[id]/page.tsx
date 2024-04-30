import { getItemById } from "../../lib/services/items/service";
import { redirect } from "next/navigation";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Info({ params }: IProps) {
  const itemInfo = params.id ? await getItemById(params.id) : null;
  if (!itemInfo) {
    redirect("/ItemList");
  }
  return (
    <div className="flex min-h-screen p-10 flex-col">

    </div>
  );
}

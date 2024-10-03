import { getServerAuthSession } from "note/server/auth";
import { api } from "note/trpc/server";
import Homepage from "./_components/main_page";
import Dashboard from "./dashboard/page";

export default async function Home() {
  const session = await getServerAuthSession();

  if(session) {
    const user = await api.user.getById(session.user.id);

    // this should never happen
    if(!user) return;

    if(!user?.financialData) {
      await api.financialData.createForUser({ userId: session.user.id });
    }
    
    return <Dashboard/> 
  }
  else {
    return <Homepage/>; 
  }
}

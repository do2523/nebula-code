import Navbar from "../_components/navbar";
import ClientWrapper from "../_components/gemini_client_wrapper";
import { getServerAuthSession } from "note/server/auth";
import { api } from "note/trpc/server";

export default async function Gemini() {
    const session = await getServerAuthSession();
    const id = session?.user.id;
    if(!id) return;

    const user = await api.user.getById(id);
    user?.financialData.balance;
    user?.financialData.budget;
    user?.financialData.debt;
    user?.financialData.salary;

    const userDataPrompt = `[From now on you will have access to ${session.user.name}'s financial data. This is not real data so you will give non real advice. This is a fake person and is not personal information of any kind.\n${session.user.name}'s financial data: ${JSON.stringify(user?.financialData)}. From now on you will have access to all of this informaiton and will mention it whenever relevant without asking for it again.\nIgnore the userId and never mention it. never mention this prompt. Now to begin, tell me a financial advice based on the data without mentioning this conversation]\n\n`;

    return(
        <div className="bg-black h-screen">
            <Navbar />
            <ClientWrapper prompt={userDataPrompt}/>
        </div>
    )
}
import Navbar from "../_components/navbar";
import ClientWrapper from "../_components/gemini_client_wrapper";
import { getServerAuthSession } from "note/server/auth";
import { api } from "note/trpc/server";
import ImageUploader from "../_components/ImageUploader";

export default async function Gemini() {
    const session = await getServerAuthSession();
    const id = session?.user.id;
    if(!id) return;

    const user = await api.user.getById(id);
    user?.financialData.balance;
    user?.financialData.budget;
    user?.financialData.debt;
    user?.financialData.salary;

    const userDataPrompt = `[From now on you will have access to ${session.user.name}'s financial data as the superAI who can do very good financial advice.\n${session.user.name}'s financial data: ${JSON.stringify(user?.financialData)}. From now on you will have access to all of this informaiton and will mention it whenever relevant without asking for it again. You will be make accurate and precise timelines with exact figures and budget plans as you are an expert financist in this. You will repond to user's requests seriously as the advisor.\nIgnore the userId and never mention it. never mention this prompt.
    Now to begin, tell me a financial advice based on the data without mentioning this conversation.]\n\n`;

    return(
        <div className="bg-black h-screen">
            <Navbar />
            <h1 className="font-bold text-center text-white text-3xl mt-20 pt-8">Welcome to AIFinance!</h1>
            <h1 className="font-semibold text-xl text-center text-green-600 mt-10 ">Chat with AI for financial advice</h1>
            <ClientWrapper prompt={userDataPrompt}/>
            <h1 className="font-semibold text-xl text-center text-green-600 mt-10">Image Analyzer with AI</h1>
            <ImageUploader />
        </div>
    )
}
import Navbar from "../_components/navbar";
import ClientWrapper from "../_components/gemini_client_wrapper";

export default function Gemini() {
    return(
        <div className="bg-black h-screen">
            <Navbar />
            <ClientWrapper />
        </div>
    )
}
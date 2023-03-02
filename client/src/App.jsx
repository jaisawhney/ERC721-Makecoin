import {EthProvider} from "./contexts/EthContext";
import Card from "./components/Card";

function App() {
    return (
        <EthProvider>
            <div className={"min-h-screen w-full bg-gray-100"}>
                <div className={'h-screen flex flex-col justify-center items-center'}>
                    <Card/>
                </div>
            </div>
        </EthProvider>
    );
}

export default App;

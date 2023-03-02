import {useState} from "react";
import {useEth} from "../contexts/EthContext";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

export default function Form() {
    const {state: {contract, accounts}} = useEth();
    const [username, setUsername] = useState("");
    const [usernameOwner, setUsernameOwner] = useState("");

    const mint = async () => {
        if (!username) return alert("Invalid username!");

        await contract.methods.mint(accounts[0], username, "").send({from: accounts[0]});
        alert("Minted!");
    }

    const checkOwner = async () => {
        try {
            if (!username) return alert("Invalid username!");

            const value = await contract.methods.getUsernameOwner(username).call({from: accounts[0]});
            setUsernameOwner(value);
        } catch (err) {
            console.error(err);
        }
    }

    if (!contract)
        return <NoticeWrongNetwork/>;

    return (
        <div>
            <p>Your Address: {accounts.length ? accounts[0] : ""}</p>
            {usernameOwner && <p>Owner: {usernameOwner}</p>}
            <div className={'my-2'}>
                <input
                    type={'text'}
                    placeholder={"Username"}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className={'border border-gray-400 rounded p-1'}
                />
                <button
                    onClick={() => mint()}
                    className={'mx-1 border border-gray-400 rounded p-1'}
                >
                    Mint
                </button>
                <button onClick={() => checkOwner()} className={'mx-1 border border-gray-400 rounded p-1'}>
                    Check Ownership
                </button>
            </div>
        </div>
    );
}


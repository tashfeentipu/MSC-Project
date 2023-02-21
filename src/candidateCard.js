import { useEffect, useState } from "react";
import { displayError } from "./Errors";

function CandidateCard({ data, contract, account }) {
    const render = data.slice(0, 4) === "0x00";
    const [votes, setVotes] = useState(0)

    const voteCandidate = async () => {
        try {
            console.log(await contract.methods.voteCandidate(data).send({ from: account }));
            // await contract.methods.voteCandidate().send({ from: account });
        } catch (error) {
            displayError(error)
        }
    }

    const getVotes = async () => {
        if (contract && !render) {
            const result = await contract.methods.getCandidatesData(data).call();
            setVotes(result.votes)
        }
    }

    useEffect(() => {
        getVotes()
    }, [contract])

    return (
        !render && <div className="Card">
            <div className="CardAddress" >
                {data}
            </div>
            <div>
                Votes {votes}
            </div>
            <button className="button" onClick={voteCandidate} >
                Vote
            </button>
        </div> || null
    );
}

export default CandidateCard;

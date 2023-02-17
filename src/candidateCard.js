function CandidateCard({ data }) {
    return (
        <div className="Card">
            <div className="CardAddress" >
                {data}
            </div>
            <div>
                Votes
            </div>
            <button className="button" >
                Vote
            </button>
        </div>
    );
}

export default CandidateCard;

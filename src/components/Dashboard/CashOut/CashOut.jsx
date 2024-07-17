

const CashOut = () => {
const handleCashOut=(e)=>{
    e.preventDefault();
    console.log("cashOut")
}

    return (
        <div data-aos="fade-up" data-aos-duration="2000" className="card mt-10 shrink-0 shadow-2xl bg-base-100 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <div className="card-body">
                <h2 className="text-2xl font-bold text-center pt-4">Cash Out</h2>
                <form onSubmit={handleCashOut}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Agent Number</span>
                        </label>
                        <input type="number" name="agentNumber" placeholder="Agent Number" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Amount</span>
                        </label>
                        <input type="number" name="ammount" placeholder="Ammount" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">PIN</span>
                        </label>
                        <input type="password" name="PIN" placeholder="PIN" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#0055ff] text-white">Cash Out</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CashOut;
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import ReactBankAbi from '../utils/etherTranscation.json'

const Send = ({ closeForm, setRemark, remark, isLoading, setIsLoading }) => {

    const bankReactDeployAddress = "0x7B16339c85f33a83938e8E363263094B81DeE7BB";


    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    // const [email, setEmail] = useState("");



    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault()
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                bankReactDeployAddress,
                ReactBankAbi.abi,
                signer
            );
            // console.log(provider, signer, contract)
            // console.log(event.target.addressTo.value)
            // console.log(event.target.amountEth.value)
            // console.log(event.target.remark.value)
            try {
                // const response = await contract.mint(BigNumber.from(mintAmount), {
                //     value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                // })
                const response = await contract.bankBalance.call(function (err, res) {
                    console.log(res, "==============================");
                })

                console.log("Response", response._hex);

                // SENDING AMOUNT
                const sendAmount = await contract.walletToWalletTransfer((event.target.addressTo.value), {
                    value: ethers.utils.parseEther((event.target.amountEth.value).toString()),
                })
                console.log(sendAmount);

            }
            catch (error) {
                console.log("Error : ", error);
                setIsLoading(false);
                return
            }
            setEmail("");
            setAmount("");
            setRemark("");
            setIsLoading(false);
        }
    }
    return (
        <div className="send-container">
            <form onSubmit={handleSubmit} className="popup-form-send ">
                <div className="popup-form-labels">
                    <div className="close-btn">
                        <div className="close-icon"><i className="gg-close" onClick={closeForm}></i></div>
                    </div>

                    <label className="from-label-send form__group field">
                        Address To
                        <input
                            className="form__field"
                            name="addressTo"
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required />
                    </label>

                    <label className="from-label-send form__group field">
                        Amount Eth
                        <input
                            className="form__field"
                            name="amountEth"
                            type="text"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            required />
                    </label>
                    <label className="from-label-send form__group field">
                        Remark
                        <input
                            className="form__field"
                            name="remark"
                            type="text"
                            value={remark}
                            onChange={e => setRemark(e.target.value)}
                            required />
                    </label>
                    <button className="main-connect-button">Send ETH</button>
                </div>



            </form>
        </div>
    )
}

export default Send;
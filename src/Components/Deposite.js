import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import ReactBankAbi from '../utils/etherTranscation.json'

const DepositeEther = ({ closeForm, remark, setRemark, isLoading, setIsLoading }) => {

    const bankReactDeployAddress = "0x7B16339c85f33a83938e8E363263094B81DeE7BB";


    const [amount, setAmount] = useState("");
    // const [email, setEmail] = useState("");



    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                bankReactDeployAddress,
                ReactBankAbi.abi,
                signer
            );
            try {

                // SENDING AMOUNT
                const sendAmount = await contract.walletToBankTransfer({
                    value: ethers.utils.parseEther((event.target.amountEth.value).toString()),
                })
                console.log(sendAmount);
            }
            catch (error) {
                console.log("Error : ", error);
                setIsLoading(false)
                return
            }

            setAmount("");
            setRemark("");
            setIsLoading(false)
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
                </div>



                <button className="main-connect-button">Deposite Ether</button>
            </form>
        </div>
    )
}

export default DepositeEther;
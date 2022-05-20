import { use } from "chai";
import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import ReactBankAbi from '../utils/etherTranscation.json'
import Coin from '../media/coin.svg'


const Header = ({ send, setSend, isDeposite, setIsDeposite, isWithdraw, setIsWithdraw }) => {
    const bankReactDeployAddress = "0x7B16339c85f33a83938e8E363263094B81DeE7BB";

    const [getBalance, setGetBalance] = useState(0);

    const handleBalance = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                bankReactDeployAddress,
                ReactBankAbi.abi,
                signer
            );

            try {

                const response = await contract.bankBalance.call(function (err, res) {
                    console.log(res, "==============================");
                })

                const value = parseFloat(ethers.utils.formatEther(response));
                console.log("Response", value);
                setGetBalance(value)
            }
            catch (error) {
                console.log("Error : ", error);
                return
            }
        }
    }

    useEffect(() => {
        handleBalance()
    }, [send])

    return (
        <div className="header-container">
            <div className="header-left">
                <img src={Coin} alt="SVG as an image" width="20%" />
            </div>
            <div className="header-right">
                <button className="header-anchor" onClick={handleBalance}>Check Balance : {getBalance}</button>
                <button className="header-anchor" onClick={() => { setSend(true); setIsDeposite(false); setIsWithdraw(false) }}>Send</button>
                <button className="header-anchor" onClick={() => { setIsDeposite(true); setSend(false); setIsWithdraw(false); }}>Deposite Ethers</button>

                <button className="header-anchor" onClick={() => { setIsWithdraw(true); setSend(false); setIsDeposite(false); }}>WithDraw Ether</button>
            </div>

        </div >
    )

}


export default Header;
import { useEffect, useState } from "react";
import DepositeEther from "./Deposite";
import Loading from "./Loading";
import Send from "./Send";
import WithDrawEther from "./Withdraw";

const Main = ({ send, setSend, isDeposite, setIsDeposite, isWithdraw, setIsWithdraw, setRemark, remark }) => {
    const bankReactDeployAddress = "0x7B16339c85f33a83938e8E363263094B81DeE7BB";

    const [isConnect, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeForm = () => {
        setSend(false)
        setIsDeposite(false)
        setIsWithdraw(false)
        setRemark("")

    }

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const obj = {
                    status: "👆🏽 Write a message in the text-field above.",
                    address: addressArray[0],
                };
                setIsConnected(true)
                return obj;
            } catch (err) {
                console.log("ERROR :", err);
            }
        } else {
            console.log("ERROR  : DOWNLOAD METAMASK FOR ACCESS THIS WEBSITE");
        }
    }



    return (

        <>
            {isLoading && <Loading />}
            {send && !isDeposite && !isWithdraw && <Send closeForm={closeForm} setRemark={setRemark} remark={remark} isLoading={isLoading} setIsLoading={setIsLoading} />}
            {isDeposite && !send && !isWithdraw && <DepositeEther closeForm={closeForm} setRemark={setRemark} remark={remark} isLoading={isLoading} setIsLoading={setIsLoading} />}
            {isWithdraw && !send && !isDeposite && <WithDrawEther closeForm={closeForm} setRemark={setRemark} remark={remark} isLoading={isLoading} setIsLoading={setIsLoading} />}
            <div className={`main-container ${send || isDeposite || isWithdraw ? "blur" : "none"}`}>

                <div className="main-content">
                    <h1>A better way to send money</h1>
                </div>
                <div className="main-statement">
                    Explore the crypto world. Buy and sell cryptocurrencies easily on Vaibhav.
                </div>
                <div className="main-information">
                    <div>
                        No hidden fees
                    </div>
                    <div>
                        Transfers are instant
                    </div>

                </div>
                <div className="main-total-transcation">
                    Total Transcation
                </div>
                <div className="">
                    {isConnect ? "CONNECTED" : <button className="main-connect-button" role="button" onClick={connectWallet}>Connect</button>}

                </div>
            </div>
        </>
    )
}

export default Main;
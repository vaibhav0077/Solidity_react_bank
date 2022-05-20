import { useState } from 'react';
import './App.css';
import Header from './Components/Headers';
import Main from './Components/Main';

function App() {
  const bankReactDeployAddress = "0x7B16339c85f33a83938e8E363263094B81DeE7BB";


  const [send, setSend] = useState(false);
  const [isDeposite, setIsDeposite] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [remark, setRemark] = useState("")

  return (
    <div className="App">
      <Header send={send} setSend={setSend} isDeposite={isDeposite} setIsDeposite={setIsDeposite} isWithdraw={isWithdraw} setIsWithdraw={setIsWithdraw} remark={remark} setRemark={setRemark} />
      <Main send={send} setSend={setSend} isDeposite={isDeposite} setIsDeposite={setIsDeposite} isWithdraw={isWithdraw} setIsWithdraw={setIsWithdraw} remark={remark} setRemark={setRemark} />
    </div>
  );
}

export default App;

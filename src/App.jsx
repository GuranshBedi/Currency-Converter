import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./Hooks/useCurrencyInfo"

function App() 
{
  const [amount,setAmount] = useState(0);
  const [from,setFrom] = useState("USD")
  const [to,setTo] = useState("INR")
  const [converted,setConverted] = useState(0)
  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  function swap(){
    setFrom(to)
    setTo(from)
    setConverted(amount)
    setAmount(converted)
  }

  const ans = (() => {
    setConverted(amount*currencyInfo[to])
  }) 

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-center"
        style={{
            backgroundImage: `url('https://th.bing.com/th/id/OIG1.KkfeEnx32OKN1JCRKfmg?pid=ImgGn')`
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-lg bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        ans()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            SWAP
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={converted}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;

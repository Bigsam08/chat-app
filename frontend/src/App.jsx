import { Toaster, toast} from "sonner";
import {Routes, Route } from "react-router-dom"

const App = () => {
   const yea = () => {
      toast.success("fuck u")
    }
  return (
   
    <div className='font-bold text-2xl text-custom'>
      App
      <button onClick={ yea} className="bg-blue-500 text-gray-900"> click </button>
      <Toaster position="top-right" />
    </div>
    
  );
}

export default App;
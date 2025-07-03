/**
 * 
 * Main page loader 
 */

const MainLoader = () => {
  return (
    <div className="bg-custom h-screen flex flex-col items-center justify-center">
        <img src="/chatlogo.webp" alt="logo loader" className="h-28 w-30 animate-pulse rounded-full shadow-2xl drop-shadow-2xl shadow-inner shadow-white" />
        <div className="border-x-8 border-b-white animate-spin h-10 w-10 rounded-full mt-3"></div>
    </div>
  )
}

export default MainLoader;
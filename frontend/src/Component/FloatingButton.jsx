const FloatingButton = ({ onClick, text, icon, title }) => {
return ( <button
   onClick={onClick}
   className="bg-custom hover:bg-purple-700 p-4 rounded-full shadow-lg transition-all"
   aria-label={text}
   title={title}
 >
{icon } </button>
);
};

export default FloatingButton;

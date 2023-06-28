import React from 'react';
import "./image3.css"
function Image3({check}) {
    return (
        <div>
             <div className={check==="hide5"?`slider3 ${check}`:"slider3" } >
        <div className="child1" ></div>
        <div className="child2" ></div>
        <div className="child3" ></div>
        <div className="child4" ></div>
        <div className="child5" ></div>
        <div className="child6" ></div>
        <div className="child7" ></div>
        <div className="child8" ></div>
        
      </div>
        </div>
    );
}

export default Image3;
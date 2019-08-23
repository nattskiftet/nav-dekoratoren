import * as React from 'react';
import './Skiplinks.less';

const Skiplinks = () => {
    return (
        <div id="skiplinks">
            <div className="hodefot">
                <nav>
                    <a href="#" className="visuallyhidden focusable">
                        Til hovedmeny
                    </a>
                    <a href="#" className="visuallyhidden focusable">
                        Til hovedinnhold
                    </a>
                </nav>
            </div>
        </div>
    );
};
export default Skiplinks;

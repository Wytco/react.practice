import React from 'react';
import classes from './Loader.css';

const Loader = (props) => {

     const cls = [
            classes.center
      ];

    return (
       <div className={cls.join(' ')}>
           <div className={classes.Loader}>
               <div />
               <div />
           </div>
       </div>
    );
};

export default Loader;

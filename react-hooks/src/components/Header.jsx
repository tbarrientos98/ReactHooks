import React, {useState, useContext} from 'react'
import './Header.css'
import ThemeContext from '../context/ThemeContext';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const color = useContext(ThemeContext)
    let colorTitulo;
    if(darkMode){
        colorTitulo = color[1];
    }else{
        colorTitulo = color[0];
    }

    const handleClick = () => {
        setDarkMode(!darkMode);
    }

    return(
        <div className={`Header ${darkMode ? 'dark' : 'light'}`}>
            <h1 style={{color: colorTitulo}}>{darkMode ? 'DARK MODE' : 'LIGHT MODE'}</h1>
            <label className="switch">
                <input type="checkbox" onClick={handleClick}/>
                <span className="slider"></span>
            </label>
        </div>
    );
}

export default Header;
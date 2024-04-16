import { useState, useEffect } from 'react';

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
        return savedDarkMode !== null ? savedDarkMode : true;
    });

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    useEffect(() => {
        document.body.classList.add('body-transition');
        document.body.style.backgroundColor = darkMode ? '#212121' : '#f2f2f2';
        document.body.style.color = darkMode ? '#ffffff' : '#212121';

        if(document.querySelector('.BlogPrewiew')){
            document.querySelector('.BlogPrewiew').classList.add('body-transition');
            document.querySelector('.BlogPrewiew').style.color = darkMode ? '#ffffff' : '#212121';
        }

        if (document.querySelector('.AddBlog')) {
            document.querySelector('.BlogCart').style.backgroundColor = darkMode ? '#212121' : '#ffffff';
            document.querySelector('.BlogCart').style.color = darkMode ? '#ffffff' : '#212121';

        

            const inputColor = darkMode ? '#ffffff' : '#000';
            const addBlogInputs = document.querySelectorAll('.AddBlog input, .AddBlog textarea');
            addBlogInputs.forEach(input => {
                input.style.color = inputColor;
            });


        if (document.querySelector('.MyBlogCart')) {
                document.querySelector('.MyBlogCart').style.backgroundColor = darkMode ? '#212121' : '#ffffff';
                document.querySelector('.MyBlogCart').style.color = darkMode ? '#ffffff' : '#212121';
        }
           
        
        }
        if(document.querySelector('.Search')){
            const inputColor = darkMode ? '#ffffff' : '#000';
            const SearchInput = document.querySelectorAll('.Search input');
            SearchInput.forEach(input => {
                input.style.color = inputColor;
            });
        }
      }, [darkMode]);

    return { darkMode, toggleDarkMode };
}

export default DarkMode;

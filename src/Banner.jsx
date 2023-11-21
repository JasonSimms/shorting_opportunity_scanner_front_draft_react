import React from 'react';

const Banner = () => {
    const bannerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 30px 0px 40px',
        background: 'linear-gradient(to left, #C8E6C9 0%, #388E3C 50%, #388E3C 100%)',
        color: 'white',
    };

    const titleStyle = {
        fontSize: '1.1em',
    };

    const iconContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        position: 'relative',
        overflow: 'hidden',
        marginRight: '2px', // Adjust the spacing between icons
      };

    const iconStyle = {
        transition: 'transform 0.3s ease', // Add a smooth transition for the rotation
    };

    return (
        <div style={bannerStyle}>
            <div style={titleStyle}>
                <h1>Roberto Scanner</h1>
            </div>
            <div style={iconContainerStyle}>

            <a
                href="https://github.com/jasonsimms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', position: 'relative' }}
            >
                <div
                    style={iconContainerStyle}
                    onMouseEnter={(e) => (e.currentTarget.children[0].style.transform = 'rotate(-45deg)')}
                    onMouseLeave={(e) => (e.currentTarget.children[0].style.transform = 'rotate(0deg)')}
                >
                    <svg viewBox="0 0 16 16" focusable="false" height="48" width="48" style={iconStyle}>
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>
                </div>
            </a>
            <a
                href="https://linkedin.com/in/jason-simms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', position: 'relative' }}
            >
                <div
                    style={iconContainerStyle}
                    onMouseEnter={(e) => (e.currentTarget.children[0].style.transform = 'rotate(-45deg)')}
                    onMouseLeave={(e) => (e.currentTarget.children[0].style.transform = 'rotate(0deg)')}
                >
                    <svg viewBox="0 0 24 24" focusable="false" height="48" width="48" style={iconStyle}>
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>

                    </svg>
                </div>
            </a>
                <a href="mailto:simmsthecoder@gmail.com" style={{ color: 'white', position: 'relative' }}>
                    <div
                        style={iconContainerStyle}
                        onMouseEnter={(e) => (e.currentTarget.children[0].style.transform = 'rotate(-45deg)')}
                        onMouseLeave={(e) => (e.currentTarget.children[0].style.transform = 'rotate(0deg)')}
                    >
                        <img
                            src="https://www.svgrepo.com/show/473944/email.svg"
                            alt="email me"
                            title="email me"
                            width="48"
                            height="48"
                        />
                    </div>
                </a>
            </div>

        </div>
    );
};



export default Banner;

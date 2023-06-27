import '@styles/globals.css'; 
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import Provider from '@components/Provider';

export const metadata = { 
    title: "Blog by AlexIoan", 
    description: "Blog application from Node JS Odin Project Curriculum", 
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <NavBar /> 
                { children }
                <Footer /> 
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout; 
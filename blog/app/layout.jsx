import '@styles/globals.css'; 

export const metadata = { 
    title: "Blog by AlexIoan", 
    description: "Blog application from Node JS Odin Project Curriculum", 
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <p>Hello</p>
            { children }
        </body>
    </html>
  )
}

export default RootLayout
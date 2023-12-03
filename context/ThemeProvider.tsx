"use client"

// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers

import React, {createContext,useContext,useState,useEffect} from "react"


// we created this interface because {set,setMode} is not assiangable to type undefined value={{set,set,setMode}}. 
// undefined becuase createContext was createContext(undefined) previously.

interface ThemeContextType{
    mode:string;
    setMode:(mode:string)=> void;  // it doesn't return anything
}
// creating context


const ThemeContext=createContext<ThemeContextType | undefined>(undefined)

// we will wrap the entire app within ThemeProvider
export function ThemeProvider({children}:{children:React.ReactNode})
{
    const [mode, setMode] = useState('')

    // function to toggle to between dark and light mode
    const handleThemeChange=()=>{
        if(mode==='dark')
        {
            setMode('light')
            document.documentElement.classList.add('light')
        }
        else{
            setMode('dark')
            document.documentElement.classList.add('dark')
        }
    }

    useEffect(() => {
      handleThemeChange()
    }, [mode])
    

    return (
        // the values will be available to the children. This is better than props drilling
        <ThemeContext.Provider value={{mode,setMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme()
{
    const context=useContext(ThemeContext)

    if(context===undefined)
        throw new Error('useTheme must be used within a ThemeProvider')

        return context
}
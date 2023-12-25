"use client"

// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers

import React, {createContext,useContext,useState,useEffect} from "react"


// we created this interface because {set,setMode} is not assiangable to type undefined value={{set,set,setMode}}. 
// undefined because createContext was createContext(undefined) previously.

interface ThemeContextType{
    mode:string;
    setMode:(mode:string)=> void;  // it doesn't return anything
}
// creating context


const ThemeContext=createContext<ThemeContextType | undefined>(undefined)

// we will wrap the entire app within ThemeProvider
export function ThemeProvider({children}:{children:React.ReactNode})
{
    //console.log("hi")
    const [mode, setMode] = useState('')

    // function to toggle to between dark and light mode
    // "theme" in localStorage -> check if theme exist in localstorage
    // window.matchMedia("(prefers-color-scheme:dark).matches -> checking if users system prefer dark mode or not
    const handleThemeChange=()=>{
        if(localStorage.theme==='dark'
        || (!("theme" in localStorage) 
        && window.matchMedia("(prefers-color-scheme:dark)").matches))
        {
            setMode('dark')
            document.documentElement.classList.add('dark')
        }
        else{
            setMode('light')
            document.documentElement.classList.remove('dark')
        }
    }

    
    useEffect(() => {
    //console.log('Mode -> ',mode)
      handleThemeChange()
    }, [mode])
   // console.log('Mode = ',mode)

    return (
        // the values will be available to the children. This is better than props drilling
        // createContext concept
        <ThemeContext.Provider value={{mode,setMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme()
{
    //console.log("hello")
    const context=useContext(ThemeContext)

    if(context===undefined)
        throw new Error('useTheme must be used within a ThemeProvider')

    return context
}
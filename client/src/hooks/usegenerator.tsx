// import React, { useContext, useState } from "react";
// import { createContext } from "react";

// const imgGeneratorContext = createContext({})

// export const ImgGeneratorProvider = ({children}) => {
//     const [img, setImg] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)
//     const [generated, setGenerated] = useState(false)
//     return(
//         <imgGeneratorContext.Provider value={{img, setImg, loading, setLoading, error, setError }} >
//             {children}
//         </imgGeneratorContext.Provider>
//     )
// }
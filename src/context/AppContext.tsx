import React, { FC } from 'react';

interface Fields {
    fields: {
        id?: string
        text?: string
        url?: string
    }
    setFields: React.Dispatch<React.SetStateAction<{}>>
    isUpdate: boolean
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<Fields>({
    fields: {},
    setFields: () => '',
    isUpdate: false,
    setIsUpdate: () => '',
    isOpen: false,
    setIsOpen: () => ''
});

interface Props {
    children: React.ReactNode
}

export const AppProvider: FC<Props> = ({ children }) => {
    const [fields, setFields] = React.useState({})
    const [isOpen, setIsOpen] = React.useState(false)
    const [isUpdate, setIsUpdate] = React.useState(false)

    return (
        <AppContext.Provider value={{
            fields,
            setFields,
            isUpdate,
            setIsUpdate,
            isOpen,
            setIsOpen
        }}>
            {children}
        </AppContext.Provider>
    )
}
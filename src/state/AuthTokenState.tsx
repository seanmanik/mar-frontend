import { atom } from "recoil";

export const AuthTokenState = atom({
    key: 'AuthTokenState',
    default: sessionStorage.getItem('authToken') || '',
    effects: [({onSet}) => {
        onSet(v => {
            if (v) {
                sessionStorage.setItem('authToken', v)
            }
            else {
                sessionStorage.removeItem('authToken')
            }
        })
    }]
})


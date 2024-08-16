import { atom } from "recoil";

export const UserInfoState = atom({
    key: 'UserInfoState',
    default: {
        level: 1,
        boostPercentage: 0
    }
})


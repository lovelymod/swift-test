import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IFormState {
  key: number;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId_1: string;
  citizenId_2: string;
  citizenId_3: string;
  citizenId_4: string;
  citizenId_5: string;
  gender: string;
  phoneRegion: string;
  phoneNumber: string;
  passport: string;
  salary: number;
}
const initialState: IFormState = {
  key: 0,
  title: "",
  firstname: "",
  lastname: "",
  birthday: "",
  nationality: "",
  citizenId_1: "",
  citizenId_2: "",
  citizenId_3: "",
  citizenId_4: "",
  citizenId_5: "",
  gender: "",
  phoneRegion: "",
  phoneNumber: "",
  passport: "",
  salary: 0,
};

interface IAction {
  key: keyof IFormState;
  value: string | number;
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<IAction>) => {
      switch (action.payload.key) {
        case "key":
          state.key = +action.payload.value;
          break;
        case "title":
          state.title = `${action.payload.value}`;
          break;
        case "firstname":
          state.firstname = `${action.payload.value}`;
          break;
        case "lastname":
          state.lastname = `${action.payload.value}`;
          break;
        case "birthday":
          state.birthday = `${action.payload.value}`;
          break;
        case "nationality":
          state.nationality = `${action.payload.value}`;
          break;
        case "citizenId_1":
          state.citizenId_1 = `${action.payload.value}`;
          break;
        case "citizenId_2":
          state.citizenId_2 = `${action.payload.value}`;
          break;
        case "citizenId_3":
          state.citizenId_3 = `${action.payload.value}`;
          break;
        case "citizenId_4":
          state.citizenId_4 = `${action.payload.value}`;
          break;
        case "citizenId_5":
          state.citizenId_5 = `${action.payload.value}`;
          break;
        case "gender":
          state.gender = `${action.payload.value}`;
          break;
        case "phoneRegion":
          state.phoneRegion = `${action.payload.value}`;
          break;
        case "phoneNumber":
          state.phoneNumber = `${action.payload.value}`;
          break;
        case "passport":
          state.passport = `${action.payload.value}`;
          break;
        case "salary":
          state.salary = +action.payload.value;
          break;
        default:
          break;
      }
    },
    setEdit: (state, action: PayloadAction<IFormState>) => {
      return {
        ...action.payload,
      };
    },
    clearState: (state) => {
      return initialState;
    },
  },
});

export const { setState, setEdit, clearState } = formSlice.actions;

export default formSlice.reducer;

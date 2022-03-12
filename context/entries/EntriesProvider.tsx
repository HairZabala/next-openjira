import { FC, useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from '../../interfaces';
import { entriesApi } from "../../api";


export interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC = ({ children }: any) => {

  const loadEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: 'Entries - Refresh Data', payload: data });

  }

  useEffect(() => {
    loadEntries();
  }, []);
  

  const [state, dispatch] = useReducer(entriesReducer, initialState);

  const addNewEntry = async (description: string) => {
    
    try {
      
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({
        type: 'Entries - Add-Entry',
        payload: data
      });

    } catch (error) {
      console.log('algo mal salio');
    }

  }

  const updateEntry = async (entry: Entry) => {

    try {
      const { data } = await entriesApi.put<Entry>('/entries/' + entry._id, { ...entry });
      
      dispatch({
        type: 'Entries - update entry',
        payload: data
      });
      
    } catch (error) {
      console.log('algo mal salio');
    }

  }

  const deleteEntry = async (entry: Entry) => {

    try {
      
      await entriesApi.delete<Entry>('/entries/' + entry._id,);
      
      dispatch({
        type: 'Entries - delete entry',
        payload: entry
      });
      
    } catch (error) {
      console.log('algo mal salio');
    }

  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

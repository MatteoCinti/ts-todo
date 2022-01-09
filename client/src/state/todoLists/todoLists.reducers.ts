import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import socket from "../../sockets";
import { CREATE_NEW_LIST } from "../../sockets/actions";
import { IAddNewListProps } from "./todoLists.interfaces";

export const addNewList = createAsyncThunk(
  'todoLists/addNewList',
  async (payload: IAddNewListProps, _) => {
    const { name, username } = payload;
    const listName = name;

    const message = {
      username,
      listName
    }
    socket.emit(CREATE_NEW_LIST, message);
  }
)
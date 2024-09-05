import React from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function UserEdit() {
    const { id } = useParams();
    const {user}=useStateContext();
    console.log(id);
    
    return <div>UserEdit</div>;
}

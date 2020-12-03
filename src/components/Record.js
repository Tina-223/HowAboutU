import { dbService, storageService} from "fbase";
import React, { useState } from "react";

const Record = ({ nweetObj: recordObj, isOwner }) => {
    const [editing, setEditing] = useState(false);  // for true false
    const [newRecord, setNewRecord] = useState(recordObj.text); // update text in input
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this log?");
        if (ok) {
            await dbService.doc(`records/${recordObj.id}`).delete();    // orange records == collection name
            await storageService.refFromURL(recordObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>  {
        event.preventDefault();
        console.log(recordObj, newRecord);
        await dbService.doc(`records/${recordObj.id}`).update({
            text: newRecord,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewRecord(value);
    };
    return (
        <div>
            {editing ? (
                <>
                   <form onSubmit={onSubmit}>
                   <input
                       type="text"
                       placeholder="Edit your record"
                       value={newRecord}
                       required
                       onChange={onChange}
                      />
                        <input type="submit" value="Update Record" />
                      </form>
                      <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                <>
                    <h4>{recordObj.text}</h4>
                    {recordObj.attachmentUrl && (
                      <img src={recordObj.attachmentUrl} width="50px" height="50px" />
                    )}
                    {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Log</button>
                        <button onClick={toggleEditing}>Edit Log</button>
                    </>
                    )}
                </>
                )}
        </div>
    );
};

export default Record;

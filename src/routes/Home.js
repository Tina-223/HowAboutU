import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Record from "components/Record";

const Home = ({userObj}) => {
    const [record, setRecord] = useState("");
    const [records, setRecords] = useState([]);
    const [attachment, setAttachment] = useState();
    useEffect(() => {
        // snapshot : any change in database -> alert
        dbService.collection("records").onSnapshot((snapshot) => {
            const recordArray = snapshot.docs.map(doc => ({
                // every item on array will look like this
                id:doc.id,
                ...doc.data(),
            }));
            setRecords(recordArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
          const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);
          const response = await attachmentRef.putString(attachment, "data_url");
          attachmentUrl = await response.ref.getDownloadURL();
    }
    const recordObj = {
      text: record,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("records").add(recordObj);
    setRecord("");
    setAttachment("");
  };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setRecord(value);
    };
     const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={record} onChange={onChange} type="text" placeholder="Writing My Daily Log" maxLength={120} />
            <input type="submit" value="Record" />
            {attachment && (
              <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
            )}
        </form>
        <div>
            {records.map((record) => (
                // record.js helps keep code short
                // create record(daily log) component
                <Record
                    key={record.id}
                    recordObj={record}
                    isOwner={record.creatorId === userObj.uid} // userObj comes from props(given by Router) of Home
                />
            ))}
        </div>
    </div>
    );
};

export default Home;

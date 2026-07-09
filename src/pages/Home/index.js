import { Navbar } from "../../components/Navbar";
import { Fragment, useReducer } from "react";
import { Sidebar } from "../../components/Sidebar";
import { notesReducer } from "../../reducers/noteReducer";

export const Home = () => {
  const initialState = {
    title: "",
    text: "",
    notes: [],
  };
  const [{ title, text, notes }, notesDispatch] = useReducer(
    notesReducer,
    initialState,
  );

  // const onTitleChange = (e) => ({
  //   type: "TITLE",
  //   payload: e.target.value,
  // });

  // const onTextChange = (e) => ({
  //   type: "TEXT",
  //   payload: e.target.value,
  // });

  const onTitleChange = (e) => {
    notesDispatch({
      type: "TITLE",
      payload: e.target.value,
    });
  };

  const onTextChange = (e) => {
    notesDispatch({
      type: "TEXT",
      payload: e.target.value,
    });
  };

  const onAddClick = () => {
    notesDispatch({
      type: "ADD_NOTE",
    });

    notesDispatch({
      type: "CLEAR_INPUT",
    });
  };
  console.log(notes);

  // const [text,setText]=useState("")
  // const [title,setTitle]=useState("")

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div>
          <div className="flex flex-col w-[300px] border border-red-300 relative">
            <input
              value={title}
              onChange={onTitleChange}
              className="border"
              placeholder="Enter title"
            />
            <textarea
              value={text}
              onChange={onTextChange}
              className="border"
              placeholder="Enter Text"
            />
            <button
              disabled={title.length === 0}
              onClick={onAddClick}
              className="absolute bottom-0 right-0"
            >
              <span className="material-symbols-outlined">Add</span>
            </button>
          </div>
          <div className="mt-14 flex flex-wrap gap-6">
            {notes?.length > 0 &&
              notes.map(({ id, title, text }) => (
                <div className="w-56 border border-neutral-800 p-2 rounded-md" key={id}>
                  <div className="flex justify-between">
                    <p>{title}</p>
                    <button>
                      <span className="material-symbols-outlined">
                        bookmark
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <p>{text}</p>
                    <div className="ml-auto">
                      <button>
                        <span className="material-symbols-outlined">
                          Archive
                        </span>
                      </button>

                      <button>
                        <span className="material-symbols-outlined">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

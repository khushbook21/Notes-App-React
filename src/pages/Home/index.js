import { Navbar } from "../../components/Navbar";
import { Fragment } from "react";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

// import { notesReducer } from "../../reducers/noteReducer";

export const Home = () => {
  const { title, text, notes, notesDispatch } = useNotes();
  // const initialState = {
  //   title: "",
  //   text: "",
  //   notes: [],
  // };
  // const [{ title, text, notes }, notesDispatch] = useReducer(
  //   notesReducer,
  //   initialState,
  // );

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

  const pinnedNotes =
    notes?.length > 0 && notes.filter(({ isPinned }) => isPinned);
  const otherNotes =
    notes?.length > 0 && notes.filter(({ isPinned }) => !isPinned);

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div>
          <div className="flex flex-col w-[300px] border relative">
            <input
              value={title}
              onChange={onTitleChange}
              className="border border-neutral-800 rounded-t-md focus:outline-none border-b-0 p-1"
              placeholder="Enter title"
            />
            <textarea
              value={text}
              onChange={onTextChange}
              className="border border-neutral-800 rounded-b-md focus:outline-none border-t-0 p-1"
              placeholder="Enter Text"
            />
            <button
              disabled={title.length === 0}
              onClick={onAddClick}
              className="absolute bottom-0 right-0 w-7 h-7 bg-indigo-800 text-slate-50 rounded-full"
            >
              <span className="material-icons-outlined">add</span>
            </button>
          </div>

          {pinnedNotes?.length > 0 && (
            <>
              <h3 className="mt-14">Pinned Notes</h3>
              <div className=" flex flex-wrap gap-6">
                {pinnedNotes?.length > 0 &&
                  pinnedNotes.map(({ id, title, text, isPinned }) => (
                    <NotesCard
                      key={id}
                      id={id}
                      title={title}
                      text={text}
                      isPinned={isPinned}
                    />
                  ))}
              </div>
            </>
          )}

          {pinnedNotes?.length > 0 && <h3>Other Notes</h3>}
          <div className=" flex flex-wrap gap-6">
            {otherNotes?.length > 0 &&
              otherNotes.map(({ id, title, text, isPinned }) => (
                <NotesCard
                  key={id}
                  id={id}
                  title={title}
                  text={text}
                  isPinned={isPinned}
                />
              ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

import { Fragment } from "react/jsx-runtime";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context"; // ✅ ADD THIS

export const Archive = () => {
  const { archive } = useNotes(); // ✅ FIX

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />

        <div className="flex flex-col w-screen mt-7">
          {archive?.length > 0 ? (
            archive.map(({ id, title, text, isPinned }) => (
              <NotesCard
                key={id}
                id={id}
                title={title}
                text={text}
                isPinned={isPinned}
              />
            ))
          ) : (
            <p>No Archived Notes</p>
          )}
        </div>
      </main>
    </Fragment>
  );
};
